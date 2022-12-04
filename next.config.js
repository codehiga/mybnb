/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["www.pixelstalk.net", "a0.muscache.com", "www.macau.rn.leg.br"],
  },
};

module.exports = nextConfig;
