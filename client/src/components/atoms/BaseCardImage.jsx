"use client";

import { useState } from "react";
import { Skeleton } from "@mui/material";
import Image from "next/image";

const BaseCardImage = ({
  image,
  title,
  isHovered,
  isPressed,
  type,
  className = "",
}) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const defaultImage =
    "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=600";
  const imageSource = !imageError && image ? image : defaultImage;

  return (
    <div
      className={`relative w-full h-32 bg-gray-100 overflow-hidden  ${
        type === "events" ? "h-64" : ""
      } ${className}`}
    >
      {imageLoading && (
        <div className="absolute inset-0 z-10">
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            className={`animate-pulse ${
              isHovered ? "opacity-75" : "opacity-100"
            }`}
          />
        </div>
      )}
      <Image
        src={imageSource}
        alt={title || "Image"}
        fill
        className={`object-cover transition-all duration-500 ${
          imageLoading ? "opacity-0" : "opacity-100"
        } ${isHovered ? "scale-110" : ""} w-full ${
          isPressed ? "scale-105" : ""
        }`}
        priority
        onLoadingComplete={() => setImageLoading(false)}
        onError={() => {
          setImageError(true);
          setImageLoading(false);
        }}
      />
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent 
          transition-opacity duration-300 
          ${isHovered ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
};

export default BaseCardImage;
