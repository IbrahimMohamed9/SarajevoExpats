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
  const [firstLoading, setFirstLoading] = useState(true);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [mediaType, setMediaType] = useState("image");

  useEffect(() => {
    const init = async () => {
      const currentArticle = await getArticle(url);

      setLoading(false);
      setArticle(currentArticle);
      setFirstLoading(false);

      // Set initial selected media
      const initialMedia =
        currentArticle.picture ||
        currentArticle.images?.[0] ||
        currentArticle.videos?.[0];
      setSelectedMedia(initialMedia);
      if (
        currentArticle?.images?.length > 0 ||
        currentArticle?.videos?.length > 0
      ) {
        setMediaType(initialMedia?.includes(".mp4") ? "video" : "image");
      }
    };

    init();
  }, [url]);

  const isLoading = loading || firstLoading;
  if (isLoading) return <LoadingArticle />;

  const displayError = !article && !loading && !firstLoading;
  if (displayError)
    return (
      <ErrorDisplay
        title={`${contentType} Not Found`}
        message={`The ${contentType.toLowerCase()} you are looking for does not exist.`}
      />
    );

  const title = article.name || article.title;
  const type = article.type || article.serviceSubtype;
  const date = article.createdAt || article.date;

  const contentTitle = article.content
    .replace(/<[^>]*>/g, "")
    .split("\n")[0]
    .substring(0, 60)
    .trim();
  const imageAlt =
    article.pictureDescription || article.title || contentTitle || contentType;

  const isEvent = contentType.toLowerCase() === "event";
  const hasMultipleMedia =
    isEvent &&
    ((article.images && article.images.length > 0) ||
      (article.videos && article.videos.length > 0));

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-12">
        <article className="max-w-4xl mx-auto">
          <ArticleHeader title={title} date={date} type={type} />
          <ArticleMedia
            src={selectedMedia || article.picture}
            alt={imageAlt}
            description={article.pictureDescription}
            type={mediaType}
          />
          {(article?.images?.length > 1 || article?.videos?.length > 0) && (
            <ImageGallery
              images={article.images || []}
              videos={article.videos || []}
              imageAlt={imageAlt}
              selectedMedia={selectedMedia}
              onMediaSelect={(media) => {
                setSelectedMedia(media);
                setMediaType(media.includes("blob") ? "video" : "image");
              }}
            />
          )}
          <ArticleContent content={article.content} />
          <ContactInfo
            phone={article.phone}
            email={article.email}
            location={!isEvent ? article.link : null}
            instagramLink={isEvent ? article.url : null}
          />
        </article>
      </div>
    </main>
  );
};

export default ArticleTemplate;
