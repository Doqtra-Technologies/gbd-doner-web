import { dataConfig } from "@/lib/config";
import type { MenuItem, MenuCategory } from "@/domain/menu-item";
import { client } from "@/data/sanity/client";
import { MOCK_MENU_CATEGORIES, MOCK_MENU_ITEMS } from "@/data/graphql/mocks";

export interface MenuItemDetail extends MenuItem {
  bodyHtml: string | null;
}

export async function getMenuItems(): Promise<MenuItem[]> {
  if (dataConfig.useMocks) return MOCK_MENU_ITEMS;

  try {
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
  } catch (error) {
    console.error("Failed to fetch menu items from Sanity, falling back to mock menu items:", error);
    return MOCK_MENU_ITEMS;
  }
}

export async function getMenuItemBySlug(slug: string): Promise<MenuItemDetail | null> {
  if (dataConfig.useMocks) {
    const hit = MOCK_MENU_ITEMS.find((i) => i.slug === slug);
    return hit ? { ...hit, bodyHtml: null } : null;
  }

  try {
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
  } catch (error) {
    console.error(`Failed to fetch menu item by slug ${slug} from Sanity, falling back to mock:`, error);
    const hit = MOCK_MENU_ITEMS.find((i) => i.slug === slug);
    return hit ? { ...hit, bodyHtml: null } : null;
  }
}

export async function getBestSellers(limit = 4): Promise<MenuItem[]> {
  const all = await getMenuItems();
  return all.filter((i) => i.isBestSeller).slice(0, limit);
}

export async function getMenuCategories(): Promise<MenuCategory[]> {
  return MOCK_MENU_CATEGORIES;
}
