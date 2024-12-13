"use client";

import { useState } from "react";
import Grid from "@mui/material/Grid2";
import AdminNavbar from "@adminMol/AdminNavbar";

const AdminDashboardGrid = ({ children, navigationItems }) => {
  const [open, setOpen] = useState(true);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  return (
    <Grid container spacing={1}>
      <Grid size={open ? 2 : 1}>
        <AdminNavbar
          open={open}
          handleDrawerToggle={handleDrawerToggle}
          navigationItems={navigationItems}
        />
      </Grid>
      <Grid size={open ? 10 : 11}>
        <div className="p-1">{children}</div>
      </Grid>
    </Grid>
  );
};

export default AdminDashboardGrid;
