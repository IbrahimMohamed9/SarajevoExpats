import EventIcon from "@mui/icons-material/Event";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import GroupIcon from "@mui/icons-material/Group";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import HandshakeIcon from "@mui/icons-material/Handshake";
import AdminDashboardGrid from "@adminOrg/AdminDashboardGrid";
import AdminModal from "@adminMol/AdminModal";
import { notFound } from "next/navigation";
import { verifyAdmin } from "@/utils/";

export const metadata = {
  title: "Dashboard - Sarajevo Expats",
  description: "Admin dashboard for Sarajevo Expats.",
};

export const dynamic = "force-dynamic";

export default function DashboardLayout({ children }) {
  const isAdmin = verifyAdmin();

  if (!isAdmin) {
    notFound();
  }

  const navigationItems = [
    { text: "Events", icon: <EventIcon />, href: "/dashboard/events" },
    { text: "News", icon: <NewspaperIcon />, href: "/dashboard/news" },
    { text: "Places", icon: <LocationOnIcon />, href: "/dashboard/places" },
    {
      text: "Services",
      icon: <HomeRepairServiceIcon />,
      href: "/dashboard/services",
    },
    { text: "Sponsors", icon: <HandshakeIcon />, href: "/dashboard/sponsors" },
    { text: "Users", icon: <GroupIcon />, href: "/dashboard/users" },
    { text: "QaAs", icon: <QuestionAnswerIcon />, href: "/dashboard/qaas" },
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
