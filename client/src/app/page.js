import CarouselSection from "@molecules/CarouselSection";
import BaseCard from "@organisms/BaseCard";
import SectionHeder from "@atoms/SectionHeder";
import axiosInstance from "@/config/axios";
import LatestNewsLayout from "@molecules/LatestNewsLayout";
import AdBanner from "@atoms/AdBanner";

export const metadata = {
  metadataBase: new URL("https://sarajevoexpats.com"),
  title: "Sarajevo Expats | Your Guide to Life in Sarajevo",
  description:
    "Your ultimate expat community platform in Sarajevo. Connect with local services, discover upcoming events, stay updated with news, and explore the best places. Join our community for authentic experiences and practical resources for living in Sarajevo.",
  keywords:
    "Sarajevo expats community, expat life Sarajevo, Sarajevo events, local services Sarajevo, Sarajevo city guide, living in Bosnia, Sarajevo news, Sarajevo places to visit",
  openGraph: {
    title: "Sarajevo Expats | Your Guide to Life in Sarajevo",
    description:
      "Your ultimate expat community platform in Sarajevo. Connect with local services, discover upcoming events, stay updated with news, and explore the best places.",
    type: "website",
    locale: "en_US",
    siteName: "Sarajevo Expats",
  },
};

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
    <div key={index} className=" w-full">
      <BaseCard item={event} type="events" className="!w-11/12 mx-auto" />
    </div>
  ));

  return (
    <>
      <div className="bg-gray-50">
        <AdBanner slot="1234567890" format="auto" responsive={true} />
      </div>

      <div className="grid md:grid-cols-[1fr,340px] gap-4  max-w-7xl mx-auto">
        <div className="flex flex-col pt-4 gap-8 overflow-hidden -mt-11">
          {news[0] && <LatestNewsLayout latestNews={news[news.length - 1]} />}
          <div className="md:hidden">
            <CarouselSection
              items={events}
              type="events"
              title="Upcoming Events"
            />
          </div>
          <CarouselSection items={news} type="news" title="Latest News" />
          <CarouselSection
            items={places}
            type="places"
            title="Featured Places"
          />
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
            {eventsColumnElements}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
