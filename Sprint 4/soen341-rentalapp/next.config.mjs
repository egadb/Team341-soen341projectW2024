/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.motortrend.com",
        hostname: "purepng.com",
        hostname: "p7.hiclipart.com",
        hostname: "pngimg.com",
        hostname: "www.pngall.com",
        hostname: "www.motortrend.com"
      },
    ],
  },
};

export default nextConfig;
