"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion } from "framer-motion";
import { CTAButton } from "@/components/ui/cta-button";
import { cn } from "@/lib/utils";
import type { Location } from "@/domain/location";

export function OutletCarousel({ locations }: { locations: Location[] }) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  function scrollBy(amount: number) {
    scrollerRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  }

  return (
    <section className="py-10 bg-canvas border-t border-border-hairline">
      <div className="mx-auto max-w-shell px-5">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="font-display text-2xl font-bold uppercase tracking-display">The Branches</h3>
            <p className="mt-2 max-w-lg text-sm text-text-secondary">Find your nearest branch for pickup or delivery.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              aria-label="previous"
              onClick={() => scrollBy(-600)}
              className="h-10 w-10 rounded-full bg-white/90 shadow flex items-center justify-center text-accent"
            >
              ‹
            </button>
            <button
              aria-label="next"
              onClick={() => scrollBy(600)}
              className="h-10 w-10 rounded-full bg-white/90 shadow flex items-center justify-center text-accent"
            >
              ›
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="no-scrollbar -mx-3 flex gap-6 overflow-x-auto pb-6 px-3 touch-pan-x"
        >
          {locations.map((loc) => (
            <article
              key={loc.id}
              className="group relative w-[320px] shrink-0 rounded-2xl bg-white/60 p-4 shadow-[0_18px_40px_rgba(15,30,45,0.08)]"
            >
              <div className="relative overflow-hidden rounded-xl">
                <motion.div
                  className="h-56 w-full"
                  whileHover={{ x: -24 }}
                  transition={{ type: "spring", stiffness: 120, damping: 18 }}
                >
                  <Image
                    src={loc.imageUrl ?? "/logo/gbd-logo.png"}
                    alt={loc.name}
                    width={520}
                    height={320}
                    className="object-cover w-full h-56 rounded-xl"
                  />
                </motion.div>

                <div className="absolute left-4 top-4 rounded-full bg-white/80 px-3 py-1 text-sm font-bold">
                  {loc.city}
                </div>

                <div className="absolute inset-x-4 bottom-4 flex translate-y-4 items-center justify-center gap-3 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  <CTAButton variant="primary" href={loc.clickAndCollectUrl ?? "/order-now"} className="min-w-[120px]">
                    Order online
                  </CTAButton>
                  <CTAButton variant="tertiary" href={`/locations/${loc.slug}`} className="min-w-[120px]">
                    View details
                  </CTAButton>
                </div>
              </div>

              <div className="mt-4 flex items-start justify-between">
                <div>
                  <h4 className="font-display text-lg font-bold truncate">{loc.name}</h4>
                  <p className="mt-1 text-sm text-text-secondary truncate">{loc.addressLine1}</p>
                </div>
                <div className="text-right">
                  <p className="font-body text-sm">{loc.city}</p>
                </div>
              </div>

              <Link
                href={`/locations#${loc.slug}`}
                className={cn(
                  "absolute inset-0 rounded-2xl p-4 text-transparent",
                )}
                aria-hidden
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
