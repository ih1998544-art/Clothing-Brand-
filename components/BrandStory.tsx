'use client';

import React from 'react';
import { useStore } from '@/lib/store';
import { Sparkles, ArrowRight } from 'lucide-react';

export const BrandStory: React.FC = () => {
  const { setSelectedCategory } = useStore();

  const handleExploreCraft = () => {
    setSelectedCategory('shawls');
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-[#1A1A18] text-[#FAF8F5] overflow-hidden border-t border-b border-[#2C2C28]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Macro Craft Grid */}
          <div className="relative">
            <div className="aspect-[4/3] bg-[#2E2E2A] overflow-hidden shadow-2xl relative">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-700 hover:scale-105"
                style={{ backgroundImage: `url('/images/shawl_craft.jpg')` }}
                role="img"
                aria-label="Handwoven Zari & Pashmina Craftsmanship"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-xs">
                <span className="text-[#C5A880] tracking-widest uppercase font-semibold">
                  Handloom Artisans
                </span>
                <span className="text-[#D4CEC4]">
                  Authentic Kashmiri Tilla &amp; Resham
                </span>
              </div>
            </div>

            {/* Subtle decorative offset card */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 w-48 p-4 bg-[#262622] border border-[#3E3C36] shadow-xl">
              <p className="text-[11px] text-[#A39E93] uppercase tracking-wider">Heritage Standard</p>
              <p className="font-serif text-base text-[#EDE8DF] mt-0.5">100% Pure Natural Fibers</p>
            </div>
          </div>

          {/* Right Column: Editorial Narrative */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C5A880]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Zariya Atelier</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight">
              Honoring Eastern Weaving &amp; Royal Embroidery
            </h2>

            <p className="text-sm sm:text-base text-[#D4CEC4] font-light leading-relaxed">
              Zariya was founded with a singular conviction: to preserve the centuries-old legacy of Subcontinental textile artistry while reimagining it for the modern, discerning wardrobe. 
            </p>

            <p className="text-sm sm:text-base text-[#AAA397] font-light leading-relaxed">
              From our hand-picked Egyptian Giza cotton latha for men, to our bespoke Swiss voile lawns adorned with hand-cut tilla needlework, every single thread passes through the hands of master generational craftsmen in Multan, Lahore, and Karachi.
            </p>

            {/* Quantitative Proof Section (Adjacency Rule) */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#33312B]">
              <div>
                <span className="block font-serif text-2xl sm:text-3xl text-white tabular-nums">
                  100%
                </span>
                <span className="text-[11px] text-[#9E978C] tracking-wide uppercase">
                  Pure Organic Weaves
                </span>
              </div>

              <div>
                <span className="block font-serif text-2xl sm:text-3xl text-white tabular-nums">
                  48+
                </span>
                <span className="text-[11px] text-[#9E978C] tracking-wide uppercase">
                  Flagship Boutiques
                </span>
              </div>

              <div>
                <span className="block font-serif text-2xl sm:text-3xl text-white tabular-nums">
                  250K+
                </span>
                <span className="text-[11px] text-[#9E978C] tracking-wide uppercase">
                  Delighted Patrons
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleExploreCraft}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A880] hover:text-white transition-colors cursor-pointer"
              >
                <span>Explore Artisan Shawls &amp; Weaves</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
