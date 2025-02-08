import CardsTemplate from "@templates/CardsTemplate";
import { serverAxiosInstance } from "@/config/axios";
import NewsCarousel from "@organisms/NewsCarousel";

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
  const response = await serverAxiosInstance.get("/news");
  const news = response.data;
  const slides = await serverAxiosInstance.get("/news/slides");
  const slideNews = slides.data;

  return (
    <div className="-mt-7 container mx-auto">
      <NewsCarousel slides={slideNews} />
      <div className="max-w-7xl mx-auto px-4">
        <CardsTemplate data={news} pageType="news" type="news" />
      </div>
    </div>
  );
};

export default News;
