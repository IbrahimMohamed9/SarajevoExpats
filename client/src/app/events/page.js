import CardsTemplate from "@templates/CardsTemplate";

export const metadata = {
  metadataBase: new URL("https://sarajevoexpats.com"),
  title:
    "Events in Sarajevo | Upcoming Activities & Gatherings | Sarajevo Expats",
  description:
    "Discover upcoming events, activities, and gatherings in Sarajevo. Stay updated with local festivals, cultural events, expat meetups, and community activities. Find the perfect events to explore and connect in Bosnia's capital.",
  keywords:
    "Sarajevo events, upcoming events Sarajevo, Sarajevo festivals, cultural events Sarajevo, expat meetups Sarajevo, things to do Sarajevo, Sarajevo activities, community events Sarajevo, local events Bosnia",
  openGraph: {
    title: "Events in Sarajevo | Upcoming Activities & Gatherings",
    description:
      "Discover upcoming events, activities, and gatherings in Sarajevo. Stay updated with local festivals, cultural events, expat meetups, and community activities.",
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
    canonical: "https://sarajevoexpats.com/events",
  },
};

const Events = () => {
  return <CardsTemplate pageType="event" url="/events" type="events" />;
};

export default Events;
