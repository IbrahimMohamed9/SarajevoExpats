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
    loader: "custom",
    loaderFile: "./src/utils/imageLoader.js",
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
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

module.exports = nextConfig;
