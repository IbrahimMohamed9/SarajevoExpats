import CardsTemplete from "@templates/CardsTemplete";

const Page = async ({ params }) => {
  return (
    <CardsTemplete url={`/places/by-place-type/${params.type}`} type="places" />
  );
};

export default Page;
