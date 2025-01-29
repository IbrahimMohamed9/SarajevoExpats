"use client";

import { Typography } from "@mui/material";
import CustomCarousel from "@atoms/CustomCarousel";
import BaseCard from "@organisms/BaseCard";
import SectionHeder from "@atoms/SectionHeder";

const CarouselSection = ({ items = [], type, title, titleImage }) => {
  // Ensure items is an array before filtering
  const itemsArray = Array.isArray(items) ? items : [];
  const validatedItems = itemsArray.filter(
    (item) => item && typeof item === "object"
  );

  let carouselElements;
  if (validatedItems.length > 0) {
    carouselElements = validatedItems.map((item) => (
      <BaseCard key={item._id} type={type} item={item} />
    ));

    carouselElements = <CustomCarousel>{carouselElements}</CustomCarousel>;
  } else {
    carouselElements = (
      <div className="py-4 m-4 bg-gray-300 rounded-lg">
        <Typography variant="body2" color="text.secondary" align="center">
          No items to display
        </Typography>
      </div>
    );
  }

  return (
    <div className="w-full">
      <SectionHeder title={title} src={titleImage} />
      <div className="mt-4">{carouselElements}</div>
    </div>
  );
};

export default CarouselSection;
