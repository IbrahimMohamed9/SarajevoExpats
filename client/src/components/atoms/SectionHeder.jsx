import React from "react";
import { Typography } from "@mui/material";

const SectionHeder = ({ title }) => {
  return (
    <div className="flex items-center justify-center gap-2 px-2 mb-4 w-full">
      <div className="flex-1 h-1 bg-gradient-to-l from-main/20 to-transparent" />
      <Typography variant="h5" className="text-lg font-semibold text-main">
        {title}
      </Typography>
      <div className="flex-1 h-1 bg-gradient-to-r from-main/20 to-transparent" />
    </div>
  );
};

export default SectionHeder;
