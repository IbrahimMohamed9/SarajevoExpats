import AdminTableTemplete from "@adminTem/AdminTableTemplete";
import axiosInstance from "@/config/axios";

export const dynamic = "force-dynamic";

const Page = async () => {
  const placesResponse = await axiosInstance.get("places");
  const placeTypesResponse = await axiosInstance.get("placeTypes/with-places");
  const dataTemp1 = {
    title: "",
    content: "",
    pictures: [],
    pictureDescription: "",
    phone: "",
    email: "",
    website: "",
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
