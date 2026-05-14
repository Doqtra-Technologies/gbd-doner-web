"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { formatGBP } from "@/lib/utils";
import type { MenuItem } from "@/domain/menu-item";

export function BestSellers({ items }: { items: MenuItem[] }) {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div className="display-eyebrow text-gbd-red mb-3">Best Sellers</div>
            <h2 className="display-h2 text-gbd-navy max-w-xl">
              The ones we can&apos;t keep on the spit.
            </h2>
          </div>
          <ButtonLink href="/menu" variant="ghost">
            Full Menu
          </ButtonLink>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href="/menu"
                className="group block"
                aria-label={`See ${item.title} on the menu`}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-gbd-cream">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute top-4 left-4 bg-gbd-red text-white display-eyebrow px-3 py-1.5">
                    Best Seller
                  </div>
                </div>
                <div className="pt-5 flex items-baseline justify-between gap-3">
                  <h3 className="font-display font-bold uppercase tracking-display text-lg text-gbd-navy">
                    {item.title}
                  </h3>
                  <span className="font-display font-bold text-gbd-red">
                    {formatGBP(item.priceGBP)}
                  </span>
                </div>
                <p className="body-base text-gbd-navy/70 mt-2 line-clamp-2">
                  {item.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
