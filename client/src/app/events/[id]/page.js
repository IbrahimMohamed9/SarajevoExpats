import axiosInstance from "@/config/axios";
import ArticleTemplete from "@templates/ArticleTemplete";

export async function generateMetadata({ params }) {
  const article = await getArticle(params.id);

  if (!article) {
    return {
      title: "Service Not Found",
      description: "The requested service could not be found.",
    };
  }

  return {
    title: `${article.name} | Sarajevo Expats`,
    description: article.content.substring(0, 160),
    openGraph: {
      title: article.name,
      description: article.content.substring(0, 160),
      images: [article.picture],
      type: "article",
      locale: "en_US",
    },
  };
}

async function getArticle(id) {
  try {
    const response = await axiosInstance.get(`/events/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
}

const Page = async ({ params }) => {
  const article = await getArticle(params.id);

  return <ArticleTemplete article={article} contentType="Event" />;
};

export default Page;
