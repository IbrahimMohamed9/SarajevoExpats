"use client";

import { useState, useRef } from "react";
import BaseCardImage from "@atoms/BaseCardImage";
import BaseCardContent from "@molecules/BaseCardContent";
import Link from "next/link";
import { useSetRecoilState } from "recoil";
import { loadingAtom } from "@/store/atoms/loadingAtom";

const BaseCardHorizontal = ({ item, type, className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [startPosition, setStartPosition] = useState(0);
  const setLoadingState = useSetRecoilState(loadingAtom);
  const timeoutRef = useRef(null);
  const elementRef = useRef(null);

  if (!item) return null;

  const title = item?.title || item?.name;
  const image = item?.picture || item?.displayUrl;
  const content = item?.content;
  const date = (item?.createdAt || item?.date)?.split(" at ")[0];
  const values = {
    phone: item?.phone,
    email: item?.email,
    source: item?.source,
    location: item?.location,
    service: item?.serviceType,
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
  };

  const handleMouseDown = () => {
    setIsPressed(true);
    const rect = elementRef.current?.getBoundingClientRect();
    setStartPosition(rect?.left || 0);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsPressed(false);
    }, 150);
  };

  const handleClick = (e) => {
    if (!e.ctrlKey) setLoadingState(true);
  };

  const getHref = () => {
    switch (type) {
      case "services":
        return `/services/${item.serviceType.replace("/", "%2F")}/${item._id}`;
      case "places":
        return `/places/${item.type.replace("/", "%2F")}/${item._id}`;
      case "news":
        return `/news/${item._id}`;
      case "events":
        return `/events/${item._id}`;
      default:
        return "/";
    }
  };

  const href = getHref();

  return (
    <Link
      ref={elementRef}
      href={href}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      draggable={false}
      className={`relative m-2 h-40 w-full grid grid-cols-[128px_1fr] min-[430px]:grid-cols-[160px_1fr] gap-0 transition-all duration-300 ${
        isPressed
          ? "scale-[0.98] shadow-sm"
          : isHovered
          ? "scale-[1.02] shadow-xl -translate-y-1 bg-gray-50"
          : "shadow-md hover:shadow-xl"
      } rounded-lg overflow-hidden cursor-pointer select-none ${className}`}
    >
      <BaseCardImage
        image={image}
        title={title}
        isHovered={isHovered}
        isPressed={isPressed}
        type={type}
        className="h-40 rounded-lg text-wrap"
      />
      <BaseCardContent
        title={title}
        content={content}
        date={date}
        type={type}
        values={values}
        isHovered={isHovered}
        horizontal={true}
        className="w-full h-full"
      />
      <div
        className={`absolute inset-0 bg-main/5 transition-opacity duration-150
            ${isPressed ? "opacity-100" : "opacity-0"}`}
      />
    </Link>
  );
};

export default BaseCardHorizontal;
