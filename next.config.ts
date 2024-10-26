import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "drive.google.com",
        pathname: "/uc*", // Adjust the pathname for Google Drive image URLs
      },
    ],
  },
};

export default nextConfig;
