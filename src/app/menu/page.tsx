import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
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
    <Section size="hero">
      <Container>
        <Eyebrow tone="accent" className="block mb-4">
          The Menu
        </Eyebrow>
        <Heading level={1} className="mb-6">
          Built for the city.
        </Heading>
        <p className="font-body text-lg leading-relaxed text-text-secondary max-w-2xl mb-16">
          Prices include VAT. Allergen labels are advisory — please flag anything
          in-store and we&apos;ll talk you through it.
        </p>
        <MenuGrid items={items} categories={categories} />
      </Container>
    </Section>
  );
}
