"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { formatGBP } from "@/lib/utils";
import type { MenuItem, NutritionFacts } from "@/domain/menu-item";

export function MenuCard({ item, index }: { item: MenuItem; index: number }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: Math.min(index * 0.06, 0.4),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group flex flex-col"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-[900ms] ease-smooth group-hover:scale-[1.04]"
        />
        {item.isBestSeller && (
          <span className="absolute top-4 left-4 inline-flex items-center rounded-full bg-gbd-red px-3 py-1 font-display font-bold uppercase tracking-[0.18em] text-[10px] text-white">
            Best Seller
          </span>
        )}
      </div>

      <div className="pt-7">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display font-bold uppercase tracking-tighter text-xl md:text-2xl text-gbd-navy">
            {item.title}
          </h3>
          <span className="font-display font-bold text-sm text-gbd-navy">
            {formatGBP(item.priceGBP)}
          </span>
        </div>

        <p className="mt-3 font-body text-sm leading-relaxed text-gbd-navy/70">
          {item.description}
        </p>

        {item.nutrition && <NutritionGrid n={item.nutrition} />}
      </div>
    </motion.article>
  );
}

function NutritionGrid({ n }: { n: NutritionFacts }) {
  const cells: Array<{ label: string; value: string }> = [
    { label: "Cal", value: `${n.calories}` },
    { label: "Protein", value: `${n.protein}g` },
    { label: "Carbs", value: `${n.carbs}g` },
    { label: "Fat", value: `${n.fat}g` },
  ];
  return (
    <dl className="mt-6 grid grid-cols-4 border-t border-gbd-navy/15">
      {cells.map((c, i) => (
        <div
          key={c.label}
          className={
            "flex flex-col items-start py-3 " +
            (i > 0 ? "border-l border-gbd-navy/10 pl-3" : "")
          }
        >
          <dt className="font-display font-bold uppercase tracking-[0.14em] text-[10px] text-gbd-navy/50">
            {c.label}
          </dt>
          <dd className="mt-1 font-display font-bold text-xs text-gbd-navy">
            {c.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
