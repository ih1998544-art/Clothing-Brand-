'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { Search, Heart, ShoppingBag, Menu, X, MapPin } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    cartCount,
    setCartDrawerOpen,
    wishlist,
    setSelectedCategory,
    setStoreLocatorOpen,
    searchQuery,
    setSearchQuery,
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleNavClick = (category: string) => {
    setSelectedCategory(category);
    setMobileMenuOpen(false);
    const element = document.getElementById('catalog-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-[#E8E3D9] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              aria-label="Toggle navigation menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#242424] hover:text-[#000000] focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <button
              type="button"
              aria-label="Open search input"
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-[#242424] hover:text-[#000000] focus:outline-none"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* Zone 1: Single Text Element Brand Wordmark */}
          <div className="flex-1 lg:flex-initial text-center lg:text-left">
            <Link
              href="/"
              className="inline-block font-serif text-2xl sm:text-3xl tracking-[0.25em] text-[#1A1A1A] hover:text-[#645037] transition-colors font-medium uppercase"
            >
              ZARIYA
            </Link>
          </div>

          {/* Zone 2: 4-6 Clean Text Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-[13px] tracking-[0.15em] uppercase font-medium text-[#403B35]">
            <button
              onClick={() => handleNavClick('all')}
              className="hover:text-[#1A1A1A] transition-colors relative py-1 hover:border-b border-[#1A1A1A] cursor-pointer"
            >
              New Arrivals
            </button>
            <button
              onClick={() => handleNavClick('women-pret')}
              className="hover:text-[#1A1A1A] transition-colors relative py-1 hover:border-b border-[#1A1A1A] cursor-pointer"
            >
              Women Pret
            </button>
            <button
              onClick={() => handleNavClick('unstitched')}
              className="hover:text-[#1A1A1A] transition-colors relative py-1 hover:border-b border-[#1A1A1A] cursor-pointer"
            >
              Unstitched
            </button>
            <button
              onClick={() => handleNavClick('men')}
              className="hover:text-[#1A1A1A] transition-colors relative py-1 hover:border-b border-[#1A1A1A] cursor-pointer"
            >
              Men Traditional
            </button>
            <button
              onClick={() => handleNavClick('fragrances')}
              className="hover:text-[#1A1A1A] transition-colors relative py-1 hover:border-b border-[#1A1A1A] cursor-pointer"
            >
              Fragrances
            </button>
            <button
              onClick={() => handleNavClick('shawls')}
              className="hover:text-[#8D2B2B] text-[#8D2B2B] transition-colors relative py-1 hover:border-b border-[#8D2B2B] cursor-pointer"
            >
              Festive Sale
            </button>
          </nav>

          {/* Zone 3: Primary Actions (Search, Stores, Wishlist, Shopping Bag) */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Desktop Search Toggle / Bar */}
            <div className="hidden md:flex items-center relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search lawn, kurta, oud..."
                className="w-44 lg:w-56 text-xs bg-[#F2EFE9] border border-[#DDD7CD] rounded-full py-1.5 pl-8 pr-3 text-[#242424] placeholder-[#888] focus:outline-none focus:border-[#242424] transition-all"
              />
              <Search className="w-3.5 h-3.5 text-[#736E67] absolute left-3 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-[#736E67] hover:text-black absolute right-2.5"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Store Locator button */}
            <button
              type="button"
              onClick={() => setStoreLocatorOpen(true)}
              className="hidden sm:flex items-center gap-1 text-xs text-[#524C44] hover:text-[#1A1A1A] transition-colors px-2 py-1"
              title="Store Boutiques"
            >
              <MapPin className="w-4 h-4" />
              <span className="hidden xl:inline">Boutiques</span>
            </button>

            {/* Wishlist Button */}
            <button
              type="button"
              aria-label="Wishlist"
              onClick={() => {
                const el = document.getElementById('catalog-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="p-2 text-[#3D3832] hover:text-[#1A1A1A] transition-colors relative"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#A84B4B]" />
              )}
            </button>

            {/* Shopping Bag Drawer Button */}
            <button
              type="button"
              aria-label="Shopping Bag"
              onClick={() => setCartDrawerOpen(true)}
              className="flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#2F2B26] text-white px-3 sm:px-4 py-2 rounded-sm text-xs font-medium tracking-wider transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">BAG</span>
              <span className="bg-[#C5A880] text-[#1A1A1A] text-[11px] font-bold px-1.5 py-0.2 rounded-full tabular-nums">
                {cartCount}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Search Expandable Field */}
        {searchOpen && (
          <div className="md:hidden px-4 py-2 bg-[#F2EFE9] border-t border-[#E8E3D9]">
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search collection (e.g. Lawn, Latha, Oud)..."
                className="w-full text-xs bg-white border border-[#DDD7CD] rounded py-2 pl-8 pr-4 text-[#242424]"
                autoFocus
              />
              <Search className="w-4 h-4 text-[#736E67] absolute left-2.5" />
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 lg:hidden flex">
          <div className="w-4/5 max-w-sm bg-[#FAF9F5] h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#E5E0D8]">
                <span className="font-serif text-2xl tracking-[0.2em] font-medium text-[#1A1A1A]">
                  ZARIYA
                </span>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-[#242424]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-6 flex flex-col gap-4 text-sm font-medium tracking-wider uppercase text-[#3A352F]">
                <button
                  onClick={() => handleNavClick('all')}
                  className="text-left py-2 border-b border-[#EFECE6] hover:text-[#1A1A1A]"
                >
                  New Arrivals
                </button>
                <button
                  onClick={() => handleNavClick('women-pret')}
                  className="text-left py-2 border-b border-[#EFECE6] hover:text-[#1A1A1A]"
                >
                  Women Pret (Ready-to-Wear)
                </button>
                <button
                  onClick={() => handleNavClick('unstitched')}
                  className="text-left py-2 border-b border-[#EFECE6] hover:text-[#1A1A1A]"
                >
                  Unstitched Luxury Lawn
                </button>
                <button
                  onClick={() => handleNavClick('men')}
                  className="text-left py-2 border-b border-[#EFECE6] hover:text-[#1A1A1A]"
                >
                  Men Traditional & Waistcoats
                </button>
                <button
                  onClick={() => handleNavClick('fragrances')}
                  className="text-left py-2 border-b border-[#EFECE6] hover:text-[#1A1A1A]"
                >
                  Artisanal Fragrances & Oud
                </button>
                <button
                  onClick={() => handleNavClick('shawls')}
                  className="text-left py-2 border-b border-[#EFECE6] text-[#8D2B2B]"
                >
                  Festive Sale (Up to 30% Off)
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E5E0D8] text-xs text-[#6B655D] space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setStoreLocatorOpen(true);
                }}
                className="flex items-center gap-2 text-[#1A1A1A] font-medium"
              >
                <MapPin className="w-4 h-4 text-[#C5A880]" />
                <span>Locate Flagship Stores</span>
              </button>
              <p>Karachi · Lahore · Islamabad · Dubai</p>
              <p className="text-[11px] text-[#999]">WhatsApp Assistance: +92 300 0092749</p>
            </div>
          </div>
          <div
            className="flex-1"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
        </div>
      )}
    </>
  );
};
