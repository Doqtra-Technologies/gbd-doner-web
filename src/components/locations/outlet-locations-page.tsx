"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import { LocationImageDeck } from "@/components/locations/location-image-deck";
import type { Location } from "@/domain/location";
import { cn } from "@/lib/utils";

// Piccadilly.webp does not exist on disk — use the correct .png.
const HERO_IMAGE = "/locations/Piccadilly.png";

const PANEL_FILTERS = ["All Locations", "Manchester", "Liverpool"] as const;

const INTRO = [
  "Every GBD location is built around flavour, fast-paced energy, and community.",
  "Designed to reflect the rhythm of the city while serving street food that hits properly.",
];

export function OutletLocationsPage({ locations }: { locations: Location[] }) {
  const [activeFilter, setActiveFilter] = useState<(typeof PANEL_FILTERS)[number]>("All Locations");

  const visibleLocations = useMemo(() => {
    const ordered = [...locations].sort((left, right) => {
      const cityOrder = cityRank(left.city) - cityRank(right.city);
      if (cityOrder !== 0) return cityOrder;
      return left.name.localeCompare(right.name);
    });
    if (activeFilter === "All Locations") return ordered;
    return ordered.filter((location) => location.city === activeFilter);
  }, [locations, activeFilter]);

  return (
    // NOTE: page.tsx already renders an outer <main> — using a <div> here
    // avoids nested <main> elements (invalid HTML) and removes the
    // min-h-[calc(100svh-5rem)] that was creating a dead-space void when
    // fewer than ~5 cards were visible.
    <div className="bg-canvas text-text-primary">
      {/* ── Filter bar ─────────────────────────────────────────────────── */}
      <section className="border-b border-border-hairline bg-canvas">
        <div className="mx-auto w-full max-w-shell px-5 py-4 sm:px-8 lg:px-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-3 font-display text-[10px] font-bold uppercase tracking-[0.34em] text-text-disabled">
              Browse by City
            </span>
            {PANEL_FILTERS.map((filter) => (
              <FilterChip
                key={filter}
                active={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </FilterChip>
            ))}
          </div>
        </div>
      </section>

      {/* ── Location cards ─────────────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-shell px-5 py-8 sm:px-8 lg:px-10 lg:py-14">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3 lg:gap-10">
          {visibleLocations.map((location) => (
            <OutletLocationCard key={location.id} location={location} />
          ))}
        </div>
      </section>

      {/*
       * TEMPORARILY DISABLED
       * Mobile Truck / Live Map Section
       * Retained for future reactivation
       */}
      {/* <LiveMapCTA locations={visibleLocations} /> */}
    </div>
  );
}

/*
 * TEMPORARILY DISABLED
 * Mobile Truck / Live Map Section
 * Retained for future reactivation
 *
 * function LiveMapCTA({ locations }: { locations: Location[] }) {
 *   const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);
 *   const [error, setError] = useState<string | null>(null);
 *   const [nearest, setNearest] = useState<Location | null>(null);
 *
 *   function toRad(value: number) {
 *     return (value * Math.PI) / 180;
 *   }
 *
 *   function haversine(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
 *     const R = 6371;
 *     const dLat = toRad(b.lat - a.lat);
 *     const dLon = toRad(b.lng - a.lng);
 *     const lat1 = toRad(a.lat);
 *     const lat2 = toRad(b.lat);
 *     const sinDLat = Math.sin(dLat / 2);
 *     const sinDLon = Math.sin(dLon / 2);
 *     const val = sinDLat * sinDLat + sinDLon * sinDLon * Math.cos(lat1) * Math.cos(lat2);
 *     const c = 2 * Math.atan2(Math.sqrt(val), Math.sqrt(1 - val));
 *     return R * c;
 *   }
 *
 *   function findNearest(pos: { lat: number; lng: number }) {
 *     if (!locations || locations.length === 0) return null;
 *     let best: Location | null = null;
 *     let bestDist = Infinity;
 *     for (const loc of locations) {
 *       if (!loc.coordinates) continue;
 *       const d = haversine(pos, { lat: loc.coordinates.lat, lng: loc.coordinates.lng });
 *       if (d < bestDist) { bestDist = d; best = loc; }
 *     }
 *     return best;
 *   }
 *
 *   function openGoogleMaps() {
 *     if (!position || !nearest) return;
 *     const origin = `${position.lat},${position.lng}`;
 *     const destination = `${nearest.coordinates.lat},${nearest.coordinates.lng}`;
 *     const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&travelmode=driving`;
 *     window.open(url, "_blank");
 *   }
 *
 *   function requestPosition() {
 *     if (!navigator.geolocation) { setError("Geolocation not supported"); return; }
 *     navigator.geolocation.getCurrentPosition(
 *       (pos) => {
 *         const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
 *         setPosition(coords);
 *         setNearest(findNearest(coords));
 *       },
 *       (err) => setError(err.message || "Unable to determine location"),
 *       { enableHighAccuracy: true, maximumAge: 1000 * 60 * 5 }
 *     );
 *   }
 *
 *   return (
 *     <section className="border-t border-border-hairline bg-canvas">
 *       <div className="mx-auto w-full max-w-shell px-5 py-12 sm:px-8 lg:px-10 lg:py-16 grid grid-cols-1 gap-8 lg:grid-cols-2 items-center">
 *         <div>
 *           <h3 className="font-display text-3xl font-bold uppercase tracking-display">ALWAYS ON THE MOVE</h3>
 *           <p className="mt-4 max-w-xl font-body text-sm leading-relaxed text-text-secondary">
 *             Our fleet of mobile trucks brings organic nourishment to events and pop-ups across the city.
 *           </p>
 *           <div className="mt-6 space-y-4">
 *             <div className="rounded-lg bg-white p-4 shadow">
 *               <p className="font-bold">{position ? `Current Spot: ${position.lat.toFixed(4)}, ${position.lng.toFixed(4)}` : "Current Spot: Unknown"}</p>
 *               <p className="text-sm text-text-secondary">{nearest ? `${nearest.name} — ${nearest.city}` : "Nearest outlet will be shown after allowing location."}</p>
 *             </div>
 *             <div className="mt-2 flex gap-3">
 *               <button onClick={requestPosition} className="inline-flex items-center gap-3 rounded-full bg-accent px-6 py-3 font-display text-sm font-bold text-text-inverse shadow">
 *                 Get my location
 *               </button>
 *               <button onClick={openGoogleMaps} disabled={!position || !nearest} className="inline-flex items-center gap-3 rounded-full border border-border-strong bg-white px-6 py-3 font-display text-sm font-bold text-text-primary disabled:opacity-50">
 *                 Open Live Map
 *               </button>
 *             </div>
 *             {error && <p className="text-sm text-red-600">{error}</p>}
 *           </div>
 *         </div>
 *         <div className="flex items-center justify-center">
 *           <div className="w-full max-w-md overflow-hidden rounded-[28px] border border-white/70 bg-canvas p-4 shadow-[0_24px_60px_rgba(15,30,45,0.18)]">
 *             <div className="rounded-[22px] border border-white/80 bg-white p-3 shadow-[0_10px_24px_rgba(15,30,45,0.08)]">
 *               <div className="mb-3 flex items-center justify-between px-1">
 *                 <p className="font-display text-[10px] font-bold uppercase tracking-[0.34em] text-text-secondary">Live Map</p>
 *                 <p className="font-body text-xs text-text-secondary">{nearest ? nearest.city : "Allow location to load the nearest outlet"}</p>
 *               </div>
 *               <div className="relative aspect-[4/5] overflow-hidden rounded-[18px] bg-canvas">
 *                 {nearest ? (
 *                   <iframe title={`Live map for ${nearest.name}`} src={`https://www.google.com/maps?q=${nearest.coordinates.lat},${nearest.coordinates.lng}&z=15&output=embed`} className="h-full w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
 *                 ) : (
 *                   <div className="flex h-full w-full items-center justify-center px-8 text-center">
 *                     <div>
 *                       <p className="font-display text-lg font-bold uppercase tracking-display text-text-primary">Live map preview</p>
 *                       <p className="mt-2 text-sm leading-relaxed text-text-secondary">Tap "Get my location" to show the nearest outlet.</p>
 *                     </div>
 *                   </div>
 *                 )}
 *                 {nearest && (
 *                   <div className="pointer-events-none absolute left-4 top-4 rounded-full bg-white/90 px-3 py-2 shadow-[0_8px_18px_rgba(15,30,45,0.12)]">
 *                     <p className="font-body text-[11px] text-text-secondary">Nearest outlet</p>
 *                     <p className="font-display text-xs font-bold uppercase tracking-button text-text-primary">{nearest.name}</p>
 *                   </div>
 *                 )}
 *               </div>
 *             </div>
 *           </div>
 *         </div>
 *       </div>
 *     </section>
 *   );
 * }
 */

function OutletLocationCard({ location }: { location: Location }) {
  const isManchester = location.city === "Manchester";
  const isPiccadilly = location.slug.toLowerCase().includes("piccadilly");
  const title = isManchester && isPiccadilly
    ? "Manchester — Piccadilly"
    : isManchester
      ? "Manchester — Deansgate"
      : "Liverpool — Bold Street";

  const address = [location.addressLine1, location.addressLine2, `${location.city} ${location.postcode}`]
    .filter(Boolean)
    .join(", ");

  const phone = location.phone;
  const hours = formatOpeningHours(location.hours);
  const collectionHref = location.clickAndCollectUrl ?? "/locations";
  const deliveryHref = location.deliveryLinks[0]?.url ?? location.clickAndCollectUrl ?? "/locations";

  return (
    // Lift the whole card (deck + info panel together) on hover.
    // translate-y doesn't affect layout flow so the fan overflow space is
    // always reserved regardless of hover state.
    <article className="group relative pb-8 pr-8 transition-transform duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2">
      <LocationImageDeck
        location={location}
        fallbackSrc={HERO_IMAGE}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      >
        <div className="absolute inset-0 flex translate-y-3 items-center justify-center opacity-0 transition-[opacity,transform] duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100">
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <HoverAction href={collectionHref} external={Boolean(location.clickAndCollectUrl)}>
              Collection
            </HoverAction>
            <HoverAction href={deliveryHref} external={Boolean(location.deliveryLinks[0]?.url ?? location.clickAndCollectUrl)}>
              Delivery
            </HoverAction>
          </div>
        </div>
      </LocationImageDeck>

      {/* Layered shadow — subtle at rest, deepens on hover alongside the lift. */}
      <div className={cn(
        "-mt-1 rounded-[18px] border border-border-hairline bg-canvas p-5 sm:p-6",
        "shadow-[0_8px_20px_rgba(15,30,45,0.05),0_16px_40px_rgba(15,30,45,0.04)]",
        "transition-shadow duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
        "group-hover:shadow-[0_12px_28px_rgba(15,30,45,0.09),0_24px_56px_rgba(15,30,45,0.06)]",
      )}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-display text-[10px] font-bold uppercase tracking-[0.34em] text-accent">
              {location.city}
            </p>
            <h2 className="mt-2 font-display text-xl font-bold uppercase tracking-display leading-tight text-text-primary sm:text-2xl">
              {title}
            </h2>
          </div>
          {location.isFlagship && (
            <span className="shrink-0 rounded-full border border-border-hairline bg-canvas px-3 py-1 font-display text-[10px] font-bold uppercase tracking-button text-text-primary">
              Flagship
            </span>
          )}
        </div>

        {phone && (
          <p className="mt-3 font-body text-sm leading-relaxed text-text-secondary">
            <span className="font-bold text-text-primary">Phone:</span>{" "}
            <a href={`tel:${phone}`} className="transition-colors hover:text-accent">{phone}</a>
          </p>
        )}

        <p className="mt-2 font-body text-sm leading-relaxed text-text-secondary">
          <span className="font-bold text-text-primary">Address:</span> {address}
        </p>

        <div className="mt-4 border-t border-border-hairline pt-4">
          <p className="font-display text-[10px] font-bold uppercase tracking-[0.34em] text-accent">
            Opening Hours
          </p>
          <div className="mt-2 space-y-1.5 font-body text-sm">
            {hours.map(({ label, time }) => (
              <div key={label} className="flex items-baseline justify-between gap-4">
                <span className="text-text-secondary">{label}</span>
                <span className="font-bold tabular-nums text-text-primary">{time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "inline-flex h-9 items-center rounded-full border px-4 font-display text-[10px] font-bold uppercase tracking-button",
        "transition-[color,background-color,border-color] duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
        active
          ? "border-surface-inverse bg-surface-inverse text-text-inverse"
          : "border-border-hairline bg-transparent text-text-secondary hover:border-surface-inverse/30 hover:text-text-primary",
      )}
    >
      {children}
    </button>
  );
}

function HoverAction({ href, external, children }: {
  href: string;
  external: boolean;
  children: ReactNode;
}) {
  const className =
    "inline-flex h-12 min-w-[160px] items-center justify-center rounded-full border border-transparent bg-accent px-6 font-display text-sm font-bold uppercase tracking-button text-text-inverse shadow-[0_10px_22px_rgba(15,30,45,0.18)] transition-[background-color,transform] duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-accent/90";

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

/** Returns label–time pairs for display in the card info panel. */
function formatOpeningHours(hours: Location["hours"]): Array<{ label: string; time: string }> {
  if (hours.length === 0) {
    return [{ label: "Hours", time: "Please check in-store" }];
  }

  const weekdays = hours.filter((e) => ["Mon", "Tue", "Wed", "Thu", "Sun"].includes(e.day));
  const weekends = hours.filter((e) => ["Fri", "Sat"].includes(e.day));

  return [
    { label: "Sun – Thu", time: rangeSummary(weekdays) },
    { label: "Fri – Sat", time: rangeSummary(weekends) },
  ];
}

function rangeSummary(hours: Location["hours"]): string {
  if (hours.length === 0) return "Check in-store";
  const first = hours[0];
  const last = hours[hours.length - 1];
  return `${first.open} – ${last.close}`;
}

function cityRank(city: string): number {
  if (city === "Manchester") return 0;
  if (city === "Liverpool") return 1;
  return 2;
}
