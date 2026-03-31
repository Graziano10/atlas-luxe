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
    subtitle:  "Italy's most glamorous coastline, privately",
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
    days: [
      {
        day:         1,
        title:       'Arrival at Villa Tramonto',
        description: 'Helicopter transfer from Naples to the clifftop estate. Private chef welcome dinner on the panoramic terrace with Champagne and Campania wines.',
        activities:  [
          { id: 'b1', name: 'Helicopter Transfer', duration: '20 min', description: 'Private helicopter from Naples International', type: 'Transfer' },
          { id: 'b2', name: 'Estate Orientation', duration: '1 hr', description: 'Personal introduction to your villa, chef and concierge', type: 'Cultural' },
        ],
        meals:         ['Welcome Dinner'],
        accommodation: 'Villa Tramonto, Ravello',
      },
      {
        day:         2,
        title:       'Private Yacht & Hidden Coves',
        description: 'Full-day aboard a 52-ft private yacht. Visit Positano by sea, anchor in secret coves, freshly caught lunch prepared on deck by your chef.',
        activities:  [
          { id: 'b3', name: 'Private Yacht Day', duration: 'Full day', description: 'Amalfi coastline by private 52ft sailing yacht', type: 'Water' },
          { id: 'b4', name: 'Positano Landing', duration: '2 hrs', description: 'Private guided walk through Positano\'s alleys', type: 'Cultural' },
        ],
        meals:         ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Villa Tramonto, Ravello',
      },
      {
        day:         3,
        title:       'Truffle Hunting in Cilento',
        description: 'Into the Cilento hills with a fifth-generation truffle hunter and his hounds. Return for a private lunch with your harvest, paired with aged Taurasi.',
        activities:  [
          { id: 'b5', name: 'Truffle Hunt', duration: '3 hrs', description: 'Foraging session with a local truffle master', type: 'Culinary' },
          { id: 'b6', name: 'Harvest Lunch', duration: '2 hrs', description: 'Five-course truffle menu crafted from your morning haul', type: 'Culinary' },
        ],
        meals:         ['Breakfast', 'Lunch'],
        accommodation: 'Villa Tramonto, Ravello',
      },
    ],
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
    days: [
      {
        day:         1,
        title:       'Gion Arrival & Evening Lanterns',
        description: 'Private transfer from Kyoto Station to your machiya. Evening stroll through Gion Hanamikoji — your guide unlocks insight most tourists never receive.',
        activities:  [
          { id: 'c1', name: 'Machiya Welcome Tea', duration: '45 min', description: 'Informal tea ceremony in your private garden', type: 'Wellness' },
          { id: 'c2', name: 'Gion Evening Walk', duration: '2 hrs', description: 'Private guided walk through the lantern-lit geisha district', type: 'Cultural' },
        ],
        meals:         ['Welcome Dinner'],
        accommodation: 'Gion Machiya Estate',
      },
      {
        day:         2,
        title:       'Dawn Temple Access',
        description: 'Locked gates open at 5:30 AM for your group alone at Fushimi Inari. Walk the full path in silence before the world arrives. Private tea at a 400-year-old teahouse after.',
        activities:  [
          { id: 'c3', name: 'Fushimi Inari Dawn', duration: '2.5 hrs', description: 'Exclusive pre-opening access to the full torii path', type: 'Cultural' },
          { id: 'c4', name: 'Historic Teahouse', duration: '1 hr', description: 'Private tea at a teahouse dating to the Edo period', type: 'Culinary' },
        ],
        meals:         ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Gion Machiya Estate',
      },
      {
        day:         3,
        title:       'Tea Ceremony & Nishiki Market',
        description: 'A full morning with a certified tea master in a private garden tearoom. Afternoon private tour of Nishiki Market with a Kyoto culinary historian.',
        activities:  [
          { id: 'c5', name: 'Tea Ceremony Master Class', duration: '3 hrs', description: 'Ura-Senke school private session with grand tea master', type: 'Cultural' },
          { id: 'c6', name: 'Nishiki Market Tour', duration: '2 hrs', description: 'Exclusive tasting tour with a food historian', type: 'Culinary' },
        ],
        meals:         ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Gion Machiya Estate',
      },
    ],
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
