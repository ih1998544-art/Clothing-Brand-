'use client';

import React from 'react';
import { useStore } from '@/lib/store';
import { ArrowRight, Sparkles } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { setSelectedCategory } = useStore();

  const handleCtaClick = (category: string) => {
    setSelectedCategory(category);
    const catalog = document.getElementById('catalog-section');
    if (catalog) {
      catalog.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full bg-[#181816] text-[#EDE8DF] overflow-hidden">
      {/* Background Image Container with Measured Gradient Scrim */}
      <div className="relative min-h-[580px] lg:min-h-[680px] flex items-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-[1.02]"
          style={{ backgroundImage: `url('/images/hero_campaign.jpg')` }}
          role="img"
          aria-label="Zariya Festive Campaign Collection"
        />

        {/* Cinematic Gradient Scrim (Measured for 4.5:1 text contrast) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30 lg:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-2xl space-y-6">
            {/* Editorial Kicker with typographic separator (no pills) */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#D8BE9B]">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Festive Luxury Edition</span>
              <span aria-hidden="true">·</span>
              <span>Spring / Summer 2026</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-normal leading-[1.1] tracking-wide text-balance">
              NOOR-E-KHAAS
              <span className="block font-sans text-xl sm:text-2xl text-[#E8DCCB] font-light tracking-[0.1em] mt-2">
                Timeless Eastern Heritage & Embroidered Pret
              </span>
            </h1>

            {/* Body Description */}
            <p className="text-sm sm:text-base text-[#D4CEC4] font-light leading-relaxed max-w-lg">
              Crafted with delicate hand-finished zari, Swiss voile lawns, and pure Egyptian cotton weaves. Inspired by royal Mughal ateliers for contemporary celebrations.
            </p>

            {/* Direct Route CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => handleCtaClick('unstitched')}
                className="group flex items-center gap-3 bg-[#FAF9F5] text-[#1A1A1A] hover:bg-white px-6 py-3.5 text-xs font-semibold tracking-[0.15em] uppercase transition-all shadow-lg hover:shadow-xl cursor-pointer"
              >
                <span>Shop Festive Lawn</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={() => handleCtaClick('men')}
                className="flex items-center gap-2 border border-[#E5E0D8]/60 hover:border-white text-white hover:bg-white/10 px-6 py-3.5 text-xs font-medium tracking-[0.15em] uppercase transition-all backdrop-blur-sm cursor-pointer"
              >
                <span>Men&apos;s Royal Latha</span>
              </button>
            </div>

            {/* Trust Micro-Row with unboxed typography */}
            <div className="pt-6 border-t border-white/15 flex flex-wrap items-center gap-6 text-[11px] text-[#C2BCB2] tracking-wider uppercase">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                100% Genuine Fine Fabrics
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                Cash On Delivery (COD) Nationwide
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                7-Day Seamless Exchange
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
