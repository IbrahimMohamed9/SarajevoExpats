"use client";

import ArticleHeader from "@atoms/ArticleHeader";
import ArticleMedia from "@atoms/ArticleMedia";
import ArticleContent from "@atoms/ArticleContent";
import ContactInfo from "@atoms/ContactInfo";
import ErrorDisplay from "@molecules/ErrorDisplay";
import LoadingArticle from "@templates/LoadingArticle";
import getArticle from "@/utils/getArticle";
import { useRecoilState } from "recoil";
import { loadingAtom } from "@/store/atoms/loadingAtom";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const ImageGallery = dynamic(() => import("@molecules/ImageGallery"), {
  ssr: false,
});

const ArticleTemplate = ({ contentType, url }) => {
  const [loading, setLoading] = useRecoilState(loadingAtom);
  const [article, setArticle] = useState();
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [firstLoad, setFirstLoad] = useState(true);
  const containsImages =
    article?.childPosts?.length > 1 || article?.pictures?.length > 1;
  const images = article?.childPosts || article?.pictures;

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      const currentArticle = await getArticle(url);

      setLoading(false);
      setFirstLoad(false);
      setArticle(currentArticle);

      // Set initial selected media
      const containsChildPosts = currentArticle?.childPosts?.length > 0;
      const containsPicture =
        currentArticle?.pictures?.length > 0 || currentArticle?.displayUrl;
      if (containsChildPosts) {
        setSelectedMedia(currentArticle.childPosts[0]);
      } else if (containsPicture) {
        setSelectedMedia(
          currentArticle?.pictures[0] || currentArticle?.displayUrl
        );
      }
    };

    init();
  }, [url, setLoading]);

  if (loading || firstLoad) return <LoadingArticle />;

  const displayError = !article && !loading;
  if (displayError)
    return (
      <ErrorDisplay
        title={`${contentType} Not Found`}
        message={`The ${contentType.toLowerCase()} you are looking for does not exist.`}
      />
    );

  const title = article.name || article.title;
  const type = article.type || article.serviceType;
  const date = article.createdAt || article.date;

  const contentTitle = article.content
    ? article.content
        .replace(/<[^>]*>/g, "")
        .split("\n")[0]
        .substring(0, 60)
        .trim()
    : "";
  const imageAlt =
    article.pictureDescription || article.title || contentTitle || contentType;

  const isEvent = contentType.toLowerCase() === "event";

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-12">
        <article className="max-w-4xl mx-auto">
          <ArticleHeader
            title={title}
            date={date}
            type={type}
            contentType={contentType}
          />
          {selectedMedia && (
            <ArticleMedia
              src={selectedMedia}
              alt={imageAlt}
              description={article.pictureDescription}
            />
          )}
          {containsImages && (
            <ImageGallery
              childPosts={images}
              selectedMedia={selectedMedia}
              onClick={setSelectedMedia}
            />
          )}
          <ArticleContent content={article.content} />
          <ContactInfo
            phone={article.phone}
            email={article.email}
            location={!isEvent ? article.link : null}
            instagramLink={isEvent ? article.url : null}
            website={article.website}
          />
        </article>
      </div>
    </main>
  );
};

export default ArticleTemplate;
