import CardsTemplate from "@templates/CardsTemplate";
import axiosInstance from "@/config/axios";
import ErrorDisplay from "@molecules/ErrorDisplay";

const ServiceContent = async ({ type }) => {
  try {
    const servicesRes = await axiosInstance.get(
      `/services/by-service-type/${type}`
    );

    const services = servicesRes.data;

    return (
      <CardsTemplate
        data={services}
        pageType="service"
        type={decodeURIComponent(type)}
      />
    );
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
