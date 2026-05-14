"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { formatGBP } from "@/lib/utils";
import type { MenuItem } from "@/domain/menu-item";

const ease = [0.22, 1, 0.36, 1] as const;

export function BestSellers({ items }: { items: MenuItem[] }) {
  return (
    <section className="bg-white py-24 md:py-32 lg:py-40">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end mb-16 md:mb-24">
          <div className="lg:col-span-7">
            <span className="block font-display font-bold uppercase tracking-[0.22em] text-[11px] text-gbd-red mb-6">
              The Lineup
            </span>
            <h2 className="font-display font-bold uppercase tracking-tighter leading-[0.95] text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-gbd-navy">
              Salad Bowls
              <br />
              <span className="text-gbd-navy/30">&amp;</span> Power Plates.
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="font-body text-base md:text-lg leading-relaxed text-gbd-navy/70">
              Real ingredients. Real protein. Built for runners, builders, and
              everyone in between.
            </p>
            <Link
              href="/menu"
              className="mt-8 inline-flex items-center gap-2 font-display font-bold uppercase tracking-[0.16em] text-xs text-gbd-navy hover:text-gbd-red transition-colors"
            >
              Full Menu <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        <div className="grid gap-x-8 gap-y-20 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease }}
              className={
                "group flex flex-col " +
                (i % 2 === 1 ? "lg:translate-y-12" : "")
              }
            >
              <Link
                href="/menu"
                aria-label={`See ${item.title} on the menu`}
                className="block"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-[900ms] ease-smooth group-hover:scale-[1.04]"
                  />
                </div>
                <div className="pt-6 flex items-baseline justify-between gap-4">
                  <h3 className="font-display font-bold uppercase tracking-tighter text-xl text-gbd-navy">
                    {item.title}
                  </h3>
                  <span className="font-display font-bold text-sm text-gbd-navy">
                    {formatGBP(item.priceGBP)}
                  </span>
                </div>
                <p className="mt-2 font-body text-sm leading-relaxed text-gbd-navy/65 line-clamp-2">
                  {item.description}
                </p>

                {item.nutrition && (
                  <dl className="mt-5 grid grid-cols-4 border-t border-gbd-navy/15">
                    <Cell label="Cal" value={`${item.nutrition.calories}`} first />
                    <Cell label="Protein" value={`${item.nutrition.protein}g`} />
                    <Cell label="Carbs" value={`${item.nutrition.carbs}g`} />
                    <Cell label="Fat" value={`${item.nutrition.fat}g`} />
                  </dl>
                )}
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Cell({
  label,
  value,
  first,
}: {
  label: string;
  value: string;
  first?: boolean;
}) {
  return (
    <div
      className={
        "flex flex-col items-start py-3 " +
        (first ? "" : "border-l border-gbd-navy/10 pl-3")
      }
    >
      <dt className="font-display font-bold uppercase tracking-[0.14em] text-[10px] text-gbd-navy/50">
        {label}
      </dt>
      <dd className="mt-1 font-display font-bold text-xs text-gbd-navy">
        {value}
      </dd>
    </div>
  );
}
