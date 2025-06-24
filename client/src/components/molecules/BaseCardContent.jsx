import { CardContent } from "@mui/material";
import BaseCardTitle from "@atoms/BaseCardTitle";
import BaseCardEnd from "@atoms/BaseCardEnd";
import dynamic from "next/dynamic";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
const SafeHtml = dynamic(() => import("@atoms/SafeHtml"), { ssr: false });

const BaseCardContent = ({
  title,
  content,
  date,
  values,
  price,
  isHovered,
  className,
  horizontal,
}) => {
  return (
    <CardContent
      className={`flex flex-col p-3 relative transition-all duration-300 min-w-0 ${
        isHovered ? "bg-gray-50" : ""
      } ${className}`}
    >
      {title && <BaseCardTitle title={title} isHovered={isHovered} />}
      {price !== undefined && price !== null && (
        <div
          className={`flex items-center mt-1 mb-1 ${
            horizontal ? "justify-start" : "justify-center"
          }`}
        >
          <div className="inline-flex items-center px-2 py-1 rounded-full bg-gradient-to-r from-main to-tertiary shadow-sm">
            <LocalOfferIcon
              className="text-white mr-1"
              style={{ fontSize: "0.875rem" }}
            />
            <span className="text-xs font-bold text-white">
              {typeof price === "number"
                ? price === 0
                  ? "FREE"
                  : `${price.toFixed(2)} KM`
                : price}
            </span>
          </div>
        </div>
      )}
      <div
        className={`flex-1 transition-all line-clamp-${
          horizontal ? 2 : 3
        } duration-300 overflow-hidden ${
          isHovered ? "text-gray-800" : "text-gray-600"
        } ${
          title
            ? `text-xs mt-1 max-h-${horizontal ? "8" : "12"}`
            : "text-sm h-[6.25rem] leading-relaxed tracking-wide line-clamp-5"
        }`}
      >
        <SafeHtml content={content ? content.replace(/<[^>]*>/g, "") : ""} />
      </div>
      <BaseCardEnd isHovered={isHovered} date={date} values={values} />
    </CardContent>
  );
};

export default BaseCardContent;
