import ArticleTemplate from "@templates/ArticleTemplate";
import getArticle from "@/utils/getArticle";

export async function generateMetadata({ params }) {
  const article = await getArticle(`/events/${params.id}`);

  if (!article) {
    return null;
  }

  const metaDescription =
    article.content
      .replace(/<[^>]*>/g, "")
      .substring(0, 155)
      .trim() + "...";

  const keywords = [article.title, "Sarajevo", "events", "expats"]
    .filter(Boolean)
    .join(", ");

  return {
    metadataBase: new URL("https://sarajevoexpats.com"),
    title: `${article.title} | Events | Sarajevo Expats`,
    description: metaDescription,
    keywords: keywords,
    openGraph: {
      title: article.title,
      description: metaDescription,
      images: [
        {
          url: article.picture,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      type: "article",
      locale: "en_US",
      siteName: "Sarajevo Expats",
      publishedTime: article.createdAt,
      modifiedTime: article.updatedAt,
      section: "Events",
    },
  };
}

const Page = async ({ params }) => {
  return <ArticleTemplate url={`/events/${params.id}`} contentType="Event" />;
};

export default Page;
