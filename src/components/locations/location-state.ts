"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { createElement } from "react";
import { geocodeLocation } from "@/lib/geocoding";
import { calculateDistance } from "@/lib/distance";
import type { Location } from "@/domain/location";

/**
 * Shared state for the operational locations surface.
 *
 * Owns: search query, geocoded search centre, optional user location,
 * active city filter, the currently-selected branch (synchronised between
 * map and list), and the currently-hovered branch (drives marker scale-up
 * on hover).
 *
 * Derives: `filteredLocations` — locations passing the city filter, sorted
 * by distance from the search centre when one exists; sorted by name
 * otherwise.
 */
interface LocationStateContextValue {
  query: string;
  setQuery: (q: string) => void;
  isSearching: boolean;
  activeCoordinates: { lat: number; lng: number } | null;
  userCoordinates: { lat: number; lng: number } | null;
  setUserCoordinates: (coords: { lat: number; lng: number } | null) => void;

  filter: string;
  setFilter: (f: string) => void;
  cities: string[];

  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;

  allLocations: Location[];
  filteredLocations: Location[];
}

const LocationStateContext = createContext<LocationStateContextValue | null>(null);

export function LocationStateProvider({
  locations,
  children,
}: {
  locations: Location[];
  children: ReactNode;
}) {
  const [query, setQueryRaw] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchCoordinates, setSearchCoordinates] = useState<
    { lat: number; lng: number } | null
  >(null);
  const [userCoordinates, setUserCoordinatesRaw] = useState<
    { lat: number; lng: number } | null
  >(null);

  const [filter, setFilterRaw] = useState<string>("all");
  const [selectedId, setSelectedIdRaw] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const cities = useMemo(() => {
    const set = new Set<string>();
    locations.forEach((l) => l.city && set.add(l.city));
    return Array.from(set).sort();
  }, [locations]);

  const setQuery = useCallback((q: string) => setQueryRaw(q), []);
  const setFilter = useCallback((f: string) => setFilterRaw(f), []);
  const setSelectedId = useCallback(
    (id: string | null) => setSelectedIdRaw(id),
    [],
  );
  const setUserCoordinates = useCallback(
    (coords: { lat: number; lng: number } | null) => setUserCoordinatesRaw(coords),
    [],
  );

  useEffect(() => {
    const q = query.trim();
    if (!q) {
      setSearchCoordinates(null);
      setIsSearching(false);
      return;
    }
    let cancelled = false;
    const timer = setTimeout(async () => {
      setIsSearching(true);
      const result = await geocodeLocation(q);
      if (cancelled) return;
      setSearchCoordinates(result ? { lat: result.lat, lng: result.lng } : null);
      setIsSearching(false);
    }, 220);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [query]);

  const filteredLocations = useMemo(() => {
    const cityScoped =
      filter === "all" ? locations : locations.filter((l) => l.city === filter);
    const activeCoordinates = searchCoordinates ?? userCoordinates;
    if (!activeCoordinates) {
      return [...cityScoped].sort((a, b) => a.name.localeCompare(b.name));
    }
    return [...cityScoped].sort(
      (a, b) =>
        calculateDistance(
          activeCoordinates.lat,
          activeCoordinates.lng,
          a.coordinates.lat,
          a.coordinates.lng,
        ) -
        calculateDistance(
          activeCoordinates.lat,
          activeCoordinates.lng,
          b.coordinates.lat,
          b.coordinates.lng,
        ),
    );
  }, [locations, filter, searchCoordinates, userCoordinates]);

  // Auto-select the nearest result whenever a search resolves.
  useEffect(() => {
    const activeCoordinates = searchCoordinates ?? userCoordinates;
    if (activeCoordinates && filteredLocations.length > 0) {
      setSelectedIdRaw(filteredLocations[0].id);
    }
  }, [searchCoordinates, userCoordinates, filteredLocations]);

  const activeCoordinates = searchCoordinates ?? userCoordinates;

  const value = useMemo<LocationStateContextValue>(
    () => ({
      query,
      setQuery,
      isSearching,
      activeCoordinates,
      userCoordinates,
      setUserCoordinates,
      filter,
      setFilter,
      cities,
      selectedId,
      setSelectedId,
      hoveredId,
      setHoveredId,
      allLocations: locations,
      filteredLocations,
    }),
    [
      query,
      setQuery,
      isSearching,
      activeCoordinates,
      userCoordinates,
      setUserCoordinates,
      filter,
      setFilter,
      cities,
      selectedId,
      setSelectedId,
      hoveredId,
      locations,
      filteredLocations,
    ],
  );

  return createElement(LocationStateContext.Provider, { value }, children);
}

export function useLocationState(): LocationStateContextValue {
  const ctx = useContext(LocationStateContext);
  if (!ctx) {
    throw new Error("useLocationState must be used inside <LocationStateProvider>");
  }
  return ctx;
}
