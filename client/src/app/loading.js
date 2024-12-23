import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h2 className="text-center text-main text-2xl">Loading...</h2>
      <p className="text-center">
        This might take a moment. Please don't refresh the page.
      </p>
    </div>
  );
};

export default Loading;
