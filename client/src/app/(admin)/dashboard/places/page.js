import AdminTableTemplete from "@adminTem/AdminTableTemplete";
import axiosInstance, { serverAxiosInstance } from "@/config/axios";

const Page = async () => {
  const placesResponse = await axiosInstance.get("places");
  const placeTypesResponse = await serverAxiosInstance.get(
    "placeTypes/with-places"
  );
  const dataTemp1 = {
    title: "",
    content: "",
    picture: "",
    pictureDescription: "",
    phone: "",
    email: "",
    link: "",
    type: "",
  };
  const dataTemp2 = {
    name: "",
  };

  return (
    <>
      <AdminTableTemplete
        tableKey="places"
        data={placesResponse.data}
        dataTemp={dataTemp1}
      />
      <div className="h-4"></div>
      <AdminTableTemplete
        tableKey="placeTypes/with-places"
        subDataTitle="Place"
        data={placeTypesResponse.data}
        dataTemp={dataTemp2}
      />
    </>
  );
};

export default Page;
