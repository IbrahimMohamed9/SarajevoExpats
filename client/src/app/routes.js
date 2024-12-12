import axiosInstance from "@/config/axios";
const routes = async () => {
  const ro = async () => {
    try {
      let [serviceType, placeType] = await Promise.all([
        axiosInstance.get("/serviceTypes"),
        axiosInstance.get("/placetypes"),
      ]);
      serviceType = serviceType.data;
      placeType = placeType.data;

      return {
        services: serviceType.map((service) => ({
          title: service.name,
          href: `/services/${service.name.toLowerCase()}`,
        })),
        places: placeType.map((place) => ({
          title: place.name,
          href: `/places/${place.name.toLowerCase()}`,
        })),
      };
    } catch (error) {
      console.error("Error fetching navigation data:", error);
      return { services: false, places: false };
    }
  };

  const { services, places } = await ro();

  const routes = [
    {
      title: "Places",
      href: "/places",
      dropdown: places,
    },
    {
      title: "Services",
      href: "/services",
      dropdown: services,
    },
    {
      title: "Events",
      href: "/events",
    },
    {
      title: "News",
      href: "/news",
    },
    {
      title: "Contact",
      href: "/contact",
    },
  ];

  return routes;
};

export default routes;
