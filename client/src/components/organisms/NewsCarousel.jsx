"use client";

import SingleNewsLayout from "@molecules/SingleNewsLayout";
import CarouselWithSingleSlide from "@molecules/CarouselWithSingleSlide";
import { SwiperSlide } from "swiper/react";

const NewsCarousel = ({ slides }) => {
  const slidesElements = slides.map((slide, index) => (
    <SwiperSlide key={index}>
      <SingleNewsLayout latestNews={slide} />
    </SwiperSlide>
  ));
  return <CarouselWithSingleSlide>{slidesElements}</CarouselWithSingleSlide>;
};

export default NewsCarousel;
