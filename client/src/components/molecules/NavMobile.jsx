"use client";

import { useClickAway } from "react-use";
import { useRef } from "react";
import { useState } from "react";
import { Squash as Hamburger } from "hamburger-react";
import routes from "../../app/routes";
import HeaderButtons from "./HeaderButtons";
import { AnimatePresence, motion } from "framer-motion";
import NavMobileElement from "../atoms/NavMobileElement";

export const NavMobile = () => {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef(null);
  useClickAway(ref, () => setOpen(false));

  const routeElements = routes.map(({ title, href }, index) => (
    <NavMobileElement
      key={title}
      title={title}
      href={href}
      setOpen={setOpen}
      index={index}
    />
  ));

  return (
    <div ref={ref} className="lg:hidden flex items-center">
      <Hamburger
        toggled={isOpen}
        size={30}
        toggle={setOpen}
        color="white"
        aria-label="Toggle mobile navigation"
      />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed left-0 shadow-4xl right-0 top-20 p-5 pt-0 bg-blue-950 border-b border-b-white/20"
          >
            <ul className="grid gap-2">
              {routeElements}
              <motion.li
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.1 + routeElements.length / 10,
                }}
                key="buttons"
              >
                <HeaderButtons
                  className="flex justify-center"
                  buttonClassName="mr-2"
                />
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
