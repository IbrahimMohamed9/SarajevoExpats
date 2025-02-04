import LatestNewsImage from "@atoms/LatestNewsImage";
import LatestNewsContent from "@atoms/LatestNewsContent";
import Link from "next/link";

const SingleNewsLayout = ({ latestNews }) => {
  return (
    <div className="overflow-hidden">
      <Link href={`/news/${latestNews._id}`} className="block group">
        <div className="relative w-full h-[60vh] min-h-[500px]">
          <LatestNewsImage latestNews={latestNews} />
          <LatestNewsContent latestNews={latestNews} />
        </div>
      </Link>
    </div>
  );
};

export default SingleNewsLayout;
