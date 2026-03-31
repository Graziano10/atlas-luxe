'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronDown, MapPin, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useUIStore } from '@/store/ui.store';

// ─── Slide data ────────────────────────────────────────────────────────────────

const SLIDES = [
  {
    id:        'maldives',
    src:       'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1920&q=90',
    alt:       'Overwater villas at sunset — Maldives',
    location:  'Maldives Private Atoll',
    region:    'Indian Ocean',
    headline:  ['Infinite', 'turquoise.'],
    sub:       'absolute seclusion.',
    rating:    4.98,
    tag:       'Overwater',
    href:      '/destinations/maldives-private-atoll',
  },
  {
    id:        'amalfi',
    src:       'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?w=1920&q=90',
    alt:       'Amalfi coastline at golden hour — Italy',
    location:  'Amalfi Private Estate',
    region:    'Southern Italy',
    headline:  ['La dolce', 'vita.'],
    sub:       'elevated to an art form.',
    rating:    4.95,
    tag:       'Villa',
    href:      '/destinations/amalfi-private-villa',
  },
  {
    id:        'kyoto',
    src:       'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1920&q=90',
    alt:       'Cherry blossoms over Kyoto temple — Japan',
    location:  'Kyoto Imperial Retreat',
    region:    'Japan',
    headline:  ['Centuries', 'of serenity.'],
    sub:       'one breath at a time.',
    rating:    4.97,
    tag:       'Cultural',
    href:      '/destinations/kyoto-ryokan-retreat',
  },
] as const;

const SLIDE_DURATION = 7000;

// ─── Animation variants ───────────────────────────────────────────────────────

const headlineVariants = {
  hidden: { opacity: 0, y: 48, filter: 'blur(8px)' },
  show:   (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, delay: 0.1 + i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
  exit:  { opacity: 0, y: -24, filter: 'blur(4px)', transition: { duration: 0.5 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: d, ease: 'easeOut' } }),
  exit:   { opacity: 0, y: -10, transition: { duration: 0.3 } },
};

// ─── Component ────────────────────────────────────────────────────────────────

