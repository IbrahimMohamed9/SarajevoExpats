"use client";

import { useState, useRef, useEffect } from "react";
import BaseCardImage from "@atoms/BaseCardImage";
import BaseCardContent from "@molecules/BaseCardContent";
import { useRouter } from "next/navigation";
import Link from "next/link";

const BaseCard = ({ item, type, className = "" }) => {
  const route = useRouter();

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
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
  };

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsPressed(false);
    }, 150);
  };

  const getHref = () => {
    switch (type) {
      case "services":
        return `/services/${item.serviceType}/${item.serviceSubtype}/${item._id}`;
      case "places":
        return `/places/${item.type}/${item._id}`;
      case "news":
        return `/news/${item._id}`;
      case "events":
        return `/events/${item._id}`;
      default:
        return "/";
    }
  };

  const href = getHref();

  useEffect(() => {
    route.prefetch(href);
  }, [href, route]);

  if (!item) return null;

  return (
    <Link
      href={href}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      className={`relative m-2 h-80 w-32 min-[425px]:w-48 flex flex-col transition-all duration-300 ${
        isPressed
          ? "scale-[0.98] shadow-sm"
          : isHovered
          ? "scale-[1.02] shadow-xl -translate-y-1"
          : "shadow-md hover:shadow-xl"
      } ${className}`}
    >
      <BaseCardImage
        src={image}
        alt={title}
        className="h-40 min-[425px]:h-52"
      />
      <BaseCardContent
        title={title}
        content={content}
        date={date}
        type={type}
        values={values}
      />
      <div
        className={`absolute inset-0 bg-main/5 transition-opacity duration-150
            ${isPressed ? "opacity-100" : "opacity-0"}`}
      />
    </Link>
  );
};

export default BaseCard;
