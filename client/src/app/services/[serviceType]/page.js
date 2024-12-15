import CardsTemplete from "@templates/CardsTemplete";

const Page = async ({ params }) => {
  return (
    <CardsTemplete
      url={`/services/by-service-type/${params.serviceType}`}
      type="services"
    />
  );
};

export default Page;
