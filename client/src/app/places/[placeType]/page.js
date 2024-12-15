import BaseCard from "@atoms/BaseCard";
import axiosInstance from "@/config/axios";

const Places = async ({ params }) => {
  const places = await axiosInstance.get(
    `/places/by-place-type/${params.placeType}`
  );
  const placesColumnElements = places.data.map((place, index) => (
    <BaseCard item={place} key={index} type="places" />
  ));
  return (
    <div className="flex flex-wrap justify-center py-5">
      {placesColumnElements}
    </div>
  );
};

export default Places;
