"use client";

import { useRef } from "react";
import { OutletFlipCard } from "@/components/locations/outlet-flip-card";
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
          className="no-scrollbar -mx-3 flex gap-6 overflow-x-auto pb-6 px-3 touch-pan-x snap-x snap-mandatory"
        >
          {locations.map((loc) => (
            <OutletFlipCard key={loc.id} location={loc} />
          ))}
        </div>
      </div>
    </section>
  );
}
