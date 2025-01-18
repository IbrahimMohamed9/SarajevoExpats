/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": "./src",
      "@atoms": "./src/components/atoms",
      "@molecules": "./src/components/molecules",
      "@organisms": "./src/components/organisms",
      "@templates": "./src/components/templates",
      "@adminAto": "./src/app/(admin)/components/atoms",
      "@adminMol": "./src/app/(admin)/components/molecules",
      "@adminOrg": "./src/app/(admin)/components/organisms",
      "@adminTem": "./src/app/(admin)/components/templates",
    };
    return config;
  },
  images: {
    domains: ["sarajevoexpats.com", "images.pexels.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/photos/**",
      },
      {
        protocol: "https",
        hostname: "sarajevoexpats.com",
        pathname: "/api/photos/**",
      },
    ],
    minimumCacheTTL: 60,
    formats: ["image/webp"],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

module.exports = nextConfig;
