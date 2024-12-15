import CardsTemplete from "@templates/CardsTemplete";

const Places = async ({ params }) => {
  return (
    <CardsTemplete
      url={`/places/by-place-type/${params.placeType}`}
      type="places"
    />
  );
};

export default Places;
