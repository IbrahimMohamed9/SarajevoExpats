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
      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: white !important;
          width: 30px !important;
          height: 30px !important;
          background: #ff7003 !important;
          border-radius: 50% !important;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
        }
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 18px !important;
          font-weight: 900 !important;
        }
        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: #e55400 !important;
        }
        .swiper-pagination {
          margin-top: 15px !important;
        }
        .swiper-pagination-bullet {
          width: 16px !important;
          height: 16px !important;
          text-align: center !important;
          line-height: 16px !important;
          font-size: 10px !important;
          color: white !important;
          opacity: 1 !important;
          background: rgba(255, 112, 3, 0.5) !important;
          border-radius: 50% !important;
          margin: 0 4px !important;
        }
        .swiper-pagination-bullet-active {
          background: #ff7003 !important;
        }
      `}</style>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        navigation
        pagination={{ 
          clickable: true,
          renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
          }
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
