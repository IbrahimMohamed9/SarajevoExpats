import AdminTableTemplete from "@adminTem/AdminTableTemplete";
import axiosInstance from "@/config/axios";

const Page = async () => {
  const usersResponse = await axiosInstance.get("users");
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