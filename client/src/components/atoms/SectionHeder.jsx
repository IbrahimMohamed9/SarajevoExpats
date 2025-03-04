import React from "react";
import { Typography } from "@mui/material";
import Image from "next/image";

const SectionHeder = ({ title, src }) => {
  return (
    <div>
      <div className="flex items-center justify-center gap-2 px-2 mb-4 w-full">
        <div className="flex-1 h-1 bg-gradient-to-l from-main/50 to-transparent min-w-16" />
        <div>
          {src && (
            <Image
              className="rounded-full size-20 m-auto"
              src={src}
              alt={title}
            />
          )}
          <Typography
            variant="h1"
            className="font-semibold text-main"
            style={{
              fontSize: "1.125rem" /* 18px */,
              lineHeight: "1.75rem" /* 28px */,
            }}
          >
            {title}
          </Typography>
        </div>

        <div className="flex-1 h-1 bg-gradient-to-r from-main/50 to-transparent min-w-16" />
      </div>
    </div>
  );
};

export default SectionHeder;
