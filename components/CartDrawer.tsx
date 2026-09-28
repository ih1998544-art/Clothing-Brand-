'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { X, Trash2, ArrowRight, Sparkles, Check, Truck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    cartDrawerOpen,
    setCartDrawerOpen,
    removeFromCart,
    updateQuantity,
    cartSubtotalPKR,
    formatPrice,
    appliedDiscountPKR,
    applyPromoCode,
    promoCode,
    setCheckoutModalOpen,
  } = useStore();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);

  if (!cartDrawerOpen) return null;

  // Free shipping threshold: PKR 3,500
  const freeShippingThreshold = 3500;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotalPKR);
  const progressPercent = Math.min(100, Math.round((cartSubtotalPKR / freeShippingThreshold) * 100));

  const shippingFeePKR = cartSubtotalPKR >= freeShippingThreshold || cart.length === 0 ? 0 : 250;
  const grandTotalPKR = Math.max(0, cartSubtotalPKR - appliedDiscountPKR + shippingFeePKR);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const res = applyPromoCode(inputCoupon);
    setCouponFeedback(res);
  };

  const handleProceedToCheckout = () => {
    setCartDrawerOpen(false);
    setCheckoutModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF9F5] shadow-2xl flex flex-col justify-between border-l border-[#E5E0D8]">
          {/* Header */}
          <div className="p-5 border-b border-[#E5E0D8] bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-serif text-xl tracking-wider text-[#1A1A1A]">
                  Shopping Bag
                </span>
                <span className="text-xs bg-[#EFECE6] text-[#555] px-2 py-0.5 rounded-full font-bold tabular-nums">
                  {cart.reduce((s, i) => s + i.quantity, 0)}
                </span>
              </div>
              <button
                type="button"
                aria-label="Close cart"
                onClick={() => setCartDrawerOpen(false)}
                className="p-1.5 text-[#555] hover:text-[#1A1A1A] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Nationwide Meter */}
            <div className="mt-4 pt-3 border-t border-[#F0ECE3]">
              <div className="flex items-center justify-between text-xs text-[#524C44] mb-1.5 font-medium">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-[#C5A880]" />
                  {remainingForFreeShipping === 0 ? (
                    <span className="text-[#2E6B47] font-semibold">You unlocked Free Delivery!</span>
                  ) : (
                    <span>Add <strong>{formatPrice(remainingForFreeShipping)}</strong> for Free Delivery</span>
                  )}
                </span>
                <span className="tabular-nums">{progressPercent}%</span>
              </div>
              <div className="w-full bg-[#E5E0D8] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#1A1A1A] h-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#EBE6DD]">
            {cart.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <p className="font-serif text-lg text-[#1A1A1A]">Your shopping bag is empty</p>
                <p className="text-xs text-[#7A746B] max-w-xs mx-auto">
                  Explore our festive lawn, unstitched pret, and signature fragrances to fill your bag.
                </p>
                <button
                  type="button"
                  onClick={() => setCartDrawerOpen(false)}
                  className="px-6 py-2.5 bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-semibold"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} className="py-4 flex gap-4">
                  {/* Thumbnail */}
                  <div
                    className="w-20 h-24 bg-[#EAE5DC] bg-cover bg-center shrink-0 border border-[#DDD7CD]"
                    style={{ backgroundImage: `url('${item.product.image}')` }}
                  />

                  {/* Item Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-sm font-medium text-[#1A1A1A] line-clamp-1">
                          {item.product.title}
                        </h4>
                        <button
                          type="button"
                          aria-label="Remove item"
                          onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor)}
                          className="text-[#999] hover:text-[#8D2B2B] p-0.5 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Variant Specs */}
                      <p className="text-xs text-[#736D63] mt-0.5">
                        Size: <span className="font-medium text-[#1A1A1A]">{item.selectedSize}</span> · Color: <span className="font-medium text-[#1A1A1A]">{item.selectedColor}</span>
                      </p>

                      <div className="text-xs font-semibold text-[#1A1A1A] mt-1 tabular-nums">
                        {formatPrice(item.product.pricePKR)}
                      </div>
                    </div>

                    {/* Quantity Stepper & Sub-total */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-[#DDD7CD] bg-white text-xs">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-[#555] hover:text-black cursor-pointer font-bold"
                        >
                          -
                        </button>
                        <span className="w-7 text-center font-semibold tabular-nums text-[#1A1A1A]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-[#555] hover:text-black cursor-pointer font-bold"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-xs font-semibold text-[#1A1A1A] tabular-nums">
                        {formatPrice(item.product.pricePKR * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout Action */}
          {cart.length > 0 && (
            <div className="p-5 bg-white border-t border-[#E5E0D8] space-y-4">
              {/* Promo Code Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={inputCoupon}
                  onChange={(e) => setInputCoupon(e.target.value)}
                  placeholder="Promo Code (e.g. EID2026)"
                  className="flex-1 bg-[#FAF8F5] border border-[#DDD7CD] text-xs px-3 py-2 uppercase placeholder:normal-case placeholder:text-[#999] focus:outline-none focus:border-[#1A1A1A]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#FAF8F5] border border-[#DDD7CD] hover:bg-[#1A1A1A] hover:text-white text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </form>

              {couponFeedback && (
                <p className={`text-xs ${couponFeedback.success ? 'text-[#2E6B47]' : 'text-[#8D2B2B]'}`}>
                  {couponFeedback.message}
                </p>
              )}

              {/* Price Calculation Lines */}
              <div className="space-y-1.5 text-xs text-[#524C44] pt-2 border-t border-[#F0ECE3]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#1A1A1A] tabular-nums">
                    {formatPrice(cartSubtotalPKR)}
                  </span>
                </div>

                {appliedDiscountPKR > 0 && (
                  <div className="flex justify-between text-[#2E6B47]">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Promo Discount ({promoCode})
                    </span>
                    <span className="tabular-nums">- {formatPrice(appliedDiscountPKR)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
                  <span className="tabular-nums">
                    {shippingFeePKR === 0 ? (
                      <span className="text-[#2E6B47] font-semibold">FREE</span>
                    ) : (
                      formatPrice(shippingFeePKR)
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-base font-semibold text-[#1A1A1A] pt-2 border-t border-[#F0ECE3]">
                  <span>Total Amount</span>
                  <span className="tabular-nums font-bold">
                    {formatPrice(grandTotalPKR)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                type="button"
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 bg-[#1A1A1A] hover:bg-[#333] text-white text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-center text-[#736E67]">
                Taxes included. Cash on Delivery (COD) supported nationwide.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
