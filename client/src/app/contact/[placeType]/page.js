import BaseCard from "@organisms/BaseCard";
import axiosInstance from "@/config/axios";

const Page = async ({ params }) => {
  const { placeType } = params;
  const places = await axiosInstance.get(`/places/by-place-type/${placeType}`);
  const placesColumnElements = places.data.map((place, index) => (
    <BaseCard item={place} key={index} />
  ));

  return (
    <div>
      <div className="flex flex-wrap justify-center py-5">
        {placesColumnElements}
      </div>
    </div>
  );
};

export default Page;
