import AdminTableTemplete from "@adminTem/AdminTableTemplete";
import axiosInstance from "@/config/axios";

export const dynamic = "force-dynamic";

const Page = async () => {
  const placesResponse = await axiosInstance.get("places");
  const placeTypesResponse = await axiosInstance.get("placeTypes/with-places");
  const placesTagsResponse = await axiosInstance.get("placeTags");
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
    tags: [],
  };
  const dataTemp2 = {
    tag: "",
    type: "",
  };
  const dataTemp3 = {
    name: "",
  };

  return (
    <>
      <AdminTableTemplete
        tableKey="places"
        data={placesResponse.data}
        dataTemp={dataTemp1}
      />
      <div className="h-4" />
      <AdminTableTemplete
        tableKey="placeTags"
        data={placesTagsResponse.data}
        dataTemp={dataTemp2}
      />
      <div className="h-4" />
      <AdminTableTemplete
        tableKey="placeTypes/with-places"
        subDataTitle="Place"
        data={placeTypesResponse.data}
        dataTemp={dataTemp3}
      />
    </>
  );
};

export default Page;
