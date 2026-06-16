import type { Metadata } from "next";
import { FullMenu } from "@/components/menu/full-menu";
import {
  getMenuItems,
  getMenuCategories,
} from "@/data/repositories/menu-repository";
import { JsonLd } from "@/components/ui/json-ld";
import { siteConfig } from "@/lib/config";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Explore the Full GBD Doner Menu",
  description: "Freshly prepared doner boxes, wraps, burgers, sides, and drinks from Great British Doner. Halal, vegan, and vegetarian options available.",
  keywords: ["GBD Doner Menu", "doner kebab menu", "halal doner menu", "vegan doner", "doner boxes", "doner wraps"],
  alternates: {
    canonical: "/menu",
  },
  openGraph: {
    title: "Explore the Full GBD Doner Menu",
    description: "Freshly prepared doner boxes, wraps, burgers, sides, and drinks from Great British Doner.",
    url: "/menu",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Explore the Full GBD Doner Menu",
    description: "Freshly prepared doner boxes, wraps, burgers, sides, and drinks from Great British Doner.",
  },
};

export default async function MenuPage() {
  const [items, categories] = await Promise.all([
    getMenuItems(),
    getMenuCategories(),
  ]);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: "GBD Doner Menu",
    url: `${siteConfig.url}/menu`,
    mainEntityOfPage: `${siteConfig.url}/menu`,
    hasMenuSection: categories.map((cat) => ({
      "@type": "MenuSection",
      name: cat.label,
      description: cat.description || `Explore our ${cat.label} menu.`,
      hasMenuItem: items
        .filter((i) => i.category === cat.slug)
        .map((item) => ({
          "@type": "MenuItem",
          name: item.title,
          description: item.description,
          image: item.imageUrl ? (item.imageUrl.startsWith("http") ? item.imageUrl : `${siteConfig.url}${item.imageUrl}`) : undefined,
          offers: {
            "@type": "Offer",
            price: item.priceGBP,
            priceCurrency: "GBP",
            availability: "https://schema.org/InStock",
            url: `${siteConfig.url}/menu/${item.slug}`,
          },
          suitableForDiet: (item.dietaryFlags as string[] | undefined)?.includes("VG")
            ? "https://schema.org/VeganDiet"
            : (item.dietaryFlags as string[] | undefined)?.includes("Halal")
            ? "https://schema.org/HalalDiet"
            : undefined,
        })),
    })),
  };

  return (
    <main className="relative w-full max-w-full overflow-x-hidden bg-white">
      <JsonLd data={schema} />
      <FullMenu items={items} categories={categories} />
    </main>
  );
}
