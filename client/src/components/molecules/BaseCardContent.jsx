import { CardContent } from "@mui/material";
import BaseCardTitle from "@atoms/BaseCardTitle";
import BaseCardEnd from "@atoms/BaseCardEnd";
import dynamic from "next/dynamic";
const SafeHtml = dynamic(() => import("@atoms/SafeHtml"), { ssr: false });

const BaseCardContent = ({
  title,
  content,
  date,
  values,
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
