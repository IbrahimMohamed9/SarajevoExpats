import { getServerSideSitemap } from "next-sitemap";
import axiosInstance from "@/config/axios";
import parseFormattedDate, { getValidDateOrNow } from "@/utils/date";

function getPlaceSiteMap(place, encodedType) {
  const updatedDate = parseFormattedDate(place.updatedAt);
  const createdDate = parseFormattedDate(place.createdAt);
  const lastmod = getValidDateOrNow(updatedDate); // Ensures valid ISO format
  const created = getValidDateOrNow(createdDate);

  return {
    loc: `https://sarajevoexpats.com/places/${encodedType}/${
      place._id
    }/${encodeURIComponent(place.title)}`,
    lastmod,
    created,
    priority: 0.7,
    changefreq: "monthly",
    images: place.picture ? [{ loc: { href: place.picture.trim() } }] : [],
  };
}

export async function GET() {
  const { data: placeTypes } = await axiosInstance.get("/placeTypes");
  const fields = [];

  for (const type of placeTypes) {
    const encodedType = encodeURIComponent(type.name);

    const { data: places } = await axiosInstance.get(
      `/places/by-place-type/${encodedType}`
    );

    places.forEach((place) => fields.push(getPlaceSiteMap(place, encodedType)));

    const updatedTypeDate = parseFormattedDate(type.updatedAt);
    const createdTypeDate = parseFormattedDate(type.createdAt);
    const lastmod = getValidDateOrNow(updatedTypeDate);
    const created = getValidDateOrNow(createdTypeDate);

    fields.push({
      loc: `https://sarajevoexpats.com/places/${encodedType}`,
      lastmod,
      created,
      priority: 0.7,
      changefreq: "monthly",
    });
  }

  return getServerSideSitemap(fields);
}
