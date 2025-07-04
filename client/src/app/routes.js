import axiosInstance from "@/config/axios";
import { verifyAdmin } from "@/utils";

export const dynamic = "force-dynamic";

const getStaticRoutes = () => [
  {
    title: "News",
    href: "/news",
  },
  {
    title: "Tours",
    href: "/tours",
  },
  {
    title: "Events",
    href: "/events",
  },
  {
    title: "Q&A",
    href: "/qaas",
  },
];

const getDynamicRoutes = async () => {
  try {
    const [serviceType, placeType] = await Promise.all([
      axiosInstance.get("/serviceTypes"),
      axiosInstance.get("/placeTypes"),
    ]);

    return {
      services: serviceType.data.map((service) => ({
        title: service.name,
        href: `/services/${encodeURIComponent(service.name)}`,
      })),
      places: placeType.data.map((place) => ({
        title: place.name,
        href: `/places/${encodeURIComponent(place.name)}`,
      })),
    };
  } catch (error) {
    console.error("Error fetching navigation data:", error);
    return { services: false, places: false };
  }
};

const routes = async () => {
  const staticRoutes = getStaticRoutes();
  const { services, places } = await getDynamicRoutes();

  const allRoutes = [
    ...staticRoutes,
    {
      title: "Places",
      dropdown: places,
    },
    {
      title: "Services",
      dropdown: services,
    },
  ];

  // This will only run on the server side due to the cookies() API
  if (verifyAdmin()) {
    allRoutes.push({
      title: "Admin",
      dropdown: [
        { href: "/dashboard/events", title: "Manage Events" },
        { href: "/dashboard/qaas", title: "Manage QaAs" },
        { href: "/dashboard/news", title: "Manage News" },
        { href: "/dashboard/places", title: "Manage Places" },
        { href: "/dashboard/services", title: "Manage Services" },
        { href: "/dashboard/sponsors", title: "Manage Sponsors" },
        { href: "/dashboard/users", title: "Manage Users" },
        { href: "/dashboard/tours", title: "Manage Tours" },
      ],
    });
  }

  return allRoutes;
};

export default routes;
