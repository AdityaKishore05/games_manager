import type { NextConfig } from "next";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
 

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}