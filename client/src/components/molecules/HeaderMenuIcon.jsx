"use client";

import { IconButton, Button } from "@mui/material";
import { useRecoilState } from "recoil";
import NavOpenAtom from "@/store/atoms/navOpenAtom";
import HumburgerMenu from "@/components/atoms/HumburgerMenu";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";

const HeaderMenuIcon = () => {
  const [isOpen, setIsNavOpen] = useRecoilState(NavOpenAtom);
  const toggleMobileNav = () => {
    setIsNavOpen((prev) => !prev);
  };

  return (
    <div className="flex items-center gap-2">
      <IconButton
        onClick={toggleMobileNav}
        className="!text-white z-30 relative w-10 h-10 flex items-center justify-center bg-opacity-20 hover:bg-white hover:bg-opacity-10 rounded-full transition-all duration-300"
        aria-label="Toggle mobile navigation"
      >
        <HumburgerMenu isOpen={isOpen} />
      </IconButton>
    </div>
  );
};

export default HeaderMenuIcon;
