import type { Metadata } from 'next';

// ─── Section components ───────────────────────────────────────────────────────
import { HeroSection }         from '@/components/sections/HeroSection';
import { StorytellingSection } from '@/components/sections/StorytellingSection';
import { FeaturedDestinations } from '@/components/sections/FeaturedDestinations';
import { ItineraryTimeline }   from '@/components/sections/ItineraryTimeline';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { FinalCTA }            from '@/components/sections/FinalCTA';
import { NewsletterSection }   from '@/components/sections/NewsletterSection';

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
        2. Storytelling    Scroll-parallax brand narrative
        3. Destinations    Asymmetric mosaic card grid
        4. Timeline        Day-by-day itinerary preview
        5. Testimonials    Social proof
        6. Final CTA       Conversion — enquire / membership
        7. Newsletter      Inner-circle capture
        ────────────────────────────────────────────────────
      */}

      {/* 1 ── Immersive full-viewport hero with auto-advancing slides */}
      <HeroSection />

      {/* 2 ── Brand storytelling: philosophy, curation, access */}
      <StorytellingSection />

      {/* 3 ── Featured destinations mosaic grid */}
      <FeaturedDestinations destinations={destinations} />

      {/* 4 ── Itinerary day-by-day timeline preview */}
      <ItineraryTimeline itineraries={itineraries} />

      {/* 5 ── Testimonials — social proof from past clients */}
      <TestimonialsSection testimonials={testimonials} />

      {/* 6 ── Final conversion CTA with parallax background */}
      <FinalCTA />

      {/* 7 ── Newsletter / inner circle sign-up */}
      <NewsletterSection />
    </>
  );
}
