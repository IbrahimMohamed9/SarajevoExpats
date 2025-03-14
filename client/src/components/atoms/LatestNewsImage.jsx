import Image from "next/image";

const LatestNewsImage = ({ latestNews }) => {
  return (
    <>
      <Image
        src={latestNews.pictures[0]}
        alt={latestNews.title}
        fill
        priority
        sizes="100vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
    </>
  );
};

export default LatestNewsImage;
