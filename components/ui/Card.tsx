import { cn } from '@/utils/cn';

interface CardProps {
  children:    React.ReactNode;
  className?:  string;
  hover?:      boolean;
  glass?:      boolean;
  padding?:    boolean;
  as?:         React.ElementType;
}

export function Card({
  children,
  className,
  hover   = true,
  glass   = false,
  padding = true,
  as: Tag = 'div',
}: CardProps) {
  return (
    <Tag
      className={cn(
        'relative overflow-hidden',
        glass
          ? 'bg-white/5 backdrop-blur-md border border-white/10'
          : 'bg-obsidian-900 border border-obsidian-800',
        hover && [
          'transition-all duration-500 ease-luxury cursor-pointer',
          'shadow-card hover:shadow-card-hover hover:-translate-y-1',
          'hover:border-gold-500/30',
        ],
        padding && 'p-6',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
