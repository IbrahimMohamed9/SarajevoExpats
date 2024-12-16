import ArticleTemplete from "@templates/ArticleTemplete";
import getArticle from "@/utils/getArticle";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const article = await getArticle(`/news/${params.id}`);

  if (!article) {
    notFound();
  }

  const metaDescription =
    article.content
      .replace(/<[^>]*>/g, "") // Remove HTML tags
      .substring(0, 155) // Get first 155 characters
      .trim() + "..."; // Add ellipsis

  const keywords = [
    article.title,
    "Sarajevo news",
    "expat news",
    "Sarajevo updates",
  ]
    .filter(Boolean)
    .join(", ");

  const publishDate = new Date(article.createdAt).toISOString();
  const modifyDate = article.updatedAt
    ? new Date(article.updatedAt).toISOString()
    : publishDate;

  return {
    metadataBase: new URL("https://sarajevoexpats.com"),
    title: `${article.title} | Sarajevo Expats News`,
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
      publishedTime: publishDate,
      modifiedTime: modifyDate,
      section: "News",
      authors: ["Sarajevo Expats"],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: metaDescription,
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
      canonical: `https://sarajevoexpats.com/news/${params.id}`,
    },
  };
}

const Page = async ({ params }) => {
  const article = await getArticle(`/news/${params.id}`);

  return <ArticleTemplete article={article} contentType="News" />;
};

export default Page;
