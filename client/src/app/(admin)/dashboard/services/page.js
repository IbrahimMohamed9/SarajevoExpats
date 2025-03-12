import AdminTableTemplete from "@adminTem/AdminTableTemplete";
import axiosInstance from "@/config/axios";

const Page = async () => {
  const servicesResponse = await axiosInstance.get("services");
  const serviceTypesResponse = await axiosInstance.get(
    "serviceTypes/with-services"
  );

  const dataTemp1 = {
    name: "",
    content: "",
    picture: "",
    pictureDescription: "",
    phone: "",
    email: "",
    website: "",
    serviceType: "",
  };
  const dataTemp3 = {
    name: "",
  };

  return (
    <>
      <AdminTableTemplete
        tableKey="services"
        data={servicesResponse.data}
        dataTemp={dataTemp1}
      />
      <div className="h-4"></div>
      <AdminTableTemplete
        tableKey="serviceTypes/with-services"
        subDataTitle="Services"
        data={serviceTypesResponse.data}
        dataTemp={dataTemp3}
      />
    </>
  );
};

export default Page;
