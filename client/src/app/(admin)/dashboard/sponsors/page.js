import AdminTableTemplete from "@adminTem/AdminTableTemplete";
import { serverAxiosInstance } from "@/config/axios";

export const dynamic = "force-dynamic";

const Page = async () => {
  const usersResponse = await serverAxiosInstance.get("sponsors");
  const dataTemp = {
    name: "",
    picture: "",
    pictureDescription: "",
    priority: 0,
    pinned: false,
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
