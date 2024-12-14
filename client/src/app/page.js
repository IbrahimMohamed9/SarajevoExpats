import { Typography } from "@mui/material";
import CarouselSection from "@/components/molecules/CarouselSection";
import BaseCard from "@/components/atoms/BaseCard";
import LocationOnIcon from "@mui/icons-material/LocationOn";

async function getData() {
  try {
    const [newsRes, placesRes, servicesRes, eventsRes] = await Promise.all([
      fetch("http://localhost:3030/api/news", { cache: "no-store" }),
      fetch("http://localhost:3030/api/places", { cache: "no-store" }),
      fetch("http://localhost:3030/api/services", { cache: "no-store" }),
      fetch("http://localhost:3030/api/events", { cache: "no-store" }),
    ]);

    if (!newsRes.ok || !placesRes.ok || !servicesRes.ok || !eventsRes.ok) {
      throw new Error("Failed to fetch data");
    }

    const [news, places, services, events] = await Promise.all([
      newsRes.json(),
      placesRes.json(),
      servicesRes.json(),
      eventsRes.json(),
    ]);

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

export default async function Home() {
  const { news, places, services, events } = await getData();

  return (
    <div className="max-w-full mx-auto px-0 pb-8">
      {/* Desktop Layout */}
      <div className="grid md:grid-cols-[1fr,240px] gap-4">
        {/* Carousels Column */}
        <div className="flex flex-col pt-4 gap-8 overflow-hidden">
          <div className="md:hidden w-full">
            <div className="flex items-center gap-2 px-2 mb-4">
              <Typography
                variant="h5"
                className="text-lg font-semibold text-main"
              >
                Upcoming Events
              </Typography>
              <div className="flex-1 h-[1px] bg-gradient-to-r from-main/20 to-transparent"></div>
            </div>
            <CarouselSection items={events} type="events" />
          </div>

          {/* News Carousel */}
          <div className="w-full">
            <div className="flex items-center gap-2 px-2 mb-4">
              <Typography
                variant="h5"
                className="text-lg font-semibold text-main"
              >
                Latest News
              </Typography>
              <div className="flex-1 h-[1px] bg-gradient-to-r from-main/20 to-transparent"></div>
            </div>
            <CarouselSection items={news} type="news" />
          </div>

          {/* Places Carousel */}
          <div className="w-full">
            <div className="flex items-center gap-2 px-2 mb-4">
              <Typography
                variant="h5"
                className="text-lg font-semibold text-main"
              >
                Featured Places
              </Typography>
              <div className="flex-1 h-[1px] bg-gradient-to-r from-main/20 to-transparent"></div>
            </div>
            <CarouselSection items={places} type="places" />
          </div>

          {/* Services Carousel */}
          <div className="w-full">
            <div className="flex items-center gap-2 px-2 mb-4">
              <Typography
                variant="h5"
                className="text-lg font-semibold text-main"
              >
                Popular Services
              </Typography>
              <div className="flex-1 h-[1px] bg-gradient-to-r from-main/20 to-transparent"></div>
            </div>
            <CarouselSection items={services} type="services" />
          </div>
        </div>

        {/* Events Column */}
        <div className="hidden md:flex flex-col gap-6 pl-4 border-l border-gray-200 h-[calc(100vh-2rem)] max-h-[1200px] sticky top-8">
          <div className="flex items-center gap-2 pt-4">
            <Typography
              variant="h5"
              className="text-lg font-semibold text-main"
            >
              Upcoming Events
            </Typography>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-main/20 to-transparent"></div>
          </div>
          <div
            className="flex flex-col gap-4 overflow-y-auto pr-4 -mt-2"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#ff7003 transparent",
            }}
          >
            {events.map((event, index) => (
              <div key={index} className="w-full">
                <BaseCard
                  title={event.title}
                  image={event.picture}
                  content={event.content}
                  date={event.createdAt || event.date}
                  extraContent={
                    <div className="flex items-center gap-1 mb-1">
                      <LocationOnIcon
                        fontSize="small"
                        color="action"
                        className="!w-4 !h-4"
                      />
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        className="line-clamp-1 text-xs"
                      >
                        {event.location}
                      </Typography>
                    </div>
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
