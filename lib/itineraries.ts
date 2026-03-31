import type { Itinerary } from '@/types';

const itineraries: readonly Itinerary[] = [
  {
    id:        'maldives-7-ultra',
    slug:      'maldives-private-atoll-7-nights',
    title:     'Seven Nights on a Private Atoll',
    subtitle:  'The Maldives distilled to perfection',
    destination: {
      id:      'maldives-private-atoll',
      name:    'Maldives Private Atoll',
      country: 'Maldives',
      slug:    'maldives-private-atoll',
    },
    durationDays:   8,
    tier:           'Ultra-Luxury',
    pricePerPerson: 18500,
    currency:       'USD',
    heroImage: {
      src:    'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1800&q=80',
      alt:    'Overwater villa at sunset in the Maldives',
      width:  1800,
      height: 1200,
    },
    overview:
      'Seven transcendent nights across an overwater villa where the Indian Ocean is your backyard. Daily diving excursions, a private chef, sunset dolphin cruises and an underwater spa await.',
    days: [
      {
        day:         1,
        title:       'Arrival & First Light',
        description: 'Seaplane transfer directly to your villa. Welcome ritual, Champagne on the deck, sunset fishing with the captain.',
        activities:  [
          { id: 'a1', name: 'Seaplane Transfer', duration: '25 min', description: 'Scenic seaplane over the atoll', type: 'Transfer' },
          { id: 'a2', name: 'Welcome Ritual', duration: '45 min', description: 'Coconut oil massage and welcome ceremony', type: 'Wellness' },
        ],
        meals:         ['Welcome Dinner'],
        accommodation: 'Grand Water Villa with Pool',
      },
      {
        day:         2,
        title:       'Into the Blue',
        description: 'Dawn yoga on the deck, guided house reef dive, afternoon dolphin watching, private dinner under the stars.',
        activities:  [
          { id: 'a3', name: 'House Reef Dive', duration: '2 hrs', description: 'Guided dive with resident marine biologist', type: 'Water' },
          { id: 'a4', name: 'Dolphin Cruise', duration: '2 hrs', description: 'Sunset cruise into spinner dolphin territory', type: 'Wildlife' },
        ],
        meals:         ['Breakfast', 'Dinner'],
        accommodation: 'Grand Water Villa with Pool',
      },
    ],
    inclusions: [
      'Return seaplane transfers',
      'All meals and premium beverages',
      'Daily guided dives (tanks & equipment)',
      'Sunset dolphin cruise',
      'Underwater spa treatment',
      '24-hour butler service',
    ],
    exclusions: [
      'International flights',
      'Travel insurance',
      'Personal expenditure',
    ],
    accommodations: [
      {
        id:         'grand-water-villa',
        name:       'Grand Water Villa with Pool',
        type:       'Resort',
        starRating: 5,
        location:   'Over the lagoon, private jetty',
        image: {
          src:   'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80',
          alt:   'Grand water villa interior',
          width: 800,
          height: 533,
        },
        amenities: ['Private infinity pool', 'Glass floor panels', 'Butler service', 'Direct lagoon access'],
      },
    ],
    maxGroupSize: 4,
    featured:     true,
    tags:         ['Beach', 'Overwater', 'Diving', 'Honeymoon'],
  },
  {
    id:        'amalfi-5-private',
    slug:      'amalfi-private-estate-5-nights',
    title:     'Five Nights on the Amalfi Coast',
    subtitle:  'Italy's most glamorous coastline, privately',
    destination: {
      id:      'amalfi-private-villa',
      name:    'Amalfi Private Estate',
      country: 'Italy',
      slug:    'amalfi-private-villa',
    },
    durationDays:   6,
    tier:           'Private-Collection',
    pricePerPerson: 24000,
    currency:       'EUR',
    heroImage: {
      src:    'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?w=1800&q=80',
      alt:    'Amalfi coastline golden hour',
      width:  1800,
      height: 1200,
    },
    overview:
      'A six-day immersion into the Amalfi Coast from a private clifftop estate. Private yacht, Michelin-starred dinners, truffle hunting in Cilento and exclusive museum access after hours.',
    days: [],
    inclusions: [
      'Private estate (6 nights)',
      'All meals with private chef',
      'Full-day private yacht',
      'Truffle hunting excursion',
      'Private museum after-hours access',
      'Concierge & driver',
    ],
    exclusions: ['International flights', 'Travel insurance', 'Gratuities'],
    accommodations: [
      {
        id:         'amalfi-clifftop-villa',
        name:       'Villa Tramonto',
        type:       'Villa',
        starRating: 5,
        location:   'Ravello clifftop, 270° sea view',
        image: {
          src:   'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
          alt:   'Villa Tramonto exterior',
          width: 800,
          height: 533,
        },
        amenities: ['Infinity pool', 'Private beach access', 'Lemon grove', 'Chef kitchen'],
      },
    ],
    maxGroupSize: 8,
    featured:     true,
    tags:         ['Coastal', 'Culinary', 'Culture', 'Villa'],
  },
  {
    id:        'kyoto-6-imperial',
    slug:      'kyoto-imperial-retreat-6-nights',
    title:     'Six Nights in Imperial Kyoto',
    subtitle:  'Ancient Japan through the eyes of privilege',
    destination: {
      id:      'kyoto-ryokan-retreat',
      name:    'Kyoto Imperial Retreat',
      country: 'Japan',
      slug:    'kyoto-ryokan-retreat',
    },
    durationDays:   7,
    tier:           'Ultra-Luxury',
    pricePerPerson: 16800,
    currency:       'USD',
    heroImage: {
      src:    'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1800&q=80',
      alt:    'Kyoto temple gardens in autumn',
      width:  1800,
      height: 1200,
    },
    overview:
      'A week of cultural immersion in a private machiya townhouse: private tea ceremonies, dawn walks in locked temple gardens, nightly kaiseki rituals and a geisha cultural evening.',
    days: [],
    inclusions: [
      'Machiya estate (6 nights)',
      'All kaiseki meals',
      'Private tea ceremony master',
      'Locked temple dawn access',
      'Geisha cultural evening',
      'Expert cultural guide',
      'JR Green Car travel pass',
    ],
    exclusions: ['International flights', 'Travel insurance', 'Sake pairings at extra cost'],
    accommodations: [
      {
        id:         'kyoto-machiya',
        name:       'Gion Machiya Estate',
        type:       'Ryokan',
        starRating: 5,
        location:   'Gion, Kyoto',
        image: {
          src:   'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80',
          alt:   'Traditional machiya interior',
          width: 800,
          height: 533,
        },
        amenities: ['Hinoki wood onsen', 'Private garden', 'Tatami rooms', 'Kimono dressing'],
      },
    ],
    maxGroupSize: 6,
    featured:     true,
    tags:         ['Cultural', 'Wellness', 'Historic', 'Culinary'],
  },
];

// ─── Access Functions ─────────────────────────────────────────────────────────

export function getAllItineraries(): readonly Itinerary[] {
  return itineraries;
}

export function getFeaturedItineraries(): readonly Itinerary[] {
  return itineraries.filter((i) => i.featured);
}

export function getItineraryBySlug(slug: string): Itinerary | undefined {
  return itineraries.find((i) => i.slug === slug);
}

export function getItinerariesByDestination(destinationId: string): readonly Itinerary[] {
  return itineraries.filter((i) => i.destination.id === destinationId);
}
