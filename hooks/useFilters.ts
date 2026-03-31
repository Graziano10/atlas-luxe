'use client';

/**
 * /hooks/useFilters.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Surfaces the active filter state from the travel store and derives
 * synchronously filtered lists of destinations and itineraries.
 *
 * Keeps components fully decoupled from the store shape — they only
 * consume the values and setters this hook exposes.
 *
 * @example
 *   const { filteredDestinations, setFilter, hasActiveFilters, clearFilters } = useFilters();
 */

import { useMemo } from 'react';
import { useTravelStore } from '@/store/travel.store';
import { queryDestinations, queryItineraries } from '@/lib/data';
import type { Destination, Itinerary } from '@/types';

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useFilters() {
  const filters      = useTravelStore((s) => s.filters);
  const setFilter    = useTravelStore((s) => s.setFilter);
  const clearFilters = useTravelStore((s) => s.clearFilters);

  // Derive filtered lists from the store's current filter state.
  // useMemo prevents redundant recomputes when unrelated store slices change.
  const filteredDestinations = useMemo<readonly Destination[]>(
    () =>
      queryDestinations({
        continent: filters.continent ?? undefined,
      }),
    [filters.continent],
  );

  const filteredItineraries = useMemo<readonly Itinerary[]>(
    () =>
      queryItineraries({
        tier:      filters.tier          ?? undefined,
        maxDays:   filters.maxDuration   ?? undefined,
        minPrice:  filters.minPrice      ?? undefined,
        maxPrice:  filters.maxPrice      ?? undefined,
      }),
    [filters.tier, filters.maxDuration, filters.minPrice, filters.maxPrice],
  );

  const hasActiveFilters = useMemo(
    () => Object.values(filters).some((v) => v !== null),
    [filters],
  );

  return {
    /** Raw filter state from the store. */
    filters,
    setFilter,
    clearFilters,
    hasActiveFilters,
    /** Destinations filtered by the active continent filter. */
    filteredDestinations,
    /** Itineraries filtered by tier, duration and price range. */
    filteredItineraries,
    /** Shorthand counts for filter result badges. */
    destinationCount: filteredDestinations.length,
    itineraryCount:   filteredItineraries.length,
  };
}
