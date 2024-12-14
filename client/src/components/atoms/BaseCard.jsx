"use client";

import { useState, useRef } from "react";
import { Card } from "@mui/material";
import BaseCardImage from "@atoms/BaseCardImage";
import BaseCardContent from "@molecules/BaseCardContent";

const BaseCard = ({ item }) => {
  const title = item?.title || item?.name;
  const image = item?.picture;
  const content = item?.content;
  const date = item?.createdAt || item?.date;
  const values = {
    phone: item?.phone,
    email: item?.email,
    source: item?.source,
    location: item?.location,
  };

  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const timeoutRef = useRef(null);

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
      <BaseCardImage
        image={image}
        title={title}
        isHovered={isHovered}
        isPressed={isPressed}
      />

      <BaseCardContent
        content={content}
        date={date}
        title={title}
        values={values}
        isHovered={isHovered}
      />

      <div
        className={`absolute inset-0 bg-main/5 transition-opacity duration-150
            ${isPressed ? "opacity-100" : "opacity-0"}`}
      />
    </Card>
  );
};

export default BaseCard;
