import axiosInstance from "@/config/axios";
import AdminTableTemplete from "@adminTem/AdminTableTemplete";

const Page = async () => {
  const response = await axiosInstance.get("news");

  return (
    <AdminTableTemplete title="News" tableKey="news" data={response.data} />
  );
};

export default Page;
