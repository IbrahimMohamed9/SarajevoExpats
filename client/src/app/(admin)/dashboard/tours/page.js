import axiosInstance from "@/config/axios";
import AdminTableTemplete from "@adminTem/AdminTableTemplete";

const Page = async () => {
  const response = await axiosInstance.get("trips");

  const dataTemp = {
    title: "",
    content: "",
    price: 0,
    pictures: [],
    isActive: true,
    dayOfWeek: "",
    repeatAt: "None",
    lastDayToRegister: 1,
    tripDate: "",
  };

  const responseWithApplications = await axiosInstance.get(
    "trips/with-applications"
  );

  return (
    <>
      <AdminTableTemplete
        tableKey="trips"
        data={response.data}
        dataTemp={dataTemp}
      />
      <div className="h-4" />
      <AdminTableTemplete
        tableKey="trips/with-applications"
        subDataTitle="Applications"
        data={responseWithApplications.data}
      />
    </>
  );
};

export default Page;
