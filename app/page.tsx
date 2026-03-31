import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

// ─── Above-fold sections — eagerly imported (no code-split delay) ─────────────
import { HeroSection }          from '@/components/sections/HeroSection';
import { PhilosophySection }    from '@/components/sections/PhilosophySection';
import { StatsSection }         from '@/components/sections/StatsSection';
import { FeaturedDestinations } from '@/components/sections/FeaturedDestinations';

// ─── Below-fold sections — dynamically imported (lazy, code-split) ────────────
// These are heavy client bundles (Framer Motion scroll hooks, Zustand) that
// the user will not see until they scroll down. Splitting them shaves ~30 kB
// from the initial JS bundle and improves LCP / TTI on slower connections.
const StorytellingSection = dynamic(
  () => import('@/components/sections/StorytellingSection').then((m) => m.StorytellingSection),
  { ssr: true },
);

const ItineraryTimeline = dynamic(
  () => import('@/components/sections/ItineraryTimeline').then((m) => m.ItineraryTimeline),
  { ssr: true },
);

const TestimonialsSection = dynamic(
  () => import('@/components/sections/TestimonialsSection').then((m) => m.TestimonialsSection),
  { ssr: true },
);

const FinalCTA = dynamic(
  () => import('@/components/sections/FinalCTA').then((m) => m.FinalCTA),
  { ssr: true },
);

const NewsletterSection = dynamic(
  () => import('@/components/sections/NewsletterSection').then((m) => m.NewsletterSection),
  { ssr: true },
);

// ─── Data access (server layer) ───────────────────────────────────────────────
import { getFeaturedDestinations } from '@/lib/destinations';
import { getFeaturedItineraries }  from '@/lib/itineraries';
import { getFeaturedTestimonials } from '@/lib/testimonials';

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Bespoke Luxury Travel — Handcrafted Journeys for the Discerning',
  description:
    'Ultra-luxury, bespoke travel itineraries. Private estates, locked temples at dawn, and journeys that outlast memory. Fewer than 40 clients accepted per year.',
};

// ─── Page (Server Component) ──────────────────────────────────────────────────
// All data fetched at the server layer — no waterfalls, no client loading states.

export default function HomePage() {
  const destinations = getFeaturedDestinations();
  const itineraries  = getFeaturedItineraries();
  const testimonials = getFeaturedTestimonials(5);

  return (
    <>
      {/*
        Page composition
        ────────────────────────────────────────────────────
        1. Hero            Fullscreen cinematic slideshow
        2. Philosophy      Brand values — RSC via AnimateInView
        3. Stats           Key numbers — RSC via AnimateInView
        4. Storytelling    Scroll-parallax brand narrative (lazy)
        5. Destinations    Asymmetric mosaic card grid
        6. Timeline        Day-by-day itinerary preview (lazy)
        7. Testimonials    Social proof (lazy)
        8. Final CTA       Conversion — enquire / membership (lazy)
        9. Newsletter      Inner-circle capture (lazy)
        ────────────────────────────────────────────────────
      */}

      {/* 1 ── Immersive full-viewport hero with auto-advancing slides */}
      <HeroSection />

      {/* 2 ── Philosophy pillars — server-rendered content, client animations */}
      <PhilosophySection />

      {/* 3 ── Stats bar — server-rendered content, client animations */}
      <StatsSection />

      {/* 4 ── Brand storytelling: philosophy, curation, access */}
      <StorytellingSection />

      {/* 5 ── Featured destinations mosaic grid */}
      <FeaturedDestinations destinations={destinations} />

      {/* 6 ── Itinerary day-by-day timeline preview */}
      <ItineraryTimeline itineraries={itineraries} />

      {/* 7 ── Testimonials — social proof from past clients */}
      <TestimonialsSection testimonials={testimonials} />

      {/* 8 ── Final conversion CTA with parallax background */}
      <FinalCTA />

      {/* 9 ── Newsletter / inner circle sign-up */}
      <NewsletterSection />
    </>
  );
}
