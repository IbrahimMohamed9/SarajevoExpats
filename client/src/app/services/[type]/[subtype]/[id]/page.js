import ArticleTemplete from "@templates/ArticleTemplete";
import { notFound } from "next/navigation";
import getArticle from "@/utils/getArticle";

export async function generateMetadata({ params }) {
  const article = await getArticle(`/services/${params.id}`);

  if (!article) {
    notFound();
  }

  const metaDescription =
    article.content
      .replace(/<[^>]*>/g, "") // Remove HTML tags
      .substring(0, 155) // Get first 155 characters
      .trim() + "..."; // Add ellipsis

  const keywords = [
    article.name,
    article.serviceType,
    article.serviceSubtype,
    "Sarajevo",
    "services",
    "expats",
  ]
    .filter(Boolean)
    .join(", ");

  return {
    metadataBase: new URL("https://sarajevoexpats.com"),
    title: `${article.name} | ${article.serviceType} Services | Sarajevo Expats`,
    description: metaDescription,
    keywords: keywords,
    openGraph: {
      title: article.name,
      description: metaDescription,
      images: [
        {
          url: article.picture,
          width: 1200,
          height: 630,
          alt: article.name,
        },
      ],
      type: "article",
      locale: "en_US",
      siteName: "Sarajevo Expats",
      publishedTime: article.createdAt,
      modifiedTime: article.updatedAt,
      section: "Services",
    },
  };
}

const Page = async ({ params }) => {
  const article = await getArticle(`/services/${params.id}`);

  if (!article) {
    notFound();
  }

  return <ArticleTemplete article={article} contentType="Service" />;
};

export default Page;
