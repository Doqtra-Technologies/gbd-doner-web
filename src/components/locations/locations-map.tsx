"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import type { Location } from "@/domain/location";

interface LocationsMapProps {
  locations: Location[];
  selectedLocationId?: string | null;
  filter: string;
  allLocations: Location[];
  searchCoordinates?: { lat: number; lng: number } | null;
}

export function LocationsMap({
  locations,
  selectedLocationId,
  filter,
  allLocations,
  searchCoordinates,
}: LocationsMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const markers = useRef<Map<string, L.Marker>>(new Map());
  const markerGroup = useRef<L.FeatureGroup | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  // Initialize map once
  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    // Initialize map centered on London
    map.current = L.map(mapContainer.current).setView([51.5074, -0.1278], 11);

    // Add OpenStreetMap tile layer with aesthetic filters
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map.current);

    // Apply CSS filter to tiles
    const style = document.createElement("style");
    style.textContent = `
      .leaflet-tile-container img {
        filter: brightness(1.1) contrast(0.9) saturate(0.75) !important;
      }
    `;
    document.head.appendChild(style);

    // Create marker group
    markerGroup.current = L.featureGroup().addTo(map.current);

    setIsMapReady(true);

    return () => {
      // Cleanup
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
      document.head.removeChild(style);
    };
  }, []);

  // Create or update markers based on filtered locations
  useEffect(() => {
    if (!map.current || !markerGroup.current || !isMapReady) return;

    // Clear existing markers
    markers.current.forEach((marker) => marker.remove());
    markers.current.clear();
    markerGroup.current.clearLayers();

    // Create red icon for regular markers
    const redIcon = L.icon({
      iconUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 40' fill='%23f0e68c'%3E%3Cpath d='M16 0C8.27 0 2 6.27 2 14c0 8 14 26 14 26s14-18 14-26c0-7.73-6.27-14-14-14zm0 19c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z' fill='%23f0e68c' stroke='%23d4af37' stroke-width='1'/%3E%3Ccircle cx='16' cy='14' r='5' fill='none' stroke='%23333' stroke-width='1.5'/%3E%3C/svg%3E",
      iconSize: [32, 40],
      iconAnchor: [16, 40],
      popupAnchor: [0, -40],
      shadowUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 40'%3E%3Cellipse cx='16' cy='38' rx='10' ry='2' fill='%23000' opacity='0.2'/%3E%3C/svg%3E",
      shadowSize: [32, 40],
      shadowAnchor: [16, 40],
    });

    // Create blue icon for selected marker
    const blueIcon = L.icon({
      iconUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 40' fill='%233b82f6'%3E%3Cpath d='M16 0C8.27 0 2 6.27 2 14c0 8 14 26 14 26s14-18 14-26c0-7.73-6.27-14-14-14zm0 19c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z' fill='%233b82f6' stroke='%232563eb' stroke-width='1'/%3E%3Ccircle cx='16' cy='14' r='5' fill='none' stroke='%23fff' stroke-width='2'/%3E%3C/svg%3E",
      iconSize: [36, 45],
      iconAnchor: [18, 45],
      popupAnchor: [0, -45],
      shadowUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 40'%3E%3Cellipse cx='16' cy='38' rx='12' ry='2' fill='%23000' opacity='0.3'/%3E%3C/svg%3E",
      shadowSize: [36, 45],
      shadowAnchor: [18, 45],
    });

    // Add markers for all filtered locations
    locations.forEach((location) => {
      if (!location.coordinates.lat || !location.coordinates.lng) return;

      const isSelected = location.id === selectedLocationId;
      const icon = isSelected ? blueIcon : redIcon;

      const marker = L.marker([location.coordinates.lat, location.coordinates.lng], {
        icon,
      });

      const popupContent = `
        <div class="font-body text-sm max-w-xs">
          <p class="font-semibold text-text-primary">${location.name}</p>
          <p class="text-text-secondary text-xs">${location.addressLine1}</p>
          <p class="text-text-secondary text-xs">${location.city}, ${location.postcode}</p>
          ${location.phone ? `<p class="text-text-secondary text-xs mt-1">${location.phone}</p>` : ""}
        </div>
      `;

      marker.bindPopup(popupContent);

      if (isSelected) {
        marker.openPopup();
      }

      marker.addTo(markerGroup.current!);
      markers.current.set(location.id, marker);
    });
  }, [locations, isMapReady, selectedLocationId]);

  // Handle location selection - zoom to selected marker
  useEffect(() => {
    if (!selectedLocationId || !map.current || !isMapReady) return;

    // Small delay to ensure marker is in the map
    const timer = setTimeout(() => {
      const marker = markers.current.get(selectedLocationId);
      if (marker && map.current) {
        const latLng = marker.getLatLng();
        // Center the map on the marker with smooth animation
        map.current.setView(latLng, 16, { 
          animate: true, 
          duration: 0.8,
          easeLinearity: 0.5
        });
        // Open popup after animation
        setTimeout(() => {
          if (marker) marker.openPopup();
        }, 300);
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [selectedLocationId, isMapReady]);

  // Handle search - zoom to search location ONLY if no location is selected
  useEffect(() => {
    if (!searchCoordinates || !map.current || !isMapReady || selectedLocationId) return;

    // Only zoom to search area if no location is selected yet
    map.current.setView([searchCoordinates.lat, searchCoordinates.lng], 15, {
      animate: true,
      duration: 0.8,
      easeLinearity: 0.5,
    });
  }, [searchCoordinates, isMapReady, selectedLocationId]);

  // Handle city filter - zoom to show all locations of that city
  useEffect(() => {
    if (!map.current || !markerGroup.current || !isMapReady) return;

    // If "all" filter, zoom to show all locations
    if (filter === "all" && locations.length > 0) {
      const bounds = L.latLngBounds(
        locations
          .filter((l) => l.coordinates.lat && l.coordinates.lng)
          .map((l) => [l.coordinates.lat, l.coordinates.lng] as L.LatLngTuple)
      );

      if (bounds.isValid()) {
        map.current.fitBounds(bounds, { 
          padding: [50, 50], 
          animate: true, 
          duration: 0.8,
          easeLinearity: 0.5
        });
      }
    } else if (filter !== "all" && locations.length > 0) {
      // Zoom to city-specific locations
      const bounds = L.latLngBounds(
        locations
          .filter((l) => l.city === filter && l.coordinates.lat && l.coordinates.lng)
          .map((l) => [l.coordinates.lat, l.coordinates.lng] as L.LatLngTuple)
      );

      if (bounds.isValid()) {
        map.current.fitBounds(bounds, { 
          padding: [50, 50], 
          animate: true, 
          duration: 0.8,
          easeLinearity: 0.5
        });
      }
    }
  }, [filter, locations, isMapReady]);

  return (
    <div className="rounded-lg border border-border-hairline overflow-hidden bg-canvas">
      <div
        ref={mapContainer}
        className="h-[calc(100vh-120px)] w-full"
        style={{ background: "#f5f5f5" }}
      />
    </div>
  );
}
