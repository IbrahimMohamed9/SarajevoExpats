import ArticleTemplate from "@templates/ArticleTemplate";
import getArticle from "@/utils/getArticle";

export async function generateMetadata({ params }) {
  const trip = await getArticle(`/trips/${params.id}`);

  if (!trip) {
    return null;
  }

  const metaDescription = trip.content
    ? trip.content
        .replace(/<[^>]*>/g, "")
        .substring(0, 155)
        .trim() + "..."
    : "Explore this exciting trip in Sarajevo and surrounding areas.";

  const keywords = [trip.title, "Sarajevo", "trips", "travel", "expats"]
    .filter(Boolean)
    .join(", ");

  return {
    metadataBase: new URL("https://sarajevoexpats.com"),
    title: `${trip.title} | Trips | Sarajevo Expats`,
    description: metaDescription,
    keywords: keywords,
    openGraph: {
      title: trip.title,
      description: metaDescription,
      images: [
        {
          url: trip.pictures?.[0] || "/images/og-image.jpg",
          width: 1200,
          height: 630,
          alt: trip.title,
        },
      ],
      locale: "en_US",
      type: "article",
    },
  };
}

const TripDetail = async ({ params }) => {
  return <ArticleTemplate url={`/trips/${params.id}`} contentType="Trip" />;
};

export default TripDetail;
