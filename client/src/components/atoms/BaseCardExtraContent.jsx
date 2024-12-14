import { Typography } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LinkIcon from "@mui/icons-material/Link";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const BaseCardExtraContent = ({ data }) => {
  const getIcon = (type) => {
    switch (type) {
      case "phone":
        return PhoneIcon;
      case "location":
        return LocationOnIcon;
      case "email":
        return EmailIcon;
      case "source":
        return LinkIcon;

      default:
        return <></>;
    }
  };

  let bodyElements = Object.entries(data).map(([key, value], index) => {
    if (!value) return null;
    const Icon = getIcon(key);

    return (
      <div className="flex items-center gap-1" key={index}>
        <Icon fontSize="small" color="action" className="!w-4 !h-4" />
        <Typography
          variant="body2"
          color="text.secondary"
          className="line-clamp-1 text-xs"
        >
          {value}
        </Typography>
      </div>
    );
  });

  return <div className="flex flex-col gap-1">{bodyElements}</div>;
};

export default BaseCardExtraContent;
