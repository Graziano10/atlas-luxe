// ─── Destination ──────────────────────────────────────────────────────────────

export interface Destination {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly country: string;
  readonly continent: Continent;
  readonly tagline: string;
  readonly description: string;
  readonly heroImage: ImageAsset;
  readonly galleryImages: readonly ImageAsset[];
  readonly highlights: readonly string[];
  readonly bestSeason: readonly Season[];
  readonly rating: number;
  readonly reviewCount: number;
  readonly featured: boolean;
  readonly tags: readonly string[];
}

// ─── Itinerary ────────────────────────────────────────────────────────────────

export interface Itinerary {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly subtitle: string;
  readonly destination: Pick<Destination, 'id' | 'name' | 'country' | 'slug'>;
  readonly durationDays: number;
  readonly tier: LuxuryTier;
  readonly pricePerPerson: number;
  readonly currency: Currency;
  readonly heroImage: ImageAsset;
  readonly overview: string;
  readonly days: readonly ItineraryDay[];
  readonly inclusions: readonly string[];
  readonly exclusions: readonly string[];
  readonly accommodations: readonly Accommodation[];
  readonly maxGroupSize: number;
  readonly featured: boolean;
  readonly tags: readonly string[];
}

export interface ItineraryDay {
  readonly day: number;
  readonly title: string;
  readonly description: string;
  readonly activities: readonly Activity[];
  readonly meals: readonly Meal[];
  readonly accommodation: string;
}

export interface Activity {
  readonly id: string;
  readonly name: string;
  readonly duration: string;
  readonly description: string;
  readonly type: ActivityType;
}

// ─── Accommodation ────────────────────────────────────────────────────────────

export interface Accommodation {
  readonly id: string;
  readonly name: string;
  readonly type: AccommodationType;
  readonly starRating: number;
  readonly location: string;
  readonly image: ImageAsset;
  readonly amenities: readonly string[];
}

// ─── Testimonial ──────────────────────────────────────────────────────────────

export interface Testimonial {
  readonly id: string;
  readonly author: Person;
  readonly rating: number;
  readonly title: string;
  readonly content: string;
  readonly destination: string;
  readonly travelDate: string;
  readonly verified: boolean;
}

export interface Person {
  readonly name: string;
  readonly title?: string;
  readonly avatarUrl?: string;
  readonly location?: string;
}

// ─── Shared Primitives ────────────────────────────────────────────────────────

export interface ImageAsset {
  readonly src: string;
  readonly alt: string;
  readonly width?: number;
  readonly height?: number;
  readonly blurDataUrl?: string;
}

// ─── Enums / Union Types ──────────────────────────────────────────────────────

export type Continent =
  | 'Africa'
  | 'Antarctica'
  | 'Asia'
  | 'Europe'
  | 'North America'
  | 'Oceania'
  | 'South America';

export type Season = 'Spring' | 'Summer' | 'Autumn' | 'Winter' | 'Year-round';

export type LuxuryTier = 'Premium' | 'Ultra-Luxury' | 'Private-Collection';

export type Currency = 'USD' | 'EUR' | 'GBP' | 'CHF';

export type ActivityType =
  | 'Cultural'
  | 'Adventure'
  | 'Culinary'
  | 'Wellness'
  | 'Wildlife'
  | 'Water'
  | 'Transfer';

export type AccommodationType =
  | 'Hotel'
  | 'Resort'
  | 'Villa'
  | 'Safari Lodge'
  | 'Yacht'
  | 'Ryokan'
  | 'Château';

export type Meal = 'Breakfast' | 'Lunch' | 'Dinner' | 'Welcome Dinner' | 'Farewell Dinner';

// ─── UI State ─────────────────────────────────────────────────────────────────

export interface NavItem {
  readonly label: string;
  readonly href: string;
  readonly children?: readonly NavItem[];
}

export interface SocialLink {
  readonly platform: string;
  readonly href: string;
  readonly ariaLabel: string;
}

// ─── API Response Types ───────────────────────────────────────────────────────

export interface PaginatedResponse<T> {
  readonly data: readonly T[];
  readonly total: number;
  readonly page: number;
  readonly perPage: number;
  readonly totalPages: number;
}

export interface ApiError {
  readonly code: string;
  readonly message: string;
  readonly status: number;
}
