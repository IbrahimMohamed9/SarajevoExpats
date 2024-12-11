import { motion } from "framer-motion";
import Link from "next/link";

const NavMobileElement = ({ title, href, setOpen, index }) => {
  return (
    <motion.li
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.1 + index / 10,
      }}
      className="w-full p-[0.08rem] rounded-xl bg-gradient-to-tr from-white via-gray-100 to-gray-300"
    >
      <Link
        href={href}
        onClick={() => setOpen((prev) => !prev)}
        className={
          "flex items-center justify-between w-full p-5 rounded-xl bg-white"
        }
      >
        <span className="flex gap-1 text-lg">{title}</span>
      </Link>
    </motion.li>
  );
};

export default NavMobileElement;
