import axiosInstance from "@/config/axios";

export default async function DashboardPage() {
  const response = await axiosInstance.get("/placetypes/with-places");

  return <div className="container mx-auto px-4"></div>;
}
