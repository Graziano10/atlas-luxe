'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, MapPin, Star } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { useWishlist } from '@/hooks/useWishlist';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { formatRating } from '@/utils/format';
import { cn } from '@/utils/cn';
import type { Destination } from '@/types';

// ─── Variants ─────────────────────────────────────────────────────────────────

type CardVariant = 'default' | 'hero' | 'compact';

interface DestinationCardProps {
  destination: Destination;
  index?:      number;
  variant?:    CardVariant;
  className?:  string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function DestinationCard({
  destination,
  index = 0,
  variant = 'default',
  className,
}: DestinationCardProps) {
  const [ref, visible] = useIntersectionObserver<HTMLElement>({ threshold: 0.08 });
  const { isInWishlist, toggle } = useWishlist(destination.id);

  const isHero    = variant === 'hero';
  const isCompact = variant === 'compact';

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(
        'group relative overflow-hidden bg-obsidian-900',
        'border border-obsidian-800/60',
        'hover:border-gold-500/25 transition-all duration-500 ease-luxury',
        'shadow-card hover:shadow-card-hover hover:-translate-y-1',
        className,
      )}
    >
      {/* ── Image block ────────────────────────────────────────────────── */}
      <div
        className={cn(
          'relative overflow-hidden',
          isHero    && 'aspect-[3/2]',
          isCompact && 'aspect-[16/9]',
          !isHero && !isCompact && 'aspect-[4/3]',
        )}
      >
        <Image
          src={destination.heroImage.src}
          alt={destination.heroImage.alt}
          fill
          sizes={
            isHero
              ? '(min-width: 1280px) 66vw, 100vw'
              : '(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw'
          }
          className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-[1.04]"
        />

        {/* Multi-layer gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/90 via-obsidian-950/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* ── Continent pill — top-left ──────────────────────────────── */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <Badge variant="obsidian">{destination.continent}</Badge>
        </div>

        {/* ── Wishlist — top-right ──────────────────────────────────── */}
        <button
          onClick={(e) => { e.preventDefault(); toggle(); }}
          aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={isInWishlist}
          className={cn(
            'absolute top-4 right-4 p-2 rounded-full',
            'bg-obsidian-950/40 backdrop-blur-sm border border-white/10',
            'transition-all duration-300 hover:border-gold-500/40',
            'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-400',
          )}
        >
          <Heart
            size={15}
            className={cn(
              'transition-all duration-300',
              isInWishlist
                ? 'fill-gold-400 text-gold-400 scale-110'
                : 'text-ivory-300 hover:text-gold-400',
            )}
          />
        </button>

        {/* ── Location chip — bottom-left ───────────────────────────── */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1.5">
          <MapPin size={11} className="text-gold-400" />
          <span className="text-2xs uppercase tracking-ultra text-ivory-200/80">{destination.country}</span>
        </div>

        {/* ── Rating chip — bottom-right ────────────────────────────── */}
        <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-obsidian-950/60 backdrop-blur-sm px-2 py-1">
          <Star size={10} className="text-gold-400 fill-gold-400" />
          <span className="text-2xs text-ivory-200">{formatRating(destination.rating)}</span>
          <span className="text-2xs text-obsidian-400">({destination.reviewCount})</span>
        </div>
      </div>

      {/* ── Text block ─────────────────────────────────────────────────── */}
      <Link
        href={`/destinations/${destination.slug}`}
        className="block p-6 focus-visible:outline-none"
      >
        {/* Name */}
        <h3
          className={cn(
            'font-display font-light text-ivory-100 mb-1',
            'group-hover:text-gold-300 transition-colors duration-300',
            isHero    && 'text-3xl lg:text-4xl',
            isCompact && 'text-xl',
            !isHero && !isCompact && 'text-2xl',
          )}
        >
          {destination.name}
        </h3>

        {/* Tagline */}
        <p className="text-sm text-ivory-400/70 italic mb-4 line-clamp-1">{destination.tagline}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {destination.tags.slice(0, isHero ? 4 : 3).map((tag) => (
            <Badge key={tag} variant="outline">{tag}</Badge>
          ))}
        </div>

        {/* CTA row */}
        <div className="flex items-center justify-between pt-4 border-t border-obsidian-800">
          <span
            className={cn(
              'text-2xs uppercase tracking-widest',
              'text-gold-500/50 group-hover:text-gold-400 transition-colors duration-300',
            )}
          >
            Discover
          </span>
          <ArrowRight
            size={14}
            className="text-gold-500/40 group-hover:text-gold-400 group-hover:translate-x-1 transition-all duration-300"
          />
        </div>
      </Link>
    </motion.article>
  );
}
