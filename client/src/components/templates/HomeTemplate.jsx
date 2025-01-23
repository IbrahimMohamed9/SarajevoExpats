"use client";

import CarouselSection from "@molecules/CarouselSection";
import SectionHeder from "@atoms/SectionHeder";
import LatestNewsLayout from "@molecules/LatestNewsLayout";
import AdBanner from "@atoms/AdBanner";
import WhatsappLink from "@atoms/WhatsappLink";
import { useRecoilValue } from "recoil";
import { loadingAtom } from "@/store/atoms/loadingAtom";
import LoadingArticle from "./LoadingArticle";
import mapToBeEvents from "@/images/mapToBe.jpg";

const HomeTemplate = ({
  news,
  places,
  services,
  events,
  eventsColumnElements,
}) => {
  const loading = useRecoilValue(loadingAtom);

  if (loading) return <LoadingArticle />;
  const eventsTitle = "Map To Be Events";

  return (
    <div className="grid md:grid-cols-[1fr,340px] gap-4  max-w-7xl mx-auto -mt-11">
      <div className="flex flex-col pt-4 gap-8 overflow-hidden -mt-11">
        <div className="bg-gray-50">
          <AdBanner slot="1234567890" format="auto" responsive={true} />
        </div>
        {news[0] && <LatestNewsLayout latestNews={news[0]} />}
        <WhatsappLink className="md:hidden text-center border border-main flex justify-center max-w-80 mx-auto" />

        <div className="md:hidden">
          <CarouselSection
            items={events}
            type="events"
            title={eventsTitle}
            titleImage={mapToBeEvents}
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
        <div>
          <SectionHeder title={eventsTitle} src={mapToBeEvents} />
        </div>
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
