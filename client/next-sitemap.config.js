/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "sarajevoexpats.com/",
  generateRobotsTxt: true,
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
