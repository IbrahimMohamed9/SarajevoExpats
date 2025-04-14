import SortableImage from "@atoms/SortableImage";

const ImageGallery = ({
  childPosts,
  onClick,
  adminModal = true,
  reordering = false,
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

  const imagesBtnsElements = childPosts.map((media, index) => (
    <SortableImage
      key={index}
      media={media}
      index={index}
      onClick={onClick}
      reordering={reordering}
    />
  ));

  return (
    <div
      className={`-mt-6 mb-8 flex gap-2 ${
        adminModal ? "overflow-x-auto" : "flex-wrap"
      } py-2 px-4 md:px-0 snap-x snap-mandatory scroll-pl-4 ${
        !overflow ? "justify-center" : ""
      } ${reordering ? "bg-gray-100 rounded-lg" : ""}`}
    >
      {imagesBtnsElements}
    </div>
  );
};

export default ImageGallery;
