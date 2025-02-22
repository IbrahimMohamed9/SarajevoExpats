import { getServerSideSitemap } from "next-sitemap";
import axiosInstance from "@/config/axios";
import parseFormattedDate, { getValidDateOrNow } from "@/utils/date";

export async function GET() {
  const { data: news } = await axiosInstance.get("/news");
  const fields = news.map((data) => {
    const updatedTypeDate = parseFormattedDate(data.updatedAt);
    const createdTypeDate = parseFormattedDate(data.createdAt);
    const lastmod = getValidDateOrNow(updatedTypeDate);
    const created = getValidDateOrNow(createdTypeDate);

    return {
      loc: `https://sarajevoexpats.com/news/${data._id}/${encodeURIComponent(
        data.title
      )}`,
      lastmod,
      created,
      priority: 0.7,
      changefreq: "monthly",
      images: data.picture ? [{ loc: { href: data.picture.trim() } }] : [],
    };
  });

  return getServerSideSitemap(fields);
}
