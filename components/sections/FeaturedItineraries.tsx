'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Users } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Badge } from '@/components/ui/Badge';
import { Divider } from '@/components/ui/Divider';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { formatPrice, formatDuration } from '@/utils/format';
import { cn } from '@/utils/cn';
import type { Itinerary } from '@/types';

const TIER_LABEL: Record<string, string> = {
  'Premium':            'Premium',
  'Ultra-Luxury':       'Ultra Luxury',
  'Private-Collection': 'Private Collection',
};

interface FeaturedItinerariesProps {
  itineraries: readonly Itinerary[];
}

export function FeaturedItineraries({ itineraries }: FeaturedItinerariesProps) {
  const [headerRef, headerVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.3 });

  return (
    <section
      className="py-24 lg:py-32 bg-obsidian-950 border-t border-obsidian-800"
      aria-labelledby="itineraries-heading"
    >
      <div className="container mx-auto px-6">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <SectionHeader
            id="itineraries-heading"
            eyebrow="Signature Itineraries"
            title="Journeys Crafted for You"
            subtitle="Not a package. Not a tour. A meticulously engineered sequence of extraordinary experiences — each one bespoke, each one unrepeatable."
          />
        </motion.div>

        <div className="flex flex-col gap-8">
          {itineraries.map((itinerary, i) => (
            <ItineraryRow key={itinerary.id} itinerary={itinerary} index={i} reverse={i % 2 !== 0} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="mt-12 flex justify-center"
        >
          <Link
            href="/itineraries"
            className={cn(
              'inline-flex items-center gap-3 text-sm uppercase tracking-widest',
              'text-ivory-400 hover:text-gold-400 transition-colors duration-300 group',
              'focus-visible:outline-none focus-visible:text-gold-400',
            )}
          >
            View All Itineraries
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Itinerary Row ────────────────────────────────────────────────────────────

interface ItineraryRowProps {
  itinerary: Itinerary;
  index:     number;
  reverse?:  boolean;
}

function ItineraryRow({ itinerary, index, reverse }: ItineraryRowProps) {
  const [ref, visible] = useIntersectionObserver<HTMLElement>({ threshold: 0.15 });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className={cn(
        'group grid grid-cols-1 lg:grid-cols-2 gap-0',
        'border border-obsidian-800 hover:border-gold-500/20',
        'transition-all duration-500 ease-luxury overflow-hidden',
        'shadow-card hover:shadow-card-hover',
      )}
    >
      {/* Image */}
      <div className={cn('relative aspect-[16/10] lg:aspect-auto overflow-hidden', reverse && 'lg:order-2')}>
        <Image
          src={itinerary.heroImage.src}
          alt={itinerary.heroImage.alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian-950/60 to-transparent lg:hidden" />
        <div className={cn(
          'absolute inset-0 hidden lg:block',
          reverse
            ? 'bg-gradient-to-l from-obsidian-950/0 to-obsidian-950/40'
            : 'bg-gradient-to-r from-obsidian-950/0 to-obsidian-950/40',
        )} />
      </div>

      {/* Content */}
      <div className={cn(
        'bg-obsidian-900 p-8 lg:p-12 flex flex-col justify-between',
        reverse && 'lg:order-1',
      )}>
        <div>
          {/* Tier */}
          <Badge variant="tier" className="mb-6">
            {TIER_LABEL[itinerary.tier] ?? itinerary.tier}
          </Badge>

          {/* Destination */}
          <p className="text-2xs uppercase tracking-ultra text-gold-500/70 mb-2">
            {itinerary.destination.name}
          </p>

          {/* Title */}
          <h3 className="font-display text-3xl lg:text-4xl font-light text-ivory-100 mb-2 group-hover:text-gold-300 transition-colors duration-300">
            {itinerary.title}
          </h3>
          <p className="text-base text-ivory-400 italic mb-5">{itinerary.subtitle}</p>

          <Divider gold className="mb-5" />

          <p className="text-sm text-obsidian-400 leading-relaxed mb-8">{itinerary.overview}</p>

          {/* Meta */}
          <div className="flex flex-wrap gap-6 text-sm text-ivory-300">
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-gold-500/60" strokeWidth={1.5} />
              <span>{formatDuration(itinerary.durationDays)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={14} className="text-gold-500/60" strokeWidth={1.5} />
              <span>Max {itinerary.maxGroupSize} guests</span>
            </div>
          </div>
        </div>

        {/* Price & CTA */}
        <div className="flex items-end justify-between mt-8 pt-8 border-t border-obsidian-800">
          <div>
            <p className="text-2xs uppercase tracking-widest text-obsidian-500 mb-1">From</p>
            <p className="font-display text-3xl font-light text-gold-400">
              {formatPrice(itinerary.pricePerPerson, itinerary.currency)}
            </p>
            <p className="text-2xs text-obsidian-500 mt-1">per person</p>
          </div>
          <Link
            href={`/itineraries/${itinerary.slug}`}
            className={cn(
              'inline-flex items-center gap-2 text-xs uppercase tracking-widest',
              'px-6 py-3 border border-gold-500 text-gold-400',
              'hover:bg-gold-500 hover:text-obsidian-950 transition-all duration-300',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500',
            )}
          >
            View Itinerary
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
