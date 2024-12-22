import axiosInstance from "@/config/axios";
import { verifyAdmin } from "@/utils";

const routes = async () => {
  const ro = async () => {
    try {
      let [serviceType, placeType] = await Promise.all([
        axiosInstance.get("/serviceTypes"),
        axiosInstance.get("/placeTypes"),
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
      title: "News",
      href: "/news",
    },
    {
      title: "Places",
      dropdown: places,
    },
    {
      title: "Services",
      dropdown: services,
    },
    {
      title: "Events",
      href: "/events",
    },
    {
      title: "Q&A",
      href: "/qaas",
    },
    ,
  ];

  if (verifyAdmin())
    routes.push({
      title: "Admin",
      dropdown: [
        { href: "/dashboard/events", title: "Manage Events" },
        { href: "/dashboard/qaas", title: "Manage QaAs" },
        { href: "/dashboard/news", title: "Manage News" },
        { href: "/dashboard/places", title: "Manage Places" },
        { href: "/dashboard/services", title: "Manage Services" },
        { href: "/dashboard/users", title: "Manage Users" },
      ],
    });

  return routes;
};

// 255, 112, 3;

export default routes;
