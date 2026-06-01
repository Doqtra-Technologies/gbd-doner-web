"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { StickyCategoryNav } from "@/components/menu/sticky-category-nav";
import { CategorySection } from "@/components/menu/category-section";
import type { MenuItem, MenuCategory } from "@/domain/menu-item";

/**
 * FullMenu — the high-density ordering matrix.
 *
 * Orchestrates:
 *   - A compact page intro band (one line, no editorial hero).
 *   - The sticky category nav (pill bar).
 *   - One CategorySection per non-empty category.
 *
 * Behaviour:
 *   - Clicking a pill smooth-scrolls to that category's anchor and
 *     immediately sets the pill active.
 *   - During scroll, an IntersectionObserver tracks which section's
 *     header is closest to the top of the viewport (offset by the
 *     navbar+pill height) and syncs the active pill.
 *   - A short "intent lock" suppresses observer-driven updates for
 *     900ms after a click, so the pill doesn't flicker mid-scroll.
 */
export function FullMenu({
  items,
  categories,
}: {
  items: MenuItem[];
  categories: MenuCategory[];
}) {
  // Group items by category once. Skip empty categories — the pill bar
  // shouldn't advertise empty chapters.
  const populated = useMemo(() => {
    return categories
      .map((cat) => ({
        category: cat,
        items: items.filter((i) => i.category === cat.slug),
      }))
      .filter((g) => g.items.length > 0);
  }, [items, categories]);

  const populatedCategories = useMemo(
    () => populated.map((g) => g.category),
    [populated],
  );

  const [activeSlug, setActiveSlug] = useState<string>("all");
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
  const intentLockRef = useRef<number | null>(null);

  const onSelect = useCallback((slug: string) => {
    setActiveSlug(slug);
    intentLockRef.current = Date.now();
    if (slug === "all") {
      // Scroll back to the top of the catalog. Use the first section.
      const first = sectionRefs.current.values().next().value as
        | HTMLElement
        | undefined;
      if (first) {
        first.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }
    const el = sectionRefs.current.get(slug);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  // Scrollspy — observe section anchors and pick the topmost intersecting
  // one as the active slug.
  useEffect(() => {
    if (populated.length === 0) return;
    const sections = Array.from(sectionRefs.current.entries());
    if (sections.length === 0) return;

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // Honour the intent lock — for 900ms after a click, ignore
        // observer-driven changes to prevent flicker.
        if (intentLockRef.current && Date.now() - intentLockRef.current < 900) {
          return;
        }
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              a.target.getBoundingClientRect().top -
              b.target.getBoundingClientRect().top,
          );
        const top = visible[0];
        if (top) {
          const slug = (top.target as HTMLElement).dataset.categorySlug;
          if (slug) setActiveSlug(slug);
        }
      },
      {
        // The sticky navbar is 5rem (80px) and the pill bar is ~3.5rem
        // (56px). Offset the top of the observer's viewport so a section
        // counts as "active" once its header crosses below the pill bar.
        // IntersectionObserver rootMargin only supports px or % (no rem).
        rootMargin: "-144px 0px -65% 0px",
        threshold: 0,
      },
    );

    sections.forEach(([, el]) => observer.observe(el));
    return () => observer.disconnect();
  }, [populated]);

  return (
    <>
      {/* Compact intro band — replaces the previous editorial hero */}
      <header
        data-theme="dark"
        className="relative w-full aspect-square md:aspect-video lg:aspect-[21/9] overflow-hidden border-b border-border-hairline bg-surface-inverse"
      >
        <Image
          src="/menu/BANNER/ChatGPT Image 24 May 2026 23_18_04.png"
          alt="GBD menu spread with wraps, sides, and signature plates"
          fill
          priority
          sizes="100vw"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-surface-inverse/45" />
        <Container className="absolute inset-0 z-10 flex h-full flex-col justify-end gap-4 pb-10 lg:pb-16">
          <div className="flex flex-col gap-3">
            <Eyebrow tone="inverse" className="block">
              02 — The Menu
            </Eyebrow>
            <h1 className="font-display font-bold uppercase tracking-display leading-none text-4xl sm:text-5xl lg:text-6xl text-text-inverse">
              The Full Catalog.
            </h1>
          </div>
          <p className="font-body text-sm sm:text-base text-text-inverse opacity-85 max-w-md">
            Prices include VAT. Allergens are advisory — flag anything
            in-store and we&apos;ll talk you through it.
          </p>
        </Container>
      </header>

      <StickyCategoryNav
        categories={populatedCategories}
        activeSlug={activeSlug}
        onSelect={onSelect}
      />

      {/* Catalog */}
      <div className="bg-canvas min-h-screen pb-24">
        <Container className="pt-8">
          <div className="flex flex-col gap-12 sm:gap-16">
            {populated.map(({ category, items: catItems }) => (
              <CategorySection
                key={category.slug}
                ref={(el) => {
                  if (el) sectionRefs.current.set(category.slug, el);
                  else sectionRefs.current.delete(category.slug);
                }}
                category={category}
                items={catItems}
              />
            ))}
          </div>
        </Container>

        {populated.length === 0 && (
          <p className="font-body text-sm text-text-secondary opacity-70 py-24 text-center">
            The menu is being updated. Check back shortly.
          </p>
        )}
      </div>
    </>
  );
}
