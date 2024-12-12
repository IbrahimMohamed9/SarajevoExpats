import AdminTableTemplete from "@templates/AdminTableTemplete";
import axiosInstance from "@/config/axios";

const Page = async () => {
  const placesResponse = await axiosInstance.get("places");
  const placeTypesResponse = await axiosInstance.get("placetypes/with-places");

  return (
    <>
      <AdminTableTemplete
        title="Places"
        tableKey="places"
        data={placesResponse.data}
      />
      <div className="h-4"></div>
      <AdminTableTemplete
        title="Place Types"
        tableKey="placetypes/with-places"
        subDataTitle="Place"
        data={placeTypesResponse.data}
      />
    </>
  );
};

export default Page;
