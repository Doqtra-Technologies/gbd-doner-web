"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocationState } from "@/components/locations/location-state";
import { calculateDistance, formatKilometres } from "@/lib/distance";
import { cn } from "@/lib/utils";
import type { Location, OpeningHours } from "@/domain/location";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80";

export function LocationCard({ location }: { location: Location }) {
  const {
    selectedId,
    hoveredId,
    setSelectedId,
    setHoveredId,
    activeCoordinates,
    filteredLocations,
    directionsLocationId,
    setDirectionsLocationId,
  } = useLocationState();
  const isSelected = selectedId === location.id;
  const isHovered = hoveredId === location.id;
  const status = computeOpeningStatus(location.hours);
  const delivery = location.deliveryLinks?.[0];

  const distanceLabel = activeCoordinates
    ? formatKilometres(
        calculateDistance(
          activeCoordinates.lat,
          activeCoordinates.lng,
          location.coordinates.lat,
          location.coordinates.lng,
        ),
      )
    : null;

  // Determine if this is the nearest outlet
  const isNearest = activeCoordinates && filteredLocations.length > 0
    ? filteredLocations[0].id === location.id
    : false;

  return (
    <article
      onClick={() => setSelectedId(location.id)}
      onMouseEnter={() => setHoveredId(location.id)}
      onMouseLeave={() => setHoveredId(null)}
      className={cn(
        "relative shrink-0 group cursor-pointer bg-canvas p-4 transition-all duration-300 ease-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        isNearest && "shadow-[0_0_12px_theme(colors.accent)] ring-1 ring-accent",
        !isNearest && (isSelected || isHovered
          ? "shadow-[0_6px_16px_rgba(15,30,45,0.12)] scale-[1.01]"
          : "hover:shadow-[0_6px_16px_rgba(15,30,45,0.12)] hover:scale-[1.01]"),
      )}
      aria-pressed={isSelected}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setSelectedId(location.id);
        }
      }}
    >
      <div className="flex gap-2.5">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden">
          <Image
            src={location.imageUrl ?? FALLBACK_IMAGE}
            alt={location.name}
            fill
            sizes="64px"
            className="rounded-none object-cover"
          />
          {isNearest && (
            <div className="absolute inset-0 bg-gradient-to-t from-accent/30 to-transparent flex items-start justify-end p-1">
              <span className="text-[8px] font-bold uppercase text-white bg-accent/90 px-1.5 py-0.5 rounded">
                Nearest
              </span>
            </div>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-start justify-between gap-2">
            <div className="flex min-w-0 items-center gap-1.5">
              <h3 className="font-display font-bold uppercase tracking-display text-sm text-text-primary truncate">
                {location.name.replace(" - ", " — ")}
              </h3>
              {location.isFlagship && <FlagshipChip />}
            </div>
            <OpeningStatusChip status={status} />
          </div>

          <p className="mt-1 font-body text-[10px] tracking-widest uppercase opacity-60 text-text-secondary truncate">
            {location.addressLine1}
          </p>
          <p className="font-body text-[10px] tracking-widest uppercase opacity-60 text-text-secondary truncate">
            {location.city} · {location.postcode}
          </p>

          {distanceLabel && (
            <p
              className={cn(
                "mt-1 font-display font-bold uppercase tracking-eyebrow text-[10px]",
                isNearest ? "text-accent" : "text-accent"
              )}
            >
              {isNearest && "✓ "}
              {distanceLabel} away
            </p>
          )}
        </div>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-2" onClick={(e) => e.stopPropagation()}>
        {delivery && (
          <CardActionLink href={delivery.url} variant="primary" external>
            Delivery
          </CardActionLink>
        )}
        {location.clickAndCollectUrl && (
          <CardActionLink href={location.clickAndCollectUrl} variant="primary" external>
            Click + Collect
          </CardActionLink>
        )}
        <button
          type="button"
          onClick={() => setDirectionsLocationId(location.id)}
          className="group/cta inline-flex items-center gap-1 font-display font-bold uppercase tracking-button text-[10px] text-text-primary transition-opacity duration-300 ease-out opacity-100 hover:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Get Directions
          <span aria-hidden>→</span>
        </button>
        <CardActionLink href={`/locations/${location.slug}`} variant="tertiary">
          Store info
        </CardActionLink>
      </div>
    </article>
  );
}

function CardActionLink({
  href,
  variant,
  external,
  children,
}: {
  href: string;
  variant: "primary" | "tertiary";
  external?: boolean;
  children: React.ReactNode;
}) {
  const primary =
    "inline-flex h-8 items-center justify-center rounded-full border border-transparent bg-accent px-3 font-display font-bold uppercase tracking-button text-[10px] text-text-inverse transition-colors duration-300 ease-smooth hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";
  const tertiary =
    "group/cta inline-flex items-center gap-1 font-display font-bold uppercase tracking-button text-[10px] text-text-primary transition-opacity duration-300 ease-out opacity-100 hover:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

  const className = variant === "primary" ? primary : tertiary;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className={className}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
      {variant === "tertiary" && <span aria-hidden>→</span>}
    </Link>
  );
}

function FlagshipChip() {
  return (
    <span
      title="Flagship branch"
      className="inline-flex shrink-0 items-center gap-1 border border-accent/40 bg-accent/10 px-1.5 py-0.5 font-display font-bold uppercase tracking-eyebrow text-[8px] text-accent"
    >
      <span aria-hidden className="inline-block h-1 w-1 rounded-full bg-accent" />
      Flagship
    </span>
  );
}

interface OpeningStatus {
  open: boolean;
  label: string;
}

function OpeningStatusChip({ status }: { status: OpeningStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 shrink-0 font-display font-bold uppercase tracking-eyebrow text-[10px]",
        status.open ? "text-text-primary" : "text-text-disabled",
      )}
    >
      <span
        className={cn(
          "inline-block h-1.5 w-1.5 rounded-full",
          status.open ? "bg-accent" : "bg-border-hairline",
        )}
      />
      {status.label}
    </span>
  );
}

const DAY_INDEX: Record<OpeningHours["day"], number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

function computeOpeningStatus(hours: OpeningHours[]): OpeningStatus {
  if (!hours.length) return { open: false, label: "Closed" };
  const now = new Date();
  const todayIdx = now.getDay();
  const minutesNow = now.getHours() * 60 + now.getMinutes();
  const todayKey = (Object.keys(DAY_INDEX) as OpeningHours["day"][]).find(
    (k) => DAY_INDEX[k] === todayIdx,
  );
  const today = hours.find((h) => h.day === todayKey);
  if (!today) return { open: false, label: "Closed" };
  const open = parseHHMM(today.open);
  let close = parseHHMM(today.close);
  if (close <= open) close += 24 * 60;
  const adjustedNow =
    minutesNow < open && close > 24 * 60 ? minutesNow + 24 * 60 : minutesNow;
  if (adjustedNow >= open && adjustedNow < close) {
    return { open: true, label: "Open" };
  }
  return { open: false, label: "Closed" };
}

function parseHHMM(s: string): number {
  const [h, m] = s.split(":").map(Number);
  return (h || 0) * 60 + (m || 0);
}
