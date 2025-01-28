import React from "react";
import { ListItemButton, ListItemText, Collapse, List } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import Link from "next/link";

const HeaderMobiDropMenu = ({
  route,
  openDropdowns,
  onClose,
  handleDropdownClick,
}) => {
  return (
    <>
      <ListItemButton
        onClick={() => handleDropdownClick(route.title)}
        className="text-white hover:bg-white/10"
      >
        <ListItemText primary={route.title} />
        {openDropdowns[route.title] ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openDropdowns[route.title]} timeout="auto" unmountOnExit>
        <List component="div">
          {route.dropdown?.map((item) => (
            <ListItemButton
              key={item.href}
              component={Link}
              href={item.href}
              onClick={onClose}
              className="pl-8 !text-white hover:bg-white/10 "
            >
              <ListItemText primary={item.title} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default HeaderMobiDropMenu;
