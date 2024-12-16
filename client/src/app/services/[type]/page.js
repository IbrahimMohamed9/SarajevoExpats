import axiosInstance from "@/config/axios";
import ErrorDisplay from "@molecules/ErrorDisplay";
import ServiceContent from "./ServiceContent";

const Page = async ({ params }) => {
  try {
    const servicesRes = await axiosInstance.get(
      `/services/by-service-type/${params.type}`
    );
    const serviceSubtypesRes = await axiosInstance.get(
      `/serviceTypes/subtypes/${params.type}`
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

    return (
      <ServiceContent
        initialServices={services}
        serviceSubtypes={serviceSubtypes}
        typeCounts={typeCounts}
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

export default Page;
