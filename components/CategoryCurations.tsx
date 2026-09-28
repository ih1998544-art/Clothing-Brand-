'use client';

import React from 'react';
import { useStore } from '@/lib/store';
import { ArrowUpRight } from 'lucide-react';

interface CategoryCard {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  tag: string;
}

const CATEGORY_CARDS: CategoryCard[] = [
  {
    id: 'unstitched',
    title: 'Unstitched Luxury',
    subtitle: 'Swiss Voile & Zari Lawn 3-Piece',
    image: '/images/hero_campaign.jpg',
    tag: 'Festive 2026',
  },
  {
    id: 'women-pret',
    title: 'Ready-To-Wear Pret',
    subtitle: 'Printed & Embroidered Kurtas',
    image: '/images/women_pret.jpg',
    tag: 'Daily & Formal',
  },
  {
    id: 'men',
    title: "Men's Kurta & Shalwar",
    subtitle: 'Royal Latha & Raw Silk Waistcoats',
    image: '/images/men_kurta.jpg',
    tag: 'Heritage Weaves',
  },
  {
    id: 'fragrances',
    title: 'Artisanal Perfumes',
    subtitle: 'Cambodian Oud & Pure Attar',
    image: '/images/luxury_oud.jpg',
    tag: 'Signature Scents',
  },
];

export const CategoryCurations: React.FC = () => {
  const { setSelectedCategory } = useStore();

  const handleSelect = (catId: string) => {
    setSelectedCategory(catId);
    const catalog = document.getElementById('catalog-section');
    if (catalog) {
      catalog.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 bg-[#FAF9F5] border-b border-[#E8E3D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <p className="text-xs uppercase tracking-[0.25em] text-[#8C8273] font-medium mb-2">
            Curated Collections
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-normal tracking-wide">
            The World of Zariya
          </h2>
          <div className="w-12 h-0.5 bg-[#C5A880] mx-auto mt-4" />
        </div>

        {/* 4-Column Visual Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORY_CARDS.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleSelect(cat.id)}
              className="group relative h-96 overflow-hidden bg-[#ECE7DE] cursor-pointer shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ backgroundImage: `url('${cat.image}')` }}
                role="img"
                aria-label={cat.title}
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              {/* Text Tag (Unboxed, clean) */}
              <div className="absolute top-4 left-4 text-[11px] uppercase tracking-widest text-[#D8BE9B] font-medium">
                {cat.tag}
              </div>

              {/* Card Footer Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
                <div>
                  <h3 className="font-serif text-xl text-white font-normal tracking-wide group-hover:text-[#E8DCCB] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-[#D1CBC1] mt-1 font-light">
                    {cat.subtitle}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
