import Image from "next/image";
import dynamic from "next/dynamic";
const SafeHtml = dynamic(() => import("@atoms/SafeHtml"), { ssr: false });

const ArticleMedia = ({ src, alt, description }) => {
  if (!src) return null;

  let isVideo = false;
  if (typeof src !== "string" || src?.type === "Video") isVideo = true;

  let mediaUrl;
  if (typeof src === "string") mediaUrl = src;
  else if (src?.type === "Video") mediaUrl = src.videoUrl;
  else mediaUrl = src.displayUrl;

  return (
    <div className="space-y-4 mb-12 animate-fade-in">
      <div
        className="relative mx-auto overflow-hidden shadow-2xl w-fit h-auto rounded-xl
        transform hover:scale-[1.02] transition-all duration-300 hover:shadow-main/20"
      >
        {isVideo ? (
          <video
            src={mediaUrl}
            controls
            autoPlay
            playsInline
            className="max-h-[600px] w-auto mx-auto"
            preload="metadata"
          >
            Your browser does not support the video tag.
          </video>
        ) : (
          <Image
            src={mediaUrl}
            alt={alt || ""}
            width={800}
            height={500}
            className="object-contain w-auto h-auto"
            priority
          />
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
