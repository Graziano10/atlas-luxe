'use client';

/**
 * /hooks/useEnquiry.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Manages enquiry form state, per-field validation, and API submission.
 * Components hold zero form logic — they only render values and call the
 * returned setters / submit handler.
 *
 * @example
 *   const { values, errors, isLoading, isSuccess, setValue, submit } = useEnquiry();
 *
 *   // Pre-fill from an itinerary
 *   const enquiry = useEnquiry({ itineraryId: itinerary.id });
 */

import { useState, useCallback } from 'react';
import { api } from '@/lib/api';
import type {
  EnquiryPayload,
  EnquiryResponse,
  AsyncState,
} from '@/types';

// ─── Validation ────────────────────────────────────────────────────────────────

type EnquiryField  = keyof EnquiryPayload;
type FieldErrors   = Partial<Record<EnquiryField, string>>;

function validate(values: Partial<EnquiryPayload>): FieldErrors {
  const errors: FieldErrors = {};

  if (!values.firstName?.trim())        errors.firstName = 'First name is required.';
  if (!values.lastName?.trim())         errors.lastName  = 'Last name is required.';
  if (!values.email?.includes('@'))     errors.email     = 'A valid email address is required.';
  if (!values.message?.trim())          errors.message   = 'Please describe your ideal journey.';
  if ((values.groupSize ?? 0) < 1)      errors.groupSize = 'Group size must be at least 1.';

  return errors;
}

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
  /** Reset form to initial state. */
  reset:      () => void;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useEnquiry(
  defaults: Partial<EnquiryPayload> = {},
): UseEnquiryReturn {
  const [values, setValues] = useState<Partial<EnquiryPayload>>(defaults);
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

    // Client-side validation pass
    const fieldErrors = validate(values);
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
  const reset = useCallback(() => {
    setValues(defaults);
    setErrors({});
    setState({ data: null, status: 'idle', error: null });
  }, [defaults]);

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
