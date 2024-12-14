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
      ModalProps={{ className: "z-30" }}
      BackdropProps={{ className: "bg-black/50 z-20" }}
      PaperProps={{
        className:
          "bg-main text-white flex flex-col absolute right-0 top-9 w-[150px] h-full z-40",
      }}
    >
      <List className="flex-1">{routesElement}</List>
      <Box className="p-4 border-t border-white/20">
        <HeaderButtons className="flex h-full items-center gap-2" />
      </Box>
    </Drawer>
  );
};

export default NavMobile;
