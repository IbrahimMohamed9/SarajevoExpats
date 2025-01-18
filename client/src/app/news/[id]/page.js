import ArticleTemplete from "@templates/ArticleTemplete";
import getArticle from "@/utils/getArticle";

export async function generateMetadata({ params }) {
  const article = await getArticle(`/news/${params.id}`);

  if (!article) {
    return null;
  }

  const metaDescription =
    article.content
      .replace(/<[^>]*>/g, "")
      .substring(0, 155)
      .trim() + "...";

  const keywords = [
    article.title,
    "Sarajevo",
    "news",
    "expats",
  ]
    .filter(Boolean)
    .join(", ");

  return {
    metadataBase: new URL("https://sarajevoexpats.com"),
    title: `${article.title} | News | Sarajevo Expats`,
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
      section: "News",
    },
  };
}

const Page = async ({ params }) => {
  return <ArticleTemplete url={`/news/${params.id}`} contentType="News" />;
};

export default Page;
