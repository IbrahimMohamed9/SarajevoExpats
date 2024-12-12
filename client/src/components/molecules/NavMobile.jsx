"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useRecoilState } from "recoil";
import NavOpenAtom from "@/store/atoms/NavOpenAtom";
import HeaderButtons from "@molecules/HeaderButtons";
import HeaderMobiDropMenu from "@atoms/HeaderMobiDropMenu";

export const NavMobile = ({ routes = [] }) => {
  const [isOpen, setOpen] = useRecoilState(NavOpenAtom);
  const onClose = () => setOpen(false);
  const [openDropdowns, setOpenDropdowns] = useState({});

  const handleDropdownClick = (title) => {
    setOpenDropdowns((prev) => {
      const allClosed = Object.keys(prev).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {});

      return {
        ...allClosed,
        [title]: !prev[title],
      };
    });
  };

  const routesElement = routes.map((route) => (
    <div key={route.title}>
      {route.dropdown ? (
        <HeaderMobiDropMenu
          route={route}
          openDropdowns={openDropdowns}
          onClose={onClose}
          handleDropdownClick={handleDropdownClick}
        />
      ) : (
        <ListItemButton
          component={Link}
          href={route.href}
          onClick={onClose}
          className="text-white hover:bg-white/10"
        >
          <ListItemText primary={route.title} />
        </ListItemButton>
      )}
    </div>
  ));

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      className="xl:hidden"
      PaperProps={{
        className: "bg-blue-950 text-white flex flex-col",
      }}
    >
      <div className="flex justify-between items-center p-4 border-b border-white/20">
        <h2 className="text-xl font-semibold text-white">Menu</h2>
        <IconButton onClick={onClose} className="text-white">
          <CloseIcon />
        </IconButton>
      </div>
      <List className="w-[280px] flex-1">{routesElement}</List>
      <Box className="p-4 border-t border-white/20">
        <HeaderButtons className="flex h-full items-center gap-2" />
      </Box>
    </Drawer>
  );
};

export default NavMobile;
