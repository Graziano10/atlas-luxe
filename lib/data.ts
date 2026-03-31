/**
 * /lib/data.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Unified data catalog — the single import point for all static domain data.
 *
 * Architecture rule: components and hooks must import from @/lib/data (or
 * @/lib/api for async calls) — never directly from the individual source
 * files. This layer owns filter logic, relational lookups, and catalog
 * metadata so that changing a data source only requires editing one file.
 */

import {
  getAllDestinations,
  getFeaturedDestinations,
  getDestinationBySlug,
  getDestinationsByContinent,
  searchDestinations,
} from '@/lib/destinations';

import {
  getAllItineraries,
  getFeaturedItineraries,
  getItineraryBySlug,
  getItinerariesByDestination,
} from '@/lib/itineraries';

import {
  getAllTestimonials,
  getFeaturedTestimonials,
} from '@/lib/testimonials';

import type {
  Destination,
  Itinerary,
  DestinationQuery,
  ItineraryQuery,
  Continent,
  LuxuryTier,
} from '@/types';

// ─── Re-exports ────────────────────────────────────────────────────────────────
// Expose individual accessors through the unified namespace so callers
// never need to know which source file owns the data.

export {
  getAllDestinations,
  getFeaturedDestinations,
  getDestinationBySlug,
  getDestinationsByContinent,
  searchDestinations,
  getAllItineraries,
  getFeaturedItineraries,
  getItineraryBySlug,
  getItinerariesByDestination,
  getAllTestimonials,
  getFeaturedTestimonials,
};

// ─── Typed filter queries ──────────────────────────────────────────────────────

/**
 * Filter and search destinations using the typed `DestinationQuery` shape.
 * Returns synchronously — suitable for server components and derived hooks.
 */
export function queryDestinations(q: DestinationQuery): readonly Destination[] {
  let results: readonly Destination[] = getAllDestinations();

  if (q.featured != null) {
    results = results.filter((d) => d.featured === q.featured);
  }
  if (q.continent) {
    results = results.filter((d) => d.continent === q.continent);
  }
  if (q.tags && q.tags.length > 0) {
    results = results.filter((d) => q.tags!.some((t) => d.tags.includes(t)));
  }
  if (q.search) {
    const needle = q.search.toLowerCase();
    results = results.filter(
      (d) =>
        d.name.toLowerCase().includes(needle) ||
        d.country.toLowerCase().includes(needle) ||
        d.tagline.toLowerCase().includes(needle),
    );
  }

  return results;
}

/**
 * Filter itineraries using the typed `ItineraryQuery` shape.
 * Returns synchronously — suitable for server components and derived hooks.
 */
export function queryItineraries(q: ItineraryQuery): readonly Itinerary[] {
  let results: readonly Itinerary[] = getAllItineraries();

  if (q.featured != null) {
    results = results.filter((i) => i.featured === q.featured);
  }
  if (q.destinationId) {
    results = results.filter((i) => i.destination.id === q.destinationId);
  }
  if (q.tier) {
    results = results.filter((i) => i.tier === q.tier);
  }
  if (q.minDays != null) {
    results = results.filter((i) => i.durationDays >= q.minDays!);
  }
  if (q.maxDays != null) {
    results = results.filter((i) => i.durationDays <= q.maxDays!);
  }
  if (q.minPrice != null) {
    results = results.filter((i) => i.pricePerPerson >= q.minPrice!);
  }
  if (q.maxPrice != null) {
    results = results.filter((i) => i.pricePerPerson <= q.maxPrice!);
  }
  if (q.tags && q.tags.length > 0) {
    results = results.filter((i) => q.tags!.some((t) => i.tags.includes(t)));
  }

  return results;
}

// ─── Relational lookups ────────────────────────────────────────────────────────

/**
 * Return all itineraries available for a destination identified by slug.
 * Handles the slug→id resolution internally.
 */
export function getItinerariesForDestination(destinationSlug: string): readonly Itinerary[] {
  const dest = getDestinationBySlug(destinationSlug);
  if (!dest) return [];
  return getItinerariesByDestination(dest.id);
}

/**
 * Return all destinations that have at least one itinerary.
 */
export function getDestinationsWithItineraries(): readonly Destination[] {
  const itineraries = getAllItineraries();
  const destIds     = new Set(itineraries.map((i) => i.destination.id));
  return getAllDestinations().filter((d) => destIds.has(d.id));
}

// ─── Catalog metadata ──────────────────────────────────────────────────────────
// Derived read-only metadata derived from the live catalog.
// Use these to populate filter UIs without hardcoding options.

/** All unique destination tags, sorted A-Z. */
export function getAllDestinationTags(): readonly string[] {
  const tags = new Set<string>();
  getAllDestinations().forEach((d) => d.tags.forEach((t) => tags.add(t)));
  return [...tags].sort();
}

/** All unique itinerary tags, sorted A-Z. */
export function getAllItineraryTags(): readonly string[] {
  const tags = new Set<string>();
  getAllItineraries().forEach((i) => i.tags.forEach((t) => tags.add(t)));
  return [...tags].sort();
}

/** All distinct continents present in the catalog, sorted A-Z. */
export function getAvailableContinents(): readonly Continent[] {
  const continents = new Set<Continent>();
  getAllDestinations().forEach((d) => continents.add(d.continent));
  return ([...continents] as Continent[]).sort();
}

/** All distinct luxury tiers present in the catalog. */
export function getAvailableTiers(): readonly LuxuryTier[] {
  const tiers = new Set<LuxuryTier>();
  getAllItineraries().forEach((i) => tiers.add(i.tier));
  return [...tiers] as LuxuryTier[];
}

/** Minimum and maximum `pricePerPerson` across all itineraries. */
export function getItineraryPriceRange(): { readonly min: number; readonly max: number } {
  const prices = getAllItineraries().map((i) => i.pricePerPerson);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}

/** Minimum and maximum `durationDays` across all itineraries. */
export function getItineraryDurationRange(): { readonly min: number; readonly max: number } {
  const durations = getAllItineraries().map((i) => i.durationDays);
  return { min: Math.min(...durations), max: Math.max(...durations) };
}

/** Total count of items in the catalog, useful for stats displays. */
export const CATALOG_STATS = {
  get destinations() { return getAllDestinations().length; },
  get itineraries()  { return getAllItineraries().length;  },
  get testimonials() { return getAllTestimonials().length; },
} as const;
