"use client";

const CardSkeleton = () => (
  <div className="w-full sm:w-[500px] h-40 bg-white rounded-lg shadow-md m-2">
    <div className="grid grid-cols-[128px_1fr] min-[430px]:grid-cols-[160px_1fr] h-full">
      <div className="bg-main/10 rounded-l-lg animate-pulse" />
      <div className="p-3 flex flex-col gap-2">
        <div className="h-6 bg-main/10 rounded animate-pulse w-3/4" />
        <div className="h-4 bg-main/10 rounded animate-pulse w-full mt-1" />
        <div className="h-4 bg-main/10 rounded animate-pulse w-5/6" />
      </div>
    </div>
  </div>
);

const LoadingCards = () => {
  return (
    <div className="flex flex-col items-center gap-4 py-5">
      {[...Array(8)].map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
};

export default LoadingCards;
