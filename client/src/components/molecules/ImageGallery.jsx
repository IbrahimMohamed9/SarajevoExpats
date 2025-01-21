"use client";

import Image from "next/image";

const ImageGallery = ({
  images,
  videos,
  imageAlt,
  selectedMedia,
  onMediaSelect,
}) => {
  if ((!images || images.length === 0) && (!videos || videos.length === 0))
    return null;

  const getContainerWidth = () => {
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

  const allMedia = [...(images || []), ...(videos || [])];
  const totalWidth = allMedia.length * 80 + 8 * (allMedia.length - 1);
  const containerWidth = getContainerWidth();
  const overflow = totalWidth > containerWidth;
  console.log(totalWidth);
  console.log(containerWidth);
  console.log(overflow);

  const mediaElements = allMedia.map((media, index) => {
    const isVideo = media.includes(".mp4") || media.includes("instagram.com");
    const isInstagramVideo = media.includes("instagram.com");

    return (
      <button
        key={media}
        onClick={() => onMediaSelect(media)}
        className={`relative flex-shrink-0 p-4 size-20 rounded-lg overflow-hidden transition-all duration-200 snap-start ${
          selectedMedia === media
            ? "ring-2 ring-main ring-offset-2"
            : "hover:ring-2 hover:ring-gray-300 hover:ring-offset-2"
        }`}
      >
        {isVideo ? (
          <>
            {!isInstagramVideo && (
              <video
                src={media}
                className="absolute inset-0 w-full h-full object-cover"
                muted
                loop
                playsInline
                autoPlay
              />
            )}
            <div className="absolute inset-0 flex items-center justify-center bg-black/60">
              <svg
                className={`w-8 h-8 ${
                  isInstagramVideo ? "text-pink-500" : "text-white/90"
                } drop-shadow-lg`}
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                {isInstagramVideo ? (
                  <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
                ) : (
                  <path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.69L9.54 5.98C8.87 5.55 8 6.03 8 6.82z" />
                )}
              </svg>
            </div>
          </>
        ) : (
          <Image
            src={media}
            alt={`${imageAlt} - Thumbnail ${index + 1}`}
            fill
            className="object-cover"
            sizes="80px"
          />
        )}
      </button>
    );
  });

  return (
    <div
      className={`-mt-6 mb-8 flex gap-2 overflow-x-auto py-2 px-4 md:px-0 snap-x snap-mandatory scroll-pl-4 ${
        !overflow ? "justify-center" : ""
      }`}
    >
      {mediaElements}
    </div>
  );
};

export default ImageGallery;
