"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion } from "framer-motion";
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
            <p className="mt-2 max-w-lg text-sm text-text-secondary">
              Find your nearest branch for pickup or delivery.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              aria-label="previous"
              onClick={() => scrollBy(-600)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-accent shadow"
            >
              ‹
            </button>
            <button
              aria-label="next"
              onClick={() => scrollBy(600)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-accent shadow"
            >
              ›
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="no-scrollbar -mx-3 flex gap-6 overflow-x-auto px-3 pb-6 touch-pan-x"
        >
          {locations.map((loc) => (
            <OutletCard key={loc.id} location={loc} />
          ))}
        </div>
      </div>
    </section>
  );
}

function OutletCard({ location }: { location: Location }) {
  const orderHref = location.clickAndCollectUrl ?? "/order-now";
  const deliveryHref = location.deliveryLinks[0]?.url ?? location.clickAndCollectUrl ?? "/order-now";
  const imageSrc = location.imageUrl ?? "/logo/gbd-logo.png";

  return (
    <motion.article
      whileHover={{ y: -6, x: 2, rotate: -1.1 }}
      transition={{ type: "spring", stiffness: 190, damping: 18 }}
      className="group relative w-[320px] shrink-0 select-none"
    >
      <div className="absolute inset-0 translate-x-6 translate-y-4 rotate-[2deg] overflow-hidden rounded-[18px] bg-canvas shadow-[0_16px_40px_rgba(15,30,45,0.08)] transition-transform duration-300 ease-out group-hover:translate-x-7 group-hover:translate-y-5 group-hover:rotate-[2.4deg]">
        <Image
          src={imageSrc}
          alt={location.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover opacity-95"
        />
      </div>

      <div className="absolute inset-0 translate-x-2 translate-y-2 rotate-[-1deg] overflow-hidden rounded-[18px] bg-canvas shadow-[0_16px_40px_rgba(15,30,45,0.08)] transition-transform duration-300 ease-out group-hover:translate-x-4 group-hover:translate-y-3 group-hover:rotate-[-1.35deg]">
        <Image
          src={imageSrc}
          alt={location.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover opacity-95"
        />
      </div>

      <div className="relative z-10 overflow-hidden rounded-[18px] bg-canvas shadow-[0_16px_40px_rgba(15,30,45,0.08)]">
        <div className="relative aspect-[4/3] overflow-hidden">
          <motion.div
            className="absolute inset-0"
            whileHover={{ x: 24, y: 1, scale: 0.985 }}
            transition={{ type: "spring", stiffness: 150, damping: 16 }}
          >
            <Image
              src={imageSrc}
              alt={location.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </motion.div>

          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,30,45,0.04)_10%,rgba(15,30,45,0.35)_100%)]" />

          <div className="absolute inset-0 flex items-center justify-center bg-surface-inverse/10 opacity-0 translate-y-3 transition-[opacity,transform] duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <div className="flex flex-col gap-3">
              <HoverPill href={orderHref} external={Boolean(location.clickAndCollectUrl)}>
                Order Now
              </HoverPill>
              <HoverPill href={deliveryHref} external={Boolean(location.deliveryLinks[0]?.url ?? location.clickAndCollectUrl)}>
                Delivery
              </HoverPill>
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <h4 className="font-display text-[clamp(1.25rem,2vw,1.55rem)] font-bold uppercase tracking-display leading-tight text-text-primary">
            {location.name}
          </h4>
        </div>
      </div>
    </motion.article>
  );
}

function HoverPill({
  href,
  external,
  children,
}: {
  href: string;
  external: boolean;
  children: React.ReactNode;
}) {
  const className =
    "inline-flex min-w-[138px] items-center justify-center rounded-full bg-[#f0e66f] px-5 py-3 text-center font-display text-sm font-bold uppercase tracking-button text-text-primary shadow-[0_10px_22px_rgba(15,30,45,0.18)] transition-transform duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#efe55f]";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
