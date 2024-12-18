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
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "rest.sarajevoexpats.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "rest.sarajevoexpats.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
