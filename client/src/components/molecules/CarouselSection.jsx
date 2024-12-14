"use client";

import { Typography } from "@mui/material";
import Carousel from "../atoms/Carousel";
import BaseCard from "../atoms/BaseCard";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LinkIcon from "@mui/icons-material/Link";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const CarouselSection = ({ items = [], type }) => {
  const validateItems = (items) => {
    if (!Array.isArray(items)) return [];
    return items.filter((item) => item && typeof item === "object");
  };

  const validatedItems = validateItems(items);

  const renderCard = (item) => {
    if (!item) return null;

    const commonProps = {
      title: item.title,
      image: item.picture,
      content: item.content,
      date: item.createdAt || item.date,
    };

    switch (type) {
      case "news":
        return (
          <BaseCard
            {...commonProps}
            extraContent={
              item.source && (
                <div className="flex items-center gap-1 mb-1">
                  <LinkIcon
                    fontSize="small"
                    color="action"
                    className="!w-4 !h-4"
                  />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    className="line-clamp-1 text-xs"
                  >
                    {item.source}
                  </Typography>
                </div>
              )
            }
          />
        );

      case "places":
        return (
          <BaseCard
            {...commonProps}
            extraContent={
              <div className="flex flex-col gap-1">
                {item.location && (
                  <div className="flex items-center gap-1">
                    <LocationOnIcon
                      fontSize="small"
                      color="action"
                      className="!w-4 !h-4"
                    />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      className="line-clamp-1 text-xs"
                    >
                      {item.location}
                    </Typography>
                  </div>
                )}
              </div>
            }
          />
        );

      case "services":
        return (
          <BaseCard
            {...commonProps}
            extraContent={
              <div className="flex flex-col gap-1">
                {item.phone && (
                  <div className="flex items-center gap-1">
                    <PhoneIcon
                      fontSize="small"
                      color="action"
                      className="!w-4 !h-4"
                    />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      className="line-clamp-1 text-xs"
                    >
                      {item.phone}
                    </Typography>
                  </div>
                )}
                {item.email && (
                  <div className="flex items-center gap-1">
                    <EmailIcon
                      fontSize="small"
                      color="action"
                      className="!w-4 !h-4"
                    />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      className="line-clamp-1 text-xs"
                    >
                      {item.email}
                    </Typography>
                  </div>
                )}
              </div>
            }
          />
        );

      case "events":
        return (
          <BaseCard
            {...commonProps}
            extraContent={
              item.location && (
                <div className="flex items-center gap-1 mb-1">
                  <LocationOnIcon
                    fontSize="small"
                    color="action"
                    className="!w-4 !h-4"
                  />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    className="line-clamp-1 text-xs"
                  >
                    {item.location}
                  </Typography>
                </div>
              )
            }
          />
        );

      default:
        return <BaseCard {...commonProps} />;
    }
  };

  if (validatedItems.length === 0) {
    return (
      <div className="w-full p-4 bg-gray-50 rounded-lg">
        <Typography variant="body2" color="text.secondary" align="center">
          No items to display
        </Typography>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Carousel items={validatedItems} renderItem={renderCard} />
    </div>
  );
};

export default CarouselSection;
