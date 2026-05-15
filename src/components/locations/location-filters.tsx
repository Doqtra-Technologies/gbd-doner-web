"use client";

import { useLocationState } from "@/components/locations/location-state";
import { cn } from "@/lib/utils";

/**
 * City filter pill row.
 *
 * Active pill: border-border-strong (full opacity navy outline).
 * Inactive:   border-border-hairline (10% navy).
 * No filled backgrounds — palette stays at 3 colours.
 */
export function LocationFilters() {
  const { filter, setFilter, cities } = useLocationState();
  return (
    <div className="flex flex-wrap gap-1.5">
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
      aria-pressed={active}
      className={cn(
        "inline-flex h-7 items-center rounded-full bg-canvas px-2.5 font-display font-bold uppercase tracking-button text-[10px] text-text-primary transition-colors duration-300 ease-smooth",
        active
          ? "border border-border-strong"
          : "border border-border-hairline hover:border-border-strong",
      )}
    >
      {children}
    </button>
  );
}
