'use client';

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface UIState {
  // Navigation
  isMobileMenuOpen: boolean;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleMobileMenu: () => void;

  // Booking Enquiry Modal
  isEnquiryModalOpen: boolean;
  enquiryItineraryId: string | null;
  openEnquiryModal: (itineraryId?: string) => void;
  closeEnquiryModal: () => void;

  // Search
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;

  // Scroll position (for header transparency)
  scrollY: number;
  setScrollY: (y: number) => void;
  isHeaderTransparent: boolean;
}

export const useUIStore = create<UIState>()(
  devtools(
    (set) => ({
      // Navigation
      isMobileMenuOpen: false,
      openMobileMenu:  () => set({ isMobileMenuOpen: true },  false, 'openMobileMenu'),
      closeMobileMenu: () => set({ isMobileMenuOpen: false }, false, 'closeMobileMenu'),
      toggleMobileMenu: () =>
        set((s) => ({ isMobileMenuOpen: !s.isMobileMenuOpen }), false, 'toggleMobileMenu'),

      // Enquiry Modal
      isEnquiryModalOpen:  false,
      enquiryItineraryId:  null,
      openEnquiryModal:  (itineraryId = null) =>
        set({ isEnquiryModalOpen: true, enquiryItineraryId: itineraryId }, false, 'openEnquiryModal'),
      closeEnquiryModal: () =>
        set({ isEnquiryModalOpen: false, enquiryItineraryId: null }, false, 'closeEnquiryModal'),

      // Search
      isSearchOpen:  false,
      openSearch:  () => set({ isSearchOpen: true },  false, 'openSearch'),
      closeSearch: () => set({ isSearchOpen: false }, false, 'closeSearch'),

      // Scroll
      scrollY:             0,
      isHeaderTransparent: true,
      setScrollY: (y) =>
        set({ scrollY: y, isHeaderTransparent: y < 80 }, false, 'setScrollY'),
    }),
    { name: 'ui-store' },
  ),
);
