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
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3030',
        pathname: '/photos/**',
      },
    ],
  },
};

module.exports = nextConfig;
