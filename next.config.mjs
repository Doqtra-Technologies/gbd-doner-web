import dns from "node:dns";

dns.setDefaultResultOrder("ipv4first");

const remotePatterns = [
  { protocol: "https", hostname: "cdn.sanity.io" },
  { protocol: "https", hostname: "**.gbdoner.com" },
  { protocol: "https", hostname: "secure.gravatar.com" },
  { protocol: "https", hostname: "images.unsplash.com" },
  { protocol: "http", hostname: "localhost" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns,
  },
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
};

export default nextConfig;
