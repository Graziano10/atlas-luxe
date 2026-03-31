'use client';

import { useTravelStore } from '@/store/travel.store';

/**
 * Convenience hook for wishlist operations on a specific item.
 */
export function useWishlist(id: string) {
  const isInWishlist     = useTravelStore((s) => s.isInWishlist(id));
  const addToWishlist    = useTravelStore((s) => s.addToWishlist);
  const removeFromWishlist = useTravelStore((s) => s.removeFromWishlist);

  const toggle = () => {
    if (isInWishlist) {
      removeFromWishlist(id);
    } else {
      addToWishlist(id);
    }
  };

  return { isInWishlist, toggle };
}
