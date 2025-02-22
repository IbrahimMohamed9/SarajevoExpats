import { getServerSideSitemap } from "next-sitemap";
import { parse } from "date-fns";
import axiosInstance from "@/config/axios";

export async function GET() {
  const { data: events } = await axiosInstance.get("/events");

  const fields = events.map((event) => {
    const date = parse(event.date, "MMMM d, yyyy 'at' hh:mm a", new Date());
    const lastmod = isNaN(date.getTime())
      ? new Date().toISOString()
      : date.toISOString();

    const images = event.childPosts
      .filter((post) => post.type === "Image" && post.displayUrl)
      .map((image) => ({
        loc: { href: image.displayUrl?.trim() || "" },
      }));

    const videos = event.childPosts
      .filter((post) => post.type === "Video" && post.videoUrl)
      .map((video) => ({
        thumbnailLoc: { href: video.displayUrl?.trim() },
        title: "Video for Event",
        description: "Video for Event",
        contentLoc: { href: video.videoUrl?.trim() },
        publicationDate: lastmod,
      }));

    return {
      loc: `https://sarajevoexpats.com/events/${event._id}`,
      lastmod,
      priority: 0.7,
      ...(images.length > 0 && { images }),
      ...(videos.length > 0 && { videos }),
    };
  });

  return getServerSideSitemap(fields);
}
