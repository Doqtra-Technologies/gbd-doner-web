"use client";

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
      <header className="bg-canvas border-b border-border-hairline">
        <Container className="py-6 sm:py-8 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
          <div>
            <Eyebrow tone="accent" className="block mb-2">
              02 — The Menu
            </Eyebrow>
            <h1 className="font-display font-bold uppercase tracking-display leading-none text-2xl md:text-3xl text-text-primary">
              The Full Catalog.
            </h1>
          </div>
          <p className="font-body text-sm text-text-secondary opacity-70 max-w-md">
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
          {/* Promo Banner */}
          <div className="bg-surface-inverse rounded-none p-4 sm:px-6 sm:py-5 flex items-center justify-between mb-8 sm:mb-12 cursor-pointer group transition-shadow">
            <span className="font-display font-bold text-[10px] sm:text-xs text-text-inverse tracking-eyebrow uppercase">
              LOGIN TO GBD INSIDERS TO EARN POINTS AND REDEEM REWARDS.
            </span>
            <div className="bg-canvas rounded-none w-8 h-8 flex items-center justify-center text-text-primary transition-transform group-hover:translate-x-1 flex-shrink-0 ml-4">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          </div>

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
