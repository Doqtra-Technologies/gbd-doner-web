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

  return (
    <article className="group relative w-[320px] shrink-0 select-none pb-8 pr-9">
      <LocationImageDeck
        location={location}
        fallbackSrc="/logo/gbd-logo.png"
        sizes="(max-width: 768px) 88vw, (max-width: 1200px) 45vw, 320px"
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-[opacity,transform] duration-300 ease-smooth translate-y-3 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="flex flex-col gap-3 sm:flex-row">
            <HoverPill href={orderHref} external={Boolean(location.clickAndCollectUrl)}>
              Order Now
            </HoverPill>
            <HoverPill href={deliveryHref} external={Boolean(location.deliveryLinks[0]?.url ?? location.clickAndCollectUrl)}>
              Delivery
            </HoverPill>
          </div>
        </div>

        <h4 className="absolute bottom-5 left-5 right-5 font-display text-[clamp(1.35rem,2vw,1.7rem)] font-bold uppercase tracking-display leading-tight text-text-inverse transition-transform duration-500 ease-smooth group-hover:-translate-y-1">
          {location.name}
        </h4>
      </LocationImageDeck>
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
