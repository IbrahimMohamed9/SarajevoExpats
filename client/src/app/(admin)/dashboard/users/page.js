import AdminTableTemplete from "@adminTem/AdminTableTemplete";
import { serverAxiosInstance } from "@/config/axios";

export const dynamic = 'force-dynamic';

const Page = async () => {
  const usersResponse = await serverAxiosInstance.get("users");
  const dataTemp = {
    username: "",
    email: "",
    password: "",
    type: "",
  };

  return (
    <AdminTableTemplete
      tableKey="users"
      data={usersResponse.data}
      dataTemp={dataTemp}
    />
  );
};

export default Page;
