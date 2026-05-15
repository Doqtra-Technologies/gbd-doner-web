"use client";

import { useEffect, useRef } from "react";
import { useLocationState } from "@/components/locations/location-state";
import { StickyLocationHeader } from "@/components/locations/sticky-location-header";
import { LocationCard } from "@/components/locations/location-card";

/**
 * Left panel of the locations split-screen.
 *
 * Composition:
 *   [ Search           ]
 *   [ City filters     ]
 *   [ Result count     ]
 *   [ Scrollable list  ] ← independently scrollable; map stays sticky
 *
 * When the user selects a branch (via map or by clicking another list item),
 * that item scrolls into view inside the sidebar.
 */
export function LocationsSidebar() {
  const { filteredLocations, selectedId } = useLocationState();
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!selectedId || !listRef.current) return;
    const el = listRef.current.querySelector<HTMLElement>(
      `[data-location-id="${selectedId}"]`,
    );
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [selectedId]);

  return (
    <aside className="contents md:flex md:h-full md:w-[360px] md:min-w-0 md:shrink-0 md:flex-col md:overflow-hidden md:border-r md:border-border-hairline md:bg-canvas lg:w-[440px] xl:w-[480px] 2xl:w-[520px]">
      <StickyLocationHeader className="order-1 md:order-none shrink-0 min-w-0" />

      <div
        ref={listRef}
        className="order-3 md:order-none flex flex-col flex-1 min-w-0 min-h-0 overflow-y-auto overflow-x-hidden px-5 py-4 sm:px-6 md:px-6 gap-2"
        role="list"
      >
        {filteredLocations.length === 0 ? (
          <p className="font-body text-sm text-text-disabled py-8 text-center">
            No locations match your search.
          </p>
        ) : (
          filteredLocations.map((loc) => (
            <div key={loc.id} data-location-id={loc.id} role="listitem" className="shrink-0 relative">
              <LocationCard location={loc} />
            </div>
          ))
        )}
      </div>
    </aside>
  );
}
