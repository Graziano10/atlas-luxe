'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import { ArrowRight, Clock, MapPin, Utensils, Bed, ChevronDown } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Badge } from '@/components/ui/Badge';
import { Divider } from '@/components/ui/Divider';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { formatPrice, formatDuration } from '@/utils/format';
import { cn } from '@/utils/cn';
import type { Itinerary, ItineraryDay } from '@/types';

// ─── Day card ─────────────────────────────────────────────────────────────────

interface DayCardProps {
  day:     ItineraryDay;
  index:   number;
  isLast:  boolean;
}

function DayCard({ day, index, isLast }: DayCardProps) {
  const [ref, visible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.2 });
  const [expanded, setExpanded] = useState(index === 0);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={visible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative pl-14 md:pl-20"
    >
      {/* ── Timeline node ──────────────────────────────────────────────── */}
      {/* Connector line (hidden for last item) */}
      {!isLast && (
        <motion.div
          initial={{ scaleY: 0 }}
          animate={visible ? { scaleY: 1 } : {}}
          transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
          className="absolute left-[19px] md:left-[27px] top-12 bottom-0 w-px bg-gradient-to-b from-gold-500/40 to-obsidian-800/30 origin-top"
        />
      )}

      {/* Day circle */}
      <div className="absolute left-0 top-0 flex flex-col items-center gap-1">
        <div
          className={cn(
            'w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center',
            'border-2 border-gold-500/50 bg-obsidian-950',
            'transition-all duration-500',
            expanded && 'border-gold-400 shadow-[0_0_20px_rgba(212,168,39,0.15)]',
          )}
        >
          <span className="font-display font-light text-gold-400 text-xs md:text-sm leading-none">
            {String(day.day).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* ── Card body ──────────────────────────────────────────────────── */}
      <div
        className={cn(
          'border border-obsidian-800 bg-obsidian-900',
          'transition-all duration-500',
          expanded && 'border-gold-500/20',
          'mb-5',
        )}
      >
        {/* Header — always visible */}
        <button
          onClick={() => setExpanded((v) => !v)}
          className="w-full flex items-start justify-between gap-4 p-5 md:p-6 text-left group focus-visible:outline-none"
          aria-expanded={expanded}
        >
          <div className="flex-1">
            <p className="text-2xs uppercase tracking-ultra text-gold-500/70 mb-1">Day {day.day}</p>
            <h4 className="font-display text-xl md:text-2xl font-light text-ivory-100 group-hover:text-gold-300 transition-colors duration-300">
              {day.title}
            </h4>
          </div>
          <ChevronDown
            size={16}
            className={cn(
              'text-gold-500/50 mt-1.5 shrink-0 transition-transform duration-400',
              expanded && 'rotate-180',
            )}
          />
        </button>

        {/* Expandable detail */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="detail"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="overflow-hidden"
            >
              <div className="px-5 md:px-6 pb-6">
                <Divider className="mb-5" />

                {/* Description */}
                <p className="text-sm text-obsidian-400 leading-relaxed mb-6">
                  {day.description}
                </p>

                {/* Activities */}
                {day.activities.length > 0 && (
                  <div className="mb-5">
                    <p className="text-2xs uppercase tracking-ultra text-gold-500/60 mb-3">Activities</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {day.activities.map((act) => (
                        <div
                          key={act.id}
                          className="flex items-start gap-3 bg-obsidian-950/60 p-3 border border-obsidian-800/60"
                        >
                          <div className="mt-0.5 p-1.5 bg-gold-500/10 border border-gold-500/20">
                            <MapPin size={10} className="text-gold-500/70" />
                          </div>
                          <div>
                            <p className="text-xs text-ivory-200 font-medium mb-0.5">{act.name}</p>
                            <div className="flex items-center gap-2 text-2xs text-obsidian-500">
                              <Clock size={9} />
                              <span>{act.duration}</span>
                              <span>·</span>
                              <span>{act.type}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Meals + accommodation row */}
                <div className="flex flex-wrap gap-6 pt-4 border-t border-obsidian-800/50">
                  {day.meals.length > 0 && (
                    <div className="flex items-center gap-2 text-xs text-ivory-400">
                      <Utensils size={12} className="text-gold-500/50" />
                      <span>{day.meals.join(', ')}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-xs text-ivory-400">
                    <Bed size={12} className="text-gold-500/50" />
                    <span>{day.accommodation}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── Itinerary panel ──────────────────────────────────────────────────────────

interface ItineraryPanelProps {
  itinerary: Itinerary;
  index:     number;
}

function ItineraryPanel({ itinerary, index }: ItineraryPanelProps) {
  const [headerRef, headerVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.2 });
  const stickyRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target:  stickyRef,
    offset:  ['start center', 'end center'],
  });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.04, 1]);

  return (
    <div
      className={cn(
        'grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-0',
        'border border-obsidian-800 overflow-hidden',
        index > 0 && 'mt-10',
      )}
    >
      {/* ── Sticky image panel ───────────────────────────────────────── */}
      <div ref={stickyRef} className="relative lg:sticky lg:top-24 lg:self-start overflow-hidden">
        <div className="relative aspect-[4/3] lg:aspect-[3/4] overflow-hidden">
          <motion.div style={{ scale: imageScale }} className="absolute inset-0 will-change-transform">
            <Image
              src={itinerary.heroImage.src}
              alt={itinerary.heroImage.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/80 to-transparent" />

          {/* Overlay info */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p className="text-2xs uppercase tracking-ultra text-gold-400 mb-1">
              {itinerary.destination.name}
            </p>
            <p className="font-display text-2xl font-light text-ivory-100 mb-4">
              {itinerary.title}
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 text-xs text-ivory-300">
                <Clock size={12} className="text-gold-500/60" />
                {formatDuration(itinerary.durationDays)}
              </div>
              <span className="text-obsidian-600 text-xs">·</span>
              <div className="text-xs text-ivory-300">
                From{' '}
                <span className="text-gold-400 font-medium">
                  {formatPrice(itinerary.pricePerPerson, itinerary.currency)}
                </span>
                {' '}pp
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Timeline panel ───────────────────────────────────────────── */}
      <div className="bg-obsidian-950 px-6 py-10 md:px-10 md:py-12">
        {/* Panel header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <Badge variant="tier" className="mb-4">{itinerary.tier}</Badge>
          <h3 className="font-display text-3xl font-light text-ivory-100 mb-2">
            Day by Day
          </h3>
          <p className="text-sm text-obsidian-400 italic">{itinerary.subtitle}</p>
        </motion.div>

        {/* Day cards */}
        <div>
          {itinerary.days.map((day, i) => (
            <DayCard
              key={day.day}
              day={day}
              index={i}
              isLast={i === itinerary.days.length - 1}
            />
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-8 pt-8 border-t border-obsidian-800 flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-2xs uppercase tracking-widest text-obsidian-500 mb-1">From</p>
            <p className="font-display text-3xl font-light text-gold-400">
              {formatPrice(itinerary.pricePerPerson, itinerary.currency)}
            </p>
            <p className="text-2xs text-obsidian-500 mt-0.5">per person · all-inclusive</p>
          </div>
          <Link
            href={`/itineraries/${itinerary.slug}`}
            className={cn(
              'inline-flex items-center gap-2 text-xs uppercase tracking-widest',
              'px-6 py-3 border border-gold-500 text-gold-400',
              'hover:bg-gold-500 hover:text-obsidian-950 transition-all duration-300 group',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500',
            )}
          >
            Full Itinerary
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

interface ItineraryTimelineProps {
  itineraries: readonly Itinerary[];
}

export function ItineraryTimeline({ itineraries }: ItineraryTimelineProps) {
  const [headerRef, headerVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.3 });

  return (
    <section
      className="py-24 lg:py-32 bg-obsidian-950 border-t border-obsidian-800"
      aria-labelledby="itinerary-heading"
    >
      <div className="container mx-auto px-6">

        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 32 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <SectionHeader
            id="itinerary-heading"
            eyebrow="Signature Itineraries"
            title="Your Journey, Day by Day"
            subtitle="Not a package. A meticulously engineered sequence of extraordinary experiences — each one bespoke, each one unrepeatable."
          />
        </motion.div>

        {/* Itinerary panels */}
        {itineraries.map((it, i) => (
          <ItineraryPanel key={it.id} itinerary={it} index={i} />
        ))}

        {/* All itineraries link */}
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
