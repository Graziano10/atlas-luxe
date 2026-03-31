import type { Testimonial } from '@/types';

const testimonials: readonly Testimonial[] = [
  {
    id:      't-001',
    author: {
      name:     'Charlotte Wyndham',
      title:    'Creative Director',
      location: 'London, UK',
    },
    rating:      5,
    title:       'A journey that redefined luxury',
    content:
      'The Maldives itinerary exceeded every expectation. The seaplane landing at sunset was cinematic. The marine biologist who guided our dives was extraordinary — we saw a whale shark on day three. Every detail was curated with such discretion that it felt effortless.',
    destination: 'Maldives Private Atoll',
    travelDate:  'February 2025',
    verified:    true,
  },
  {
    id:      't-002',
    author: {
      name:     'Eduardo Reyes-Santos',
      title:    'Architect',
      location: 'Madrid, Spain',
    },
    rating:      5,
    title:       'Amalfi at its most intimate',
    content:
      'Villa Tramonto is simply the finest private property I have experienced anywhere in the world. Waking to that 270-degree view, lemon blossoms on the breeze, and a private chef who sources the tuna that morning from the Positano market — this is how travel should be.',
    destination: 'Amalfi Private Estate',
    travelDate:  'June 2025',
    verified:    true,
  },
  {
    id:      't-003',
    author: {
      name:     'Yuki Nakashima',
      title:    'Philanthropist',
      location: 'Singapore',
    },
    rating:      5,
    title:       'Japan as I always imagined it but never found',
    content:
      'The dawn walk in the locked garden of Fushimi Inari — just us, our guide and two thousand gates — was one of the most profound experiences of my life. The kaiseki ritual each evening was not merely dinner; it was theatre, philosophy and art as one.',
    destination: 'Kyoto Imperial Retreat',
    travelDate:  'April 2025',
    verified:    true,
  },
  {
    id:      't-004',
    author: {
      name:     'Isabelle Fontaine',
      title:    'Investment Partner',
      location: 'Geneva, Switzerland',
    },
    rating:      5,
    title:       'The desert utterly transformed me',
    content:
      "I had done the Sahara before — or so I thought. Nothing prepared me for Erg Chebbi at 3am with an astronomer naming constellations I'd never heard and silence so total it became a sound. The camp itself is discreet luxury at its most intelligent.",
    destination: 'Sahara Dune Camp',
    travelDate:  'November 2024',
    verified:    true,
  },
  {
    id:      't-005',
    author: {
      name:     'James Thornton-Ellis',
      title:    'CEO',
      location: 'New York, USA',
    },
    rating:      5,
    title:       'Worth every penny — and then some',
    content:
      "The Patagonian itinerary was the gift my wife and I gave ourselves for our 25th anniversary. The glacier trek at dawn, the condors, the silence at the end of the world — we still talk about it daily. The lodge team anticipated every wish before we voiced it.",
    destination: 'Patagonian Wild',
    travelDate:  'January 2025',
    verified:    true,
  },
];

// ─── Access Functions ─────────────────────────────────────────────────────────

export function getAllTestimonials(): readonly Testimonial[] {
  return testimonials;
}

export function getFeaturedTestimonials(count = 3): readonly Testimonial[] {
  return testimonials.slice(0, count);
}
