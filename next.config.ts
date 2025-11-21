import type { NextConfig } from "next";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
 

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.alphacoders.com",
      },
    ],
  },
};

export default nextConfig;