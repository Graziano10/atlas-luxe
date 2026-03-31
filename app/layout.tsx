import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display, Cormorant_Garamond } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

// ─── Fonts ────────────────────────────────────────────────────────────────────

const inter = Inter({
  subsets:  ['latin'],
  variable: '--font-inter',
  display:  'swap',
  preload:  true,
});

const playfair = Playfair_Display({
  subsets:  ['latin'],
  variable: '--font-playfair',
  display:  'swap',
  weight:   ['300', '400', '500', '600', '700'],
});

const cormorant = Cormorant_Garamond({
  subsets:  ['latin'],
  variable: '--font-cormorant',
  display:  'swap',
  weight:   ['300', '400', '500', '600'],
  style:    ['normal', 'italic'],
});

// ─── Metadata ─────────────────────────────────────────────────────────────────

const SITE_URL  = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://luxetravelexperience.com';
const SITE_NAME = 'Luxe Travel Experience';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:  `${SITE_NAME} — Bespoke Luxury Travel`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'Handcrafted luxury travel itineraries for the world\'s most discerning travellers. Private villas, exclusive access, and journeys that transform — since 2004.',
  keywords: [
    'luxury travel',
    'bespoke itineraries',
    'private travel',
    'ultra-luxury',
    'exclusive experiences',
    'Maldives',
    'Amalfi Coast',
    'Kyoto',
  ],
  authors: [{ name: SITE_NAME }],
  creator:  SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: { telephone: false },
  openGraph: {
    type:        'website',
    locale:      'en_GB',
    url:         SITE_URL,
    siteName:    SITE_NAME,
    title:       `${SITE_NAME} — Bespoke Luxury Travel`,
    description: 'Handcrafted luxury travel itineraries for the world\'s most discerning travellers.',
    images: [
      {
        url:    '/og-image.jpg',
        width:  1200,
        height: 630,
        alt:    `${SITE_NAME} — Luxury Travel`,
      },
    ],
  },
  twitter: {
    card:        'summary_large_image',
    title:       `${SITE_NAME} — Bespoke Luxury Travel`,
    description: 'Handcrafted luxury travel itineraries for the world\'s most discerning travellers.',
    images:      ['/og-image.jpg'],
  },
  robots: {
    index:                  true,
    follow:                 true,
    googleBot: {
      index:                true,
      follow:               true,
      'max-video-preview':  -1,
      'max-image-preview':  'large',
      'max-snippet':        -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export const viewport: Viewport = {
  themeColor:   '#0a0a0f',
  colorScheme:  'dark',
  width:        'device-width',
  initialScale: 1,
};

// ─── Layout ───────────────────────────────────────────────────────────────────

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${cormorant.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-obsidian-950 text-ivory-100 min-h-dvh flex flex-col antialiased">
        {/* Skip to main content (accessibility) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-gold-500 focus:text-obsidian-950 focus:text-sm focus:uppercase focus:tracking-widest"
        >
          Skip to main content
        </a>

        <Header />

        <main id="main-content" className="flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
