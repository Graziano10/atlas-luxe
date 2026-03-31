'use client';

/**
 * /components/sections/NewsletterSection.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Newsletter subscription section — demonstrates API layer usage via a
 * dedicated hook. The component holds zero submission or validation logic:
 *
 *   Component → useNewsletter hook → api.newsletter.subscribe → lib/api.ts
 *
 * The form only renders values, calls setValue / submit, and reacts to state.
 */

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { api } from '@/lib/api';
import { cn } from '@/utils/cn';
import type { AsyncState, NewsletterResponse } from '@/types';

// ─── useNewsletter hook ────────────────────────────────────────────────────────
// All form state + API interaction in one place, keeping the JSX clean.

function useNewsletter() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<AsyncState<NewsletterResponse>>({
    data:   null,
    status: 'idle',
    error:  null,
  });

  const handleEmailChange = useCallback(
    (value: string) => {
      setEmail(value);
      if (state.status === 'error') {
        setState((prev: AsyncState<NewsletterResponse>) => ({ ...prev, status: 'idle', error: null }));
      }
    },
    [state.status],
  );

  const submit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (state.status === 'loading') return;

      setState({ data: null, status: 'loading', error: null });

      const result = await api.newsletter.subscribe({ email });

      if (result.ok) {
        setState({ data: result.data, status: 'success', error: null });
        setEmail('');
      } else {
        setState({ data: null, status: 'error', error: result.error.message });
      }
    },
    [email, state.status],
  );

  return {
    email,
    state,
    isLoading: state.status === 'loading',
    isSuccess: state.status === 'success',
    isError:   state.status === 'error',
    handleEmailChange,
    submit,
  };
}

// ─── Section component ─────────────────────────────────────────────────────────

export function NewsletterSection() {
  const { email, state, isLoading, isSuccess, isError, handleEmailChange, submit } =
    useNewsletter();

  return (
    <section
      className="relative py-24 lg:py-32 bg-gradient-luxury overflow-hidden"
      aria-labelledby="newsletter-heading"
    >
      {/* Noise texture */}
      <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" aria-hidden="true" />

      {/* Gold accent line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent"
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 relative max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-2xs uppercase tracking-ultra text-gold-500 mb-4">The Inner Circle</p>

          <h2
            id="newsletter-heading"
            className="font-display font-light text-ivory-50 text-4xl md:text-5xl leading-tight mb-5"
          >
            Receive the World&rsquo;s
            <br />
            <span className="text-gold-400">Most Coveted Invitations</span>
          </h2>

          <p className="text-ivory-400 text-base md:text-lg leading-relaxed mb-10">
            Limited availability. Private residences before they are announced.
            Experiences that never reach the public. Join our inner circle — fewer than 500 members worldwide.
          </p>

          {/* ── Success state ──────────────────────────────────────────────── */}
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-4 py-6"
            >
              <CheckCircle size={40} className="text-gold-400" aria-hidden="true" />
              <p className="font-display text-2xl text-ivory-100 font-light">
                {state.data?.message ?? 'Welcome to the inner circle.'}
              </p>
              <p className="text-sm text-obsidian-400">
                We&rsquo;ll be in touch with your first invitation shortly.
              </p>
            </motion.div>
          ) : (

            /* ── Form ─────────────────────────────────────────────────────── */
            <form onSubmit={submit} noValidate aria-label="Newsletter subscription">
              <div className="flex flex-col sm:flex-row gap-0 max-w-xl mx-auto">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  placeholder="Your email address"
                  required
                  autoComplete="email"
                  aria-required="true"
                  aria-invalid={isError}
                  aria-describedby={isError ? 'newsletter-error' : undefined}
                  className={cn(
                    'flex-1 px-6 py-4 bg-obsidian-900 text-ivory-200',
                    'border border-obsidian-700 focus:border-gold-500',
                    'text-sm placeholder:text-obsidian-500',
                    'outline-none transition-colors duration-300',
                    isError && 'border-red-500/60',
                  )}
                />
                <Button
                  type="submit"
                  variant="gold"
                  size="lg"
                  isLoading={isLoading}
                  rightIcon={!isLoading ? <ArrowRight size={16} /> : undefined}
                  className="shrink-0"
                >
                  Join
                </Button>
              </div>

              {/* Error message — driven by API response */}
              {isError && state.error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1,  y: 0  }}
                  id="newsletter-error"
                  role="alert"
                  className="mt-3 flex items-center justify-center gap-1.5 text-xs text-red-400"
                >
                  <AlertCircle size={12} aria-hidden="true" />
                  {state.error}
                </motion.p>
              )}

              <p className="mt-4 text-2xs text-obsidian-600 tracking-wide">
                By subscribing you agree to our{' '}
                <a href="/legal/privacy" className="underline hover:text-obsidian-400 transition-colors">
                  Privacy Policy
                </a>
                . Unsubscribe at any time.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
