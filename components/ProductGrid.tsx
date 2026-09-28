'use client';

import React, { useState, useMemo } from 'react';
import { useStore } from '@/lib/store';
import { PRODUCTS, CATEGORIES } from '@/lib/data';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, Sparkles, X } from 'lucide-react';

export const ProductGrid: React.FC = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
  } = useStore();

  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Category match
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'unstitched' && item.category !== 'unstitched') return false;
        if (selectedCategory === 'women-pret' && item.category !== 'women-pret') return false;
        if (selectedCategory === 'men' && item.category !== 'men') return false;
        if (selectedCategory === 'fragrances' && item.category !== 'fragrances') return false;
        if (selectedCategory === 'shawls' && item.category !== 'shawls') return false;
      }

      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesCategory = item.categoryLabel.toLowerCase().includes(query);
        const matchesFabric = item.fabric.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        if (!matchesTitle && !matchesCategory && !matchesFabric && !matchesDesc) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.pricePKR - b.pricePKR;
      if (sortBy === 'price-desc') return b.pricePKR - a.pricePKR;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <section id="catalog-section" className="py-16 bg-[#FAF9F5] scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title & Subheading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-[#E8E3D9]">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#8C8273] font-medium mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Curated Catalogue</span>
              <span aria-hidden="true">·</span>
              <span>Eastern Couturiers</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-normal tracking-wide">
              Featured Creations
            </h2>
          </div>

          {/* Sort & Quick Filter Bar */}
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2 text-[#5E584F]">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#888]" />
              <span>Sort by:</span>
              <select
                aria-label="Sort products"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-[#DDD7CD] rounded px-2 py-1.5 text-xs text-[#242424] focus:outline-none focus:border-[#1A1A1A] cursor-pointer"
              >
                <option value="featured">Featured Collection</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Customer Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Filter Tabs (Zero pill discipline - Clean interactive segmented controls) */}
        <div className="py-6 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-1.5 flex-wrap p-1 bg-[#EFECE6] rounded-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-medium transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-[#1A1A1A] text-white shadow-sm'
                    : 'text-[#4A453F] hover:text-[#1A1A1A] hover:bg-[#E5E0D8]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Active Search / Filter feedback */}
          {searchQuery && (
            <div className="flex items-center gap-2 text-xs text-[#555] bg-white px-3 py-1.5 border border-[#DDD]">
              <span>Search: &ldquo;{searchQuery}&rdquo;</span>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-[#999] hover:text-black"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* 3-Column Product Grid (generous gap-6 to gap-8 per E-Commerce Guidelines) */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 pt-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center bg-white border border-[#E8E3D9] p-8 max-w-md mx-auto my-8">
            <h3 className="font-serif text-xl text-[#1A1A1A] mb-2">No designs found</h3>
            <p className="text-xs text-[#7A746B] mb-6">
              We couldn&apos;t find any items matching your selection. Try browsing all collections or clearing your search keywords.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-6 py-2.5 bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-medium"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
