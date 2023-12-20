/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  target: "serverless",
};

module.exports = nextConfig;
