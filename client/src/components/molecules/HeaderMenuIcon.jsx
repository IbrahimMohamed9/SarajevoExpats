"use client";

import { IconButton } from "@mui/material";
import { useRecoilState } from "recoil";
import NavOpenAtom from "@/store/atoms/navOpenAtom";
import HumburgerMenu from "@/components/atoms/HumburgerMenu";

const HeaderMenuIcon = () => {
  const [isOpen, setIsNavOpen] = useRecoilState(NavOpenAtom);
  const toggleMobileNav = () => {
    setIsNavOpen((prev) => !prev);
  };

  return (
    <IconButton
      onClick={toggleMobileNav}
      className="min-[820px]:hidden !text-white z-30 relative w-10 h-10 flex items-center justify-center"
      // className="min-[1100px]:hidden text-white z-30 relative w-10 h-10 flex items-center justify-center"
      aria-label="Toggle mobile navigation"
    >
      <HumburgerMenu isOpen={isOpen} />
    </IconButton>
  );
};

export default HeaderMenuIcon;
