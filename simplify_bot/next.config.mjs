/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: (config, { dev, isServer }) => {
    // Disable caching in development mode
    if (dev) {
      config.cache = false;
    }

    return config;
  },
  // Removed the unrecognized experimental key
};

export default nextConfig;