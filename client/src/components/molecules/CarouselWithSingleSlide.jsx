"use client";

import { Swiper } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const CarouselWithSingleSlide = ({ children }) => {
  return (
    <div className="carousel-container relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        navigation
        speed={700}
        pagination={{
          clickable: true,
          renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + "</span>";
          },
        }}
        loop={true}
        autoplay={{
          delay: 8000,
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
