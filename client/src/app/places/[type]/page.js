import CardsTemplate from "@templates/CardsTemplate";

export const metadata = {
  metadataBase: new URL("https://sarajevoexpats.com"),
  title:
    "Explore Places in Sarajevo | Best Locations & Hidden Gems | Sarajevo Expats",
  description:
    "Discover Sarajevo's most captivating places - from the historic Old Town and cultural landmarks to trendy cafes, local restaurants, and vibrant entertainment spots. Get authentic recommendations from expats and uncover hidden gems in Bosnia's capital.",
  keywords:
    "Sarajevo places to visit, Old Town Sarajevo, Baščaršija, Sarajevo attractions, Sarajevo landmarks, Sarajevo restaurants, Sarajevo cafes, Sarajevo nightlife, tourist spots Sarajevo, things to do Sarajevo, Sarajevo sightseeing, best places Sarajevo",
  openGraph: {
    title: "Discover Places in Sarajevo | Best Locations & Hidden Gems",
    description:
      "Explore Sarajevo's most captivating places - from the historic Old Town and cultural landmarks to trendy cafes, local restaurants, and vibrant entertainment spots. Get authentic recommendations from expats.",
    type: "website",
    locale: "en_US",
    siteName: "Sarajevo Expats",
  },
};

const Page = async ({ params }) => {
  const { type } = params;
  return (
    <CardsTemplate
      pageType={"place"}
      url={`/places/by-place-type/${type}`}
      type={decodeURIComponent(type)}
    />
  );
};

export default Page;
