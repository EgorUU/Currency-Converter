import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  asePath: process.env.NODE_ENV === 'production' ? '/Currency-Converter' : '', // Замените `repo-name` на имя вашего репозитория
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Currency-Converter/' : '',
};



export default nextConfig;
