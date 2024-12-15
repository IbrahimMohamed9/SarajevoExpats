import BaseCard from "@/components/atoms/BaseCard";
import axiosInstance from "@/config/axios";

const Page = async ({ params }) => {
  const { serviceType } = params;
  const services = await axiosInstance.get(
    `/services/by-service-type/${serviceType}`
  );

  const servicesColumnElements = services.data.map((service, index) => (
    <BaseCard item={service} key={index} type="services" />
  ));

  return (
    <div className="flex flex-wrap justify-center py-5">
      {servicesColumnElements}
    </div>
  );
};

export default Page;
