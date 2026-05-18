"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Numeral } from "@/components/ui/numeral";
import { CTAButton } from "@/components/ui/cta-button";
import { cn } from "@/lib/utils";
import { DUR, EASE } from "@/brand/motion";
import type { Location, OpeningHours } from "@/domain/location";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80";

/**
 * LocationLedger — architectural branch index.
 *
 * Vertical list of locations spanning 100% of the viewport. No cards,
 * no Container — each row is an edge-to-edge `flex justify-between
 * items-center py-6 px-8 border-b border-border-hairline`.
 *
 * Each row's hover:
 *  - row background snaps to `bg-accent`
 *  - text inverts to white
 *  - a high-res photograph of the location follows the cursor with
 *    spring-lag motion (cinematic, not snappy)
 *
 * The cursor-follow node is a single DOM element with the image src
 * rotating between hovers. Spring config: stiffness 220, damping 28,
 * mass 0.5 — enough lag to feel intentional, not floaty.
 *
 * The component used to be called `ArchitecturalLocations` — same
 * pattern, refined to the LocationLedger spec (edge-to-edge, flex
 * rows, no Container, tighter padding).
 */
export function LocationLedger({
  locations,
  className,
}: {
  locations: Location[];
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 220, damping: 28, mass: 0.5 });
  const ySpring = useSpring(y, { stiffness: 220, damping: 28, mass: 0.5 });

  const hovered = locations.find((l) => l.id === hoveredId) ?? null;

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  }

  return (
    <section
      className={cn(
        "bg-canvas border-y border-border-hairline",
        className,
      )}
    >
      {/* Header band — operational, edge-to-edge, hairline bottom */}
      <div className="border-b border-border-hairline">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="lg:border-r lg:border-border-hairline p-6 sm:p-8 lg:p-12">
            <Numeral index="04" label="The Branches" className="mb-6" />
            <h2 className="font-display font-bold uppercase tracking-display leading-none text-text-primary text-3xl lg:text-4xl">
              <span className="block">Find your</span>
              <span className="block">
                spot<span className="text-accent">.</span>
              </span>
            </h2>
          </div>
          <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-12 gap-6">
            <p className="font-body text-sm md:text-base leading-relaxed text-text-secondary max-w-md">
              Each branch is its own kitchen. Same standards, different
              neighbourhood. Hover a row to see the room.
            </p>
            <CTAButton
              variant="tertiary"
              href="/locations"
              className="self-start"
            >
              The Full Locator
            </CTAButton>
          </div>
        </div>
      </div>

      {/* Row ledger — full-bleed, each row carries the hairline */}
      <div
        ref={containerRef}
        onPointerMove={onPointerMove}
        onPointerLeave={() => setHoveredId(null)}
        className="relative"
      >
        {locations.map((loc, i) => (
          <LedgerRow
            key={loc.id}
            location={loc}
            index={i}
            isHovered={hoveredId === loc.id}
            onEnter={() => setHoveredId(loc.id)}
          />
        ))}

        {/* Cursor-follow thumbnail (desktop only) */}
        <motion.div
          style={{ x: xSpring, y: ySpring }}
          className={cn(
            "pointer-events-none absolute left-0 top-0 z-20 hidden lg:block",
            "transition-opacity duration-300 ease-smooth",
            hovered ? "opacity-100" : "opacity-0",
          )}
        >
          <div className="relative -translate-x-1/2 -translate-y-1/2 w-72 h-96 overflow-hidden border border-canvas">
            {hovered && (
              <Image
                src={hovered.imageUrl ?? FALLBACK_IMAGE}
                alt={hovered.name}
                fill
                sizes="288px"
                className="object-cover [filter:contrast(1.04)_saturate(1.06)_brightness(0.99)]"
              />
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function LedgerRow({
  location,
  index,
  isHovered,
  onEnter,
}: {
  location: Location;
  index: number;
  isHovered: boolean;
  onEnter: () => void;
}) {
  const hours = shortHours(location.hours);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: DUR.reveal,
        delay: index * 0.04,
        ease: EASE.editorial,
      }}
    >
      <Link
        href={`/locations#${location.slug}`}
        onPointerEnter={onEnter}
        className={cn(
          "group flex items-center justify-between gap-6 px-6 sm:px-8 lg:px-12 py-6 lg:py-8 border-b border-border-hairline transition-colors duration-300 ease-smooth",
          isHovered ? "bg-accent text-text-inverse" : "bg-canvas text-text-primary",
        )}
      >
        <div className="flex items-start gap-4 sm:gap-8 min-w-0">
          <span
            className={cn(
              "mt-1 font-display font-bold uppercase tracking-eyebrow text-[10px] shrink-0 transition-colors duration-300 ease-smooth",
              isHovered ? "text-text-inverse opacity-70" : "text-text-secondary",
            )}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="min-w-0">
            <h3 className="font-display font-bold uppercase tracking-display leading-tight text-lg lg:text-xl truncate">
              {location.name}
            </h3>
            <p
              className={cn(
                "mt-1 font-body text-xs sm:text-sm leading-snug truncate transition-colors duration-300 ease-smooth",
                isHovered ? "text-text-inverse opacity-80" : "text-text-secondary",
              )}
            >
              {[location.addressLine1, location.city, location.postcode]
                .filter(Boolean)
                .join(", ")}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end shrink-0 text-right">
          <span
            className={cn(
              "font-display font-bold uppercase tracking-eyebrow text-[10px] transition-colors duration-300 ease-smooth",
              isHovered ? "text-text-inverse opacity-80" : "text-text-secondary",
            )}
          >
            Hours
          </span>
          <span className="font-body text-sm">{hours}</span>
        </div>
      </Link>
    </motion.div>
  );
}

/** Returns the most common opening pair as a single short string. */
function shortHours(hours: OpeningHours[]): string {
  if (!hours.length) return "—";
  const counts = new Map<string, number>();
  hours.forEach((h) => {
    const key = `${h.open}–${h.close}`;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  });
  return [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—";
}
