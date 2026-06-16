import { siteConfig } from "@/lib/config";
import { getLocations } from "@/data/repositories/locations-repository";

export async function GET() {
  const locations = await getLocations();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${locations
    .map(
      (location) => `
  <url>
    <loc>${siteConfig.url}/locations/${location.slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join("")}
</urlset>`;

  return new Response(xml, { headers: { "Content-Type": "application/xml" } });
}
