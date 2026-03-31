'use client';

import { useRef } from 'react';
import Image from 'next/image';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useUIStore } from '@/store/ui.store';

// ─── Decorative geometric shapes ─────────────────────────────────────────────

const SHAPES = [
  { size: 320, top: '-8%',  left: '-6%',  opacity: 0.04, delay: 0 },
  { size: 200, top: '60%',  left: '-4%',  opacity: 0.03, delay: 0.2 },
  { size: 400, top: '-15%', right: '-8%', opacity: 0.05, delay: 0.1 },
  { size: 160, top: '70%',  right: '-2%', opacity: 0.03, delay: 0.3 },
] as const;

// ─── Social proof numbers ─────────────────────────────────────────────────────

const PROOF = [
  { value: '< 40',  label: 'Clients per year' },
  { value: '60+',   label: 'Private contacts' },
  { value: '100%',  label: 'Bespoke itineraries' },
  { value: '15 yr', label: 'Curating since' },
] as const;

// ─── Component ────────────────────────────────────────────────────────────────

export function FinalCTA() {
  const sectionRef       = useRef<HTMLElement>(null);
  const openEnquiryModal = useUIStore((s) => s.openEnquiryModal);

  const { scrollYProgress } = useScroll({
    target:  sectionRef,
    offset:  ['start end', 'end start'],
  });

  // Parallax on background image
  const rawBgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const bgY    = useSpring(rawBgY, { stiffness: 60, damping: 18 });

  // Headline reveal scale
  const headScale = useTransform(scrollYProgress, [0.1, 0.45], [0.96, 1]);
  const headO     = useTransform(scrollYProgress, [0.05, 0.35], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden min-h-[80vh] flex flex-col justify-center"
      aria-labelledby="final-cta-heading"
    >
      {/* ── Background image with parallax ──────────────────────────── */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-[-10%] will-change-transform"
      >
        <Image
          src="https://images.unsplash.com/photo-1540541338537-1220059d28ad?w=1920&q=85"
          alt="Pristine tropical beach at golden hour"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* ── Layered overlays ─────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-obsidian-950/75" />
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/40 to-obsidian-950/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian-950/60 via-transparent to-obsidian-950/60" />

      {/* ── Decorative circles (no meaningful content) ───────────────── */}
      {SHAPES.map((s, i) => (
        <div
          key={i}
          aria-hidden="true"
          className="absolute rounded-full border border-gold-500 pointer-events-none"
          style={{
            width:   s.size,
            height:  s.size,
            top:     'top' in s ? s.top : undefined,
            left:    'left' in s ? s.left : undefined,
            right:   'right' in s ? (s as { right: string }).right : undefined,
            opacity: s.opacity,
          }}
        />
      ))}

      {/* ── Main content ─────────────────────────────────────────────── */}
      <div className="relative z-10 container mx-auto px-6 py-28 lg:py-36 text-center">

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="text-2xs uppercase tracking-ultra text-gold-400 mb-8 flex items-center justify-center gap-4"
        >
          <span className="block w-8 h-px bg-gold-500/40" />
          Your Extraordinary Journey Begins Here
          <span className="block w-8 h-px bg-gold-500/40" />
        </motion.p>

        {/* Headline */}
        <motion.h2
          id="final-cta-heading"
          style={{
            scale:    headScale,
            opacity:  headO,
            fontSize: 'clamp(2.8rem, 8vw, 7.5rem)',
          } as React.CSSProperties}
          className="font-display font-light text-ivory-50 leading-[0.95] mb-6 mx-auto"
        >
          The world is waiting.
          <br />
          <em className="text-gold-400 not-italic">Are you ready?</em>
        </motion.h2>

        {/* Sub-copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-ivory-300/70 text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-12"
        >
          Fewer than 40 clients accepted each year.
          Tell us your vision — we will build the rest.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <Button
            variant="gold"
            size="xl"
            onClick={() => openEnquiryModal()}
          >
            Begin Your Journey
          </Button>
          <Button
            variant="outline"
            size="xl"
            rightIcon={<ArrowRight size={16} />}
            onClick={() => openEnquiryModal()}
          >
            Learn About Membership
          </Button>
        </motion.div>

        {/* ── Social proof stats ──────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto pt-12 border-t border-white/10"
        >
          {PROOF.map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <span className="font-display text-3xl lg:text-4xl font-light text-gold-400 leading-none">
                {value}
              </span>
              <span className="text-2xs uppercase tracking-ultra text-obsidian-400 text-center leading-tight">
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Bottom edge fade ─────────────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-obsidian-950 to-transparent" />
    </section>
  );
}
