"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Menu, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const HeaderDeskDropMenu = ({ route, dropdownItems }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItems = dropdownItems?.map((item) => (
    <MenuItem
      key={item.href}
      onClick={handleClose}
      component={Link}
      href={item.href}
      className="!text-white"
    >
      {item.title}
    </MenuItem>
  ));

  return (
    <>
      <Button
        onClick={handleClick}
        endIcon={open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        sx={{ color: "white" }}
      >
        {route.title}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        PaperProps={{
          className: "bg-main",
        }}
      >
        {menuItems}
      </Menu>
    </>
  );
};

export default HeaderDeskDropMenu;
