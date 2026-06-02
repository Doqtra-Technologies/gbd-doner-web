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
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        <div className="mb-14 flex items-end justify-between">
          <div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-[56px] font-[800] uppercase tracking-[-0.02em] text-text-primary leading-none">
              The Branches
            </h2>
            <p className="mt-4 max-w-xl text-lg md:text-xl text-text-secondary font-body">
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
          className="no-scrollbar -mx-6 flex gap-10 overflow-x-auto px-6 pb-16 touch-pan-x snap-x snap-mandatory lg:-mx-12 lg:px-12"
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
    <article className="group relative w-[88vw] shrink-0 select-none snap-center sm:w-[calc(50vw-40px)] xl:w-[500px] flex flex-col transition-transform duration-700 ease-smooth hover:-translate-y-2 pr-12 pb-4">
      <div className="w-full relative">
        <LocationImageDeck
          location={location}
          fallbackSrc="/logo/gbd-logo.png"
          sizes="(max-width: 640px) 88vw, (max-width: 1280px) 50vw, 500px"
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-[opacity,transform] duration-500 ease-smooth translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 z-40 bg-black/15 rounded-[18px]">
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

      <div className="mt-10 px-1 flex flex-col">
        <h4 className="font-display text-[34px] md:text-[42px] font-[800] uppercase tracking-[-0.03em] leading-none text-text-primary transition-colors duration-300 group-hover:text-accent">
          {location.name}
        </h4>
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
