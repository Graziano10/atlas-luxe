import { cn } from '@/utils/cn';

interface SectionHeaderProps {
  id?:        string;
  eyebrow?:   string;
  title:      string;
  subtitle?:  string;
  align?:     'left' | 'center' | 'right';
  light?:     boolean;
  className?: string;
}

export function SectionHeader({
  id,
  eyebrow,
  title,
  subtitle,
  align   = 'center',
  light   = false,
  className,
}: SectionHeaderProps) {
  const alignClass = {
    left:   'items-start text-left',
    center: 'items-center text-center',
    right:  'items-end text-right',
  }[align];

  return (
    <header className={cn('flex flex-col gap-4', alignClass, className)}>
      {eyebrow && (
        <p className="text-2xs uppercase tracking-ultra text-gold-500 font-medium">{eyebrow}</p>
      )}
      <h2
        id={id}
        className={cn(
          'font-display font-light leading-tight',
          'text-4xl md:text-5xl lg:text-6xl',
          light ? 'text-ivory-100' : 'text-ivory-50',
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'max-w-2xl text-base md:text-lg leading-relaxed',
            light ? 'text-ivory-300' : 'text-obsidian-300',
          )}
        >
          {subtitle}
        </p>
      )}
    </header>
  );
}
