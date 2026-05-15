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
      <main className="flex h-[calc(100vh-5rem)] min-h-[calc(100svh-5rem)] w-screen flex-col md:flex-row overflow-hidden bg-canvas min-w-0 min-h-0">
        <LocationsSidebar />

        {/* Map — preview on mobile, fullscreen on desktop */}
        <div className="order-2 md:order-none relative z-[10] flex-none h-[40vh] sm:h-[45vh] md:flex-1 md:h-full min-w-0 min-h-0 overflow-hidden">
          <LocationsMap />
        </div>
      </main>
    </LocationStateProvider>
  );
}
