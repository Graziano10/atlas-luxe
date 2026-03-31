import type { Destination } from '@/types';

// ─── Static Data ──────────────────────────────────────────────────────────────
// In production, replace with CMS / API calls (e.g., Sanity, Contentful).

const destinations: readonly Destination[] = [
  {
    id:          'maldives-private-atoll',
    slug:        'maldives-private-atoll',
    name:        'Maldives Private Atoll',
    country:     'Maldives',
    continent:   'Asia',
    tagline:     'Infinite turquoise, absolute seclusion',
    description:
      'Drift between overwater villas on a private atoll where the Indian Ocean performs at its most theatrical. Bioluminescent waters light the night; house reefs teem with manta rays by day.',
    heroImage: {
      src:    'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1800&q=80',
      alt:    'Overwater villas at sunset in the Maldives',
      width:  1800,
      height: 1200,
    },
    galleryImages: [
      {
        src:   'https://images.unsplash.com/photo-1586500036706-41963de24d8b?w=900&q=80',
        alt:   'Crystal clear lagoon',
        width: 900,
        height: 600,
      },
      {
        src:   'https://images.unsplash.com/photo-1540202404-a2f29016b523?w=900&q=80',
        alt:   'Underwater restaurant',
        width: 900,
        height: 600,
      },
    ],
    highlights:   ['Private reef snorkelling', 'Sunset dolphin cruise', 'Underwater spa'],
    bestSeason:   ['Winter', 'Spring'],
    rating:       4.98,
    reviewCount:  312,
    featured:     true,
    tags:         ['Beach', 'Overwater', 'Honeymoon', 'Diving'],
  },
  {
    id:          'amalfi-private-villa',
    slug:        'amalfi-private-villa',
    name:        'Amalfi Private Estate',
    country:     'Italy',
    continent:   'Europe',
    tagline:     'La dolce vita, elevated to an art form',
    description:
      'A clifftop estate perched above the sapphire Tyrrhenian, where lemon groves perfume marble terraces and a private chef crafts dinners that rival Michelin stars.',
    heroImage: {
      src:    'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?w=1800&q=80',
      alt:    'Amalfi coastline at golden hour',
      width:  1800,
      height: 1200,
    },
    galleryImages: [
      {
        src:   'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=900&q=80',
        alt:   'Coastal terrace with sea view',
        width: 900,
        height: 600,
      },
    ],
    highlights:   ['Private yacht day', 'Truffle hunting', 'Michelin chef dinner'],
    bestSeason:   ['Spring', 'Summer', 'Autumn'],
    rating:       4.95,
    reviewCount:  178,
    featured:     true,
    tags:         ['Coastal', 'Culinary', 'Culture', 'Villa'],
  },
  {
    id:          'kyoto-ryokan-retreat',
    slug:        'kyoto-ryokan-retreat',
    name:        'Kyoto Imperial Retreat',
    country:     'Japan',
    continent:   'Asia',
    tagline:     'Centuries of serenity, one breath at a time',
    description:
      'A 300-year-old machiya townhouse on a cobbled Gion lane, where kaiseki dinners are ceremonies and ikebana greets each dawn. Cherry blossoms crown private gardens.',
    heroImage: {
      src:    'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1800&q=80',
      alt:    'Kyoto temple with cherry blossoms',
      width:  1800,
      height: 1200,
    },
    galleryImages: [],
    highlights:   ['Private tea ceremony', 'Arashiyama bamboo dawn walk', 'Geisha cultural evening'],
    bestSeason:   ['Spring', 'Autumn'],
    rating:       4.97,
    reviewCount:  203,
    featured:     true,
    tags:         ['Cultural', 'Wellness', 'Historic', 'Culinary'],
  },
  {
    id:          'patagonia-wilderness',
    slug:        'patagonia-wilderness',
    name:        'Patagonian Wild',
    country:     'Argentina & Chile',
    continent:   'South America',
    tagline:     'Where the world still breathes wild',
    description:
      'A luxury eco-lodge flanked by the Southern Patagonian Ice Field, where condors trace thermals above glaciers older than civilisation and silence is the greatest luxury.',
    heroImage: {
      src:    'https://images.unsplash.com/photo-1531804897370-4a15e0b0d397?w=1800&q=80',
      alt:    'Torres del Paine granite towers in Patagonia',
      width:  1800,
      height: 1200,
    },
    galleryImages: [],
    highlights:   ['Private glacier trek', 'Condor watching at dawn', 'Stargazing with astronomer'],
    bestSeason:   ['Spring', 'Summer'],
    rating:       4.93,
    reviewCount:  145,
    featured:     false,
    tags:         ['Adventure', 'Wildlife', 'Eco', 'Hiking'],
  },
  {
    id:          'morocco-desert-camp',
    slug:        'morocco-desert-camp',
    name:        'Sahara Dune Camp',
    country:     'Morocco',
    continent:   'Africa',
    tagline:     'Stars so close, you reach for them',
    description:
      'A bijou luxury camp buried in the Erg Chebbi dunes: handwoven Berber rugs under infinite star canopy, single-malt sunsets and silent dawns broken only by the wind.',
    heroImage: {
      src:    'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=1800&q=80',
      alt:    'Luxury desert camp at sunset in the Sahara',
      width:  1800,
      height: 1200,
    },
    galleryImages: [],
    highlights:   ['Camel caravan at sunset', 'Private stargazing', 'Hammam ritual'],
    bestSeason:   ['Autumn', 'Winter', 'Spring'],
    rating:       4.91,
    reviewCount:  289,
    featured:     false,
    tags:         ['Desert', 'Cultural', 'Adventure', 'Stargazing'],
  },
  {
    id:          'bora-bora-overwater',
    slug:        'bora-bora-overwater',
    name:        'Bora Bora Pearl',
    country:     'French Polynesia',
    continent:   'Oceania',
    tagline:     'The last place on earth time forgot',
    description:
      'Overwater bungalows on a heart-shaped lagoon where coral gardens shimmer in every shade of blue. Your private pontoon vanishes into the Pacific horizon each morning.',
    heroImage: {
      src:    'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=1800&q=80',
      alt:    'Bora Bora overwater bungalows with Mount Otemanu',
      width:  1800,
      height: 1200,
    },
    galleryImages: [],
    highlights:   ['Lagoon paddleboard at dawn', 'Ray and shark snorkelling', 'Overwater spa'],
    bestSeason:   ['Winter', 'Spring'],
    rating:       4.96,
    reviewCount:  421,
    featured:     true,
    tags:         ['Beach', 'Overwater', 'Honeymoon', 'Snorkelling'],
  },
];

// ─── Access Functions ─────────────────────────────────────────────────────────

export function getAllDestinations(): readonly Destination[] {
  return destinations;
}

export function getFeaturedDestinations(): readonly Destination[] {
  return destinations.filter((d) => d.featured);
}

export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug);
}

export function getDestinationsByContinent(continent: string): readonly Destination[] {
  return destinations.filter((d) => d.continent === continent);
}

export function searchDestinations(query: string): readonly Destination[] {
  const q = query.toLowerCase().trim();
  if (!q) return destinations;
  return destinations.filter(
    (d) =>
      d.name.toLowerCase().includes(q) ||
      d.country.toLowerCase().includes(q) ||
      d.tagline.toLowerCase().includes(q) ||
      d.tags.some((t) => t.toLowerCase().includes(q)),
  );
}
