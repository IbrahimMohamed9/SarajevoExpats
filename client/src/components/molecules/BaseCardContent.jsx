import { CardContent } from "@mui/material";
import BaseCardTitle from "@atoms/BaseCardTitle";
import BaseCardEnd from "@atoms/BaseCardEnd";
import dynamic from "next/dynamic";
const SafeHtml = dynamic(() => import("@atoms/SafeHtml"), { ssr: false });

const BaseCardContent = ({ title, content, date, values, isHovered }) => {
  return (
    <CardContent
      className={`flex-1 flex flex-col p-3 relative transition-all duration-300
            ${isHovered ? "bg-gray-50" : ""}`}
    >
      {title && <BaseCardTitle title={title} isHovered={isHovered} />}
      <div
        className={`max-h-fit flex-1 transition-all line-clamp-3 duration-300 ${
          isHovered ? "text-gray-800" : "text-gray-600"
        } ${
          title
            ? "text-xs mt-1"
            : "text-sm leading-relaxed tracking-wide line-clamp-5"
        }`}
      >
        <SafeHtml content={content.replace(/<[^>]*>/g, "")} />
      </div>
      <BaseCardEnd isHovered={isHovered} date={date} values={values} />
    </CardContent>
  );
};

export default BaseCardContent;
