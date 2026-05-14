export type MenuCategorySlug = "bowls" | "plates" | "wraps" | "sides" | "drinks" | "desserts";

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

export interface MenuItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  priceGBP: number;
  imageUrl: string;
  category: MenuCategorySlug;
  isBestSeller: boolean;
  allergens: Allergen[];
  nutrition: NutritionFacts | null;
}

export interface MenuCategory {
  slug: MenuCategorySlug;
  label: string;
}
