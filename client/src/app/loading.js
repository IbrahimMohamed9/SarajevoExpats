const CarouselSkeleton = () => (
  <div className="animate-pulse space-y-4 w-full">
    <div className="flex items-center justify-between">
      <div className="h-8 w-48 bg-main/10 rounded-lg" />
      <div className="h-8 w-24 bg-main/10 rounded-lg" />
    </div>
    <div className="flex gap-4 overflow-hidden">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="min-w-[240px] h-80 bg-main/10 rounded-lg flex-shrink-0"
        />
      ))}
    </div>
  </div>
);

const EventCardSkeleton = () => (
  <div className="animate-pulse w-48 h-80 bg-main/10 rounded-lg" />
);

const LoadingHome = () => (
  <div className="grid md:grid-cols-[1fr,240px] gap-4 overflow-hidden">
    <div className="flex flex-col pt-4 gap-8">
      {[...Array(4)].map((_, i) => (
        <CarouselSkeleton key={i} />
      ))}
    </div>
    <div className="hidden md:flex flex-col gap-6 border-l border-gray-200 h-[calc(100vh-2rem)] max-h-[1200px] sticky top-16">
      <div className="h-8 w-48 bg-main/10 rounded-lg" />
      <div className="flex flex-col items-center gap-4">
        {[...Array(3)].map((_, i) => (
          <EventCardSkeleton key={i} />
        ))}
      </div>
    </div>
  </div>
);

export default LoadingHome;
