import { serverAxiosInstance } from "@/config/axios";
import { verifyAdmin } from "@/utils";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

const getStaticRoutes = () => [
  {
    title: "News",
    href: "/news",
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
      serverAxiosInstance.get("/serviceTypes").catch(() => ({ data: [] })),
      serverAxiosInstance.get("/placeTypes").catch(() => ({ data: [] })),
    ]);

    return {
      services:
        serviceType.data?.map((service) => ({
          title: service.name,
          href: `/services/${encodeURIComponent(service.name)}`,
        })) || [],
      places:
        placeType.data?.map((place) => ({
          title: place.name,
          href: `/places/${encodeURIComponent(place.name)}`,
        })) || [],
    };
  } catch (error) {
    console.error("Error fetching navigation data:", error);
    return { services: [], places: [] };
  }
};

const routes = async () => {
  try {
    const staticRoutes = getStaticRoutes();
    const { services, places } = await getDynamicRoutes();

    const allRoutes = [
      ...staticRoutes,
      {
        title: "Places",
        href: "/places",
        children: places,
      },
      {
        title: "Services",
        href: "/services",
        children: services,
      },
    ];

    // This will only run on the server side due to the cookies() API
    if (verifyAdmin()) {
      allRoutes.push({
        title: "Admin",
        href: "/dashboard",
        children: [
          { href: "/dashboard/events", title: "Manage Events" },
          { href: "/dashboard/qaas", title: "Manage QaAs" },
          { href: "/dashboard/news", title: "Manage News" },
          { href: "/dashboard/places", title: "Manage Places" },
          { href: "/dashboard/services", title: "Manage Services" },
          { href: "/dashboard/users", title: "Manage Users" },
        ],
      });
    }

    return allRoutes;
  } catch (error) {
    console.error("Error generating routes:", error);
    return getStaticRoutes(); // Fallback to static routes if dynamic routes fail
  }
};

export default routes;
