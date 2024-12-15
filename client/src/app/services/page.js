import BaseCard from "@organisms/BaseCard";
import axiosInstance from "@/config/axios";

const Services = async () => {
  const services = await axiosInstance.get("/services");
  const servicesColumnElements = services.data.map((service, index) => (
    <BaseCard item={service} key={index} type="services" />
  ));
  return (
    <div className="flex flex-wrap justify-center py-5">
      {servicesColumnElements}
    </div>
  );
};

export default Services;
