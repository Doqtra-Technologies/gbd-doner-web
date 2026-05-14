"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { formatGBP } from "@/lib/utils";
import type { MenuItem } from "@/domain/menu-item";

export function MenuCard({ item, index }: { item: MenuItem; index: number }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.4), ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <div className="relative aspect-square overflow-hidden bg-gbd-cream">
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {item.isBestSeller && (
          <div className="absolute top-4 left-4 bg-gbd-red text-white display-eyebrow px-3 py-1.5">
            Best Seller
          </div>
        )}
      </div>
      <div className="pt-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display font-bold uppercase tracking-display text-lg text-gbd-navy">
            {item.title}
          </h3>
          <span className="font-display font-bold text-gbd-red">
            {formatGBP(item.priceGBP)}
          </span>
        </div>
        <p className="body-base text-gbd-navy/70 mt-2">{item.description}</p>
        {item.allergens.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {item.allergens.map((a) => (
              <span
                key={a.code}
                className="text-xs uppercase tracking-[0.12em] font-display font-bold px-2.5 py-1 bg-gbd-navy/5 text-gbd-navy/70"
              >
                {a.label}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
}
