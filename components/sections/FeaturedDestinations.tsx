'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Heart } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Badge } from '@/components/ui/Badge';
import { StarRating } from '@/components/ui/StarRating';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useWishlist } from '@/hooks/useWishlist';
import { formatRating } from '@/utils/format';
import { cn } from '@/utils/cn';
import type { Destination } from '@/types';

interface FeaturedDestinationsProps {
  destinations: readonly Destination[];
}

export function FeaturedDestinations({ destinations }: FeaturedDestinationsProps) {
  const [headerRef, headerVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.3 });

  return (
    <section className="py-24 lg:py-32 bg-obsidian-950" aria-labelledby="destinations-heading">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <SectionHeader
            eyebrow="Handpicked Destinations"
            title="Where Will You Go Next?"
            subtitle="Each destination is a world unto itself — chosen for its transformative power, its soul, and its capacity to leave you forever changed."
          />
        </motion.div>

        {/* Destination Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {destinations.map((destination, i) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              index={i}
              featured={i === 0}
            />
          ))}
        </div>

        {/* CTA */}
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
              'text-ivory-400 hover:text-gold-400 transition-colors duration-300',
              'group focus-visible:outline-none focus-visible:text-gold-400',
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

// ─── Destination Card ─────────────────────────────────────────────────────────

interface DestinationCardProps {
  destination: Destination;
  index:       number;
  featured?:   boolean;
}

function DestinationCard({ destination, index, featured }: DestinationCardProps) {
  const [ref, visible] = useIntersectionObserver<HTMLElement>({ threshold: 0.1 });
  const { isInWishlist, toggle } = useWishlist(destination.id);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className={cn(
        'group relative overflow-hidden bg-obsidian-900',
        'border border-obsidian-800 hover:border-gold-500/30',
        'transition-all duration-500 ease-luxury cursor-pointer',
        'shadow-card hover:shadow-card-hover hover:-translate-y-1',
        featured && 'md:col-span-2 xl:col-span-1',
      )}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={destination.heroImage.src}
          alt={destination.heroImage.alt}
          fill
          sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-105"
        />
        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/80 via-obsidian-950/20 to-transparent" />

        {/* Wishlist */}
        <button
          onClick={(e) => { e.preventDefault(); toggle(); }}
          className={cn(
            'absolute top-4 right-4 p-2',
            'transition-all duration-300',
            'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-400',
          )}
          aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={isInWishlist}
        >
          <Heart
            size={20}
            className={cn(
              'transition-all duration-300',
              isInWishlist ? 'fill-gold-400 text-gold-400' : 'text-ivory-300 hover:text-gold-400',
            )}
          />
        </button>

        {/* Continent tag */}
        <div className="absolute bottom-4 left-4">
          <Badge variant="obsidian">{destination.continent}</Badge>
        </div>
      </div>

      {/* Content */}
      <Link href={`/destinations/${destination.slug}`} className="block p-6 focus-visible:outline-none">
        <div className="flex items-start justify-between gap-4 mb-2">
          <div>
            <p className="text-2xs uppercase tracking-ultra text-gold-500/70 mb-1">{destination.country}</p>
            <h3 className="font-display text-2xl font-light text-ivory-100 group-hover:text-gold-300 transition-colors duration-300">
              {destination.name}
            </h3>
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0">
            <StarRating rating={destination.rating} size="sm" />
            <span className="text-2xs text-obsidian-400">
              {formatRating(destination.rating)} ({destination.reviewCount})
            </span>
          </div>
        </div>

        <p className="text-sm text-ivory-400 italic mb-4">{destination.tagline}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {destination.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline">{tag}</Badge>
          ))}
        </div>

        {/* Discover link */}
        <div className={cn(
          'mt-5 flex items-center gap-2 text-2xs uppercase tracking-widest',
          'text-gold-500/50 group-hover:text-gold-400 transition-colors duration-300',
        )}>
          Discover
          <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </Link>
    </motion.article>
  );
}
