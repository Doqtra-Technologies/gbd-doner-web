export type MenuCategorySlug =
  | "salad"
  | "boxes"
  | "desserts"
  | "wraps"
  | "kids-menu"
  | "burgers"
  | "sides"
  | "drinks";

export interface Allergen {
  code: string;
  label: string;
}

export interface NutritionFacts {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

/**
 * Short codes for inline dietary badges shown on menu cards.
 *   V   — vegetarian
 *   VG  — vegan
 *   GF  — gluten-free
 *   DF  — dairy-free
 *   N   — contains nuts (informational)
 */
export type DietaryFlag = "V" | "VG" | "GF" | "DF" | "N";

export interface MenuItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  priceGBP: number | null;
  imageUrl: string;
  category: MenuCategorySlug;
  isBestSeller: boolean;
  allergens: Allergen[];
  nutrition: NutritionFacts | null;
  /** Optional short dietary badges rendered inline on the menu card. */
  dietaryFlags?: DietaryFlag[];
}

export interface MenuCategory {
  slug: MenuCategorySlug;
  label: string;
  /** Optional one-line muted descriptor shown next to the section title. */
  description?: string;
}
