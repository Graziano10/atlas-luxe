import Link from 'next/link';
import { Logo } from './Logo';
import { Divider } from '@/components/ui/Divider';
import { footerNav, socialLinks } from '@/lib/navigation';
import { cn } from '@/utils/cn';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-obsidian-950 border-t border-obsidian-800" role="contentinfo">
      {/* Top ornament */}
      <div className="container mx-auto px-6">
        <Divider gold className="mb-0" />
      </div>

      {/* Main footer content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Logo />
            <p className="text-sm text-obsidian-400 leading-relaxed max-w-xs">
              Crafting journeys of extraordinary intimacy for discerning travellers since 2004.
              Every detail considered. Every moment elevated.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.href}
                  aria-label={link.ariaLabel}
                  rel="noopener noreferrer"
                  target="_blank"
                  className={cn(
                    'text-2xs uppercase tracking-widest text-obsidian-500',
                    'hover:text-gold-400 transition-colors duration-300',
                  )}
                >
                  {link.platform}
                </a>
              ))}
            </div>

            {/* Certifications */}
            <div className="flex flex-wrap gap-3 mt-2">
              {['ATTA Member', 'ABTA Bonded', 'ATOL Protected'].map((cert) => (
                <span
                  key={cert}
                  className="text-2xs uppercase tracking-ultra px-3 py-1 border border-obsidian-700 text-obsidian-400"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          <FooterNavColumn title="Explore"  links={footerNav.explore} />
          <FooterNavColumn title="Company"  links={footerNav.company} />
          <FooterNavColumn title="Legal"    links={footerNav.legal} />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-obsidian-800">
        <div className="container mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-2xs text-obsidian-600 tracking-widest uppercase">
            &copy; {year} Luxe Travel Experience. All rights reserved.
          </p>
          <p className="text-2xs text-obsidian-600">
            Designed with intention. Built for the extraordinary.
          </p>
        </div>
      </div>
    </footer>
  );
}

interface FooterNavColumnProps {
  title: string;
  links: readonly { label: string; href: string }[];
}

function FooterNavColumn({ title, links }: FooterNavColumnProps) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-2xs uppercase tracking-ultra text-gold-500/70">{title}</h3>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={cn(
                'text-sm text-obsidian-400 hover:text-ivory-200',
                'transition-colors duration-300',
              )}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
