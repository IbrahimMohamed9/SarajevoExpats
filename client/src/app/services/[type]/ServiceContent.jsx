import CardsTemplate from "@templates/CardsTemplate";
import { serverAxiosInstance } from "@/config/axios";
import ErrorDisplay from "@molecules/ErrorDisplay";

const ServiceContent = async ({ type }) => {
  try {
    const servicesRes = await serverAxiosInstance.get(
      `/services/by-service-type/${type}`
    );

    const services = servicesRes.data;

    return <CardsTemplate data={services} type="services" />;
  } catch (err) {
    return (
      <ErrorDisplay
        message={"No service found. Please try again later."}
        title={`No service Found`}
      />
    );
  }
};

export default ServiceContent;
