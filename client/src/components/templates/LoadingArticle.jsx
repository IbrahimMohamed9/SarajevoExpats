const LoadingArticle = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-12">
        <article className="max-w-4xl mx-auto">
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
        </article>
      </div>
    </main>
  );
};

export default LoadingArticle;
