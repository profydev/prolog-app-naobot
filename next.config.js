const { version } = require("./package.json"); // eslint-disable-line

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

module.exports = nextConfig;
