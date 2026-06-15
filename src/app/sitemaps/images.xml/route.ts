import { siteConfig } from "@/lib/config";
import { getMenuItems } from "@/data/repositories/menu-repository";
import { getLocations } from "@/data/repositories/locations-repository";
import { getPosts } from "@/data/repositories/posts-repository";

export async function GET() {
  const items = await getMenuItems();
  const locations = await getLocations();
  const posts = await getPosts();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

  // Global images
  xml += `  <url>\n    <loc>${siteConfig.url}/</loc>\n    <image:image>\n      <image:loc>${siteConfig.url}/banner/location.jpeg</image:loc>\n    </image:image>\n  </url>\n`;

  // Menu items images
  items.forEach((item) => {
    if (item.imageUrl) {
      xml += `  <url>\n    <loc>${siteConfig.url}/menu/${item.slug}</loc>\n    <image:image>\n      <image:loc>${item.imageUrl.startsWith("http") ? item.imageUrl : `${siteConfig.url}${item.imageUrl}`}</image:loc>\n      <image:title>${item.title}</image:title>\n    </image:image>\n  </url>\n`;
    }
  });

  // Location images
  locations.forEach((loc) => {
    if (loc.imageUrl) {
      xml += `  <url>\n    <loc>${siteConfig.url}/locations/${loc.slug}</loc>\n    <image:image>\n      <image:loc>${loc.imageUrl.startsWith("http") ? loc.imageUrl : `${siteConfig.url}${loc.imageUrl}`}</image:loc>\n      <image:title>${loc.name}</image:title>\n    </image:image>\n  </url>\n`;
    }
  });

  // Blog post images
  posts.forEach((post) => {
    if (post.featuredImageUrl) {
      xml += `  <url>\n    <loc>${siteConfig.url}/feed/${post.slug}</loc>\n    <image:image>\n      <image:loc>${post.featuredImageUrl.startsWith("http") ? post.featuredImageUrl : `${siteConfig.url}${post.featuredImageUrl}`}</image:loc>\n      <image:title>${post.title}</image:title>\n    </image:image>\n  </url>\n`;
    }
  });

  xml += `</urlset>`;

  return new Response(xml, { headers: { "Content-Type": "application/xml" } });
}
