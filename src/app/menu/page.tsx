import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { MenuGrid } from "@/components/menu/menu-grid";
import {
  getMenuItems,
  getMenuCategories,
} from "@/data/repositories/menu-repository";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Bowls, plates, wraps, sides. Built on ethically sourced doner, slow-spit roasted.",
};

export default async function MenuPage() {
  const [items, categories] = await Promise.all([
    getMenuItems(),
    getMenuCategories(),
  ]);

  return (
    <Container className="py-20 md:py-28">
      <div className="display-eyebrow text-gbd-red mb-4">The Menu</div>
      <h1 className="display-h1 text-gbd-navy mb-6">Built for the city.</h1>
      <p className="body-lg text-gbd-navy/70 max-w-2xl mb-16">
        Prices include VAT. Allergen labels are advisory — please flag anything in-store
        and we&apos;ll talk you through it.
      </p>
      <MenuGrid items={items} categories={categories} />
    </Container>
  );
}
