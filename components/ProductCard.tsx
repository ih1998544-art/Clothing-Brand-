'use client';

import React, { useState } from 'react';
import { Product } from '@/lib/types';
import { useStore } from '@/lib/store';
import { Heart, Eye, ShoppingBag, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setQuickViewProduct,
  } = useStore();

  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.colorName || '');
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Standard');
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleColorChange = (colorName: string, image: string) => {
    setSelectedColor(colorName);
    setSelectedImage(image);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedSize, selectedColor, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const wishlisted = isInWishlist(product.id);

  return (
    <div className="group relative flex flex-col bg-white border border-[#EBE6DD] rounded-none hover:shadow-lg transition-all duration-300">
      {/* Visual Image Container */}
      <div
        className="relative aspect-[3/4] bg-[#F5F2EB] overflow-hidden cursor-pointer"
        onClick={() => setQuickViewProduct(product)}
      >
        {/* Main Product Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
          style={{ backgroundImage: `url('${selectedImage}')` }}
          role="img"
          aria-label={product.title}
        />

        {/* Fallback styling container */}
        <div className="absolute inset-0 pointer-events-none border border-black/5" />

        {/* Top Tag & Actions */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between z-10">
          <div>
            {product.isNewArrival && (
              <span className="text-[11px] font-medium tracking-widest uppercase bg-[#1A1A1A] text-white px-2.5 py-1">
                New
              </span>
            )}
            {product.isOnSale && !product.isNewArrival && (
              <span className="text-[11px] font-medium tracking-widest uppercase bg-[#8D2B2B] text-white px-2.5 py-1">
                Sale
              </span>
            )}
          </div>

          <button
            type="button"
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#1A1A1A] hover:bg-white shadow-sm transition-colors cursor-pointer"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                wishlisted ? 'fill-[#A84B4B] text-[#A84B4B]' : 'text-[#444]'
              }`}
            />
          </button>
        </div>

        {/* Quick View Floating Overlay on Desktop Hover */}
        <div className="absolute inset-x-3 bottom-3 hidden lg:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="flex-1 bg-white/95 hover:bg-white text-[#1A1A1A] text-xs font-medium py-2.5 px-3 flex items-center justify-center gap-1.5 shadow-md backdrop-blur-sm transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Card Info Section */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Unboxed Metadata (Category & Fabric) */}
          <div className="flex items-center gap-1.5 text-xs text-[#8A8275] tracking-wide mb-1.5 uppercase font-medium">
            <span>{product.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span className="truncate">{product.fabric.split('&')[0]}</span>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => setQuickViewProduct(product)}
            className="font-serif text-base sm:text-lg text-[#1A1A1A] hover:text-[#7A6448] font-normal leading-snug line-clamp-1 cursor-pointer transition-colors"
          >
            {product.title}
          </h3>

          {/* Pieces indicator */}
          <p className="text-xs text-[#6B655B] font-light mt-0.5">
            {product.pieces}
          </p>

          {/* Size Selectors (Single line pills) */}
          <div className="mt-3 flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] text-[#999] uppercase tracking-wider mr-1">Size:</span>
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={`text-[11px] px-2 py-0.5 border transition-colors cursor-pointer ${
                  selectedSize === size
                    ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white font-medium'
                    : 'border-[#E0DAD0] text-[#555] hover:border-[#999]'
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Color Swatches */}
          {product.colors.length > 1 && (
            <div className="mt-2.5 flex items-center gap-2">
              <span className="text-[11px] text-[#999] uppercase tracking-wider">Color:</span>
              <div className="flex items-center gap-1.5">
                {product.colors.map((color) => (
                  <button
                    key={color.colorName}
                    type="button"
                    title={color.colorName}
                    onClick={() => handleColorChange(color.colorName, color.image)}
                    className={`w-4 h-4 rounded-full border transition-all cursor-pointer ${
                      selectedColor === color.colorName
                        ? 'ring-2 ring-offset-1 ring-[#1A1A1A] scale-110'
                        : 'border-black/20 hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.colorHex }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Pricing & Add to Bag */}
        <div className="pt-4 mt-3 border-t border-[#F0ECE3] flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-base font-semibold text-[#1A1A1A] tabular-nums">
                {formatPrice(product.pricePKR)}
              </span>
              {product.originalPricePKR && (
                <span className="text-xs text-[#9B958A] line-through tabular-nums">
                  {formatPrice(product.originalPricePKR)}
                </span>
              )}
            </div>
            {product.originalPricePKR && (
              <span className="text-[10px] text-[#8D2B2B] font-medium tracking-wide">
                SAVE Rs. {(product.originalPricePKR - product.pricePKR).toLocaleString()}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleQuickAdd}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              addedAnimation
                ? 'bg-[#2E6B47] text-white'
                : 'bg-[#1A1A1A] hover:bg-[#3D3832] text-white'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
