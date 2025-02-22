import { getServerSideSitemap } from "next-sitemap";
import axiosInstance from "@/config/axios";
import parseFormattedDate, { getValidDateOrNow } from "@/utils/date";

function getServiceSiteMap(service, encodedType) {
  const updatedDate = parseFormattedDate(service.updatedAt);
  const createdDate = parseFormattedDate(service.createdAt);
  const lastmod = getValidDateOrNow(updatedDate); // Ensures valid ISO format
  const created = getValidDateOrNow(createdDate);

  return {
    loc: `https://sarajevoexpats.com/services/${encodedType}/${
      service._id
    }/${encodeURIComponent(service.name)}`,
    lastmod,
    created,
    priority: 0.7,
    changefreq: "monthly",
    images: service.picture ? [{ loc: { href: service.picture.trim() } }] : [],
  };
}

export async function GET() {
  const { data: serviceTypes } = await axiosInstance.get("/serviceTypes");
  const fields = [];

  for (const type of serviceTypes) {
    const encodedType = encodeURIComponent(type.name);

    const { data: services } = await axiosInstance.get(
      `/services/by-service-type/${encodedType}`
    );

    services.forEach((service) =>
      fields.push(getServiceSiteMap(service, encodedType))
    );

    const updatedTypeDate = parseFormattedDate(type.updatedAt);
    const createdTypeDate = parseFormattedDate(type.createdAt);
    const lastmod = getValidDateOrNow(updatedTypeDate);
    const created = getValidDateOrNow(createdTypeDate);

    fields.push({
      loc: `https://sarajevoexpats.com/services/${encodedType}`,
      lastmod,
      created,
      priority: 0.7,
      changefreq: "monthly",
    });
  }

  return getServerSideSitemap(fields);
}
