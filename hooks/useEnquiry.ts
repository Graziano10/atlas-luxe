'use client';

/**
 * /hooks/useEnquiry.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Manages enquiry form state, per-field validation, and API submission.
 * Components hold zero form logic — they only render values and call the
 * returned setters / submit handler.
 *
 * Validation is delegated to lib/validation.ts (shared with the API layer)
 * so there is a single source of truth for rules and error messages.
 *
 * @example
 *   const { values, errors, isLoading, isSuccess, setValue, submit } = useEnquiry();
 *
 *   // Pre-fill from an itinerary
 *   const enquiry = useEnquiry({ itineraryId: itinerary.id });
 */

import { useState, useCallback, useRef } from 'react';
import { api } from '@/lib/api';
import { validateEnquiry } from '@/lib/validation';
import type {
  EnquiryPayload,
  EnquiryResponse,
  AsyncState,
} from '@/types';

// ─── Types ────────────────────────────────────────────────────────────────────

type EnquiryField = keyof EnquiryPayload;
type FieldErrors  = Partial<Record<EnquiryField, string>>;

// ─── Hook return type ─────────────────────────────────────────────────────────

interface UseEnquiryReturn {
  values:     Partial<EnquiryPayload>;
  errors:     FieldErrors;
  /** Async submission state. */
  state:      AsyncState<EnquiryResponse>;
  isLoading:  boolean;
  isSuccess:  boolean;
  isError:    boolean;
  /** Set a single field value. Clears that field's error. */
  setValue:   (field: EnquiryField, value: string | number) => void;
  /** Validate and submit via the API. No-op if already loading. */
  submit:     () => Promise<void>;
  /** Reset form to the original defaults. */
  reset:      () => void;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useEnquiry(
  defaults: Partial<EnquiryPayload> = {},
): UseEnquiryReturn {
  // Capture defaults at mount time via ref so `reset` stays stable even when
  // the caller passes an inline object literal (which would otherwise change
  // identity on every parent render and invalidate the reset callback).
  const defaultsRef = useRef(defaults);

  const [values, setValues] = useState<Partial<EnquiryPayload>>(defaultsRef.current);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [state,  setState]  = useState<AsyncState<EnquiryResponse>>({
    data:   null,
    status: 'idle',
    error:  null,
  });

  // ── setValue ────────────────────────────────────────────────────────────────
  const setValue = useCallback(
    (field: EnquiryField, value: string | number) => {
      setValues((prev) => ({ ...prev, [field]: value }));
      // Clear the specific field error as the user starts correcting it
      setErrors((prev: FieldErrors) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    },
    [],
  );

  // ── submit ──────────────────────────────────────────────────────────────────
  const submit = useCallback(async () => {
    if (state.status === 'loading') return;

    // Client-side validation via shared lib/validation.ts
    const fieldErrors = validateEnquiry(values);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setState({ data: null, status: 'loading', error: null });

    const result = await api.enquiry.submit(values as EnquiryPayload);

    if (result.ok) {
      setState({ data: result.data, status: 'success', error: null });
    } else {
      setState({ data: null, status: 'error', error: result.error.message });
    }
  }, [values, state.status]);

  // ── reset ───────────────────────────────────────────────────────────────────
  // Uses the captured ref so this callback is stable regardless of re-renders.
  const reset = useCallback(() => {
    setValues(defaultsRef.current);
    setErrors({});
    setState({ data: null, status: 'idle', error: null });
  }, []);

  return {
    values,
    errors,
    state,
    isLoading: state.status === 'loading',
    isSuccess: state.status === 'success',
    isError:   state.status === 'error',
    setValue,
    submit,
    reset,
  };
}
