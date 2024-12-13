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
        protocol: "http",
        hostname: "localhost",
        port: "3030",
        pathname: "/photos/**",
      },
    ],
  },
};

module.exports = nextConfig;
