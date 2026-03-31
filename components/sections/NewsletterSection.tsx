'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export function NewsletterSection() {
  const [email, setEmail]   = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic client-side email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg('Please enter a valid email address.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      // TODO: Replace with actual API call when backend is ready
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setStatus('success');
      setEmail('');
    } catch {
      setErrorMsg('Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  return (
    <section
      className="relative py-24 lg:py-32 bg-gradient-luxury overflow-hidden"
      aria-labelledby="newsletter-heading"
    >
      {/* Noise texture */}
      <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" aria-hidden="true" />

      {/* Gold line top */}
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
            Limited availability. Private residences before they are announced. Experiences that never reach the public. Join our inner circle — fewer than 500 members worldwide.
          </p>

          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-4 py-6"
            >
              <CheckCircle size={40} className="text-gold-400" aria-hidden="true" />
              <p className="font-display text-2xl text-ivory-100 font-light">Welcome to the inner circle.</p>
              <p className="text-sm text-obsidian-400">
                We&rsquo;ll be in touch with your first invitation shortly.
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              aria-label="Newsletter subscription"
            >
              <div className="flex flex-col sm:flex-row gap-0 max-w-xl mx-auto">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setStatus('idle'); setErrorMsg(''); }}
                  placeholder="Your email address"
                  required
                  autoComplete="email"
                  aria-required="true"
                  aria-invalid={status === 'error'}
                  aria-describedby={status === 'error' ? 'newsletter-error' : undefined}
                  className={cn(
                    'flex-1 px-6 py-4 bg-obsidian-900 text-ivory-200',
                    'border border-obsidian-700 focus:border-gold-500',
                    'text-sm placeholder:text-obsidian-500',
                    'outline-none transition-colors duration-300',
                    status === 'error' && 'border-red-500/60',
                  )}
                />
                <Button
                  type="submit"
                  variant="gold"
                  size="lg"
                  isLoading={status === 'loading'}
                  rightIcon={status !== 'loading' ? <ArrowRight size={16} /> : undefined}
                  className="shrink-0"
                >
                  Join
                </Button>
              </div>

              {status === 'error' && errorMsg && (
                <p
                  id="newsletter-error"
                  role="alert"
                  className="mt-3 text-xs text-red-400"
                >
                  {errorMsg}
                </p>
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
