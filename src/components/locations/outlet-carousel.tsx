"use client";

import Link from "next/link";
import { useRef } from "react";
import { LocationImageDeck } from "@/components/locations/location-image-deck";
import type { Location } from "@/domain/location";

export function OutletCarousel({ locations }: { locations: Location[] }) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  function scrollBy(amount: number) {
    scrollerRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  }

  return (
    <section className="py-20 bg-canvas border-t border-border-hairline">
      <div className="mx-auto max-w-[1700px] px-8 lg:px-16">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <h2 className="font-display font-[800] uppercase text-text-primary text-[clamp(3rem,5vw,5.5rem)] leading-[0.9] tracking-[-0.05em]">
              The Branches
            </h2>
            <p className="mt-6 max-w-xl text-lg md:text-xl text-text-secondary font-body">
              Find your nearest branch for pickup or delivery.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <button
              aria-label="previous"
              onClick={() => scrollBy(-650)}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-white border border-border-hairline text-accent shadow-[0_4px_12px_rgba(15,30,45,0.05)] transition-transform hover:scale-105"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button
              aria-label="next"
              onClick={() => scrollBy(650)}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-white border border-border-hairline text-accent shadow-[0_4px_12px_rgba(15,30,45,0.05)] transition-transform hover:scale-105"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="no-scrollbar -mx-8 flex gap-10 overflow-x-auto px-8 pb-16 touch-pan-x snap-x snap-mandatory lg:-mx-16 lg:px-16"
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

  return (
    <article className="group relative w-[88vw] shrink-0 select-none snap-center sm:w-[calc(50vw-40px)] xl:w-[600px] flex flex-col transition-transform duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 pr-12 pb-6">
      <div className="w-full relative">
        <LocationImageDeck
          location={location}
          fallbackSrc="/logo/gbd-logo.png"
          sizes="(max-width: 640px) 88vw, (max-width: 1280px) 50vw, 600px"
        >
          {/* Subtle dark gradient overlay for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent rounded-[18px] pointer-events-none transition-opacity duration-[450ms]" />

          {/* Location Information (Bottom-left aligned) */}
          <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-col transition-transform duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-2">
            <span className="font-display text-xs md:text-sm font-bold uppercase tracking-[0.1em] text-white/80 mb-1">
              {location.city}
            </span>
            <h4 className="font-display text-[clamp(2rem,2.5vw,3rem)] font-[700] uppercase tracking-[-0.03em] leading-[0.95] text-white">
              {location.name}
            </h4>
          </div>

          {/* Interactive Hover Pills (Centered) */}
          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-[opacity,transform] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 z-40 bg-black/20 rounded-[18px]">
            <div className="flex flex-col gap-4 sm:flex-row">
              <HoverPill href={orderHref} external={Boolean(location.clickAndCollectUrl)}>
                Order Now
              </HoverPill>
              <HoverPill href={deliveryHref} external={Boolean(location.deliveryLinks[0]?.url ?? location.clickAndCollectUrl)}>
                Delivery
              </HoverPill>
            </div>
          </div>
        </LocationImageDeck>
      </div>
    </article>
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
    "inline-flex min-w-[138px] items-center justify-center rounded-full bg-accent px-5 py-3 text-center font-display text-sm font-bold uppercase tracking-button text-text-inverse shadow-[0_10px_22px_rgba(15,30,45,0.18)] transition-[background-color,transform] duration-300 ease-smooth hover:-translate-y-0.5 hover:bg-accent/90";

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
