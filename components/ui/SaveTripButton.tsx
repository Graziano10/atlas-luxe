'use client';

/**
 * /components/ui/SaveTripButton.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Demonstrates the full data-layer stack:
 *
 *   Component → useSavedTrip hook → saved-trips.store → types
 *
 * Rules followed:
 *   ✓ Zero data or store logic inside the component
 *   ✓ All state managed through the hook
 *   ✓ Fully typed props — no `any`
 *   ✓ Accessible (aria-pressed, aria-label, keyboard-navigable)
 *   ✓ Three visual variants: default, outline, icon-only
 */

import { motion, AnimatePresence } from 'framer-motion';
import { Bookmark, BookmarkCheck, Loader2 } from 'lucide-react';
import { useSavedTrip } from '@/hooks/useSavedTrips';
import { cn } from '@/utils/cn';
import type { Itinerary } from '@/types';

// ─── Types ─────────────────────────────────────────────────────────────────────

type ButtonVariant = 'default' | 'outline' | 'icon';

interface SaveTripButtonProps {
  itinerary: Itinerary;
  variant?:  ButtonVariant;
  className?: string;
}

// ─── Variant styles ────────────────────────────────────────────────────────────

const BASE = [
  'relative inline-flex items-center justify-center gap-2',
  'uppercase tracking-widest text-xs',
  'transition-all duration-300 ease-luxury',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500',
  'disabled:opacity-50 disabled:cursor-not-allowed',
].join(' ');

const VARIANT_CLASSES: Record<ButtonVariant, { idle: string; saved: string }> = {
  default: {
    idle:  'px-5 py-3 bg-obsidian-800 border border-obsidian-700 text-ivory-300 hover:border-gold-500/50 hover:text-gold-400',
    saved: 'px-5 py-3 bg-gold-500/10 border border-gold-500/40 text-gold-400 hover:bg-gold-500/5',
  },
  outline: {
    idle:  'px-5 py-3 border border-ivory-300/20 text-ivory-400 hover:border-gold-500/50 hover:text-gold-400',
    saved: 'px-5 py-3 border border-gold-500 text-gold-400 hover:bg-gold-500/10',
  },
  icon: {
    idle:  'p-2 text-ivory-400 hover:text-gold-400',
    saved: 'p-2 text-gold-400',
  },
};

// ─── Component ─────────────────────────────────────────────────────────────────

export function SaveTripButton({
  itinerary,
  variant   = 'default',
  className,
}: SaveTripButtonProps) {
  // All data logic is abstracted into the hook
  const { isSaved, toggle } = useSavedTrip(itinerary.id);

  const variantStyle = VARIANT_CLASSES[variant][isSaved ? 'saved' : 'idle'];

  const label = isSaved
    ? `Remove "${itinerary.title}" from saved trips`
    : `Save "${itinerary.title}" to your trips`;

  return (
    <motion.button
      onClick={() => toggle(itinerary)}
      aria-pressed={isSaved}
      aria-label={label}
      title={label}
      whileTap={{ scale: 0.95 }}
      className={cn(BASE, variantStyle, className)}
    >
      {/* Animated icon swap */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isSaved ? 'saved' : 'idle'}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1,   opacity: 1 }}
          exit={{    scale: 0.6, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-2"
        >
          {isSaved ? (
            <BookmarkCheck
              size={variant === 'icon' ? 18 : 14}
              className="text-gold-400"
              strokeWidth={1.5}
            />
          ) : (
            <Bookmark
              size={variant === 'icon' ? 18 : 14}
              strokeWidth={1.5}
            />
          )}

          {/* Label — hidden for icon variant */}
          {variant !== 'icon' && (
            <span>{isSaved ? 'Saved' : 'Save Trip'}</span>
          )}
        </motion.span>
      </AnimatePresence>

      {/* Pulse ring on save */}
      {isSaved && (
        <motion.span
          key="ring"
          initial={{ scale: 0.8, opacity: 0.6 }}
          animate={{ scale: 1.8, opacity: 0   }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 rounded-none border border-gold-400 pointer-events-none"
          aria-hidden="true"
        />
      )}
    </motion.button>
  );
}
