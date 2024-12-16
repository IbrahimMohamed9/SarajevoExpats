import BaseCard from "@organisms/BaseCard";
import axiosInstance from "@/config/axios";

export const metadata = {
  metadataBase: new URL("https://sarajevoexpats.com"),
  title: "Services | Sarajevo Expats",
  description:
    "Find trusted local services in Sarajevo - from language tutors and real estate agents to healthcare providers and legal advisors. Access verified service providers recommended by the expat community in Sarajevo.",
  keywords:
    "Sarajevo services, expat services Sarajevo, local services Bosnia, Sarajevo healthcare, Sarajevo real estate, language tutors Sarajevo, legal services Sarajevo, business services Bosnia",
  openGraph: {
    title: "Local Services in Sarajevo | Sarajevo Expats",
    description:
      "Find trusted local services in Sarajevo - from language tutors and real estate agents to healthcare providers and legal advisors. Access verified service providers recommended by the expat community.",
    type: "website",
    locale: "en_US",
    siteName: "Sarajevo Expats",
  },
};

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
