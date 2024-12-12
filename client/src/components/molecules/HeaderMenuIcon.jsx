"use client";

import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useSetRecoilState } from "recoil";
import NavOpenAtom from "@/store/atoms/NavOpenAtom";

const HeaderMenuIcon = () => {
  const setIsNavOpen = useSetRecoilState(NavOpenAtom);
  const toggleMobileNav = () => {
    setIsNavOpen((prev) => !prev);
  };

  return (
    <IconButton
      onClick={toggleMobileNav}
      className="xl:hidden text-white"
      aria-label="Toggle mobile navigation"
    >
      <MenuIcon />
    </IconButton>
  );
};

export default HeaderMenuIcon;
