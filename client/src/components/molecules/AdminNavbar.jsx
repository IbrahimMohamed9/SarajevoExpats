import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AdminNavigationBtn from "@/components/atoms/AdminNavigationBtn";

const AdminNavbar = ({ open, handleDrawerToggle, navigationItems }) => {
  const navIconsElements = navigationItems.map((item) => (
    <AdminNavigationBtn key={item.text} item={item} open={open} />
  ));

  return (
    <div className="h-[calc(100vh-80px)] border-r border-solid border-gray-300 fixed transition-all">
      <IconButton
        onClick={handleDrawerToggle}
        className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 z-10 border border-solid border-gray-300  hover:bg-gray-100 mr-3"
      >
        {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>
      <List>{navIconsElements}</List>
    </div>
  );
};

export default AdminNavbar;
