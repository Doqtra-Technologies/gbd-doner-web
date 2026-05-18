import type { Metadata } from "next";
import { FullMenu } from "@/components/menu/full-menu";
import {
  getMenuItems,
  getMenuCategories,
} from "@/data/repositories/menu-repository";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Boxes, wraps, burgers, sides, drinks, and desserts from GBD Doner.",
};

export default async function MenuPage() {
  const [items, categories] = await Promise.all([
    getMenuItems(),
    getMenuCategories(),
  ]);

  return <FullMenu items={items} categories={categories} />;
}
