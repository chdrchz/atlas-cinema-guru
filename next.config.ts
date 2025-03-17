/** @type {import('next').NextConfig} */

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    POSTGRES_URL: process.env.POSTGRES_URL,  // Make the env variable available in your Next.js app
  },
};

export default nextConfig;
