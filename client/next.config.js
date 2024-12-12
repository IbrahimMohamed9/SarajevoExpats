/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": "./src",
      "@molecules": "./src/components/molecules",
      "@atoms": "./src/components/atoms",
      "@organisms": "./src/components/organisms",
      "@templates": "./src/components/templates",
    };
    return config;
  },
};

module.exports = nextConfig;
