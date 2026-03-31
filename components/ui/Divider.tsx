import { cn } from '@/utils/cn';

interface DividerProps {
  label?:     string;
  className?: string;
  gold?:      boolean;
}

export function Divider({ label, className, gold = false }: DividerProps) {
  if (label) {
    return (
      <div className={cn('flex items-center gap-4', className)}>
        <div className={cn('flex-1 h-px', gold ? 'bg-gold-500/40' : 'bg-obsidian-700')} />
        <span className="text-2xs uppercase tracking-ultra text-gold-500/70">{label}</span>
        <div className={cn('flex-1 h-px', gold ? 'bg-gold-500/40' : 'bg-obsidian-700')} />
      </div>
    );
  }

  return (
    <hr
      className={cn(
        'border-0 h-px',
        gold ? 'bg-gradient-to-r from-transparent via-gold-500/50 to-transparent' : 'bg-obsidian-700',
        className,
      )}
    />
  );
}
