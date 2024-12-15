import React from "react";
import { Typography } from "@mui/material";

const BaseCardTitle = ({ title, isHovered }) => {
  return (
    <div className="relative">
      <Typography
        variant="subtitle1"
        component="div"
        className={`line-clamp-2 max-h-fit mb-1 font-medium text-sm transition-colors duration-300
                ${isHovered ? "text-main" : "text-gray-800"}`}
      >
        {title || "Untitled"}
      </Typography>
      <div
        className={`absolute bottom-0 left-0 h-0.5 bg-main transition-all duration-300
                ${isHovered ? "w-full" : "w-0"}`}
      />
    </div>
  );
};

export default BaseCardTitle;
