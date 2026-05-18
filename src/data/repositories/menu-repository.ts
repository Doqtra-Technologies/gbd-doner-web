import { dataConfig } from "@/lib/config";
import type { MenuItem, MenuCategory, MenuCategorySlug } from "@/domain/menu-item";
import { getGraphQLClient } from "@/data/graphql/client";
import { MENU_ITEMS_QUERY } from "@/data/graphql/queries";
import { MOCK_MENU_CATEGORIES, MOCK_MENU_ITEMS } from "@/data/graphql/mocks";

interface RawMenuItemsResponse {
  menuItems: {
    nodes: Array<{
      id: string;
      slug: string;
      title: string;
      excerpt: string | null;
      featuredImage: { node: { sourceUrl: string; altText: string | null } } | null;
      menuItemFields: {
        priceGbp: number | null;
        isBestSeller: boolean | null;
        category: MenuCategorySlug | null;
        allergens: Array<{ code: string; label: string }> | null;
        nutrition: {
          calories: number;
          protein: number;
          carbs: number;
          fat: number;
        } | null;
      } | null;
    }>;
  };
}

function stripHtml(s: string | null | undefined): string {
  if (!s) return "";
  return s.replace(/<[^>]*>/g, "").trim();
}

export async function getMenuItems(): Promise<MenuItem[]> {
  if (dataConfig.useMocks) return MOCK_MENU_ITEMS;

  const client = getGraphQLClient();
  const data = await client.request<RawMenuItemsResponse>(MENU_ITEMS_QUERY);

  return data.menuItems.nodes.map((node): MenuItem => {
    const f = node.menuItemFields ?? null;
    return {
      id: node.id,
      slug: node.slug,
      title: node.title,
      description: stripHtml(node.excerpt),
      priceGBP: f?.priceGbp ?? null,
      imageUrl: node.featuredImage?.node.sourceUrl ?? "",
      category: (f?.category ?? "boxes") as MenuCategorySlug,
      isBestSeller: Boolean(f?.isBestSeller),
      allergens: f?.allergens ?? [],
      nutrition: f?.nutrition ?? null,
    };
  });
}

export async function getBestSellers(limit = 4): Promise<MenuItem[]> {
  const all = await getMenuItems();
  return all.filter((i) => i.isBestSeller).slice(0, limit);
}

export async function getMenuCategories(): Promise<MenuCategory[]> {
  // Categories are an enum on the domain side; this stays a simple lookup
  // whether data is mocked or live.
  return MOCK_MENU_CATEGORIES;
}
