"use client";

import CarouselSection from "@molecules/CarouselSection";
import SectionHeder from "@atoms/SectionHeder";
import LatestNewsLayout from "@molecules/LatestNewsLayout";
import AdBanner from "@atoms/AdBanner";
import WhatsappLink from "@atoms/WhatsappLink";
import { useRecoilValue } from "recoil";
import { loadingAtom } from "@/store/atoms/loadingAtom";
import LoadingArticle from "./LoadingArticle";

const HomeTemplate = ({
  news,
  places,
  services,
  events,
  eventsColumnElements,
}) => {
  const loading = useRecoilValue(loadingAtom);

  if (loading) return <LoadingArticle />;

  const axios = require("axios");

  async function downloadInstagramVideo(url) {
    try {
      const apiURL = `https://api.instagram.com/oembed/?url=${url}`;
      const response = await axios.get(apiURL);
      const videoURL = response.data.thumbnail_url;

      console.log("Video URL:", videoURL);
      // You can now use videoURL to download the video via another request or save it.
    } catch (error) {
      console.error("Error fetching video URL:", error.message);
    }
  }

  // Replace with your Instagram post URL
  const postURL = "https://www.instagram.com/maptobe.app/p/DEmnL6pNkbE/";
  downloadInstagramVideo(postURL);

  return (
    <div className="grid md:grid-cols-[1fr,340px] gap-4  max-w-7xl mx-auto -mt-11">
      <div className="flex flex-col pt-4 gap-8 overflow-hidden -mt-11">
        <div className="bg-gray-50">
          <AdBanner slot="1234567890" format="auto" responsive={true} />
        </div>
        {news[0] && <LatestNewsLayout latestNews={news[news.length - 1]} />}
        <WhatsappLink className="md:hidden text-center border border-main flex justify-center max-w-80 mx-auto" />

        <div className="md:hidden">
          <CarouselSection
            items={events}
            type="events"
            title="Upcoming Events"
          />
        </div>
        <CarouselSection items={news} type="news" title="Latest News" />
        <CarouselSection items={places} type="places" title="Featured Places" />
        <CarouselSection
          items={services}
          type="services"
          title="Popular Services"
        />
      </div>

      <div className="hidden md:flex flex-col items-center gap-6 border-l border-gray-200 h-[calc(100vh-2rem)] max-h-[1200px] sticky top-12">
        <WhatsappLink className="text-center border border-main flex justify-center" />
        <SectionHeder title="Upcoming Events" />
        <div
          className="flex flex-col items-center gap-4 overflow-y-auto -mt-2 w-full"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#ff7003 transparent",
          }}
        >
          {eventsColumnElements}
        </div>
      </div>
    </div>
  );
};

export default HomeTemplate;
