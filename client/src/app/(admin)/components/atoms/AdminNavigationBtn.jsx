"use client";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";

export default function AdminNavigationBtn({ item, open }) {
  return (
    <ListItem disablePadding sx={{ display: "block" }}>
      <ListItemButton
        component={Link}
        href={item.href}
        className="min-h-12 px-4"
      >
        <ListItemIcon className={`min-w-0 mr-${open ? "3" : "auto"}`}>
          {item.icon}
        </ListItemIcon>
        <ListItemText
          primary={item.text}
          className={`${open ? "block" : "hidden"} !text-black opacity-${
            open ? 100 : 0
          }`}
        />
      </ListItemButton>
    </ListItem>
  );
}
