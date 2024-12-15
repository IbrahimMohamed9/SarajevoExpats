const CardSkeleton = () => (
  <div className="w-72 h-80 bg-main/10 rounded-lg animate-pulse m-4" />
);

const LoadingCards = () => {
  return (
    <div className="flex flex-wrap justify-center py-5">
      {[...Array(8)].map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
};

export default LoadingCards;
