import CarouselSection from "@molecules/CarouselSection";
import BaseCard from "@/components/atoms/BaseCard";
import SectionHeder from "@atoms/SectionHeder";
import axiosInstance from "@/config/axios";

async function getData() {
  try {
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

    return { news, places, services, events };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      news: [],
      places: [],
      services: [],
      events: [],
    };
  }
}

const Home = async () => {
  const { news, places, services, events } = await getData();

  const eventsColumnElements = events.map((event, index) => (
    <div key={index} className="w-fit">
      <BaseCard item={event} />
    </div>
  ));

  return (
    <div className="grid md:grid-cols-[1fr,240px] gap-4">
      {/* Carousels Column */}
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

      {/* Events Column */}
      <div className="hidden md:flex flex-col gap-6 border-l border-gray-200 h-[calc(100vh-2rem)] max-h-[1200px] sticky top-16">
        <SectionHeder title="Upcoming Events" />
        <div
          className="flex flex-col items-center gap-4 overflow-y-auto -mt-2"
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

export default Home;
