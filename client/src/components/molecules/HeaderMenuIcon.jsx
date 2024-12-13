"use client";

import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { motion, AnimatePresence } from "framer-motion";
import { useSetRecoilState, useRecoilValue } from "recoil";
import NavOpenAtom from "@/store/atoms/NavOpenAtom";

const HeaderMenuIcon = () => {
  const setIsNavOpen = useSetRecoilState(NavOpenAtom);
  const isOpen = useRecoilValue(NavOpenAtom);
  const toggleMobileNav = () => {
    setIsNavOpen((prev) => !prev);
  };

  return (
    <IconButton
      onClick={toggleMobileNav}
      className="xl:hidden text-white z-30 relative w-10 h-10 flex items-center justify-center"
      aria-label="Toggle mobile navigation"
    >
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="close"
            initial={{ rotate: -180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 180, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CloseIcon />
          </motion.div>
        ) : (
          <motion.div
            key="menu"
            initial={{ rotate: 180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -180, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <MenuIcon />
          </motion.div>
        )}
      </AnimatePresence>
    </IconButton>
  );
};

export default HeaderMenuIcon;
