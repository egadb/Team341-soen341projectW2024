/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.motortrend.com",
      },
    ],
  },
};

export default nextConfig;
