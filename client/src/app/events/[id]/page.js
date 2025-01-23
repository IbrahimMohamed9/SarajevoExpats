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

  // Get first line of content as title if no title exists
  const contentTitle = article.content
    .replace(/<[^>]*>/g, "")
    .split("\n")[0]
    .substring(0, 60)
    .trim();

  const title = contentTitle || "Event";
  const keywords = ["Sarajevo", "events", "expats"].filter(Boolean).join(", ");

  // Handle images from childPosts
  const images = article.childPosts?.map((post) => ({
    url: post.displayUrl,
    width: 1200,
    height: 630,
    alt: post.alt || title,
  })) || [];

  return {
    metadataBase: new URL("https://sarajevoexpats.com"),
    title: `${title} | Events | Sarajevo Expats`,
    description: metaDescription,
    keywords: keywords,
    openGraph: {
      title: title,
      description: metaDescription,
      images: images.length > 0 ? images : undefined,
    },
  };
}

const Page = async ({ params }) => {
  return <ArticleTemplate url={`/events/${params.id}`} contentType="Event" />;
};

export default Page;
