"use client";

import { useMemo, useState, useEffect } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/layout/section";
import { LocationCard } from "@/components/location/location-card";
import { LocationsMap } from "@/components/locations/locations-map";
import { cn } from "@/lib/utils";
import { geocodeLocation } from "@/lib/geocoding";
import { calculateDistance } from "@/lib/distance";
import type { Location } from "@/domain/location";

type FilterKey = "all" | string;

export function LocationsPageGrid({ locations }: { locations: Location[] }) {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [query, setQuery] = useState("");
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);
  const [searchCoordinates, setSearchCoordinates] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [isSearching, setIsSearching] = useState(false);

  const cities = useMemo(() => {
    const set = new Set<string>();
    locations.forEach((l) => l.city && set.add(l.city));
    return Array.from(set).sort();
  }, [locations]);

  // Geocode search query
  useEffect(() => {
    if (!query.trim()) {
      setSearchCoordinates(null);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      const result = await geocodeLocation(query);
      if (result) {
        setSearchCoordinates({ lat: result.lat, lng: result.lng });
      } else {
        setSearchCoordinates(null);
      }
      setIsSearching(false);
    }, 200); // Fast response - 200ms debounce

    return () => clearTimeout(timer);
  }, [query]);

  // Get filtered locations with distance sorting
  const filtered = useMemo(() => {
    let results = locations;

    // Apply city filter
    if (filter !== "all") {
      results = results.filter((l) => l.city === filter);
    }

    // Sort by distance if search coordinates exist
    if (searchCoordinates) {
      results = results
        .map((loc) => ({
          location: loc,
          distance: calculateDistance(
            searchCoordinates.lat,
            searchCoordinates.lng,
            loc.coordinates.lat,
            loc.coordinates.lng
          ),
        }))
        .sort((a, b) => a.distance - b.distance)
        .map(({ location }) => location);
    }

    return results;
  }, [locations, filter, searchCoordinates]);

  // Auto-select nearest restaurant when search is performed
  useEffect(() => {
    if (searchCoordinates && filtered.length > 0) {
      setSelectedLocationId(filtered[0].id);
    }
  }, [searchCoordinates, filtered]);

  return (
    <Section size="standard">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left column - Search, Filters, and Location List */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              {/* Search Bar */}
              <SearchInput value={query} onChange={setQuery} isSearching={isSearching} />

              {/* Filter Pills */}
              <div className="flex flex-wrap gap-2">
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

              {/* Location Cards List */}
              <div className="space-y-4 max-h-[calc(100vh-400px)] overflow-y-auto pr-2">
                {filtered.length === 0 ? (
                  <p className="text-center font-body text-sm text-text-disabled py-8">
                    No locations match your search.
                  </p>
                ) : (
                  filtered.map((loc) => (
                    <div
                      key={loc.id}
                      onClick={() => setSelectedLocationId(loc.id)}
                      className={cn(
                        "cursor-pointer rounded-lg transition-all duration-200",
                        selectedLocationId === loc.id
                          ? "ring-2 ring-accent-primary scale-105"
                          : "hover:ring-1 hover:ring-border-strong"
                      )}
                    >
                      <LocationCard location={loc} size="full" />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right column - Map */}
          <div className="lg:col-span-2">
            <div className="sticky top-20">
              <LocationsMap
                locations={filtered}
                selectedLocationId={selectedLocationId}
                filter={filter}
                allLocations={locations}
              />
            </div>
          </div>
        </div>
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
          ? "border border-border-strong bg-accent-primary/10"
          : "border border-border-hairline hover:border-border-strong"
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
  isSearching,
}: {
  value: string;
  onChange: (v: string) => void;
  isSearching: boolean;
}) {
  return (
    <label className="flex items-center gap-3 border-b border-border-strong py-2">
      {isSearching ? (
        <svg
          className="animate-spin h-4 w-4 text-text-primary"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
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
      )}
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by location or address"
        className="w-full bg-transparent font-body text-sm text-text-primary placeholder:text-text-disabled focus:outline-none"
      />
    </label>
  );
}
