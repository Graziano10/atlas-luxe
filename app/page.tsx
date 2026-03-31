import type { Metadata } from 'next';
import { HeroSection }            from '@/components/sections/HeroSection';
import { PhilosophySection }      from '@/components/sections/PhilosophySection';
import { StatsSection }           from '@/components/sections/StatsSection';
import { FeaturedDestinations }   from '@/components/sections/FeaturedDestinations';
import { FeaturedItineraries }    from '@/components/sections/FeaturedItineraries';
import { TestimonialsSection }    from '@/components/sections/TestimonialsSection';
import { NewsletterSection }      from '@/components/sections/NewsletterSection';
import { getFeaturedDestinations } from '@/lib/destinations';
import { getFeaturedItineraries }  from '@/lib/itineraries';
import { getFeaturedTestimonials } from '@/lib/testimonials';

// ─── Page metadata ────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Bespoke Luxury Travel — Handcrafted Journeys for the Discerning',
  description:
    'Ultra-luxury, bespoke travel itineraries. Private estates, locked temples at dawn, and journeys that outlast memory. Fewer than 40 clients accepted per year.',
};

// ─── Page (Server Component) ──────────────────────────────────────────────────
// Data is fetched at the server layer — no waterfalls, no client-side loading states.

export default function HomePage() {
  // Data access — centralised in /lib (pure functions, easily swapped for CMS/API)
  const destinations  = getFeaturedDestinations();
  const itineraries   = getFeaturedItineraries();
  const testimonials  = getFeaturedTestimonials(5);

  return (
    <>
      {/* 1. Hero — immersive full-viewport cinematic introduction */}
      <HeroSection />

      {/* 2. Philosophy — brand values anchor */}
      <PhilosophySection />

      {/* 3. Stats — credibility signals */}
      <StatsSection />

      {/* 4. Featured Destinations — visual discovery */}
      <FeaturedDestinations destinations={destinations} />

      {/* 5. Featured Itineraries — product showcase */}
      <FeaturedItineraries itineraries={itineraries} />

      {/* 6. Testimonials — social proof */}
      <TestimonialsSection testimonials={testimonials} />

      {/* 7. Newsletter — inner circle conversion */}
      <NewsletterSection />
    </>
  );
}
