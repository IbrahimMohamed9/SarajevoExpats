import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const CollapseIcon = ({ open, onClick, color }) => {
  return (
    <IconButton
      aria-label="expand row"
      size="small"
      color={color}
      onClick={onClick}
    >
      {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
    </IconButton>
  );
};

export default CollapseIcon;
