import { cn } from '@/utils/cn';

type BadgeVariant = 'gold' | 'obsidian' | 'outline' | 'tier';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  gold:     'bg-gold-500/20 text-gold-400 border border-gold-500/30',
  obsidian: 'bg-obsidian-800 text-ivory-200 border border-obsidian-700',
  outline:  'bg-transparent text-ivory-300 border border-ivory-300/30',
  tier:     'bg-gradient-gold text-obsidian-950 font-semibold',
};

export function Badge({ children, variant = 'gold', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 text-2xs uppercase tracking-ultra',
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
