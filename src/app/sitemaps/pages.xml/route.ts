import { siteConfig } from "@/lib/config";

export async function GET() {
  const pages = [
    { path: "", priority: "1.0", freq: "daily" },
    { path: "/menu", priority: "0.9", freq: "daily" },
    { path: "/locations", priority: "0.9", freq: "daily" },
    { path: "/our-story", priority: "0.8", freq: "weekly" },
    { path: "/catering", priority: "0.8", freq: "weekly" },
    { path: "/loyalty", priority: "0.8", freq: "weekly" },
    { path: "/franchise", priority: "0.8", freq: "weekly" },
    { path: "/feed", priority: "0.8", freq: "daily" },
    { path: "/order-now", priority: "0.9", freq: "weekly" },
    // SEO Landing Pages
    { path: "/halal-doner", priority: "0.7", freq: "weekly" },
    { path: "/vegan-doner", priority: "0.7", freq: "weekly" },
    { path: "/doner-delivery", priority: "0.7", freq: "weekly" },
    { path: "/doner-near-me", priority: "0.7", freq: "weekly" },
    { path: "/doner-catering", priority: "0.7", freq: "weekly" },
    { path: "/corporate-catering", priority: "0.7", freq: "weekly" },
    { path: "/event-catering-manchester", priority: "0.7", freq: "weekly" },
    { path: "/event-catering-liverpool", priority: "0.7", freq: "weekly" },
    { path: "/doner-franchise", priority: "0.7", freq: "weekly" },
    { path: "/restaurant-franchise", priority: "0.7", freq: "weekly" },
    { path: "/food-franchise-uk", priority: "0.7", freq: "weekly" },
    { path: "/manchester-doner", priority: "0.7", freq: "weekly" },
    { path: "/liverpool-doner", priority: "0.7", freq: "weekly" },
    { path: "/best-doner-manchester", priority: "0.7", freq: "weekly" },
    { path: "/best-doner-liverpool", priority: "0.7", freq: "weekly" },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map(
      (page) => `
  <url>
    <loc>${siteConfig.url}${page.path}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page.freq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join("")}
</urlset>`;

  return new Response(xml, { headers: { "Content-Type": "application/xml" } });
}
