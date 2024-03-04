import { version } from './package.json';

/** @type {import('next').NextConfig} */
const nextConfig = {
  publicRuntimeConfig: {
    version,
  },
  reactStrictMode: true,
  images: {
    domains: ["prolog-api.profy.dev"],
  },
};

export default nextConfig;
