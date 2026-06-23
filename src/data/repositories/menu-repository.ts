import type { MenuItem, MenuCategory } from "@/domain/menu-item";
import { client } from "@/data/sanity/client";

export interface MenuItemDetail extends MenuItem {
  bodyHtml: string | null;
}

export async function getMenuItems(): Promise<MenuItem[]> {
  const query = `*[_type == "menuItem"] | order(title asc) {
    "id": _id,
    "slug": slug.current,
    title,
    description,
    priceGBP,
    "imageUrl": image.asset->url,
    category,
    isBestSeller,
    allergens,
    nutrition,
    dietaryFlags
  }`;

  const items = await client.fetch<MenuItem[]>(query);
  return (items || []).map(item => ({
    ...item,
    allergens: item.allergens || [],
    dietaryFlags: item.dietaryFlags || []
  }));
}

export async function getMenuItemBySlug(slug: string): Promise<MenuItemDetail | null> {
  const query = `*[_type == "menuItem" && slug.current == $slug][0] {
    "id": _id,
    "slug": slug.current,
    title,
    description,
    priceGBP,
    "imageUrl": image.asset->url,
    category,
    isBestSeller,
    allergens,
    nutrition,
    dietaryFlags
  }`;

  const item = await client.fetch<MenuItemDetail | null>(query, { slug });
  if (!item) return null;

  return {
    ...item,
    allergens: item.allergens || [],
    dietaryFlags: item.dietaryFlags || [],
    bodyHtml: null, // Basic schema omits rich body for menu items
  };
}

export async function getBestSellers(limit = 4): Promise<MenuItem[]> {
  const all = await getMenuItems();
  return all.filter((i) => i.isBestSeller).slice(0, limit);
}

export async function getMenuCategories(): Promise<MenuCategory[]> {
  // Hardcoded for now based on domain model categories until moved to Sanity
  return [
    { slug: "salad", label: "Salads" },
    { slug: "boxes", label: "Doner Boxes" },
    { slug: "wraps", label: "Wraps" },
    { slug: "burgers", label: "Burgers" },
    { slug: "sides", label: "Sides" },
    { slug: "desserts", label: "Desserts" },
    { slug: "kids-menu", label: "Kids" },
    { slug: "drinks", label: "Drinks" },
  ];
}
