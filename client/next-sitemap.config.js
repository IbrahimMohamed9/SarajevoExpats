/** @type {import('next-sitemap').IConfig} */

const siteUrl = process.env.SITE_URL || "https://sarajevoexpats.com";

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  sitemapSize: 50000,
  exclude: ["/dashboard/*", "/api/*", "/login", "/register"],
  robotsTxtOptions: {
    additionalSitemaps: [
      `${siteUrl}/sitemap-static/sitemap.xml`,
      `${siteUrl}/sitemap-events.xml`,
      `${siteUrl}/sitemap-news.xml`,
      `${siteUrl}/sitemap-places.xml`,
      `${siteUrl}/sitemap-services.xml`,
    ],
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard/", "/api/", "/login", "/register"],
      },
    ],
  },
};
