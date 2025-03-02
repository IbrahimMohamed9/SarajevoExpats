"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const SafeHtml = dynamic(() => import("@atoms/SafeHtml"), { ssr: false });

const ArticleMedia = ({ src, alt, description }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!src) return null;

  let isVideo = false;
  if (src?.type === "Video") isVideo = true;

  let mediaUrl;
  if (typeof src === "string") mediaUrl = src;
  else if (src?.type === "Video") mediaUrl = src.videoUrl;
  else mediaUrl = src.displayUrl;

  let maxHeight;
  const hasMultipleMedia = typeof src === "object";
  if (window.innerWidth > 630 && hasMultipleMedia) maxHeight = 600;
  else if (hasMultipleMedia) maxHeight = window.innerWidth - 32;

  return (
    <div className="space-y-4 mb-12 animate-fade-in">
      <div
        className={`relative mx-auto overflow-hidden rounded-xl ${
          isVideo ? "w-fit" : "w-full"
        } transform hover:scale-[1.02] transition-all duration-300`}
        style={{ height: `${maxHeight}px` }}
      >
        {isVideo && isClient ? (
          <video
            controls
            autoPlay
            muted
            playsInline
            name="media"
            className="max-h-[600px] w-auto mx-auto"
          >
            <source src={mediaUrl} type="video/mp4" />
          </video>
        ) : (
          <Image src={mediaUrl} alt={alt || ""} fill sizes="600" priority />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>
      </div>
      {description && (
        <div className="text-center text-gray-600 text-sm px-4">
          <SafeHtml content={description} />
        </div>
      )}
    </div>
  );
};

export default ArticleMedia;
