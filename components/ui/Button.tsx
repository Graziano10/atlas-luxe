import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'gold';
type Size    = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:   Variant;
  size?:      Size;
  isLoading?: boolean;
  leftIcon?:  React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-gold-500 text-obsidian-950 hover:bg-gold-400 active:bg-gold-600 shadow-gold ' +
    'font-semibold tracking-widest',
  secondary:
    'bg-obsidian-800 text-ivory-100 hover:bg-obsidian-700 active:bg-obsidian-900 ' +
    'border border-obsidian-600',
  ghost:
    'bg-transparent text-ivory-200 hover:text-gold-400 hover:bg-white/5',
  outline:
    'bg-transparent border border-gold-500 text-gold-400 hover:bg-gold-500/10 ' +
    'active:bg-gold-500/20',
  gold:
    'bg-gradient-gold text-obsidian-950 font-bold tracking-widest shadow-gold ' +
    'animate-pulse-gold',
};

const sizeClasses: Record<Size, string> = {
  sm:  'px-4 py-2 text-xs',
  md:  'px-6 py-3 text-sm',
  lg:  'px-8 py-4 text-base',
  xl:  'px-10 py-5 text-lg',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        className={cn(
          // Base
          'relative inline-flex items-center justify-center gap-2',
          'uppercase tracking-widest transition-all duration-300 ease-luxury',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian-950',
          'disabled:opacity-40 disabled:cursor-not-allowed',
          // Variants & sizes
          variantClasses[variant],
          sizeClasses[size],
          fullWidth && 'w-full',
          className,
        )}
        {...props}
      >
        {isLoading ? (
          <span className="absolute inset-0 flex items-center justify-center">
            <svg
              className="h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          </span>
        ) : null}
        <span className={cn('flex items-center gap-2', isLoading && 'invisible')}>
          {leftIcon}
          {children}
          {rightIcon}
        </span>
      </button>
    );
  },
);

Button.displayName = 'Button';
