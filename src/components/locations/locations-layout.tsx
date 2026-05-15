"use client";

import dynamic from "next/dynamic";
import { LocationStateProvider } from "@/components/locations/location-state";
import { LocationsSidebar } from "@/components/locations/locations-sidebar";
import type { Location } from "@/domain/location";

/**
 * Operational locations surface.
 *
 * Desktop (lg+):
 *   40% sidebar / 60% map split, both pinned to the viewport so the user
 *   can scan branches without losing the map. Sidebar scrolls
 *   independently; map stays stationary.
 *
 * Mobile / tablet:
 *   1. Compact search + filters
 *   2. Map preview (capped at ~50vh — does not dominate)
 *   3. Vertically-stacked branch cards
 *
 * The split-screen is wrapped in <LocationStateProvider> which owns:
 * query, search coordinates, filter, selectedId, hoveredId. All children
 * read/write via the useLocationState hook — no prop drilling.
 *
 * The map is dynamically imported with SSR disabled (Leaflet expects
 * window). A neutral placeholder preserves layout while the bundle loads.
 */
const LocationsMap = dynamic(
  () =>
    import("@/components/locations/locations-map").then((m) => m.LocationsMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full bg-border-hairline animate-pulse" />
    ),
  },
);

export function LocationsLayout({ locations }: { locations: Location[] }) {
  return (
    <LocationStateProvider locations={locations}>
      <section className="relative w-screen min-h-[100svh] bg-canvas lg:-mt-20 lg:h-screen lg:overflow-hidden lg:overscroll-none">
        <div className="flex h-full w-full flex-col lg:flex-row">
          {/* Map — preview first on mobile, fullscreen on desktop */}
          <div className="order-first lg:order-last relative z-[10] h-[40vh] w-full sm:h-[45vh] lg:h-full lg:flex-1">
            <LocationsMap />
          </div>

          {/* Sidebar — fixed-width operational panel */}
          <div className="order-last lg:order-first relative z-[40] w-full bg-canvas lg:h-full lg:w-[440px] lg:shrink-0 lg:border-r lg:border-border-hairline xl:w-[480px] 2xl:w-[520px]">
            <LocationsSidebar />
          </div>
        </div>
      </section>
    </LocationStateProvider>
  );
}
