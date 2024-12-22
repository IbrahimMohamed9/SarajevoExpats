import AdminTableTemplete from "@adminTem/AdminTableTemplete";
import axiosInstance from "@/config/axios";

const Page = async () => {
  const servicesResponse = await axiosInstance.get("services");
  const serviceSubtypesResponse = await axiosInstance.get(
    "serviceSubtypes/with-services"
  );
  const serviceTypesResponse = await axiosInstance.get(
    "serviceTypes/with-subtypes"
  );

  const dataTemp1 = {
    name: "",
    content: "",
    picture: "",
    pictureDescription: "",
    phone: "",
    email: "",
    serviceSubtype: "",
  };
  const dataTemp2 = {
    name: "",
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
        tableKey="serviceSubtypes/with-services"
        subDataTitle="Service"
        data={serviceSubtypesResponse.data}
        dataTemp={dataTemp2}
      />
      <div className="h-4"></div>
      <AdminTableTemplete
        tableKey="serviceTypes/with-subtypes"
        subDataTitle="Service Subtype"
        data={serviceTypesResponse.data}
        dataTemp={dataTemp3}
      />
    </>
  );
};

export default Page;
