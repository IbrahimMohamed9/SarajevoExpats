"use client";

import { useState, useRef } from "react";
import { Card, CardContent, Typography, Skeleton } from "@mui/material";
import Image from "next/image";

const BaseCard = ({ title, image, content, date, extraContent }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const timeoutRef = useRef(null);

  const defaultImage =
    "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=600";

  const truncateText = (text, maxWords = 20) => {
    if (!text || typeof text !== "string") return "";
    const words = text.split(" ");
    const truncated = words.slice(0, maxWords).join(" ");
    return truncated + (words.length > maxWords ? "..." : "");
  };

  const validateDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (isPressed) {
      timeoutRef.current = setTimeout(() => {
        setIsHovered(false);
        setIsPressed(false);
      }, 150);
    } else {
      setIsHovered(false);
    }
  };

  const handleTouchStart = () => {
    setIsHovered(true);
    setIsPressed(true);
  };

  const handleTouchEnd = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false);
      setIsPressed(false);
    }, 150);
  };

  return (
    <Card
      className={`relative m-2 h-[300px] min-w-[200px] w-[200px] flex flex-col transition-all duration-300 
          ${
            isPressed
              ? "scale-[0.98] shadow-sm"
              : isHovered
              ? "scale-[1.02] shadow-xl -translate-y-1"
              : "shadow-md hover:shadow-xl"
          }
          ${isHovered ? "bg-gray-50" : "bg-white"}
          rounded-lg overflow-hidden cursor-pointer select-none`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
    >
      <div className="relative w-full h-32 bg-gray-100 overflow-hidden">
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
          src={!imageError ? image || defaultImage : defaultImage}
          alt={title || "Image"}
          fill
          sizes="200px"
          className={`object-cover transition-all duration-500 
              ${imageLoading ? "opacity-0" : "opacity-100"}
              ${isHovered ? "scale-110" : ""}
              ${isPressed ? "scale-105" : ""}`}
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

      <CardContent
        className={`flex-1 flex flex-col p-3 relative transition-all duration-300
            ${isHovered ? "bg-gray-50" : ""}`}
      >
        {/* Title with animated underline */}
        <div className="relative">
          <Typography
            variant="subtitle1"
            component="div"
            className={`line-clamp-2 mb-1 font-medium text-sm transition-colors duration-300
                ${isHovered ? "text-main" : "text-gray-800"}`}
          >
            {truncateText(title, 10) || "Untitled"}
          </Typography>
          <div
            className={`absolute bottom-0 left-0 h-0.5 bg-main/20 transition-all duration-300
                ${isHovered ? "w-full" : "w-0"}`}
          />
        </div>

        {/* Content with fade-in effect */}
        <Typography
          variant="body2"
          color="text.secondary"
          className={`line-clamp-3 flex-1 text-xs transition-all duration-300
              ${isHovered ? "text-gray-700" : "text-gray-600"}`}
        >
          {truncateText(content)}
        </Typography>

        {/* Extra Content with slide-up animation */}
        <div
          className={`mt-auto transition-all duration-300 transform
            ${
              isHovered
                ? "translate-y-0 opacity-100"
                : "translate-y-1 opacity-90"
            }`}
        >
          {extraContent}
          {validateDate(date) && (
            <Typography
              variant="caption"
              color="text.secondary"
              className={`mt-1 text-xs transition-colors duration-300
                  ${isHovered ? "text-gray-600" : "text-gray-500"}`}
            >
              {validateDate(date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </Typography>
          )}
        </div>
      </CardContent>

      {/* Ripple effect on press */}
      <div
        className={`absolute inset-0 bg-main/5 transition-opacity duration-150
            ${isPressed ? "opacity-100" : "opacity-0"}`}
      />
    </Card>
  );
};

export default BaseCard;
