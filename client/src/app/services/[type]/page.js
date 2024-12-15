import FilterSection from "@molecules/FilterSection";
import axiosInstance from "@/config/axios";
import CardsTemplete from "@/components/templates/CardsTemplete";

const Page = async ({ params }) => {
  const placesRes = await axiosInstance.get("/services");
  const placeTypesRes = await axiosInstance.get("/placeTypes");

  const places = placesRes.data;
  const placeTypes = placeTypesRes.data;
  // Calculate counts for each type
  const typeCounts = places.reduce((acc, place) => {
    acc[place.type] = (acc[place.type] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      {/* Filters Section */}
      <FilterSection types={placeTypes} counts={typeCounts} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-gray-500">
          {places.length} {places.length === 1 ? "place" : "places"} found
        </p>

        <CardsTemplete
          url={`/places/by-place-type/${params.type}`}
          type="places"
        />
      </div>
    </div>
  );
};

export default Page;