export function HeroSection() {
  const [current, setCurrent]   = useState(0);
  const [loaded,  setLoaded]    = useState(false);
  const [paused,  setPaused]    = useState(false);
  const containerRef            = useRef<HTMLElement>(null);
  const progressRef             = useRef<ReturnType<typeof setInterval> | null>(null);
  const [progress, setProgress] = useState(0);

  const openEnquiryModal = useUIStore((s) => s.openEnquiryModal);

  // Parallax
  const { scrollYProgress } = useScroll({
    target:  containerRef as React.RefObject<HTMLElement>,
    offset:  ['start start', 'end start'],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const overlayO  = useTransform(scrollYProgress, [0, 0.6], [0, 0.5]);

  // Auto-advance with progress bar
  const advance = useCallback((dir = 1) => {
    setCurrent((c) => (c + dir + SLIDES.length) % SLIDES.length);
    setProgress(0);
  }, []);

  useEffect(() => {
    if (paused) return;
    progressRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { advance(); return 0; }
        return p + (100 / (SLIDE_DURATION / 80));
      });
    }, 80);
    return () => { if (progressRef.current) clearInterval(progressRef.current); };
  }, [paused, advance]);

  const slide = SLIDES[current];

  const scrollDown = () => window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' });

  return (
    <section
      ref={containerRef}
      className="relative h-[100dvh] min-h-[640px] overflow-hidden select-none"
      aria-label="Hero showcase"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >

      {/* ── Background image stack ───────────────────────────────────────── */}
      <motion.div style={{ y: parallaxY }} className="absolute inset-0 will-change-transform">
        <AnimatePresence initial={false}>
          <motion.div
            key={slide.id}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
              onLoad={() => setLoaded(true)}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* ── Overlay system ───────────────────────────────────────────────── */}
      {/* Base dark vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian-950/70 via-obsidian-950/10 to-obsidian-950/90 pointer-events-none" />
      {/* Left fade for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian-950/75 via-obsidian-950/30 to-transparent pointer-events-none" />
      {/* Scroll-progressive darkening */}
      <motion.div
        style={{ opacity: overlayO }}
        className="absolute inset-0 bg-obsidian-950 pointer-events-none"
      />

      {/* ── Floating location badge (top-right) ──────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`badge-${slide.id}`}
          variants={fadeUp}
          initial="hidden"
          animate={loaded ? 'show' : 'hidden'}
          exit="exit"
          custom={0.9}
          className="absolute top-28 right-6 md:right-10 z-20 hidden md:flex flex-col items-end gap-1"
        >
          <div className="flex items-center gap-2 bg-obsidian-950/60 backdrop-blur-sm border border-white/10 px-4 py-2">
            <MapPin size={12} className="text-gold-400" />
            <span className="text-2xs uppercase tracking-ultra text-ivory-300">{slide.region}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-obsidian-950/60 backdrop-blur-sm border border-white/10 px-4 py-2">
            <Star size={11} className="text-gold-400 fill-gold-400" />
            <span className="text-2xs text-ivory-300 tracking-wider">{slide.rating} Guest Rating</span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── Hero content ─────────────────────────────────────────────────── */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-14 lg:px-24 pb-20">
        <div className="max-w-3xl">

          {/* Eyebrow */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`eye-${slide.id}`}
              variants={fadeUp}
              initial="hidden"
              animate={loaded ? 'show' : 'hidden'}
              exit="exit"
              custom={0.05}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-8 h-px bg-gold-500" />
              <span className="text-2xs uppercase tracking-ultra text-gold-400 font-sans">
                {slide.location}
              </span>
              <span className="text-2xs uppercase tracking-widest text-obsidian-500">·</span>
              <span className="text-2xs uppercase tracking-ultra text-obsidian-400">{slide.tag}</span>
            </motion.div>
          </AnimatePresence>

          {/* Multi-line headline — each word animates in individually */}
          <div className="mb-4 overflow-hidden">
            <AnimatePresence mode="wait">
              {slide.headline.map((line, i) => (
                <motion.h1
                  key={`${slide.id}-line${i}`}
                  custom={i}
                  variants={headlineVariants}
                  initial="hidden"
                  animate={loaded ? 'show' : 'hidden'}
                  exit="exit"
                  className="font-display font-light text-ivory-50 leading-[0.92] block"
                  style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)' }}
                >
                  {line}
                </motion.h1>
              ))}
            </AnimatePresence>
          </div>

          {/* Sub-tagline */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`sub-${slide.id}`}
              variants={fadeUp}
              initial="hidden"
              animate={loaded ? 'show' : 'hidden'}
              exit="exit"
              custom={0.55}
              className="font-display font-light italic text-gold-400 mb-10"
              style={{ fontSize: 'clamp(1.4rem, 3vw, 2.5rem)' }}
            >
              {slide.sub}
            </motion.p>
          </AnimatePresence>

          {/* Body copy */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={loaded ? 'show' : 'hidden'}
            custom={0.7}
            className="text-ivory-300/80 text-base md:text-lg max-w-lg leading-relaxed mb-10 font-sans"
          >
            Bespoke journeys curated for those who seek the exceptional.
            Every detail, every moment — designed for you alone.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={loaded ? 'show' : 'hidden'}
            custom={0.85}
            className="flex flex-wrap gap-4"
          >
            <Button variant="gold" size="lg" onClick={() => openEnquiryModal()}>
              Begin Your Journey
            </Button>
            <Link href={slide.href}>
              <Button
                variant="ghost"
                size="lg"
                rightIcon={<ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />}
              >
                Explore {slide.tag}
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ── Slide controls ────────────────────────────────────────────────── */}
      <div className="absolute bottom-10 left-6 md:left-14 lg:left-24 z-20 flex items-end gap-6">
        {/* Slide list */}
        <div
          className="flex items-center gap-3"
          role="tablist"
          aria-label="Hero slide navigation"
        >
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={i === current}
              aria-label={`Slide ${i + 1}: ${s.location}`}
              onClick={() => { setCurrent(i); setProgress(0); }}
              className="group flex flex-col items-start gap-1.5 focus-visible:outline-none"
            >
              {/* Progress track */}
              <div className="w-12 h-px bg-white/20 overflow-hidden">
                <div
                  className="h-full bg-gold-400 transition-none"
                  style={{ width: i === current ? `${progress}%` : i < current ? '100%' : '0%' }}
                />
              </div>
              <span
                className={`text-2xs uppercase tracking-wider transition-colors duration-300 ${
                  i === current ? 'text-gold-400' : 'text-obsidian-500 group-hover:text-ivory-400'
                }`}
              >
                0{i + 1}
              </span>
            </button>
          ))}
        </div>

        {/* Slide counter */}
        <div className="flex items-baseline gap-1 mb-0.5">
          <span className="font-display text-2xl font-light text-ivory-100">0{current + 1}</span>
          <span className="text-obsidian-600 text-sm">/</span>
          <span className="text-obsidian-500 text-sm">0{SLIDES.length}</span>
        </div>
      </div>

      {/* ── Scroll cue ───────────────────────────────────────────────────── */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ delay: 1.6 }}
        onClick={scrollDown}
        className="absolute bottom-10 right-8 md:right-14 z-20 flex flex-col items-center gap-2
                   text-ivory-400 hover:text-gold-400 transition-colors duration-300
                   focus-visible:outline-none focus-visible:text-gold-400 group"
        aria-label="Scroll to content"
      >
        <div className="flex flex-col items-center gap-1">
          <span className="text-2xs uppercase tracking-ultra">Scroll</span>
          {/* Animated chevron stack */}
          <div className="flex flex-col items-center -space-y-1.5">
            {[0, 1].map((i) => (
              <ChevronDown
                key={i}
                size={14}
                className="animate-bounce"
                style={{ animationDelay: `${i * 0.15}s`, opacity: 1 - i * 0.4 }}
              />
            ))}
          </div>
        </div>
      </motion.button>

      {/* ── Decorative vertical text (desktop) ───────────────────────────── */}
      <div
        className="absolute right-5 top-1/2 -translate-y-1/2 z-10 hidden xl:flex flex-col items-center gap-3"
        aria-hidden="true"
      >
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-gold-500/30" />
        <span
          className="text-2xs uppercase tracking-ultra text-obsidian-600"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          Luxe Travel Experience
        </span>
        <div className="w-px h-16 bg-gradient-to-b from-gold-500/30 to-transparent" />
      </div>
    </section>
  );
}
