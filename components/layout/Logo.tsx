import Link from 'next/link';
import { cn } from '@/utils/cn';

interface LogoProps {
  className?: string;
  compact?:   boolean;
}

export function Logo({ className, compact = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn('group flex flex-col gap-0.5 focus-visible:outline-none', className)}
      aria-label="Luxe Travel Experience — Home"
    >
      {/* Wordmark */}
      <span
        className={cn(
          'font-display font-light tracking-[0.2em] uppercase',
          'bg-gradient-gold bg-clip-text text-transparent',
          'transition-opacity duration-300 group-hover:opacity-80',
          compact ? 'text-lg' : 'text-2xl',
        )}
      >
        Luxe
      </span>

      {/* Sub-brand */}
      {!compact && (
        <span className="text-2xs tracking-ultra uppercase text-ivory-400 font-sans">
          Travel Experience
        </span>
      )}
    </Link>
  );
}
