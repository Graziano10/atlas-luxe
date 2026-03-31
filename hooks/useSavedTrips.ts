'use client';

/**
 * /hooks/useSavedTrips.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Convenience hooks over the saved-trips store. Two exports:
 *
 *  • `useSavedTrips()` — full list + all actions (trip drawer, summary page)
 *  • `useSavedTrip(itineraryId)` — single-item state for buttons / cards
 *
 * @example — list hook
 *   const { items, count, totalValue, toggleSave } = useSavedTrips();
 *
 * @example — single item hook
 *   const { isSaved, toggle } = useSavedTrip(itinerary.id);
 *   <SaveTripButton isSaved={isSaved} onToggle={() => toggle(itinerary)} />
 */

import { useSavedTripsStore } from '@/store/saved-trips.store';
import type { Itinerary, SavedTripItem, TripUpdate } from '@/types';

// ─── useSavedTrips ────────────────────────────────────────────────────────────

interface UseSavedTripsReturn {
  /** All saved trip items, newest last. */
  items:       SavedTripItem[];
  /** Number of saved trips. */
  count:       number;
  /**
   * Indicative total value: Σ(pricePerPerson × groupSize).
   * Currency may differ across items — display per-item currency in UI.
   */
  totalValue:  number;
  saveTrip:    (itinerary: Itinerary, customization?: Partial<Pick<SavedTripItem, 'groupSize' | 'preferredTravelWindow' | 'notes'>>) => void;
  removeTrip:  (instanceId: string) => void;
  updateTrip:  (instanceId: string, update: TripUpdate) => void;
  clearTrips:  () => void;
  isSaved:     (itineraryId: string) => boolean;
  /**
   * Toggle save state. If already saved, removes the existing instance.
   * If not saved, saves with default customisations.
   */
  toggleSave:  (itinerary: Itinerary) => void;
}

export function useSavedTrips(): UseSavedTripsReturn {
  const items      = useSavedTripsStore((s) => s.items);
  const saveTrip   = useSavedTripsStore((s) => s.saveTrip);
  const removeTrip = useSavedTripsStore((s) => s.removeTrip);
  const updateTrip = useSavedTripsStore((s) => s.updateTrip);
  const clearTrips = useSavedTripsStore((s) => s.clearTrips);
  const isSaved    = useSavedTripsStore((s) => s.isSaved);
  const totalValue = useSavedTripsStore((s) => s.totalValue);

  const toggleSave = (itinerary: Itinerary) => {
    if (isSaved(itinerary.id)) {
      const existing = items.find((i) => i.itineraryId === itinerary.id);
      if (existing) removeTrip(existing.instanceId);
    } else {
      saveTrip(itinerary);
    }
  };

  return {
    items,
    count:      items.length,
    totalValue: totalValue(),
    saveTrip,
    removeTrip,
    updateTrip,
    clearTrips,
    isSaved,
    toggleSave,
  };
}

// ─── useSavedTrip (single-item) ───────────────────────────────────────────────

interface UseSavedTripReturn {
  /** True if this itinerary is currently saved. */
  isSaved:   boolean;
  /** The saved item instance, if present. */
  item:      SavedTripItem | undefined;
  /** Toggle save/remove for this specific itinerary. */
  toggle:    (itinerary: Itinerary) => void;
  /** Update mutable fields — only defined when the item is saved. */
  update:    ((u: TripUpdate) => void) | undefined;
  /** Remove this item — only defined when the item is saved. */
  remove:    (() => void) | undefined;
}

export function useSavedTrip(itineraryId: string): UseSavedTripReturn {
  const items      = useSavedTripsStore((s) => s.items);
  const isSaved    = useSavedTripsStore((s) => s.isSaved(itineraryId));
  const saveTrip   = useSavedTripsStore((s) => s.saveTrip);
  const removeTrip = useSavedTripsStore((s) => s.removeTrip);
  const updateTrip = useSavedTripsStore((s) => s.updateTrip);

  const item = items.find((i) => i.itineraryId === itineraryId);

  const toggle = (itinerary: Itinerary) => {
    if (isSaved && item) {
      removeTrip(item.instanceId);
    } else {
      saveTrip(itinerary);
    }
  };

  return {
    isSaved,
    item,
    toggle,
    update: item ? (u: TripUpdate) => updateTrip(item.instanceId, u) : undefined,
    remove: item ? ()              => removeTrip(item.instanceId)     : undefined,
  };
}
