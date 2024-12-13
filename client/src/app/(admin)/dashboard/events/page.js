import axiosInstance from "@/config/axios";
import AdminTableTemplete from "@adminTem/AdminTableTemplete";

const Page = async () => {
  const response = await axiosInstance.get("events");

  return (
    <AdminTableTemplete title="Events" tableKey="events" data={response.data} />
  );
};

export default Page;
