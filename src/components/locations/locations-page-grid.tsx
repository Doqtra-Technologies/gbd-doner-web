"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import type { Location, OpeningHours } from "@/domain/location";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80";

type FilterKey = "all" | string;

export function LocationsPageGrid({ locations }: { locations: Location[] }) {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [query, setQuery] = useState("");

  const cities = useMemo(() => {
    const set = new Set<string>();
    locations.forEach((l) => l.city && set.add(l.city));
    return Array.from(set);
  }, [locations]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return locations.filter((l) => {
      const cityMatch = filter === "all" || l.city === filter;
      if (!cityMatch) return false;
      if (!q) return true;
      return (
        l.name.toLowerCase().includes(q) ||
        l.city.toLowerCase().includes(q) ||
        l.addressLine1.toLowerCase().includes(q) ||
        l.postcode.toLowerCase().includes(q)
      );
    });
  }, [locations, filter, query]);

  return (
    <section className="bg-[#FFFFFF] py-24">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <FilterPill active={filter === "all"} onClick={() => setFilter("all")}>
              All Locations
            </FilterPill>
            {cities.map((city) => (
              <FilterPill
                key={city}
                active={filter === city}
                onClick={() => setFilter(city)}
              >
                {city}
              </FilterPill>
            ))}
          </div>

          <SearchInput value={query} onChange={setQuery} />
        </div>

        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-20 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((loc) => (
            <LocationGridCard key={loc.id} location={loc} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-16 text-center font-body text-sm text-[#0F1E2D] opacity-60">
            No locations match your search.
          </p>
        )}
      </Container>
    </section>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex h-9 items-center rounded-full bg-transparent px-4 font-body text-xs font-semibold uppercase tracking-widest text-[#0F1E2D] transition-colors duration-300",
        active
          ? "border border-[#0F1E2D]"
          : "border border-[#0F1E2D]/30 hover:border-[#0F1E2D]",
      )}
      aria-pressed={active}
    >
      {children}
    </button>
  );
}

function SearchInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex items-center gap-3 border-b border-[#0F1E2D] py-2 lg:min-w-[280px]">
      <svg
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        stroke="#0F1E2D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search locations"
        className="w-full bg-transparent font-body text-sm text-[#0F1E2D] placeholder:text-[#0F1E2D]/50 focus:outline-none"
      />
    </label>
  );
}

function LocationGridCard({ location }: { location: Location }) {
  const hoursSummary = summarizeHours(location.hours);

  return (
    <article id={location.slug} className="flex flex-col items-center text-center">
      <div className="relative w-full">
        <div className="pointer-events-none absolute inset-0 translate-x-2 translate-y-2 border border-[#0F1E2D]" />
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <Image
            src={location.imageUrl ?? FALLBACK_IMAGE}
            alt={location.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="rounded-none object-cover"
          />
        </div>
      </div>

      <h3 className="mt-6 font-display font-bold uppercase tracking-tight text-[#0F1E2D] text-xl">
        {location.name}
      </h3>

      <div className="mt-3 space-y-1">
        {hoursSummary.map((line) => (
          <p
            key={line}
            className="font-body text-sm text-[#0F1E2D] opacity-80"
          >
            {line}
          </p>
        ))}
        {location.phone && (
          <p className="font-body text-sm text-[#0F1E2D] opacity-80">
            {location.phone}
          </p>
        )}
      </div>

      <DirectionsLink location={location} />
    </article>
  );
}

function DirectionsLink({ location }: { location: Location }) {
  const { lat, lng } = location.coordinates;
  const href = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group mt-4 inline-flex flex-col items-center font-body text-xs font-semibold uppercase tracking-widest text-[#0F1E2D]"
    >
      View Directions
      <span className="mt-1 block h-[1px] w-12 bg-[#0F1E2D] transition-all duration-300 group-hover:w-24" />
    </Link>
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

function summarizeHours(hours: OpeningHours[]): string[] {
  if (!hours.length) return [];
  const byDay = new Map(hours.map((h) => [h.day, h]));
  const sorted = DAY_ORDER.filter((d) => byDay.has(d)).map((d) => byDay.get(d)!);

  const lines: string[] = [];
  let i = 0;
  while (i < sorted.length) {
    const start = sorted[i];
    let j = i;
    while (
      j + 1 < sorted.length &&
      sorted[j + 1].open === start.open &&
      sorted[j + 1].close === start.close
    ) {
      j++;
    }
    const range =
      i === j ? start.day : `${start.day} - ${sorted[j].day}`;
    lines.push(`${range}: ${start.open} - ${start.close}`);
    i = j + 1;
  }
  return lines;
}
