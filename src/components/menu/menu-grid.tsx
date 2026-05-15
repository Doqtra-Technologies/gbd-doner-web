"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProductCard } from "@/components/product/product-card";
import { cn, formatGBP } from "@/lib/utils";
import { EASE } from "@/brand/motion";
import type { MenuItem, MenuCategory, MenuCategorySlug } from "@/domain/menu-item";

type Filter = MenuCategorySlug | "all";

export function MenuGrid({
  items,
  categories,
}: {
  items: MenuItem[];
  categories: MenuCategory[];
}) {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(
    () =>
      filter === "all" ? items : items.filter((i) => i.category === filter),
    [filter, items],
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-12">
        <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>
          All
        </FilterChip>
        {categories.map((c) => (
          <FilterChip
            key={c.slug}
            active={filter === c.slug}
            onClick={() => setFilter(c.slug)}
          >
            {c.label}
          </FilterChip>
        ))}
      </div>

      <motion.div layout className="grid gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.3, ease: EASE.out }}
            >
              <ProductCard
                variant="compact"
                title={item.title}
                price={formatGBP(item.priceGBP)}
                description={item.description}
                imageUrl={item.imageUrl}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "font-display font-bold uppercase tracking-button text-xs px-4 h-10 rounded-full transition-colors duration-300 ease-smooth",
        active
          ? "bg-surface-inverse text-text-inverse"
          : "bg-canvas text-text-primary border border-border-hairline hover:border-border-strong",
      )}
    >
      {children}
    </button>
  );
}
