import AdminTableTemplete from "@templates/AdminTableTemplete";
import axiosInstance from "@/config/axios";

const Page = async () => {
  const servicesResponse = await axiosInstance.get("services");
  const serviceSubtypesResponse = await axiosInstance.get(
    "serviceSubtypes/with-services"
  );
  const serviceTypesResponse = await axiosInstance.get(
    "serviceTypes/with-subtypes"
  );

  return (
    <>
      <AdminTableTemplete
        title="Services"
        tableKey="services"
        data={servicesResponse.data}
      />
      <div className="h-4"></div>
      <AdminTableTemplete
        title="Service Subtypes"
        tableKey="serviceSubtypes/with-services"
        subDataTitle="Service"
        data={serviceSubtypesResponse.data}
      />
      <div className="h-4"></div>
      <AdminTableTemplete
        title="Service Types"
        tableKey="serviceTypes/with-subtypes"
        subDataTitle="Service Subtype"
        data={serviceTypesResponse.data}
      />
    </>
  );
};

export default Page;
