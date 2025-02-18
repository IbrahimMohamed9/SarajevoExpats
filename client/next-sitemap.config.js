/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://sarajevoexpats.com", 
  generateRobotsTxt: true, 
  sitemapSize: 50000, 
  exclude: ["/dashboard/*", "/api/*", "/login", "/register"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard/", "/api/", "/login", "/register"], 
      },
    ],
  },
};
