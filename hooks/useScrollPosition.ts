'use client';

import { useEffect, useRef } from 'react';
import { useUIStore } from '@/store/ui.store';

/**
 * Syncs the window scroll position into the UI store.
 * Attaches a passive, throttled scroll listener.
 */
export function useScrollPosition(): void {
  const setScrollY = useUIStore((s) => s.setScrollY);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (rafId.current !== null) return;
      rafId.current = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        rafId.current = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Sync on mount
    setScrollY(window.scrollY);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [setScrollY]);
}
