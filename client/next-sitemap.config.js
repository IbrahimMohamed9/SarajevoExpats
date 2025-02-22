/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://sarajevoexpats.com",
  generateRobotsTxt: true,
  sitemapSize: 50000,
  exclude: ["/dashboard/*", "/api/*", "/login", "/register"],
  robotsTxtOptions: {
    additionalSitemaps: [
      `${process.env.SITE_URL}/sitemap-static/sitemap.xml`,
      `${process.env.SITE_URL}/sitemap-events.xml`,
      `${process.env.SITE_URL}/sitemap-news.xml`,
      `${process.env.SITE_URL}/sitemap-places.xml`,
      `${process.env.SITE_URL}/sitemap-services.xml`,
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
