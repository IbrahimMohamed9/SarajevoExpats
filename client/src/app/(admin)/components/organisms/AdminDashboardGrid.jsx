"use client";

import { useState } from "react";
import AdminNavbar from "@adminMol/AdminNavbar";

export default function AdminDashboardGrid({ children, navigationItems }) {
  const [open, setOpen] = useState(true);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <div
      className={`grid ${
        open ? "grid-cols-[130px_1fr]" : "grid-cols-[56px_1fr]"
      } transition-all duration-300`}
    >
      <div>
        <AdminNavbar
          open={open}
          handleDrawerToggle={handleDrawerToggle}
          navigationItems={navigationItems}
        />
      </div>
      <div className="p-2 min-w-0 overflow-x-auto">{children}</div>
    </div>
  );
}
