'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { DestinationCard } from '@/components/ui/DestinationCard';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { cn } from '@/utils/cn';
import type { Destination } from '@/types';

interface FeaturedDestinationsProps {
  destinations: readonly Destination[];
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function FeaturedDestinations({ destinations }: FeaturedDestinationsProps) {
  const [headerRef, headerVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.3 });

  // Split: hero card (index 0) + supporting grid
  const [hero, ...rest] = destinations;

  return (
    <section
      className="py-24 lg:py-32 bg-obsidian-950"
      aria-labelledby="destinations-heading"
    >
      <div className="container mx-auto px-6">

        {/* ── Header ───────────────────────────────────────────────────── */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 32 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <SectionHeader
            id="destinations-heading"
            eyebrow="Handpicked Destinations"
            title="Where Will You Go Next?"
            subtitle="Each destination is a world unto itself — chosen for its transformative power, its soul, and its capacity to leave you forever changed."
          />
        </motion.div>

        {/* ── Asymmetric mosaic grid ────────────────────────────────────
          Desktop layout:
          ┌──────────────────────┬──────────────┐
          │                      │   card 2     │
          │   HERO (2 cols)      ├──────────────┤
          │                      │   card 3     │
          └──────────────────────┴──────────────┘
          ┌────────────┬──────────────────────────┐
          │   card 4   │   card 5   │   card 6   │
          └────────────┴────────────┴────────────┘
        ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Hero card — 2-column span */}
          {hero && (
            <div className="lg:col-span-2">
              <DestinationCard
                destination={hero}
                index={0}
                variant="hero"
                className="h-full"
              />
            </div>
          )}

          {/* Right column — two compact cards stacked */}
          <div className="flex flex-col gap-5">
            {rest.slice(0, 2).map((dest, i) => (
              <DestinationCard
                key={dest.id}
                destination={dest}
                index={i + 1}
                variant="compact"
                className="flex-1"
              />
            ))}
          </div>

          {/* Bottom row — remaining cards, standard aspect */}
          {rest.slice(2).map((dest, i) => (
            <DestinationCard
              key={dest.id}
              destination={dest}
              index={i + 3}
              variant="default"
            />
          ))}
        </div>

        {/* ── View all link ────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="mt-12 flex justify-center"
        >
          <Link
            href="/destinations"
            className={cn(
              'inline-flex items-center gap-3 text-sm uppercase tracking-widest',
              'text-ivory-400 hover:text-gold-400 transition-colors duration-300 group',
              'focus-visible:outline-none focus-visible:text-gold-400',
            )}
          >
            View All Destinations
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
