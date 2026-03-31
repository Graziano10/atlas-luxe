'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { StarRating } from '@/components/ui/StarRating';
import { getInitials } from '@/utils/format';
import { cn } from '@/utils/cn';
import type { Testimonial } from '@/types';

interface TestimonialsSectionProps {
  testimonials: readonly Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const prev = () => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  };

  const next = () => {
    setDirection(1);
    setCurrent((c) => (c + 1) % testimonials.length);
  };

  const testimonial = testimonials[current];

  return (
    <section
      className="relative py-24 lg:py-32 bg-obsidian-950 overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 bg-gradient-radial from-gold-500/5 via-transparent to-transparent"
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <SectionHeader
            id="testimonials-heading"
            eyebrow="Client Stories"
            title="Words From Those Who Know"
            subtitle="Our clients are the most discerning travellers in the world. Their words are the only measure of excellence we pursue."
          />
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                initial={{ opacity: 0, x: direction * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -60 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="bg-obsidian-900 border border-obsidian-800 p-10 lg:p-14"
              >
                {/* Quote icon */}
                <Quote
                  size={36}
                  className="text-gold-500/30 mb-6"
                  aria-hidden="true"
                />

                {/* Stars */}
                <StarRating rating={testimonial.rating} size="md" className="mb-4" />

                {/* Title */}
                <h3 className="font-display text-2xl text-ivory-100 font-light mb-6 italic">
                  &ldquo;{testimonial.title}&rdquo;
                </h3>

                {/* Content */}
                <p className="text-ivory-300 text-base lg:text-lg leading-relaxed mb-10">
                  {testimonial.content}
                </p>

                {/* Author */}
                <div className="flex items-center gap-5">
                  {/* Avatar initials */}
                  <div className="w-12 h-12 bg-gold-500/10 border border-gold-500/20 flex items-center justify-center shrink-0">
                    <span className="text-sm font-medium text-gold-400">
                      {getInitials(testimonial.author.name)}
                    </span>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-ivory-200">{testimonial.author.name}</p>
                    {testimonial.author.title && (
                      <p className="text-xs text-obsidian-400">{testimonial.author.title}</p>
                    )}
                    {testimonial.author.location && (
                      <p className="text-xs text-obsidian-500">{testimonial.author.location}</p>
                    )}
                  </div>

                  <div className="ml-auto text-right">
                    <p className="text-2xs uppercase tracking-widest text-gold-500/70">
                      {testimonial.destination}
                    </p>
                    <p className="text-2xs text-obsidian-500 mt-1">{testimonial.travelDate}</p>
                    {testimonial.verified && (
                      <p className="text-2xs text-gold-600/60 mt-1">✓ Verified guest</p>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              {/* Dots */}
              <div className="flex gap-2" role="tablist" aria-label="Testimonial navigation">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    role="tab"
                    aria-selected={i === current}
                    aria-label={`Go to testimonial ${i + 1}`}
                    onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                    className={cn(
                      'h-px transition-all duration-300 focus-visible:outline-none',
                      i === current ? 'w-10 bg-gold-500' : 'w-4 bg-obsidian-700 hover:bg-obsidian-500',
                    )}
                  />
                ))}
              </div>

              {/* Prev / Next */}
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className={cn(
                    'w-10 h-10 border border-obsidian-700 flex items-center justify-center',
                    'text-ivory-400 hover:text-gold-400 hover:border-gold-500/40',
                    'transition-all duration-300',
                    'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-500',
                  )}
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={next}
                  className={cn(
                    'w-10 h-10 border border-obsidian-700 flex items-center justify-center',
                    'text-ivory-400 hover:text-gold-400 hover:border-gold-500/40',
                    'transition-all duration-300',
                    'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-500',
                  )}
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
