import ArticleHeader from "@atoms/ArticleHeader";
import ArticleImage from "@atoms/ArticleImage";
import ArticleContent from "@atoms/ArticleContent";
import ContactInfo from "@atoms/ContactInfo";
import ErrorDisplay from "@molecules/ErrorDisplay";

const ArticleTemplete = ({ article, contentType }) => {
  if (!article) {
    return (
      <ErrorDisplay
        title={`${contentType} Not Found`}
        message={`The ${contentType.toLowerCase()} you're looking for doesn't exist or has been removed.`}
      />
    );
  }

  const title = article.name || article.title;
  const type = article.type || article.serviceSubtype;

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-12">
        <article className="max-w-4xl mx-auto">
          <ArticleHeader title={title} date={article.createdAt} type={type} />
          <ArticleImage
            src={article.picture}
            alt={article.pictureDescription || title}
            description={article.pictureDescription}
          />
          <ArticleContent content={article.content} />
          <ContactInfo
            phone={article.phone}
            email={article.email}
            location={article.link}
          />
        </article>
      </div>
    </main>
  );
};

export default ArticleTemplete;
