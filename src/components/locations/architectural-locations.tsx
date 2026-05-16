"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Numeral } from "@/components/ui/numeral";
import { Heading } from "@/components/ui/heading";
import { CTAButton } from "@/components/ui/cta-button";
import { cn } from "@/lib/utils";
import { DUR, EASE } from "@/brand/motion";
import type { Location, OpeningHours } from "@/domain/location";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80";

/**
 * ArchitecturalLocations — editorial branch index.
 *
 * Abandons card composition entirely. Each branch is a full-width row,
 * separated by a single 1px hairline, listing the city name in massive
 * Montserrat and the hours in a small monospace-feeling label on the
 * right.
 *
 * Hover micro-interaction:
 *   1. The hovered row fills with `bg-accent`, text inverts to white.
 *   2. A sharp rectangular thumbnail of the location floats at the
 *      user's cursor with smooth spring-lag — appearing only while the
 *      pointer is over the row, disappearing on exit.
 *
 * The thumbnail is a single shared DOM node positioned with motion
 * values; rotating between rows just swaps the src. No 20 hidden
 * images, no per-row state thrashing.
 *
 * Used as the editorial locations teaser on the home page. The
 * operational locator lives at `/locations`.
 */
export function ArchitecturalLocations({
  locations,
  className,
}: {
  locations: Location[];
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Cursor-follow motion values. The spring gives the thumbnail a soft
  // lag — cinematic, not snappy.
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
        "border-t border-border-strong bg-canvas py-24 lg:py-32",
        className,
      )}
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 mb-16 lg:mb-24">
          <div className="lg:col-span-7 lg:col-start-2">
            <Numeral index="04" label="The Branches" className="mb-10" />
            <Heading level={2}>
              <span className="block">Find your spot</span>
              <span className="block pl-[8%]">
                in the city<span className="text-accent">.</span>
              </span>
            </Heading>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 self-end">
            <p className="font-body text-base md:text-lg leading-relaxed text-text-secondary max-w-md">
              Each branch is its own kitchen — same standards, different
              neighbourhood. Hover a row to see the room.
            </p>
            <CTAButton variant="tertiary" href="/locations" className="mt-10">
              The Full Locator
            </CTAButton>
          </div>
        </div>
      </Container>

      {/* Row stack — full-viewport width so the hover red fill bleeds */}
      <div
        ref={containerRef}
        onPointerMove={onPointerMove}
        onPointerLeave={() => setHoveredId(null)}
        className="relative border-t border-border-strong"
      >
        {locations.map((loc, i) => (
          <LocationRow
            key={loc.id}
            location={loc}
            index={i}
            isHovered={hoveredId === loc.id}
            onEnter={() => setHoveredId(loc.id)}
          />
        ))}

        {/* Cursor-follow thumbnail. One DOM node, positioned by spring
            motion values, opacity-toggled by hover state. */}
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

function LocationRow({
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
  const hoursSummary = shortHours(location.hours);
  const cityName = location.city;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: DUR.reveal, delay: index * 0.05, ease: EASE.editorial }}
    >
      <Link
        href={`/locations#${location.slug}`}
        onPointerEnter={onEnter}
        className={cn(
          "group relative block border-b border-border-strong transition-colors duration-300 ease-smooth",
          isHovered ? "bg-accent text-text-inverse" : "bg-canvas text-text-primary",
        )}
      >
        <Container>
          <div className="grid grid-cols-12 items-baseline gap-6 py-10 lg:py-14">
            {/* Branch index — tiny monospace-style numeral */}
            <span
              className={cn(
                "col-span-2 lg:col-span-1 font-display font-bold uppercase tracking-eyebrow text-[10px] self-start pt-4 transition-colors duration-300 ease-smooth",
                isHovered ? "text-text-inverse opacity-70" : "text-text-secondary",
              )}
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            {/* City + branch name — massive */}
            <div className="col-span-10 lg:col-span-7">
              <h3 className="font-display font-bold uppercase tracking-display leading-[0.95] text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                {cityName}
              </h3>
              <p
                className={cn(
                  "mt-2 font-display font-bold uppercase tracking-eyebrow text-xs transition-colors duration-300 ease-smooth",
                  isHovered ? "text-text-inverse opacity-80" : "text-text-secondary",
                )}
              >
                {location.name} · {location.addressLine1}
              </p>
            </div>

            {/* Hours — small, right-aligned */}
            <div className="hidden lg:block col-span-3 col-start-10 text-right">
              <p
                className={cn(
                  "font-display font-bold uppercase tracking-eyebrow text-[10px] transition-colors duration-300 ease-smooth",
                  isHovered ? "text-text-inverse opacity-80" : "text-text-secondary",
                )}
              >
                Hours
              </p>
              <p className="mt-2 font-body text-sm">
                {hoursSummary}
              </p>
            </div>
          </div>
        </Container>
      </Link>
    </motion.div>
  );
}

const DAY_ORDER: OpeningHours["day"][] = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
];

/** Returns the most common opening pair as a single short string. */
function shortHours(hours: OpeningHours[]): string {
  if (!hours.length) return "—";
  const counts = new Map<string, number>();
  hours.forEach((h) => {
    const key = `${h.open}–${h.close}`;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  });
  const dominant = [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];
  return dominant ?? "—";
}

// Imported for completeness; not used in shortHours but kept available
// for future expansion (e.g., showing the dominant-day range).
export const __dayOrder = DAY_ORDER;
