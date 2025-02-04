import BaseCard from "@organisms/BaseCard";
import axiosInstance from "@/config/axios";
import HomeTemplate from "@templates/HomeTemplate";
import { Suspense } from "react";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

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

async function getData() {
  try {
    const [newsRes, placesRes, servicesRes, eventsRes, slidesRes] =
      await Promise.all([
        axiosInstance.get("/news"),
        axiosInstance.get("/places"),
        axiosInstance.get("/services"),
        axiosInstance.get("/events"),
        axiosInstance.get("/news/slides"),
      ]);

    return {
      news: newsRes.data,
      places: placesRes.data,
      services: servicesRes.data,
      events: eventsRes.data,
      slides: slidesRes.data,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      news: [],
      places: [],
      services: [],
      events: [],
      slides: [],
    };
  }
}

const Home = async () => {
  const data = await getData();

  const eventsColumnElements = data.events.map((event, index) => (
    <div key={index} className=" w-full">
      <BaseCard item={event} type="events" className="!w-11/12 mx-auto" />
    </div>
  ));

  return (
    <HomeTemplate
      news={data.news}
      places={data.places}
      services={data.services}
      events={data.events}
      newsSlides={data.slides}
      eventsColumnElements={eventsColumnElements}
    />
  );
};

export default Home;
