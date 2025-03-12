import AdminTableTemplete from "@adminTem/AdminTableTemplete";
import axiosInstance from "@/config/axios";

export const dynamic = "force-dynamic";

const Page = async () => {
  const usersResponse = await axiosInstance.get("sponsors");
  const dataTemp = {
    name: "",
    picture: "",
  };

  return (
    <AdminTableTemplete
      tableKey="sponsors"
      data={usersResponse.data}
      dataTemp={dataTemp}
    />
  );
};

export default Page;
