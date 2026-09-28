'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { Product } from '@/lib/types';
import { X, Star, ShoppingBag, Ruler, Check, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

interface QuickViewContentProps {
  product: Product;
  onClose: () => void;
}

const QuickViewContent: React.FC<QuickViewContentProps> = ({ product, onClose }) => {
  const { addToCart, formatPrice, setSizeGuideOpen } = useStore();

  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.colorName || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Standard');
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'care' | 'reviews'>('details');
  const [addedToast, setAddedToast] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setAddedToast(true);
    setTimeout(() => {
      setAddedToast(false);
      onClose();
    }, 800);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 max-h-[85vh] overflow-y-auto">
      {/* Left Column: Image Gallery */}
      <div className="bg-[#FAF8F5] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#EFECE6]">
        {/* Main Stage Image */}
        <div className="relative aspect-[3/4] w-full bg-[#EDE8DF] overflow-hidden mb-4">
          <div
            className="w-full h-full bg-cover bg-center transition-all duration-300"
            style={{ backgroundImage: `url('${selectedImage}')` }}
            role="img"
            aria-label={product.title}
          />
        </div>

        {/* Thumbnail Selectors */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {product.gallery.map((imgUrl, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedImage(imgUrl)}
              className={`w-16 h-20 bg-[#EDE8DF] bg-cover bg-center border-2 transition-all cursor-pointer shrink-0 ${
                selectedImage === imgUrl ? 'border-[#1A1A1A]' : 'border-transparent opacity-70 hover:opacity-100'
              }`}
              style={{ backgroundImage: `url('${imgUrl}')` }}
            />
          ))}
        </div>
      </div>

      {/* Right Column: Contiguous Purchase Information */}
      <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
        <div>
          {/* Category & Collection */}
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#8A8275] font-medium mb-1">
            <span>{product.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{product.collection}</span>
          </div>

          {/* Title */}
          <h2 className="font-serif text-2xl sm:text-3xl text-[#1A1A1A] font-normal leading-snug">
            {product.title}
          </h2>

          {/* Price & Rating Row */}
          <div className="flex items-center justify-between mt-3 pb-4 border-b border-[#F0ECE3]">
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-semibold text-[#1A1A1A] tabular-nums">
                {formatPrice(product.pricePKR)}
              </span>
              {product.originalPricePKR && (
                <span className="text-sm text-[#999] line-through tabular-nums">
                  {formatPrice(product.originalPricePKR)}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-xs text-[#555]">
              <div className="flex text-[#C5A880]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="font-medium text-[#1A1A1A]">{product.rating}</span>
              <span className="text-[#888]">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Fabric Specs */}
          <div className="mt-4 text-xs text-[#524C44] space-y-1">
            <p>
              <strong>Fabric:</strong> {product.fabric}
            </p>
            <p>
              <strong>Pieces:</strong> {product.pieces}
            </p>
          </div>

          {/* Size Selector + Size Guide Link */}
          <div className="mt-5">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-medium text-[#1A1A1A] uppercase tracking-wider">
                Select Size
              </span>
              <button
                type="button"
                onClick={() => setSizeGuideOpen(true)}
                className="flex items-center gap-1 text-[#8C7456] hover:text-[#1A1A1A] transition-colors cursor-pointer font-medium"
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>Size Guide Chart</span>
              </button>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`px-3.5 py-1.5 text-xs tracking-wider transition-all cursor-pointer ${
                    selectedSize === size
                      ? 'bg-[#1A1A1A] text-white font-medium border border-[#1A1A1A]'
                      : 'bg-[#FAF8F5] text-[#444] border border-[#DDD7CD] hover:border-[#999]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Swatch Selector */}
          {product.colors.length > 0 && (
            <div className="mt-5">
              <span className="block text-xs font-medium text-[#1A1A1A] uppercase tracking-wider mb-2">
                Color Shade: <span className="font-normal text-[#666]">{selectedColor}</span>
              </span>
              <div className="flex items-center gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.colorName}
                    type="button"
                    onClick={() => {
                      setSelectedColor(c.colorName);
                      setSelectedImage(c.image);
                    }}
                    className={`w-6 h-6 rounded-full border transition-all cursor-pointer ${
                      selectedColor === c.colorName
                        ? 'ring-2 ring-offset-2 ring-[#1A1A1A] scale-110'
                        : 'border-black/20 hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.colorHex }}
                    title={c.colorName}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Quantity Stepper & Add to Bag Primary Module */}
          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center border border-[#DDD7CD] bg-[#FAF8F5]">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-9 h-10 flex items-center justify-center text-[#555] hover:text-black cursor-pointer text-sm font-medium"
              >
                -
              </button>
              <span className="w-10 text-center text-xs font-semibold tabular-nums text-[#1A1A1A]">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-9 h-10 flex items-center justify-center text-[#555] hover:text-black cursor-pointer text-sm font-medium"
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className={`flex-1 h-10 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest transition-all cursor-pointer shadow-md ${
                addedToast ? 'bg-[#2E6B47] text-white' : 'bg-[#1A1A1A] hover:bg-[#333] text-white'
              }`}
            >
              {addedToast ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Bag!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </>
              )}
            </button>
          </div>

          {/* Accordion Tabs for Details / Care / Reviews */}
          <div className="mt-6 pt-4 border-t border-[#F0ECE3]">
            <div className="flex items-center gap-4 text-xs uppercase tracking-wider font-medium text-[#7A746B] border-b border-[#F0ECE3] pb-2">
              <button
                type="button"
                onClick={() => setActiveTab('details')}
                className={`cursor-pointer ${
                  activeTab === 'details' ? 'text-[#1A1A1A] font-semibold border-b-2 border-[#1A1A1A] pb-2 -mb-2.5' : 'hover:text-[#1A1A1A]'
                }`}
              >
                Product Details
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('care')}
                className={`cursor-pointer ${
                  activeTab === 'care' ? 'text-[#1A1A1A] font-semibold border-b-2 border-[#1A1A1A] pb-2 -mb-2.5' : 'hover:text-[#1A1A1A]'
                }`}
              >
                Fabric & Care
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('reviews')}
                className={`cursor-pointer ${
                  activeTab === 'reviews' ? 'text-[#1A1A1A] font-semibold border-b-2 border-[#1A1A1A] pb-2 -mb-2.5' : 'hover:text-[#1A1A1A]'
                }`}
              >
                Reviews ({product.reviews.length})
              </button>
            </div>

            <div className="py-3 text-xs text-[#524C44] min-h-[90px]">
              {activeTab === 'details' && (
                <ul className="space-y-1.5 list-disc list-inside">
                  {product.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              )}

              {activeTab === 'care' && (
                <ul className="space-y-1.5 list-disc list-inside">
                  {product.careInstructions.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-3">
                  {product.reviews.map((r) => (
                    <div key={r.id} className="border-b border-[#F4EFE6] pb-2">
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="font-semibold text-[#1A1A1A]">{r.author} ({r.city})</span>
                        <span className="text-[#999]">{r.date}</span>
                      </div>
                      <p className="text-xs text-[#555]">{r.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="pt-3 border-t border-[#F0ECE3] grid grid-cols-3 gap-2 text-[11px] text-[#736D64]">
          <div className="flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
            <span>Express Courier</span>
          </div>
          <div className="flex items-center gap-1.5">
            <RefreshCw className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
            <span>7-Day Exchange</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
            <span>100% Genuine</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct } = useStore();

  if (!quickViewProduct) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/65 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white border border-[#DDD7CD] shadow-2xl overflow-hidden my-8">
        {/* Close Button */}
        <button
          type="button"
          aria-label="Close modal"
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#1A1A1A] flex items-center justify-center shadow-sm transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Keyed inner component for clean state initialization without useEffect cascading renders */}
        <QuickViewContent
          key={quickViewProduct.id}
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      </div>
    </div>
  );
};
