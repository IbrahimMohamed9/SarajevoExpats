import SafeHtml from "@atoms/SafeHtml";

const ArticleContent = ({ content }) => (
  <div className="prose prose-lg max-w-none animate-fade-in">
    {content.split("\\n").map((paragraph, index) => (
      <p
        key={index}
        className="mb-6 text-xl leading-relaxed text-gray-900 first-letter:text-4xl 
          first-letter:font-bold first-letter:text-main"
      >
        <SafeHtml content={paragraph} />
      </p>
    ))}
  </div>
);

export default ArticleContent;
