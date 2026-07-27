"use client";

import Link from "next/link";
import { useRef } from "react";
import { LocationImageDeck } from "@/components/locations/location-image-deck";
import type { Location } from "@/domain/location";
import { siteConfig } from "@/lib/config";

export function OutletCarousel({ locations }: { locations: Location[] }) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  function scrollBy(amount: number) {
    scrollerRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  }

  return (
    <section className="bg-canvas border-t border-border-hairline pt-16 pb-20 md:pt-[96px] md:pb-[120px]">
      <div 
        className="mx-auto w-full max-w-[1920px]"
        style={{ paddingInline: 'clamp(32px, 4vw, 96px)' }}
      >
        <div className="mb-16 flex items-end justify-between">
          <div>
            <h2 className="font-display font-[800] uppercase text-text-primary text-[clamp(2.5rem,4vw,4.5rem)] leading-[0.9] tracking-[-0.05em]">
              Our Locations
            </h2>
            <p className="mt-6 max-w-xl text-lg md:text-xl text-text-secondary font-body">
              Find your nearest branch for pickup or delivery.
            </p>
          </div>
        </div>

        <div className="relative">
          {/* Left Overlay Arrow */}
          <button
            aria-label="previous"
            onClick={() => scrollBy(-500)}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-white/90 border border-border-hairline text-accent shadow-[0_8px_24px_rgba(15,30,45,0.12)] backdrop-blur-md transition-all hover:scale-105 hover:bg-white hover:shadow-[0_16px_36px_rgba(15,30,45,0.18)] active:scale-95 cursor-pointer"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>

          {/* Right Overlay Arrow */}
          <button
            aria-label="next"
            onClick={() => scrollBy(500)}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-white/90 border border-border-hairline text-accent shadow-[0_8px_24px_rgba(15,30,45,0.12)] backdrop-blur-md transition-all hover:scale-105 hover:bg-white hover:shadow-[0_16px_36px_rgba(15,30,45,0.18)] active:scale-95 cursor-pointer"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>

          <div
            ref={scrollerRef}
            className="flex gap-8 md:gap-10 xl:gap-12 overflow-x-auto touch-pan-x snap-x snap-mandatory pb-8 no-scrollbar -mx-8 px-8 xl:mx-0 xl:px-0"
          >
            {locations.map((loc) => (
              <OutletCard key={loc.id} location={loc} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function OutletCard({ location }: { location: Location }) {
  const orderHref = location.clickAndCollectUrl ?? siteConfig.orderUrl;

  return (
    <article className="group relative w-[85vw] sm:w-[calc(50vw-32px)] lg:w-[calc(33.33vw-40px)] xl:w-[460px] 2xl:w-[480px] shrink-0 snap-center flex flex-col transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2">
      <div 
        className="w-full relative rounded-[18px] transition-shadow duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          boxShadow: "0 8px 24px rgba(0,0,0,0.08), 0 24px 64px rgba(0,0,0,0.12)",
        }}
      >
        <LocationImageDeck
          location={location}
          fallbackSrc="/logo/gbd-logo.png"
          sizes="(max-width: 640px) 85vw, (max-width: 1280px) 50vw, 33vw"
        >
          {/* Subtle dark gradient overlay for text legibility */}
          <div className="absolute inset-x-0 bottom-0 top-[20%] md:top-[40%] bg-[linear-gradient(to_top,rgba(15,30,45,0.9)_0%,rgba(15,30,45,0.5)_60%,transparent_100%)] rounded-[18px] pointer-events-none transition-opacity duration-[600ms]" />

          {/* Location Information (Bottom-left aligned) */}
          <div className="absolute bottom-24 md:bottom-8 left-6 md:left-8 right-6 md:right-8 z-10 flex flex-col transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-2">
            <span className="font-display text-[10px] font-[800] uppercase tracking-[0.15em] text-white/90 mb-2 md:mb-3 leading-none">
              {location.city}
            </span>
            <h4 className="font-display text-[clamp(1.75rem,2.5vw,3rem)] font-[700] uppercase tracking-[-0.03em] leading-[0.95] text-white break-words whitespace-normal">
              {location.name.replace(" - ", " — ")}
            </h4>
          </div>

          {/* Interactive Hover Pills (Always visible on mobile, Hover on desktop) */}
          <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col items-center justify-end md:inset-0 md:justify-center md:opacity-0 transition-[opacity,transform] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] md:translate-y-4 md:group-hover:translate-y-0 md:group-hover:opacity-100 z-40 md:bg-black/20 rounded-[18px]">
            <div className="flex flex-row w-full gap-3 md:w-auto md:flex-col lg:flex-row">
              <HoverPill className="flex-1 md:flex-none min-w-0 md:min-w-[138px] px-2 md:px-5" href={orderHref} external>
                Collection
              </HoverPill>
            </div>
          </div>
        </LocationImageDeck>
        
        {/* Style tag to handle the hover shadow on the wrapper */}
        <style jsx>{`
          article:hover > div {
            box-shadow: 0 12px 32px rgba(0,0,0,0.12), 0 32px 80px rgba(0,0,0,0.16) !important;
          }
        `}</style>
      </div>
    </article>
  );
}

function HoverPill({
  href,
  external,
  children,
  className: customClass,
}: {
  href: string;
  external: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  const className = `inline-flex items-center justify-center rounded-full bg-accent py-3 text-center font-display text-sm font-bold uppercase tracking-button text-text-inverse shadow-[0_10px_22px_rgba(15,30,45,0.18)] transition-[background-color,transform] duration-300 ease-smooth hover:-translate-y-0.5 hover:bg-accent/90 ${customClass || "min-w-[138px] px-5"}`;

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
