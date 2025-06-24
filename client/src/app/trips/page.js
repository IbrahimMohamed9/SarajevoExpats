import CardsTemplate from "@templates/CardsTemplate";
import axiosInstance from "@/config/axios";

export const metadata = {
  metadataBase: new URL("https://sarajevoexpats.com"),
  title: "Latest Trips from Sarajevo | Updates & Stories | Sarajevo Expats",
  description:
    "Stay informed with the latest news, updates, and stories from Sarajevo. Get insights into local events, community updates, and important developments affecting expat life in Bosnia's capital city.",
  keywords:
    "Sarajevo news, Sarajevo updates, expat news Sarajevo, local news Bosnia, Sarajevo events news, community updates Sarajevo, latest happenings Sarajevo, Sarajevo current events",
  openGraph: {
    title: "Latest Trips from Sarajevo | Updates & Stories",
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
    canonical: "https://sarajevoexpats.com/trips",
  },
};

const Trips = async () => {
  const response = await axiosInstance.get("/trips");
  const trips = response.data;

  return (
    <div className="max-w-7xl mx-auto px-4">
      <CardsTemplate data={trips} pageType="trips" type="trips" />
    </div>
  );
};

export default Trips;
