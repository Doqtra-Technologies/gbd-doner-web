import { siteConfig } from "@/lib/config";
import { getPosts } from "@/data/repositories/posts-repository";

export async function GET() {
  const posts = await getPosts();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${posts
    .map(
      (post) => `
  <url>
    <loc>${siteConfig.url}/feed/${post.slug}</loc>
    <lastmod>${new Date(post.publishedAt || Date.now()).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join("")}
</urlset>`;

  return new Response(xml, { headers: { "Content-Type": "application/xml" } });
}
