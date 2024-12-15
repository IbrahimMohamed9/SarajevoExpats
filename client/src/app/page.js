import CarouselSection from "@molecules/CarouselSection";
import BaseCard from "@organisms/BaseCard";
import SectionHeder from "@atoms/SectionHeder";
import axiosInstance from "@/config/axios";
import { Suspense } from "react";

const Home = async () => {
  const [newsRes, placesRes, servicesRes, eventsRes] = await Promise.all([
    axiosInstance.get("/news"),
    axiosInstance.get("/places"),
    axiosInstance.get("/services"),
    axiosInstance.get("/events"),
  ]);

  const [news, places, services, events] = [
    newsRes.data,
    placesRes.data,
    servicesRes.data,
    eventsRes.data,
  ];

  const eventsColumnElements = events.map((event, index) => (
    <div key={index} className="w-fit">
      <BaseCard item={event} type="events" />
    </div>
  ));

  const EventCardSkeleton = () => (
    <div className="animate-pulse w-48 h-80 bg-main/10 rounded-lg" />
  );

  return (
    <div className="grid md:grid-cols-[1fr,240px] gap-4">
      <div className="flex flex-col pt-4 gap-8 overflow-hidden">
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

      <div className="hidden md:flex flex-col gap-6 border-l border-gray-200 h-[calc(100vh-2rem)] max-h-[1200px] sticky top-16">
        <SectionHeder title="Upcoming Events" />
        <div
          className="flex flex-col items-center gap-4 overflow-y-auto -mt-2"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#ff7003 transparent",
          }}
        >
          <Suspense
            fallback={
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <EventCardSkeleton key={i} />
                ))}
              </div>
            }
          >
            {eventsColumnElements}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Home;
