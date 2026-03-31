'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useUIStore } from '@/store/ui.store';

const HERO_SLIDES = [
  {
    id:      'maldives',
    src:     'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1920&q=85',
    alt:     'Overwater villas at sunset — Maldives',
    tagline: 'Infinite turquoise,',
    tagline2:'absolute seclusion.',
    location:'Maldives Private Atoll',
  },
  {
    id:      'amalfi',
    src:     'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?w=1920&q=85',
    alt:     'Amalfi coastline at golden hour — Italy',
    tagline: 'La dolce vita,',
    tagline2:'elevated to art.',
    location:'Amalfi Private Estate',
  },
  {
    id:      'kyoto',
    src:     'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1920&q=85',
    alt:     'Cherry blossoms over Kyoto temple — Japan',
    tagline: 'Centuries of serenity,',
    tagline2:'one breath at a time.',
    location:'Kyoto Imperial Retreat',
  },
];

const SLIDE_DURATION = 6000; // ms

export function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [isLoaded, setIsLoaded]   = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const openEnquiryModal = useUIStore((s) => s.openEnquiryModal);

  const { scrollYProgress } = useScroll({
    target:  containerRef as React.RefObject<HTMLElement>,
    offset:  ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(
      () => setCurrent((c) => (c + 1) % HERO_SLIDES.length),
      SLIDE_DURATION,
    );
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[current];

  const scrollToContent = () => {
    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[600px] overflow-hidden"
      aria-label="Hero — Featured destinations"
    >
      {/* Parallax image layer */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 will-change-transform"
      >
        {HERO_SLIDES.map((s, i) => (
          <motion.div
            key={s.id}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: i === current ? 1 : 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            aria-hidden={i !== current}
          >
            <Image
              src={s.src}
              alt={s.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover object-center"
              onLoad={() => i === 0 && setIsLoaded(true)}
            />
          </motion.div>
        ))}

        {/* Layered overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian-950/60 via-obsidian-950/20 to-obsidian-950/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian-950/40 to-transparent" />
      </motion.div>

      {/* Noise texture */}
      <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <motion.p
            key={`loc-${current}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xs uppercase tracking-ultra text-gold-400 mb-6 font-sans"
          >
            {slide.location}
          </motion.p>

          {/* Main headline */}
          <motion.h1
            key={`h-${current}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="font-display font-light text-ivory-50 leading-none mb-2"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
          >
            {slide.tagline}
          </motion.h1>
          <motion.h1
            key={`h2-${current}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-display font-light text-gold-400 leading-none mb-10"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
          >
            {slide.tagline2}
          </motion.h1>

          {/* Sub-copy */}
          <motion.p
            key={`p-${current}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="text-ivory-300 text-lg md:text-xl max-w-lg leading-relaxed mb-10"
          >
            Bespoke journeys curated for those who seek the exceptional. Every detail, every moment — designed for you alone.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <Button
              variant="gold"
              size="lg"
              onClick={() => openEnquiryModal()}
            >
              Begin Your Journey
            </Button>
            <Button
              variant="ghost"
              size="lg"
            >
              Explore Destinations
            </Button>
          </motion.div>
        </div>

        {/* Slide indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-16 left-6 md:left-12 lg:left-20 flex gap-2"
          role="tablist"
          aria-label="Slide navigation"
        >
          {HERO_SLIDES.map((s, i) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={i === current}
              aria-label={`Go to slide ${i + 1}: ${s.location}`}
              onClick={() => setCurrent(i)}
              className="h-px transition-all duration-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-400"
              style={{
                width:      i === current ? 48 : 16,
                background: i === current ? 'rgb(212 168 39)' : 'rgba(255,255,255,0.3)',
              }}
            />
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ delay: 1.4 }}
          onClick={scrollToContent}
          className="absolute bottom-10 right-8 md:right-12 flex flex-col items-center gap-2 text-ivory-400 hover:text-gold-400 transition-colors focus-visible:outline-none focus-visible:text-gold-400"
          aria-label="Scroll to content"
        >
          <span className="text-2xs uppercase tracking-ultra">Scroll</span>
          <ChevronDown size={16} className="animate-bounce" />
        </motion.button>
      </div>
    </section>
  );
}
