'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/utils/cn';

// ─── Chapter data ─────────────────────────────────────────────────────────────
// In production: fetch from CMS

const CHAPTERS = [
  {
    id:       'chapter-1',
    eyebrow:  'The Philosophy',
    headline: 'Travel as transformation,\nnot transaction.',
    body:
      'We don\'t sell holidays. We architect defining moments — private ateliers of experience where the rarest thing on earth is your undivided time. Every detail is engineered so you never once think about the detail.',
    cta:      { label: 'Our Manifesto', href: '/about' },
    image: {
      src:    'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1400&q=85',
      alt:    'Private yacht anchored in a crystal cove at twilight',
      credit: 'Mediterranean, Summer',
    },
    imagePosition: 'right' as const,
    accent: 'from-gold-900/30 to-transparent',
  },
  {
    id:       'chapter-2',
    eyebrow:  'The Curation',
    headline: 'Forty clients\nper year.\nNothing more.',
    body:
      'Scarcity is not a sales tactic — it is a quality guarantee. With fewer than forty clients per year, every concierge, every guide, every private chef has weeks to prepare for your singular arrival. This is what absolute focus feels like.',
    cta:      { label: 'Apply for Membership', href: '/enquire' },
    image: {
      src:    'https://images.unsplash.com/photo-1609766857898-6d48bb39fc76?w=1400&q=85',
      alt:    'Bespoke dinner table set on a cliffside terrace at sunset',
      credit: 'Santorini, Greece',
    },
    imagePosition: 'left' as const,
    accent: 'from-obsidian-900/60 to-transparent',
  },
  {
    id:       'chapter-3',
    eyebrow:  'The Access',
    headline: 'Places that\ndon\'t exist\nuntil we call.',
    body:
      'Temples unlocked at dawn before the world wakes. Vineyards that have never held a tourist. Island peaks navigated by the family who has lived on them for nine generations. Our network of 200 private contacts spans 60 countries.',
    cta:      { label: 'Explore Destinations', href: '/destinations' },
    image: {
      src:    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=85',
      alt:    'Lone hiker on a mountain ridge at sunrise',
      credit: 'Patagonia, Argentina',
    },
    imagePosition: 'right' as const,
    accent: 'from-gold-900/20 to-transparent',
  },
] as const;

// ─── Chapter panel ────────────────────────────────────────────────────────────

interface ChapterPanelProps {
  chapter:       (typeof CHAPTERS)[number];
  chapterNumber: number;
}

function ChapterPanel({ chapter, chapterNumber }: ChapterPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const isRight  = chapter.imagePosition === 'right';

  const { scrollYProgress } = useScroll({
    target:  panelRef,
    offset:  ['start end', 'end start'],
  });

  // Parallax for image
  const rawY = useTransform(scrollYProgress, [0, 1], ['6%', '-6%']);
  const y    = useSpring(rawY, { stiffness: 80, damping: 20 });

  // Fade + slide for text
  const textOpacity = useTransform(scrollYProgress, [0.15, 0.4], [0, 1]);
  const textX = useTransform(
    scrollYProgress,
    [0.15, 0.4],
    [isRight ? -32 : 32, 0],
  );

  // Line reveal progress
  const lineScaleY = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);

  return (
    <div
      ref={panelRef}
      className={cn(
        'relative grid grid-cols-1 lg:grid-cols-2 min-h-[80vh] lg:min-h-[100vh]',
        'border-t border-obsidian-800/50',
      )}
    >
      {/* ── Image side ─────────────────────────────────────────────────── */}
      <div
        className={cn(
          'relative overflow-hidden',
          'aspect-[4/3] lg:aspect-auto',
          isRight ? 'lg:order-2' : 'lg:order-1',
        )}
      >
        <motion.div style={{ y }} className="absolute inset-[-8%] will-change-transform">
          <Image
            src={chapter.image.src}
            alt={chapter.image.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </motion.div>

        {/* Overlay gradient */}
        <div
          className={cn(
            'absolute inset-0',
            isRight
              ? 'bg-gradient-to-l from-transparent to-obsidian-950/30'
              : 'bg-gradient-to-r from-transparent to-obsidian-950/30',
          )}
        />
        <div className={cn('absolute inset-0 bg-gradient-to-t', chapter.accent)} />

        {/* Image credit */}
        <p
          className={cn(
            'absolute bottom-4 text-2xs uppercase tracking-ultra text-ivory-300/50',
            isRight ? 'left-4' : 'right-4',
          )}
          aria-hidden="true"
        >
          {chapter.image.credit}
        </p>
      </div>

      {/* ── Text side ──────────────────────────────────────────────────── */}
      <div
        className={cn(
          'relative flex items-center',
          'bg-obsidian-950',
          'px-8 py-16 lg:px-16 xl:px-24',
          isRight ? 'lg:order-1' : 'lg:order-2',
        )}
      >
        {/* Vertical progress line */}
        <motion.div
          style={{ scaleY: lineScaleY }}
          className={cn(
            'absolute top-0 bottom-0 w-px origin-top bg-gold-500/30',
            isRight ? 'right-0' : 'left-0',
          )}
        />

        <motion.div
          style={{ opacity: textOpacity, x: textX }}
          className="max-w-lg"
        >
          {/* Chapter number + eyebrow */}
          <div className="flex items-center gap-3 mb-8">
            <span className="font-display text-5xl font-light text-gold-500/20 leading-none">
              0{chapterNumber}
            </span>
            <div>
              <div className="w-12 h-px bg-gold-500/40 mb-2" />
              <p className="text-2xs uppercase tracking-ultra text-gold-400">
                {chapter.eyebrow}
              </p>
            </div>
          </div>

          {/* Headline — supports \n line breaks */}
          <h2
            className="font-display font-light text-ivory-50 leading-[1.05] mb-8"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)' }}
          >
            {chapter.headline.split('\n').map((line, i) => (
              <span key={i} className="block">
                {i % 2 === 1 ? (
                  <em className="text-gold-400 not-italic">{line}</em>
                ) : line}
              </span>
            ))}
          </h2>

          {/* Divider */}
          <div className="w-16 h-px bg-gold-500/40 mb-8" />

          {/* Body */}
          <p className="text-ivory-400/80 text-base md:text-lg leading-relaxed mb-10">
            {chapter.body}
          </p>

          {/* CTA */}
          <Link
            href={chapter.cta.href}
            className={cn(
              'inline-flex items-center gap-3 group',
              'text-xs uppercase tracking-widest',
              'text-ivory-300 hover:text-gold-400 transition-colors duration-300',
              'focus-visible:outline-none focus-visible:text-gold-400',
            )}
          >
            {chapter.cta.label}
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1.5"
            />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function StorytellingSection() {
  return (
    <section aria-label="Our story — brand philosophy chapters">
      {/* Intro label */}
      <div className="bg-obsidian-950 py-12 px-6 md:px-14 border-t border-obsidian-800/50">
        <div className="container mx-auto flex items-center gap-6">
          <div className="w-px h-10 bg-gold-500/30" />
          <div>
            <p className="text-2xs uppercase tracking-ultra text-gold-400 mb-1">The Atlas Luxe Story</p>
            <p className="text-sm text-obsidian-400">Scroll to explore our philosophy</p>
          </div>
        </div>
      </div>

      {/* Chapter panels */}
      {CHAPTERS.map((chapter, i) => (
        <ChapterPanel key={chapter.id} chapter={chapter} chapterNumber={i + 1} />
      ))}
    </section>
  );
}
