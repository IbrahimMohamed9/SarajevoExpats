import AdminTableTemplete from "@adminTem/AdminTableTemplete";
import axiosInstance from "@/config/axios";

const Page = async () => {
  const placesResponse = await axiosInstance.get("places");
  const placeTypesResponse = await axiosInstance.get("placeTypes/with-places");
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
        title="Places"
        tableKey="places"
        data={placesResponse.data}
        dataTemp={dataTemp1}
      />
      <div className="h-4"></div>
      <AdminTableTemplete
        title="Place Types"
        tableKey="placeTypes/with-places"
        subDataTitle="Place"
        data={placeTypesResponse.data}
        dataTemp={dataTemp2}
      />
    </>
  );
};

export default Page;
