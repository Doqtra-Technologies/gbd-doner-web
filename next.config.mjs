import dns from "node:dns";

dns.setDefaultResultOrder("ipv4first");

const remotePatterns = [
  { protocol: "https", hostname: "**.gbdoner.com" },
  { protocol: "https", hostname: "secure.gravatar.com" },
  { protocol: "https", hostname: "images.unsplash.com" },
  // Local headless WordPress (LocalWP / Laragon / wp-env).
  { protocol: "http", hostname: "gbd.local" },
  { protocol: "https", hostname: "gbd.local" },
  { protocol: "http", hostname: "gbddoner.local" },
  { protocol: "https", hostname: "gbddoner.local" },
  { protocol: "http", hostname: "**.local" },
  { protocol: "https", hostname: "**.local" },
  { protocol: "http", hostname: "localhost" },
];

// Dynamically extract and allow the live WordPress image domain
const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL;
if (wpUrl) {
  try {
    const parsed = new URL(wpUrl);
    const protocol = parsed.protocol.replace(":", "");
    
    // Allow the exact host (e.g. api.greatbritishdoner.com)
    remotePatterns.push({
      protocol,
      hostname: parsed.hostname,
    });
    
    // Also allow the wildcard parent domain (e.g. **.greatbritishdoner.com)
    const hostParts = parsed.hostname.split(".");
    if (hostParts.length > 2) {
      const parentDomain = hostParts.slice(-2).join(".");
      remotePatterns.push({
        protocol,
        hostname: `**.${parentDomain}`,
      });
    }
  } catch (error) {
    // Ignore parsing errors for empty or malformed URLs
  }
}

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
