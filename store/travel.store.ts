'use client';

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { Destination, Itinerary, Continent, LuxuryTier } from '@/types';

interface FilterState {
  continent:    Continent | null;
  tier:         LuxuryTier | null;
  maxDuration:  number | null;
  minPrice:     number | null;
  maxPrice:     number | null;
}

interface TravelState {
  // Wishlist
  wishlistIds:      readonly string[];
  addToWishlist:    (id: string) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist:     (id: string) => boolean;

  // Filters
  filters:          FilterState;
  setFilter:        <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  clearFilters:     () => void;

  // Recently Viewed
  recentlyViewedIds: readonly string[];
  addRecentlyViewed: (id: string) => void;

  // Comparison
  compareIds:       readonly string[];
  addToCompare:     (id: string) => void;
  removeFromCompare: (id: string) => void;
  clearCompare:     () => void;
}

const DEFAULT_FILTERS: FilterState = {
  continent:   null,
  tier:        null,
  maxDuration: null,
  minPrice:    null,
  maxPrice:    null,
};

export const useTravelStore = create<TravelState>()(
  devtools(
    persist(
      (set, get) => ({
        // Wishlist
        wishlistIds: [],
        addToWishlist: (id) =>
          set(
            (s) => ({
              wishlistIds: s.wishlistIds.includes(id) ? s.wishlistIds : [...s.wishlistIds, id],
            }),
            false,
            'addToWishlist',
          ),
        removeFromWishlist: (id) =>
          set(
            (s) => ({ wishlistIds: s.wishlistIds.filter((wId) => wId !== id) }),
            false,
            'removeFromWishlist',
          ),
        isInWishlist: (id) => get().wishlistIds.includes(id),

        // Filters
        filters: DEFAULT_FILTERS,
        setFilter: (key, value) =>
          set((s) => ({ filters: { ...s.filters, [key]: value } }), false, 'setFilter'),
        clearFilters: () => set({ filters: DEFAULT_FILTERS }, false, 'clearFilters'),

        // Recently Viewed
        recentlyViewedIds: [],
        addRecentlyViewed: (id) =>
          set(
            (s) => ({
              recentlyViewedIds: [id, ...s.recentlyViewedIds.filter((rId) => rId !== id)].slice(
                0,
                10,
              ),
            }),
            false,
            'addRecentlyViewed',
          ),

        // Comparison (max 3)
        compareIds: [],
        addToCompare: (id) =>
          set(
            (s) => ({
              compareIds:
                s.compareIds.length < 3 && !s.compareIds.includes(id)
                  ? [...s.compareIds, id]
                  : s.compareIds,
            }),
            false,
            'addToCompare',
          ),
        removeFromCompare: (id) =>
          set(
            (s) => ({ compareIds: s.compareIds.filter((cId) => cId !== id) }),
            false,
            'removeFromCompare',
          ),
        clearCompare: () => set({ compareIds: [] }, false, 'clearCompare'),
      }),
      {
        name:    'luxe-travel-store',
        partialize: (s) => ({
          wishlistIds:       s.wishlistIds,
          recentlyViewedIds: s.recentlyViewedIds,
        }),
      },
    ),
    { name: 'travel-store' },
  ),
);
