import type { Currency } from '@/types';

/**
 * Format a price with currency symbol.
 */
export function formatPrice(
  amount: number,
  currency: Currency = 'USD',
  locale = 'en-US',
): string {
  return new Intl.NumberFormat(locale, {
    style:                 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format a star rating into a display string.
 */
export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

/**
 * Format a duration in days.
 */
export function formatDuration(days: number): string {
  const nights = days - 1;
  return `${nights} night${nights !== 1 ? 's' : ''} / ${days} day${days !== 1 ? 's' : ''}`;
}

/**
 * Truncate text to a maximum character count.
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}…`;
}

/**
 * Generate initials from a full name.
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? '')
    .join('');
}
