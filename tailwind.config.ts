import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50:  '#fefdf7',
          100: '#fdf9e7',
          200: '#faf0c2',
          300: '#f5e08a',
          400: '#edc84b',
          500: '#d4a827',
          600: '#b8891a',
          700: '#936b15',
          800: '#785516',
          900: '#644617',
        },
        obsidian: {
          50:  '#f6f6f7',
          100: '#e1e2e6',
          200: '#c3c5cc',
          300: '#9b9ea9',
          400: '#747884',
          500: '#5a5d6b',
          600: '#484b57',
          700: '#3c3e49',
          800: '#34363f',
          900: '#0a0a0f',
          950: '#050507',
        },
        ivory: {
          50:  '#fdfdf8',
          100: '#f8f7ed',
          200: '#f0eed8',
          300: '#e4e0b8',
          400: '#d3cc8e',
          500: '#bfb56a',
          600: '#a89a52',
          700: '#8c7f43',
          800: '#73683a',
          900: '#605633',
        },
      },
      fontFamily: {
        serif:    ['var(--font-playfair)', 'Georgia', 'serif'],
        sans:     ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display:  ['var(--font-cormorant)', 'Georgia', 'serif'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
        '8xl': ['6rem',     { lineHeight: '1' }],
        '9xl': ['8rem',     { lineHeight: '1' }],
        '10xl':['10rem',    { lineHeight: '1' }],
      },
      letterSpacing: {
        widest:    '0.25em',
        ultra:     '0.35em',
      },
      backgroundImage: {
        'gradient-radial':   'radial-gradient(var(--tw-gradient-stops))',
        'gradient-luxury':   'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0a0a0f 100%)',
        'gradient-gold':     'linear-gradient(135deg, #d4a827 0%, #f5e08a 50%, #d4a827 100%)',
        'noise':             "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      animation: {
        'fade-in':     'fadeIn 0.8s ease-out forwards',
        'slide-up':    'slideUp 0.8s ease-out forwards',
        'slide-right': 'slideRight 0.8s ease-out forwards',
        'float':       'float 6s ease-in-out infinite',
        'shimmer':     'shimmer 2.5s linear infinite',
        'pulse-gold':  'pulseGold 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideRight: {
          '0%':   { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(212, 168, 39, 0.4)' },
          '50%':      { boxShadow: '0 0 0 12px rgba(212, 168, 39, 0)' },
        },
      },
      boxShadow: {
        'luxury':    '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
        'gold':      '0 0 40px rgba(212, 168, 39, 0.3)',
        'card':      '0 4px 24px rgba(0, 0, 0, 0.4)',
        'card-hover':'0 16px 48px rgba(0, 0, 0, 0.6)',
      },
      transitionTimingFunction: {
        luxury: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
    },
  },
  plugins: [],
};

export default config;
