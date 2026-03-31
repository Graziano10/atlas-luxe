/**
 * /lib/api.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Async data-access layer — simulates a CMS / REST API with realistic
 * latency, pagination, typed responses and structured error handling.
 *
 * Swap the internals here (keep function signatures identical) when
 * connecting to a real backend, Sanity, Contentful, or any REST/GraphQL API.
 *
 * All functions return `ApiResult<T>` — a discriminated union.
 * Always check `result.ok` before accessing `result.data`.
 *
 * @example
 *   const result = await api.destinations.bySlug('maldives-private-atoll');
 *   if (!result.ok) { console.error(result.error.message); return; }
 *   console.log(result.data.name); // Maldives Private Atoll
 */

import {
  queryDestinations,
  queryItineraries,
  getDestinationBySlug,
  getItineraryBySlug,
  getFeaturedDestinations,
  getFeaturedItineraries,
} from '@/lib/data';

import {
  validateEnquiry as sharedValidateEnquiry,
  validateNewsletter,
  sanitizeEnquiry,
  isValidEmail,
} from '@/lib/validation';

import type {
  Destination,
  Itinerary,
  PaginatedResponse,
  ApiResult,
  ApiError,
  DestinationQuery,
  ItineraryQuery,
  EnquiryPayload,
  EnquiryResponse,
  NewsletterPayload,
  NewsletterResponse,
} from '@/types';

// ─── Internal utilities ────────────────────────────────────────────────────────

/** Simulates network latency with random jitter (180–540 ms). */
function simulateDelay(minMs = 180, maxMs = 540): Promise<void> {
  const ms = Math.random() * (maxMs - minMs) + minMs;
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Construct a successful ApiResult. */
function ok<T>(data: T): ApiResult<T> {
  return { ok: true, data };
}

/** Construct a failed ApiResult. */
function fail(code: string, message: string, status: number): ApiResult<never> {
  const error: ApiError = { code, message, status };
  return { ok: false, error };
}

/** Slice a list into a PaginatedResponse. */
function paginate<T>(
  items: readonly T[],
  page    = 1,
  perPage = 12,
): PaginatedResponse<T> {
  const start = (page - 1) * perPage;
  return {
    data:       items.slice(start, start + perPage),
    total:      items.length,
    page,
    perPage,
    totalPages: Math.max(1, Math.ceil(items.length / perPage)),
  };
}

// ─── Destinations ──────────────────────────────────────────────────────────────

async function listDestinations(
  query: DestinationQuery = {},
): Promise<ApiResult<PaginatedResponse<Destination>>> {
  await simulateDelay();
  const results = queryDestinations(query);
  return ok(paginate(results, query.page, query.perPage));
}

async function getDestination(slug: string): Promise<ApiResult<Destination>> {
  await simulateDelay();
  const dest = getDestinationBySlug(slug);
  if (!dest) {
    return fail('NOT_FOUND', `Destination "${slug}" was not found.`, 404);
  }
  return ok(dest);
}

async function listFeaturedDestinations(): Promise<ApiResult<readonly Destination[]>> {
  await simulateDelay();
  return ok(getFeaturedDestinations());
}

// ─── Itineraries ───────────────────────────────────────────────────────────────

async function listItineraries(
  query: ItineraryQuery = {},
): Promise<ApiResult<PaginatedResponse<Itinerary>>> {
  await simulateDelay();
  const results = queryItineraries(query);
  return ok(paginate(results, query.page, query.perPage ?? 10));
}

async function getItinerary(slug: string): Promise<ApiResult<Itinerary>> {
  await simulateDelay();
  const itinerary = getItineraryBySlug(slug);
  if (!itinerary) {
    return fail('NOT_FOUND', `Itinerary "${slug}" was not found.`, 404);
  }
  return ok(itinerary);
}

async function listFeaturedItineraries(): Promise<ApiResult<readonly Itinerary[]>> {
  await simulateDelay();
  return ok(getFeaturedItineraries());
}

// ─── Enquiry ───────────────────────────────────────────────────────────────────

async function submitEnquiry(
  payload: EnquiryPayload,
): Promise<ApiResult<EnquiryResponse>> {
  await simulateDelay(300, 800);

  // Server-side validation via shared lib/validation.ts
  const fieldErrors = sharedValidateEnquiry(payload);
  if (Object.keys(fieldErrors).length > 0) {
    const firstMessage = Object.values(fieldErrors)[0] as string;
    return fail('VALIDATION_ERROR', firstMessage, 422);
  }

  // Sanitize before any further processing / forwarding to external services
  const clean = sanitizeEnquiry(payload);

  const response: EnquiryResponse = {
    id:                     `enq-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    status:                 'received',
    message:                `Thank you, ${clean.firstName}. Your enquiry has been received. A dedicated travel curator will be in touch within 24 hours.`,
    estimatedResponseHours: 24,
  };

  return ok(response);
}

// ─── Newsletter ────────────────────────────────────────────────────────────────

async function subscribeNewsletter(
  payload: NewsletterPayload,
): Promise<ApiResult<NewsletterResponse>> {
  await simulateDelay(200, 500);

  // Server-side validation via shared lib/validation.ts
  const fieldErrors = validateNewsletter(payload);
  if (Object.keys(fieldErrors).length > 0) {
    return fail('VALIDATION_ERROR', fieldErrors.email ?? 'Invalid request.', 422);
  }

  // Normalise email before storage / forwarding
  const email = payload.email.trim().toLowerCase();
  if (!isValidEmail(email)) {
    return fail('VALIDATION_ERROR', 'Please enter a valid email address.', 422);
  }

  return ok({
    subscribed: true,
    message:    payload.firstName
      ? `Welcome to the inner circle, ${payload.firstName}.`
      : 'You have joined the Atlas Luxe inner circle.',
  });
}

// ─── Public API namespace ──────────────────────────────────────────────────────

/**
 * Namespaced API client. Import `api` as a single dependency anywhere
 * async data access is needed.
 *
 * @example
 *   import { api } from '@/lib/api';
 *   const result = await api.itineraries.featured();
 */
export const api = {
  destinations: {
    list:     listDestinations,
    bySlug:   getDestination,
    featured: listFeaturedDestinations,
  },
  itineraries: {
    list:     listItineraries,
    bySlug:   getItinerary,
    featured: listFeaturedItineraries,
  },
  enquiry: {
    submit: submitEnquiry,
  },
  newsletter: {
    subscribe: subscribeNewsletter,
  },
} as const;

/** Inferred type of the api object — useful for mocking in tests. */
export type Api = typeof api;
