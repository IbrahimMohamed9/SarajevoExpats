import { getServerSideSitemap } from "next-sitemap";
import axiosInstance from "@/config/axios";
import parseFormattedDate, { getValidDateOrNow } from "@/utils/date";

function getServiceSiteMap(service, encodedType) {
  const updatedDate = parseFormattedDate(service.updatedAt);
  const lastmod = getValidDateOrNow(updatedDate);

  return {
    loc: `https://sarajevoexpats.com/services/${encodedType}/${
      service._id
    }/${encodeURIComponent(service.name)}`,
    lastmod,
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
    const lastmod = getValidDateOrNow(updatedTypeDate);

    fields.push({
      loc: `https://sarajevoexpats.com/services/${encodedType}`,
      lastmod,
      priority: 0.7,
      changefreq: "monthly",
    });
  }

  return getServerSideSitemap(fields);
}
