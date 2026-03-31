'use client';

/**
 * /store/saved-trips.store.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Lightweight "trip cart" — the luxury-platform equivalent of a shopping
 * cart. Users save itinerary instances and optionally customise group size,
 * travel window and notes before submitting an enquiry.
 *
 * Concerns:
 *   - One saved instance per unique itinerary (deduplication by itineraryId)
 *   - Mutable customisation fields (groupSize, preferredTravelWindow, notes)
 *   - Persisted to localStorage under key 'luxe-saved-trips'
 *   - Devtools labelled 'saved-trips-store'
 *
 * Usage: prefer the `useSavedTrips` / `useSavedTrip` hooks over direct
 * store access in components.
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { SavedTripItem, TripUpdate, Itinerary } from '@/types';

// ─── Store interface ───────────────────────────────────────────────────────────

interface SavedTripsState {
  // ── Data ──────────────────────────────────────────────────────────────────
  readonly items: SavedTripItem[];

  // ── Mutations ─────────────────────────────────────────────────────────────
  /** Add an itinerary to saved trips. No-op if already saved. */
  saveTrip: (
    itinerary:     Itinerary,
    customization?: Partial<Pick<SavedTripItem, 'groupSize' | 'preferredTravelWindow' | 'notes'>>,
  ) => void;

  /** Remove a saved trip by its `instanceId`. */
  removeTrip: (instanceId: string) => void;

  /** Update mutable fields of a saved trip. */
  updateTrip: (instanceId: string, update: TripUpdate) => void;

  /** Remove all saved trips. */
  clearTrips: () => void;

  // ── Selectors ─────────────────────────────────────────────────────────────
  /** True if an itinerary (by id) is already saved. */
  isSaved: (itineraryId: string) => boolean;

  /** Return a saved trip by instanceId, or undefined. */
  getTrip: (instanceId: string) => SavedTripItem | undefined;

  /**
   * Total indicative value: sum of (pricePerPerson × groupSize) across
   * all saved trips. Useful for a cart summary display.
   */
  totalValue: () => number;
}

// ─── Store ─────────────────────────────────────────────────────────────────────

export const useSavedTripsStore = create<SavedTripsState>()(
  devtools(
    persist(
      (set, get) => ({
        items: [],

        // ── saveTrip ────────────────────────────────────────────────────────
        saveTrip: (itinerary, customization = {}) =>
          set(
            (s) => {
              // Deduplicate — one instance per itinerary
              if (s.items.some((item) => item.itineraryId === itinerary.id)) return s;

              const newItem: SavedTripItem = {
                instanceId:           `saved-${itinerary.id}-${Date.now()}`,
                itineraryId:          itinerary.id,
                itinerarySlug:        itinerary.slug,
                title:                itinerary.title,
                destinationName:      itinerary.destination.name,
                heroImage:            itinerary.heroImage,
                pricePerPerson:       itinerary.pricePerPerson,
                currency:             itinerary.currency,
                durationDays:         itinerary.durationDays,
                tier:                 itinerary.tier,
                savedAt:              new Date().toISOString(),
                // Customisation — defaults
                groupSize:            customization.groupSize            ?? 2,
                preferredTravelWindow: customization.preferredTravelWindow,
                notes:                customization.notes,
              };

              return { items: [...s.items, newItem] };
            },
            false,
            'saveTrip',
          ),

        // ── removeTrip ──────────────────────────────────────────────────────
        removeTrip: (instanceId) =>
          set(
            (s) => ({ items: s.items.filter((i) => i.instanceId !== instanceId) }),
            false,
            'removeTrip',
          ),

        // ── updateTrip ──────────────────────────────────────────────────────
        updateTrip: (instanceId, update) =>
          set(
            (s) => ({
              items: s.items.map((item) =>
                item.instanceId === instanceId ? { ...item, ...update } : item,
              ),
            }),
            false,
            'updateTrip',
          ),

        // ── clearTrips ──────────────────────────────────────────────────────
        clearTrips: () => set({ items: [] }, false, 'clearTrips'),

        // ── Selectors ───────────────────────────────────────────────────────
        isSaved:    (itineraryId) => get().items.some((i) => i.itineraryId === itineraryId),
        getTrip:    (instanceId)  => get().items.find((i) => i.instanceId  === instanceId),
        totalValue: ()            =>
          get().items.reduce((sum, item) => sum + item.pricePerPerson * item.groupSize, 0),
      }),
      {
        name:       'luxe-saved-trips',
        // Only persist item data — selectors are derived at runtime
        partialize: (s) => ({ items: s.items }),
      },
    ),
    { name: 'saved-trips-store' },
  ),
);
