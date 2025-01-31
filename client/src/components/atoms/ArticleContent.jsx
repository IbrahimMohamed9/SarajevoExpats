import dynamic from "next/dynamic";
const SafeHtml = dynamic(() => import("@atoms/SafeHtml"), { ssr: false });

const ArticleContent = ({ content }) => (
  <div className="prose prose-lg max-w-none animate-fade-in">
    {content.split("\\n").map((paragraph, index) => (
      <SafeHtml
        content={paragraph}
        className="mb-6 text-xl leading-relaxed text-gray-900 first-letter:text-4xl first-letter:font-bold first-letter:text-main [&>*]:block [&>*]:overflow-hidden [&>*]:text-ellipsis"
        key={index}
        as="p"
      />
    ))}
  </div>
);

export default ArticleContent;
