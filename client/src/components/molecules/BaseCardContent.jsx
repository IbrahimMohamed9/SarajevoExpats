import { CardContent } from "@mui/material";
import BaseCardTitle from "@atoms/BaseCardTitle";
import BaseCardEnd from "@atoms/BaseCardEnd";

const BaseCardContent = ({ title, content, date, values, isHovered }) => {
  return (
    <CardContent
      className={`flex-1 flex flex-col p-3 relative transition-all duration-300
            ${isHovered ? "bg-gray-50" : ""}`}
    >
      <BaseCardTitle title={title} isHovered={isHovered} />

      <div
        className={`line-clamp-3 max-h-fit flex-1 text-xs text-secondary transition-all duration-300 ${
          isHovered ? "text-gray-700" : "text-gray-600"
        }`}
        dangerouslySetInnerHTML={{ __html: content }}
      />

      <BaseCardEnd isHovered={isHovered} date={date} values={values} />
    </CardContent>
  );
};

export default BaseCardContent;
