import AdminTableTemplete from "@templates/AdminTableTemplete";
import axiosInstance from "@/config/axios";

const Page = async () => {
  const usersResponse = await axiosInstance.get("users");

  return (
    <AdminTableTemplete
      title="Users"
      tableKey="users"
      data={usersResponse.data}
    />
  );
};

export default Page;
