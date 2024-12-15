"use client";

import { Typography } from "@mui/material";
import Carousel from "@atoms/Carousel";
import BaseCard from "@atoms/BaseCard";
import { SplideSlide } from "@splidejs/react-splide";
import SectionHeder from "@atoms/SectionHeder";

const CarouselSection = ({ items = [], type, title }) => {
  const validatedItems = items.filter(
    (item) => item && typeof item === "object"
  );

  let carouselElements;
  if (validatedItems.length > 0) {
    carouselElements = validatedItems.map((item) => (
      <SplideSlide key={item._id}>
        <BaseCard type={type} item={item} />
      </SplideSlide>
    ));

    carouselElements = <Carousel>{carouselElements}</Carousel>;
  } else
    carouselElements = (
      <div className="py-4 m-4 bg-gray-300 rounded-lg">
        <Typography variant="body2" color="text.secondary" align="center">
          No items to display
        </Typography>
      </div>
    );

  return (
    <div className="w-full">
      <SectionHeder title={title} />
      <div className="mt-4">{carouselElements}</div>
    </div>
  );
};

export default CarouselSection;
