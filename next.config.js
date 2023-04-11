/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["ramen-sns-s3.s3.ap-northeast-1.amazonaws.com"],
    unoptimized: true,
  },
  compiler: {
    styledComponents: true,
  },
  experimental: { scrollRestoration: true },
};

module.exports = nextConfig;
