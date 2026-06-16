import { siteConfig } from "@/lib/config";

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${siteConfig.url}/sitemaps/pages.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${siteConfig.url}/sitemaps/locations.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${siteConfig.url}/sitemaps/menu.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${siteConfig.url}/sitemaps/blog.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${siteConfig.url}/sitemaps/images.xml</loc>
  </sitemap>
</sitemapindex>
`;
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
