import axiosInstance from "@/config/axios";
import AdminTableTemplete from "@adminTem/AdminTableTemplete";

const Page = async () => {
  const response = await axiosInstance.get("trips");

  const dataTemp = {
    title: "",
    content: "",
    pictures: [],
    isActive: true,
    dayOfWeek: "",
    repeatAt: "None",
    lastDayToRegister: 1,
    tripDate: "",
  };

  return (
    <AdminTableTemplete
      tableKey="trips"
      data={response.data}
      dataTemp={dataTemp}
    />
  );
};

export default Page;
