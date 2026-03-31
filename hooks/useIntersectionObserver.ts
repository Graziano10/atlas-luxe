'use client';

import { useEffect, useRef, useState } from 'react';

interface Options {
  threshold?: number;
  rootMargin?: string;
  /** If true, stop observing after first intersection (fire-once). */
  once?: boolean;
}

/**
 * Returns a [ref, isIntersecting] tuple.
 * Useful for triggering scroll-based animations.
 */
export function useIntersectionObserver<T extends Element>({
  threshold = 0.15,
  rootMargin = '0px',
  once = true,
}: Options = {}): [React.RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsIntersecting(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, isIntersecting];
}
