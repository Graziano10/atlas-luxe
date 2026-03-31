'use client';

/**
 * /hooks/useDestinations.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Async hook that fetches a paginated, filtered list of destinations
 * via the API layer. Manages loading / success / error state internally
 * so components remain free of data-fetching logic.
 *
 * @example
 *   const { data, isLoading, isError, error } = useDestinations({ featured: true });
 *   if (isLoading) return <Skeleton />;
 *   if (isError)   return <ErrorState message={error} />;
 *   return <Grid items={data.data} />;
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { api } from '@/lib/api';
import type {
  Destination,
  DestinationQuery,
  PaginatedResponse,
  AsyncState,
} from '@/types';

// ─── Hook return type ─────────────────────────────────────────────────────────

interface UseDestinationsReturn extends AsyncState<PaginatedResponse<Destination>> {
  isLoading: boolean;
  isError:   boolean;
  /** Manually re-trigger the fetch with the current query. */
  refetch:   () => void;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useDestinations(
  query: DestinationQuery = {},
): UseDestinationsReturn {
  const [state, setState] = useState<AsyncState<PaginatedResponse<Destination>>>({
    data:   null,
    status: 'idle',
    error:  null,
  });

  // Stable serialised key so the effect only re-fires when the query changes
  const queryKey = JSON.stringify(query);

  const fetchData = useCallback(async (q: DestinationQuery) => {
    setState((prev: AsyncState<PaginatedResponse<Destination>>) => ({ ...prev, status: 'loading', error: null }));

    const result = await api.destinations.list(q);

    if (result.ok) {
      setState({ data: result.data, status: 'success', error: null });
    } else {
      setState({ data: null, status: 'error', error: result.error.message });
    }
  }, []);

  useEffect(() => {
    void fetchData(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryKey]);

  return {
    ...state,
    isLoading: state.status === 'loading',
    isError:   state.status === 'error',
    refetch:   () => void fetchData(query),
  };
}
