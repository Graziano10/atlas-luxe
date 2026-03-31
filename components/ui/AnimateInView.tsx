'use client';

/**
 * /components/ui/AnimateInView.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Thin client-side wrapper that triggers a Framer Motion animation when the
 * wrapped content enters the viewport. Accepts RSC children so the content
 * itself is server-rendered — only this wrapper ships client JS.
 *
 * @example — in a Server Component:
 *   <AnimateInView variant="fadeUp">
 *     <p>This text is server-rendered, animation is client-side.</p>
 *   </AnimateInView>
 *
 * @example — staggered list:
 *   {items.map((item, i) => (
 *     <AnimateInView key={item.id} variant="fadeUp" delay={i * 0.08}>
 *       <Card item={item} />
 *     </AnimateInView>
 *   ))}
 */

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { ReactNode } from 'react';

// ─── Variant definitions ───────────────────────────────────────────────────────

const VARIANTS = {
  fadeUp: {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  scaleX: {
    hidden: { opacity: 0, scaleX: 0 },
    visible: { opacity: 1, scaleX: 1 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -24 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: 24 },
    visible: { opacity: 1, x: 0 },
  },
} as const;

export type AnimateInViewVariant = keyof typeof VARIANTS;

// ─── Props ─────────────────────────────────────────────────────────────────────

interface AnimateInViewProps {
  children:   ReactNode;
  variant?:   AnimateInViewVariant;
  /** Animation duration in seconds. */
  duration?:  number;
  /** Delay before the animation starts (seconds). Useful for staggering. */
  delay?:     number;
  /** Fraction of the element that must be visible before triggering. */
  amount?:    number;
  /** Additional Tailwind / class names to apply to the wrapper element. */
  className?: string;
  /** HTML tag to render as. Defaults to 'div'. */
  as?:        'div' | 'section' | 'article' | 'li' | 'span';
}

// ─── Component ─────────────────────────────────────────────────────────────────

export function AnimateInView({
  children,
  variant   = 'fadeUp',
  duration  = 0.7,
  delay     = 0,
  amount    = 0.2,
  className,
  as        = 'div',
}: AnimateInViewProps) {
  const ref     = useRef<HTMLElement>(null);
  const inView  = useInView(ref, { once: true, amount });

  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      ref={ref as React.RefObject<HTMLDivElement>}
      variants={VARIANTS[variant]}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
