"use client";

import { Suspense } from "react";
import ArticleHeader from "@atoms/ArticleHeader";
import ArticleImage from "@atoms/ArticleImage";
import ArticleContent from "@atoms/ArticleContent";
import ContactInfo from "@atoms/ContactInfo";

const LoadingSkeleton = () => (
  <div className="animate-pulse space-y-8">
    {/* Header Skeleton */}
    <div className="text-center space-y-4">
      <div className="h-8 w-32 bg-main/10 rounded-full mx-auto" />
      <div className="h-12 w-3/4 bg-main/10 rounded-lg mx-auto" />
      <div className="flex items-center justify-center gap-2">
        <div className="h-6 w-6 bg-main/10 rounded-full" />
        <div className="h-6 w-48 bg-main/10 rounded-lg" />
      </div>
    </div>

    {/* Image Skeleton */}
    <div className="w-full h-[500px] bg-main/10 rounded-xl" />

    {/* Content Skeleton */}
    <div className="space-y-4">
      <div className="h-6 w-full bg-main/10 rounded-lg" />
      <div className="h-6 w-5/6 bg-main/10 rounded-lg" />
      <div className="h-6 w-4/6 bg-main/10 rounded-lg" />
    </div>

    {/* Contact Info Skeleton */}
    <div className="mt-16 p-8 bg-main/5 rounded-2xl space-y-4">
      <div className="h-8 w-48 bg-main/10 rounded-lg" />
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-4 bg-white/80 rounded-lg"
          >
            <div className="h-10 w-10 bg-main/10 rounded-full" />
            <div className="space-y-2">
              <div className="h-4 w-16 bg-main/10 rounded" />
              <div className="h-6 w-32 bg-main/10 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ArticleTemplete = ({ article, isLoading }) => {
  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 py-12">
          <article className="max-w-4xl mx-auto">
            <LoadingSkeleton />
          </article>
        </div>
      </main>
    );
  }

  if (!article) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center animate-fade-in">
        <div className="text-center space-y-4 p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
          <svg
            className="w-16 h-16 text-gray-400 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h1 className="text-3xl font-bold text-gray-800">
            Service Not Found
          </h1>
          <p className="text-gray-600 max-w-md">
            The service you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  const title = article.name || article.title;
  const type = article.type || article.serviceSubtype;

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-12">
        <article className="max-w-4xl mx-auto">
          <Suspense fallback={<LoadingSkeleton />}>
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
          </Suspense>
        </article>
      </div>
    </main>
  );
};

export default ArticleTemplete;
