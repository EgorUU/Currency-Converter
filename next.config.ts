import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // assetPrefix: process.env.NODE_ENV === 'production' ? '/your-repo-name/' : '', // замените your-repo-name на название вашего репозитория
  basePath: "/Currency-Converter",
};



export default nextConfig;
