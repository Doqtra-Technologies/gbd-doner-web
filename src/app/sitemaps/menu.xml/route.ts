import { siteConfig } from "@/lib/config";
import { getMenuItems } from "@/data/repositories/menu-repository";

export async function GET() {
  const items = await getMenuItems();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${items
    .map(
      (item) => `
  <url>
    <loc>${siteConfig.url}/menu/${item.slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join("")}
</urlset>`;

  return new Response(xml, { headers: { "Content-Type": "application/xml" } });
}
