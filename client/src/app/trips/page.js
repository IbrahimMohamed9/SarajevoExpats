import CardsTemplate from "@templates/CardsTemplate";
import axiosInstance from "@/config/axios";

export const metadata = {
  metadataBase: new URL("https://sarajevoexpats.com"),
  title: "Latest Tours from Sarajevo | Updates & Stories | Sarajevo Expats",
  description:
    "Stay informed with the latest news, updates, and stories from Sarajevo. Get insights into local events, community updates, and important developments affecting expat life in Bosnia's capital city.",
  keywords:
    "Sarajevo news, Sarajevo updates, expat news Sarajevo, local news Bosnia, Sarajevo events news, community updates Sarajevo, latest happenings Sarajevo, Sarajevo current events",
  openGraph: {
    title: "Latest Tours from Sarajevo | Updates & Stories",
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
  try {
    const response = await axiosInstance.get("/trips");
    const trips = response.data;

    return (
      <div className="max-w-7xl mx-auto px-4">
        <CardsTemplate data={trips} pageType="tours" type="tours" />
      </div>
    );
  } catch (error) {
    console.error("Error fetching trips:", error);

    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Unable to load trips</h2>
        <p className="text-gray-600 mb-6">
          {error.response?.status === 404
            ? "No trips found. New trips will be added soon!"
            : "There was an error loading the trips. Please try again later."}
        </p>
        <a href="/" className="text-blue-600 hover:text-blue-800 underline">
          Return to homepage
        </a>
      </div>
    );
  }
};

export default Trips;
