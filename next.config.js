/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["www.pixelstalk.net", "a0.muscache.com"],
  },
};

module.exports = nextConfig;
