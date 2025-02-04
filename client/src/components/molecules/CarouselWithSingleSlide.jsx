"use client";

import { Swiper } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

const CarouselWithSingleSlide = ({ children }) => {
  return (
    <div className="carousel-container relative">
      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: #ff7003 !important;
        }
        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          color: #e55400 !important;
        }
      `}</style>
      <Swiper
        modules={[Navigation, Autoplay]}
        slidesPerView={1}
        navigation
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        className="w-full"
      >
        {children}
      </Swiper>
    </div>
  );
};

export default CarouselWithSingleSlide;
