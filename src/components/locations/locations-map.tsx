"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { mapConfig } from "@/lib/config";
import type { Location } from "@/domain/location";

export function LocationsMap({
  locations,
  activeId,
  onSelect,
}: {
  locations: Location[];
  activeId: string | null;
  onSelect: (id: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<Map<string, mapboxgl.Marker>>(new Map());

  useEffect(() => {
    if (!ref.current || mapRef.current) return;
    if (!mapConfig.token) return;

    mapboxgl.accessToken = mapConfig.token;
    const map = new mapboxgl.Map({
      container: ref.current,
      style: mapConfig.style,
      center: [mapConfig.defaultCenter.lng, mapConfig.defaultCenter.lat],
      zoom: mapConfig.defaultZoom,
    });
    mapRef.current = map;

    locations.forEach((loc) => {
      const el = document.createElement("button");
      el.className = "gbd-marker";
      el.setAttribute("aria-label", loc.name);
      el.style.width = "22px";
      el.style.height = "22px";
      el.style.borderRadius = "50%";
      el.style.background = "#C94035";
      el.style.boxShadow = "0 0 0 4px rgba(201,64,53,0.25)";
      el.style.cursor = "pointer";
      el.style.border = "2px solid #fff";
      el.addEventListener("click", () => onSelect(loc.id));

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([loc.coordinates.lng, loc.coordinates.lat])
        .addTo(map);
      markersRef.current.set(loc.id, marker);
    });

    if (locations.length > 1) {
      const bounds = new mapboxgl.LngLatBounds();
      locations.forEach((l) => bounds.extend([l.coordinates.lng, l.coordinates.lat]));
      map.fitBounds(bounds, { padding: 80, maxZoom: 12, duration: 0 });
    } else if (locations[0]) {
      map.setCenter([locations[0].coordinates.lng, locations[0].coordinates.lat]);
      map.setZoom(13);
    }

    return () => {
      map.remove();
      mapRef.current = null;
      markersRef.current.clear();
    };
  }, [locations, onSelect]);

  useEffect(() => {
    if (!mapRef.current || !activeId) return;
    const loc = locations.find((l) => l.id === activeId);
    if (!loc) return;
    mapRef.current.flyTo({
      center: [loc.coordinates.lng, loc.coordinates.lat],
      zoom: 14,
      essential: true,
      duration: 900,
    });
  }, [activeId, locations]);

  if (!mapConfig.token) {
    return (
      <div className="aspect-[4/3] lg:aspect-auto lg:h-full bg-gbd-navy text-white flex items-center justify-center text-center p-8">
        <div>
          <div className="display-eyebrow text-gbd-red mb-3">Map Disabled</div>
          <p className="body-base text-white/75 max-w-sm">
            Set <code className="font-mono text-gbd-red">NEXT_PUBLIC_MAPBOX_TOKEN</code> in
            <span className="font-mono"> .env.local</span> to enable the interactive map.
          </p>
        </div>
      </div>
    );
  }

  return <div ref={ref} className="aspect-[4/3] lg:aspect-auto lg:h-full w-full" />;
}
