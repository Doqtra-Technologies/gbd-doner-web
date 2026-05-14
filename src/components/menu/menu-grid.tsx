"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MenuCard } from "@/components/menu/menu-card";
import { cn, formatGBP } from "@/lib/utils";
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
    () => (filter === "all" ? items : items.filter((i) => i.category === filter)),
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

      <motion.div layout className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((item) => (
            <MenuCard
              key={item.id}
              title={item.title}
              price={formatGBP(item.priceGBP)}
              description={item.description}
              imageUrl={item.imageUrl}
            />
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
        "font-display font-bold uppercase tracking-[0.14em] text-xs px-4 h-10 transition-colors duration-300",
        active
          ? "bg-gbd-navy text-white"
          : "bg-transparent text-gbd-navy/70 border border-gbd-navy/15 hover:text-gbd-navy hover:border-gbd-navy/40",
      )}
    >
      {children}
    </button>
  );
}
