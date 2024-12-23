import { formatDateTime } from "@/utils/formatters";

const LatestNewsContent = ({ latestNews }) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 max-w-5xl mx-auto">
      <div className="space-y-4">
        <div className="flex items-center gap-4 text-gray-300">
          <time dateTime={latestNews.createdAt} className="text-sm">
            {formatDateTime(latestNews.createdAt)}
          </time>
          <span className="text-main font-medium px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-sm">
            Latest News
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white group-hover:text-main transition-colors">
          {latestNews.title}
        </h1>
        <p
          className="line-clamp-3 text-lg text-gray-200 max-w-3xl"
          dangerouslySetInnerHTML={{ __html: latestNews.content }}
        />
        <button className="inline-flex items-center gap-2 text-main hover:text-white transition-colors">
          Read More
          <svg
            className="w-5 h-5 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default LatestNewsContent;
