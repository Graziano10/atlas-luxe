'use client';

import { motion } from 'framer-motion';
import { Compass, Shield, Star } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { cn } from '@/utils/cn';

const PILLARS = [
  {
    icon:        Compass,
    title:       'Curated Exclusively',
    description:
      'Every itinerary is hand-built by our team — never templated, never recycled. We accept fewer than 40 clients per year so each journey receives our undivided attention.',
  },
  {
    icon:        Shield,
    title:       'Absolute Discretion',
    description:
      'Your privacy is non-negotiable. We maintain strict confidence and never disclose client information. Your journey exists only for you.',
  },
  {
    icon:        Star,
    title:       'Beyond Five Stars',
    description:
      'We measure excellence not in star ratings but in the stories you bring home. Access the inaccessible: locked temples at dawn, private museums after hours, dinners with legends.',
  },
] as const;

export function PhilosophySection() {
  const [ref, visible] = useIntersectionObserver<HTMLElement>({ threshold: 0.15 });

  return (
    <section
      ref={ref}
      className="relative py-24 lg:py-32 bg-gradient-luxury overflow-hidden"
      aria-labelledby="philosophy-heading"
    >
      {/* Decorative element */}
      <div
        className="absolute inset-0 bg-noise opacity-30 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-gold-500/40"
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 relative">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center text-2xs uppercase tracking-ultra text-gold-500 mb-4"
        >
          Our Philosophy
        </motion.p>

        {/* Headline */}
        <motion.h2
          id="philosophy-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-center font-display font-light text-ivory-50 text-4xl md:text-5xl lg:text-6xl max-w-3xl mx-auto leading-tight mb-6"
        >
          Travel is not a destination.
          <br />
          <span className="text-gold-400">It is a transformation.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center text-ivory-400 text-lg max-w-2xl mx-auto mb-20"
        >
          We believe that true luxury is not the thread count of a linen or the vintage of a wine — it is the complete surrender to a moment that will outlast memory.
        </motion.p>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 40 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3 + i * 0.15 }}
                className="flex flex-col items-center text-center gap-6"
              >
                <div className="w-14 h-14 flex items-center justify-center border border-gold-500/30 text-gold-400">
                  <Icon size={22} strokeWidth={1.5} />
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="font-display text-2xl font-light text-ivory-100">{pillar.title}</h3>
                  <p className="text-sm text-obsidian-400 leading-relaxed">{pillar.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Gold ornament line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={visible ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="mt-20 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent origin-left"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
