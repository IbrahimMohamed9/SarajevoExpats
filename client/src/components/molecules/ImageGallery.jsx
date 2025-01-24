"use client";

import Image from "next/image";

const ImageGallery = ({
  childPosts,
  selectedMedia,
  onClick,
  adminModal = true,
}) => {
  if (!childPosts || childPosts.length === 0) return null;

  const getContainerWidth = () => {
    if (typeof window === "undefined") return 640;

    const padding = 36;
    const width = window.innerWidth;
    const breakpoints = {
      lg: { min: 1024, max: 896 },
      md: { min: 768, max: 768 },
      sm: { min: 640, max: 640 },
    };

    for (const { min, max } of Object.values(breakpoints)) {
      if (width >= min) return Math.min(max - padding, width);
    }

    return width - padding;
  };

  const totalWidth = childPosts.length * 80 + 8 * (childPosts.length - 1);
  const containerWidth = getContainerWidth();
  const overflow = totalWidth > containerWidth;

  return (
    <div
      className={`-mt-6 mb-8 flex gap-2 ${
        adminModal ? "overflow-x-auto" : "flex-wrap"
      } py-2 px-4 md:px-0 snap-x snap-mandatory scroll-pl-4 ${
        !overflow ? "justify-center" : ""
      }`}
    >
      {childPosts.map((media, index) => (
        <button
          key={media.displayUrl || index}
          onClick={(e) => {
            e.preventDefault();
            if (onClick) onClick(media);
          }}
          className={`relative flex-shrink-0 p-4 size-20 rounded-lg overflow-hidden transition-all duration-200 snap-start ${
            selectedMedia?.displayUrl === media.displayUrl
              ? "ring-2 ring-main ring-offset-2"
              : "hover:ring-2 hover:ring-gray-300 hover:ring-offset-2"
          }`}
        >
          <Image
            src={media.displayUrl}
            alt={media.alt || `Image ${index + 1}`}
            fill
            className="object-cover"
            sizes="80px"
          />
        </button>
      ))}
    </div>
  );
};

export default ImageGallery;
