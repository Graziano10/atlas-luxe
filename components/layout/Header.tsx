'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search } from 'lucide-react';
import { Logo } from './Logo';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';
import { useUIStore } from '@/store/ui.store';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { useKeyPress } from '@/hooks/useKeyPress';
import { primaryNav } from '@/lib/navigation';

export function Header() {
  useScrollPosition();

  const {
    isHeaderTransparent,
    isMobileMenuOpen,
    toggleMobileMenu,
    closeMobileMenu,
    openEnquiryModal,
    openSearch,
  } = useUIStore();

  // Close mobile menu on Escape
  useKeyPress('Escape', closeMobileMenu);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          'transition-all duration-500 ease-luxury',
          isHeaderTransparent
            ? 'bg-transparent py-6'
            : 'bg-obsidian-950/95 backdrop-blur-md border-b border-obsidian-800 py-4',
        )}
        role="banner"
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Logo />

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Primary navigation">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-xs uppercase tracking-widest font-sans',
                  'text-ivory-300 hover:text-gold-400',
                  'transition-colors duration-300',
                  'focus-visible:outline-none focus-visible:text-gold-400',
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={openSearch}
              className="text-ivory-400 hover:text-gold-400 transition-colors duration-300 p-2"
              aria-label="Open search"
            >
              <Search size={18} />
            </button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => openEnquiryModal()}
            >
              Enquire
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={cn(
              'lg:hidden p-2 text-ivory-300 hover:text-gold-400 transition-colors',
              'focus-visible:outline-none focus-visible:text-gold-400',
            )}
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-40 bg-obsidian-950 flex flex-col pt-24 px-8 pb-12 overflow-y-auto"
          >
            <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
              {primaryNav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={closeMobileMenu}
                    className={cn(
                      'block py-4 border-b border-obsidian-800',
                      'font-display text-3xl font-light text-ivory-100',
                      'hover:text-gold-400 transition-colors duration-300',
                    )}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto pt-8">
              <Button
                variant="gold"
                size="lg"
                fullWidth
                onClick={() => {
                  closeMobileMenu();
                  openEnquiryModal();
                }}
              >
                Plan My Journey
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
