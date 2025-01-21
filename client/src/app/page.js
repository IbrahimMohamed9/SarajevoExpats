import BaseCard from "@organisms/BaseCard";
import axiosInstance from "@/config/axios";
import HomeTemplate from "@templates/HomeTemplate";

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
    <HomeTemplate
      news={news}
      places={places}
      services={services}
      events={events}
      eventsColumnElements={eventsColumnElements}
    />
  );
};

export default Home;
