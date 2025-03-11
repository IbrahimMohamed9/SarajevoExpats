import AdminTableTemplete from "@adminTem/AdminTableTemplete";
import axiosInstance from "@/config/axios";

export const dynamic = "force-dynamic";

const Page = async () => {
  const usersResponse = await axiosInstance.get("users");
  const dataTemp = {
    username: "",
    email: "",
    password: "",
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
