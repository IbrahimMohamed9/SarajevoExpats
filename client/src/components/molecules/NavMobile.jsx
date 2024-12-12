"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  IconButton,
  Box,
  Button,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useRecoilState } from "recoil";
import NavOpenAtom from "@/store/atoms/NavOpenAtom";

export const NavMobile = ({ routes = [] }) => {
  const [isOpen, setOpen] = useRecoilState(NavOpenAtom);
  const onClose = () => {
    setOpen(false);
  };
  const [dropdownItems, setDropdownItems] = useState({});
  const [openDropdowns, setOpenDropdowns] = useState({});

  useEffect(() => {
    const fetchDropdownItems = async () => {
      try {
        const response = await fetch("/api/navigation");
        const data = await response.json();
        setDropdownItems({
          Places: data.places,
          Services: data.services,
        });
      } catch (error) {
        console.error("Error fetching dropdown items:", error);
      }
    };

    fetchDropdownItems();
  }, []);

  const handleDropdownClick = (title) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      sx={{
        display: { xl: "none" },
        "& .MuiDrawer-paper": {
          backgroundColor: "#172554", // bg-blue-950
          color: "white",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <div className="flex justify-between items-center p-4 border-b border-white/20">
        <h2 className="text-xl font-semibold text-white">Menu</h2>
        <IconButton onClick={onClose} className="text-white">
          <CloseIcon />
        </IconButton>
      </div>
      <List sx={{ width: 280, flex: 1 }}>
        {routes.map((route) => (
          <div key={route.title}>
            {route.hasDropdown ? (
              <>
                <ListItemButton
                  onClick={() => handleDropdownClick(route.title)}
                  sx={{ color: "white" }}
                >
                  <ListItemText primary={route.title} />
                  {openDropdowns[route.title] ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse
                  in={openDropdowns[route.title]}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {dropdownItems[route.title]?.map((item) => (
                      <ListItemButton
                        key={item.href}
                        component={Link}
                        href={item.href}
                        onClick={onClose}
                        sx={{
                          pl: 4,
                          color: "white",
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                          },
                        }}
                      >
                        <ListItemText primary={item.title} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </>
            ) : (
              <ListItemButton
                component={Link}
                href={route.href}
                onClick={onClose}
                sx={{
                  color: "white",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                <ListItemText primary={route.title} />
              </ListItemButton>
            )}
          </div>
        ))}
      </List>
      <Box sx={{ p: 2, borderTop: "1px solid rgba(255, 255, 255, 0.2)" }}>
        <Button
          component={Link}
          href="/login"
          variant="outlined"
          fullWidth
          startIcon={<LoginIcon />}
          sx={{
            mb: 1,
            color: "white",
            borderColor: "white",
            "&:hover": {
              borderColor: "white",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
          }}
        >
          Login
        </Button>
        <Button
          component={Link}
          href="/register"
          variant="contained"
          fullWidth
          startIcon={<PersonAddIcon />}
          sx={{
            backgroundColor: "#22C55E", // green-500
            "&:hover": {
              backgroundColor: "#16A34A", // green-600
            },
          }}
        >
          Register
        </Button>
      </Box>
    </Drawer>
  );
};

export default NavMobile;
