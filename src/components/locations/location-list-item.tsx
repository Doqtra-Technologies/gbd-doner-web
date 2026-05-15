"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocationState } from "@/components/locations/location-state";
import { calculateDistance, formatKilometres } from "@/lib/distance";
import { cn } from "@/lib/utils";
import type { Location, OpeningHours } from "@/domain/location";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80";

/**
 * Operational location card used in the sidebar list.
 *
 * Compact horizontal layout:
 *   [ thumbnail ]  Name + open status
 *                  Address line 1, City, Postcode
 *                  (optional) Distance away
 *                  [Delivery] [Click + Collect] (CTA row)
 *                  Store info →
 *
 * Selection is driven by the shared LocationState. Clicking anywhere on
 * the card (outside the CTA buttons) selects this branch — which flies the
 * map to it and brings the marker forward.
 */
export function LocationListItem({ location }: { location: Location }) {
  const {
    selectedId,
    setSelectedId,
    setHoveredId,
    searchCoordinates,
  } = useLocationState();
  const isSelected = selectedId === location.id;
  const status = computeOpeningStatus(location.hours);
  const delivery = location.deliveryLinks?.[0];

  const distanceLabel = searchCoordinates
    ? formatKilometres(
        calculateDistance(
          searchCoordinates.lat,
          searchCoordinates.lng,
          location.coordinates.lat,
          location.coordinates.lng,
        ),
      )
    : null;

  return (
    <article
      onClick={() => setSelectedId(location.id)}
      onMouseEnter={() => setHoveredId(location.id)}
      onMouseLeave={() => setHoveredId(null)}
      className={cn(
        "group cursor-pointer border bg-canvas p-2.5 transition-all duration-300 ease-smooth focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-border-strong",
        isSelected
          ? "border-border-strong shadow-[0_6px_16px_rgba(15,30,45,0.12)]"
          : "border-border-hairline hover:border-border-strong hover:shadow-[0_6px_16px_rgba(15,30,45,0.12)]",
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
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display font-bold uppercase tracking-display text-sm text-text-primary truncate">
              {location.name}
            </h3>
            <OpeningStatusChip status={status} />
          </div>

          <p className="mt-0.5 font-body text-xs text-text-secondary truncate">
            {location.addressLine1}
          </p>
          <p className="font-body text-xs text-text-secondary truncate">
            {location.city} · {location.postcode}
          </p>

          {distanceLabel && (
            <p className="mt-1 font-display font-bold uppercase tracking-eyebrow text-[10px] text-accent">
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
    "inline-flex h-8 items-center justify-center rounded-full border border-border-strong bg-canvas px-3 font-display font-bold uppercase tracking-button text-[10px] text-text-primary transition-all duration-300 ease-smooth hover:border-accent hover:bg-accent hover:text-text-inverse";
  const tertiary =
    "group/cta inline-flex items-center gap-1 font-display font-bold uppercase tracking-button text-[10px] text-text-primary transition-colors duration-300 ease-smooth hover:text-accent";

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
  // Past-midnight close (e.g. "01:00") rolls forward.
  if (close <= open) close += 24 * 60;
  const m = minutesNow;
  const adjustedNow = m < open && close > 24 * 60 ? m + 24 * 60 : m;
  if (adjustedNow >= open && adjustedNow < close) {
    return { open: true, label: "Open" };
  }
  return { open: false, label: "Closed" };
}

function parseHHMM(s: string): number {
  const [h, m] = s.split(":").map(Number);
  return (h || 0) * 60 + (m || 0);
}
