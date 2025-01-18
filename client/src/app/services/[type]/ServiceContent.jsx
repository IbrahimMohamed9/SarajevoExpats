import FilterSection from "@molecules/FilterSection";
import CardsTemplate from "@templates/CardsTemplate";
import axiosInstance from "@/config/axios";
import ErrorDisplay from "@molecules/ErrorDisplay";

const ServiceContent = async ({ type, subtype }) => {
  try {
    const servicesRes = await axiosInstance.get(
      `/services/by-service-type/${type}`
    );
    const serviceSubtypesRes = await axiosInstance.get(
      `/serviceTypes/subtypes/${type}`
    );

    const services = servicesRes.data;
    const serviceSubtypes = serviceSubtypesRes.data;

    // Calculate counts for each subtype
    const typeCounts = services.reduce((acc, service) => {
      const subtypeName =
        serviceSubtypes.find((type) => type.name === service.serviceSubtype)
          ?.name || service.serviceSubtype;
      acc[subtypeName] = (acc[subtypeName] || 0) + 1;
      return acc;
    }, {});

    const filteredServices = subtype
      ? services.filter(
          (service) =>
            serviceSubtypes.find((type) => type.name === service.serviceSubtype)
              ?.name === subtype
        )
      : services;

    return (
      <>
        <FilterSection
          types={serviceSubtypes}
          counts={typeCounts}
          selectedType={subtype || null}
        />

        <CardsTemplate data={filteredServices} type="services" />
      </>
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
