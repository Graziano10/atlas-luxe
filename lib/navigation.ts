import type { NavItem, SocialLink } from '@/types';

export const primaryNav: readonly NavItem[] = [
  {
    label: 'Destinations',
    href:  '/destinations',
    children: [
      { label: 'Maldives',         href: '/destinations/maldives-private-atoll' },
      { label: 'Amalfi Coast',     href: '/destinations/amalfi-private-villa' },
      { label: 'Kyoto',            href: '/destinations/kyoto-ryokan-retreat' },
      { label: 'Patagonia',        href: '/destinations/patagonia-wilderness' },
      { label: 'Sahara',           href: '/destinations/morocco-desert-camp' },
      { label: 'Bora Bora',        href: '/destinations/bora-bora-overwater' },
      { label: 'View All',         href: '/destinations' },
    ],
  },
  {
    label: 'Itineraries',
    href:  '/itineraries',
    children: [
      { label: 'Ultra-Luxury',        href: '/itineraries?tier=ultra-luxury' },
      { label: 'Private Collection',  href: '/itineraries?tier=private-collection' },
      { label: 'Honeymoons',          href: '/itineraries?tag=honeymoon' },
      { label: 'Cultural Journeys',   href: '/itineraries?tag=cultural' },
      { label: 'Adventure',           href: '/itineraries?tag=adventure' },
    ],
  },
  { label: 'Experiences', href: '/experiences' },
  { label: 'The Journal',  href: '/journal' },
  { label: 'About',        href: '/about' },
];

export const footerNav = {
  explore: [
    { label: 'Destinations', href: '/destinations' },
    { label: 'Itineraries',  href: '/itineraries' },
    { label: 'Experiences',  href: '/experiences' },
    { label: 'The Journal',  href: '/journal' },
  ],
  company: [
    { label: 'About Us',       href: '/about' },
    { label: 'Our Philosophy', href: '/about#philosophy' },
    { label: 'Team',           href: '/about#team' },
    { label: 'Press',          href: '/press' },
    { label: 'Careers',        href: '/careers' },
  ],
  legal: [
    { label: 'Privacy Policy',    href: '/legal/privacy' },
    { label: 'Terms of Service',  href: '/legal/terms' },
    { label: 'Cookie Policy',     href: '/legal/cookies' },
    { label: 'Booking Conditions',href: '/legal/booking-conditions' },
  ],
} as const;

export const socialLinks: readonly SocialLink[] = [
  { platform: 'Instagram', href: 'https://instagram.com', ariaLabel: 'Follow us on Instagram' },
  { platform: 'Pinterest',  href: 'https://pinterest.com', ariaLabel: 'Follow us on Pinterest' },
  { platform: 'LinkedIn',   href: 'https://linkedin.com', ariaLabel: 'Connect on LinkedIn' },
];
