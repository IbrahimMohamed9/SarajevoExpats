import CardsTemplete from "@templates/CardsTemplete";
import axiosInstance from "@/config/axios";
import { formatDateTime } from "@/utils/formatters";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  metadataBase: new URL("https://sarajevoexpats.com"),
  title: "Latest News from Sarajevo | Updates & Stories | Sarajevo Expats",
  description:
    "Stay informed with the latest news, updates, and stories from Sarajevo. Get insights into local events, community updates, and important developments affecting expat life in Bosnia's capital city.",
  keywords:
    "Sarajevo news, Sarajevo updates, expat news Sarajevo, local news Bosnia, Sarajevo events news, community updates Sarajevo, latest happenings Sarajevo, Sarajevo current events",
  openGraph: {
    title: "Latest News from Sarajevo | Updates & Stories",
    description:
      "Stay informed with the latest news, updates, and stories from Sarajevo. Get insights into local events and community updates affecting expat life.",
    type: "website",
    locale: "en_US",
    siteName: "Sarajevo Expats",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "https://sarajevoexpats.com/news",
  },
};

const News = async () => {
  const response = await axiosInstance.get("/news");
  const news = response.data;
  const latestNews = news[0];

  return (
    <div className="-mt-7">
      {latestNews && (
        <div className="overflow-hidden">
          <Link href={`/news/${latestNews._id}`} className="block group">
            <div className="relative w-full h-[60vh] min-h-[500px]">
              <Image
                src={latestNews.picture}
                alt={latestNews.title}
                fill
                priority
                sizes="100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
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
                  <p className="line-clamp-3 text-lg text-gray-200 max-w-3xl">
                    {latestNews.content}
                  </p>
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
            </div>
          </Link>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4">
        <CardsTemplete data={news} type="news" />
      </div>
    </div>
  );
};

export default News;
