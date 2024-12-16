import ArticleTemplete from "@templates/ArticleTemplete";
import getArticle from "@/utils/getArticle";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const article = await getArticle(`/events/${params.id}`);

  if (!article) {
    notFound();
  }

  const metaDescription =
    article.content
      .replace(/<[^>]*>/g, "")
      .substring(0, 155)
      .trim() + "...";

  const eventDate = new Date(article.eventDate).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const keywords = [
    article.title,
    "Sarajevo events",
    "events in Sarajevo",
    article.category,
    "expat events",
    "community events",
    article.location,
    ...(article.tags || []),
  ]
    .filter(Boolean)
    .join(", ");

  const publishDate = new Date(article.createdAt).toISOString();
  const modifyDate = article.updatedAt
    ? new Date(article.updatedAt).toISOString()
    : publishDate;

  return {
    metadataBase: new URL("https://sarajevoexpats.com"),
    title: `${article.title} | Events in Sarajevo | Sarajevo Expats`,
    description: `Join us for ${article.title} on ${eventDate} at ${article.location}. ${metaDescription}`,
    keywords: keywords,
    openGraph: {
      title: article.title,
      description: `Join us for ${article.title} on ${eventDate} at ${article.location}. ${metaDescription}`,
      images: [
        {
          url: article.picture,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      type: "event",
      locale: "en_US",
      siteName: "Sarajevo Expats",
      publishedTime: publishDate,
      modifiedTime: modifyDate,
      section: "Events",
      authors: ["Sarajevo Expats"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} | Event in Sarajevo`,
      description: `Join us on ${eventDate} at ${article.location}. ${metaDescription}`,
      images: [article.picture],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: `https://sarajevoexpats.com/events/${params.id}`,
    },
  };
}

const Page = async ({ params }) => {
  const article = await getArticle(`/events/${params.id}`);

  return <ArticleTemplete article={article} contentType="Event" />;
};

export default Page;
