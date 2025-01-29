import { Typography } from "@mui/material";
import BaseCardExtraContent from "@atoms/BaseCardExtraContent";
import { formatDateTime } from "@/utils/formatters";

const BaseCardEnd = ({ isHovered, date, values }) => {
  const readableDate = formatDateTime(date);

  return (
    <div
      className={`mt-auto transition-all duration-300 transform ${
        isHovered ? "translate-y-0 opacity-100" : "translate-y-1 opacity-90"
      }`}
    >
      <BaseCardExtraContent data={values} />
      <Typography
        variant="caption"
        className={`mt-1 text-xs transition-colors duration-300 text-secondary ${
          isHovered ? "text-gray-600" : "text-gray-500"
        }`}
      >
        {readableDate}
      </Typography>
    </div>
  );
};

export default BaseCardEnd;
