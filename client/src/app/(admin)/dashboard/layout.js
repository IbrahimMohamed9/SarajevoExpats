import EventIcon from "@mui/icons-material/Event";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import GroupIcon from "@mui/icons-material/Group";
import AdminDashboardGrid from "@adminOrg/AdminDashboardGrid";
import AdminModal from "@adminMol/AdminModal";
export const metadata = {
  title: "Dashboard - Sarajevo Expats",
  description: "Admin dashboard for Sarajevo Expats.",
};

export default function DashboardLayout({ children }) {
  const navigationItems = [
    { text: "Events", icon: <EventIcon />, href: "/dashboard/events" },
    { text: "News", icon: <NewspaperIcon />, href: "/dashboard/news" },
    { text: "Places", icon: <LocationOnIcon />, href: "/dashboard/places" },
    {
      text: "Services",
      icon: <HomeRepairServiceIcon />,
      href: "/dashboard/services",
    },
    { text: "Users", icon: <GroupIcon />, href: "/dashboard/users" },
  ];

  return (
    <main className="min-h-screen">
      <AdminDashboardGrid navigationItems={navigationItems}>
        {children}
      </AdminDashboardGrid>

      <AdminModal />
    </main>
  );
}
