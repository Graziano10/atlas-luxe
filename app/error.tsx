'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';

interface ErrorProps {
  error:  Error & { digest?: string };
  reset:  () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log to error monitoring service (e.g., Sentry) in production
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-6 text-center bg-obsidian-950">
      <p className="text-2xs uppercase tracking-ultra text-gold-500 mb-4">Something went wrong</p>
      <h2 className="font-display text-4xl md:text-5xl font-light text-ivory-100 mb-4">
        An unexpected error occurred.
      </h2>
      <p className="text-ivory-400 text-base max-w-sm leading-relaxed mb-8">
        Our team has been notified. Please try again or contact us if the issue persists.
      </p>
      <Button variant="outline" size="lg" onClick={reset}>
        Try Again
      </Button>
    </div>
  );
}
