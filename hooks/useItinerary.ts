'use client';

/**
 * /hooks/useItinerary.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Fetches a single itinerary by slug via the API layer.
 * Automatically aborts in-flight requests when the slug changes or the
 * component unmounts, preventing stale state updates.
 *
 * @example
 *   const { data: itinerary, isLoading } = useItinerary('maldives-private-atoll-7-nights');
 */

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import type { Itinerary, AsyncState } from '@/types';

// ─── Hook return type ─────────────────────────────────────────────────────────

interface UseItineraryReturn extends AsyncState<Itinerary> {
  isLoading: boolean;
  isError:   boolean;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useItinerary(slug: string): UseItineraryReturn {
  const [state, setState] = useState<AsyncState<Itinerary>>({
    data:   null,
    status: 'idle',
    error:  null,
  });

  useEffect(() => {
    if (!slug) return;

    let cancelled = false;

    setState((prev) => ({ ...prev, status: 'loading', error: null }));

    api.itineraries.bySlug(slug).then((result) => {
      if (cancelled) return;

      if (result.ok) {
        setState({ data: result.data, status: 'success', error: null });
      } else {
        setState({ data: null, status: 'error', error: result.error.message });
      }
    });

    // Cancel in-flight state update if slug changes or component unmounts
    return () => { cancelled = true; };
  }, [slug]);

  return {
    ...state,
    isLoading: state.status === 'loading',
    isError:   state.status === 'error',
  };
}
