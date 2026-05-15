"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/layout/section";
import { LocationCard } from "@/components/location/location-card";
import { cn } from "@/lib/utils";
import type { Location } from "@/domain/location";

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
    <Section size="standard">
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
            <LocationCard key={loc.id} location={loc} size="full" />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-16 text-center font-body text-sm text-text-disabled">
            No locations match your search.
          </p>
        )}
      </Container>
    </Section>
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
        "inline-flex h-9 items-center rounded-full bg-canvas px-4 font-body text-xs font-semibold uppercase tracking-button text-text-primary transition-colors duration-300 ease-smooth",
        active
          ? "border border-border-strong"
          : "border border-border-hairline hover:border-border-strong",
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
    <label className="flex items-center gap-3 border-b border-border-strong py-2 lg:min-w-[280px]">
      <svg
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="text-text-primary"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search locations"
        className="w-full bg-transparent font-body text-sm text-text-primary placeholder:text-text-disabled focus:outline-none"
      />
    </label>
  );
}
