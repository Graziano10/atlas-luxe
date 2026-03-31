/**
 * /lib/validation.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Single source of truth for all input validation and sanitization.
 * Used by BOTH the client hook (useEnquiry) and the server API layer (lib/api).
 * No `any`, no duplication.
 *
 * Rules:
 *  - sanitizeText()  — trim, enforce max length, strip null bytes
 *  - isValidEmail()  — RFC 5321-compliant subset regex, max 254 chars
 *  - FIELD_LIMITS    — maximum lengths per field
 *  - validateEnquiry — returns typed field-level errors
 *  - validateNewsletter — same pattern, email only
 *  - sanitizeEnquiry — returns a sanitized copy safe to forward to a backend
 */

import type { EnquiryPayload, NewsletterPayload } from '@/types';

// ─── Field length limits ───────────────────────────────────────────────────────
// Enforced on both client (UX feedback) and server (defence-in-depth).

export const FIELD_LIMITS = {
  firstName:         50,
  lastName:          50,
  email:            254,   // RFC 5321 maximum
  phone:             30,
  message:         2000,
  budget:           200,
  preferredDates:   200,
} as const satisfies Record<string, number>;

// ─── Sanitization ─────────────────────────────────────────────────────────────

/**
 * Trims whitespace, removes null bytes, and hard-caps the string at `maxLength`.
 * Safe to call on any untrusted string before display or forwarding.
 */
export function sanitizeText(input: string, maxLength: number): string {
  return input
    .trim()
    .replace(/\0/g, '')          // Remove null bytes
    .replace(/\r\n|\r/g, '\n')   // Normalise line endings
    .slice(0, maxLength);
}

/**
 * Returns a sanitized copy of an `EnquiryPayload`.
 * Call before passing the payload to any external service.
 */
export function sanitizeEnquiry(payload: EnquiryPayload): EnquiryPayload {
  return {
    firstName:       sanitizeText(payload.firstName,      FIELD_LIMITS.firstName),
    lastName:        sanitizeText(payload.lastName,       FIELD_LIMITS.lastName),
    email:           payload.email.trim().toLowerCase().slice(0, FIELD_LIMITS.email),
    phone:           payload.phone
                       ? sanitizeText(payload.phone, FIELD_LIMITS.phone)
                       : undefined,
    message:         sanitizeText(payload.message,        FIELD_LIMITS.message),
    budget:          payload.budget
                       ? sanitizeText(payload.budget, FIELD_LIMITS.budget)
                       : undefined,
    preferredDates:  payload.preferredDates
                       ? sanitizeText(payload.preferredDates, FIELD_LIMITS.preferredDates)
                       : undefined,
    itineraryId:     payload.itineraryId,
    destinationId:   payload.destinationId,
    groupSize:       payload.groupSize,
  };
}

// ─── Email validation ─────────────────────────────────────────────────────────

/**
 * RFC 5321 / HTML5 compliant email pattern.
 * Rejects addresses missing a dot in the domain, double dots, leading/
 * trailing dots, and other common malformed patterns.
 * Does NOT cover the full RFC (intentional — overly strict regexes reject
 * valid addresses). Use this for UX validation; backend should use a
 * dedicated library or confirmation flow.
 */
const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

export function isValidEmail(email: string): boolean {
  const trimmed = email.trim();
  return trimmed.length <= FIELD_LIMITS.email && EMAIL_RE.test(trimmed);
}

// ─── Field-level validation ────────────────────────────────────────────────────

export type EnquiryFieldErrors   = Partial<Record<keyof EnquiryPayload,   string>>;
export type NewsletterFieldErrors = Partial<Record<keyof NewsletterPayload, string>>;

/** Validate an enquiry payload. Returns a map of field → error message. */
export function validateEnquiry(
  values: Partial<EnquiryPayload>,
): EnquiryFieldErrors {
  const errors: EnquiryFieldErrors = {};

  // firstName
  if (!values.firstName?.trim()) {
    errors.firstName = 'First name is required.';
  } else if (values.firstName.length > FIELD_LIMITS.firstName) {
    errors.firstName = `First name must be ${FIELD_LIMITS.firstName} characters or fewer.`;
  }

  // lastName
  if (!values.lastName?.trim()) {
    errors.lastName = 'Last name is required.';
  } else if (values.lastName.length > FIELD_LIMITS.lastName) {
    errors.lastName = `Last name must be ${FIELD_LIMITS.lastName} characters or fewer.`;
  }

  // email
  if (!values.email?.trim()) {
    errors.email = 'Email address is required.';
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  // message
  if (!values.message?.trim()) {
    errors.message = 'Please describe your ideal journey.';
  } else if (values.message.length > FIELD_LIMITS.message) {
    errors.message = `Message must be ${FIELD_LIMITS.message} characters or fewer.`;
  }

  // groupSize (optional — only validate when provided)
  if (values.groupSize != null) {
    if (!Number.isInteger(values.groupSize) || values.groupSize < 1) {
      errors.groupSize = 'Group size must be a positive whole number.';
    } else if (values.groupSize > 50) {
      errors.groupSize = 'For groups over 50, please contact us directly.';
    }
  }

  return errors;
}

/** Returns true when there are no validation errors. */
export function isEnquiryValid(values: Partial<EnquiryPayload>): boolean {
  return Object.keys(validateEnquiry(values)).length === 0;
}

/** Validate a newsletter subscription payload. */
export function validateNewsletter(
  values: Partial<NewsletterPayload>,
): NewsletterFieldErrors {
  const errors: NewsletterFieldErrors = {};

  if (!values.email?.trim()) {
    errors.email = 'Email address is required.';
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  return errors;
}
