'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { CITIES_PAKISTAN } from '@/lib/data';
import { X, CheckCircle2, Truck, CreditCard, Banknote, ShieldCheck, Printer, ArrowRight } from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    checkoutModalOpen,
    setCheckoutModalOpen,
    cart,
    clearCart,
    cartSubtotalPKR,
    appliedDiscountPKR,
    formatPrice,
    currency,
    lastOrder,
    setLastOrder,
  } = useStore();

  const [fullName, setFullName] = useState('Hamza Farooq');
  const [phone, setPhone] = useState('0301-8492011');
  const [email, setEmail] = useState('hamza.farooq@example.com');
  const [city, setCity] = useState('Karachi');
  const [address, setAddress] = useState('House 42-B, Street 14, Phase 6, DHA');
  const [courier, setCourier] = useState('TCS Express Courier (1-2 Days)');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card' | 'wallet'>('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!checkoutModalOpen) return null;

  const shippingFeePKR = cartSubtotalPKR >= 3500 ? 0 : 250;
  const grandTotalPKR = Math.max(0, cartSubtotalPKR - appliedDiscountPKR + shippingFeePKR);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedOrderId = `ZR-${Math.floor(10000 + Math.random() * 90000)}`;
      const order = {
        orderId: generatedOrderId,
        customerName: fullName,
        phone,
        city,
        address,
        paymentMethod: paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : paymentMethod === 'card' ? 'Credit/Debit Card' : 'JazzCash / EasyPaisa',
        courier,
        items: [...cart],
        subtotal: cartSubtotalPKR,
        discount: appliedDiscountPKR,
        shipping: shippingFeePKR,
        total: grandTotalPKR,
        date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
        currency,
      };

      setLastOrder(order);
      clearCart();
      setIsSubmitting(false);
    }, 900);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white border border-[#DDD7CD] shadow-2xl p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          aria-label="Close checkout"
          onClick={() => {
            setCheckoutModalOpen(false);
            if (lastOrder) setLastOrder(null);
          }}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#FAF8F5] hover:bg-[#EBE6DD] flex items-center justify-center text-[#1A1A1A] cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {lastOrder ? (
          /* Order Confirmation View */
          <div className="text-center py-6 space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#EBF5EE] text-[#2E6B47] flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-[#8C8273] font-semibold">
                Shukriya for choosing ZARIYA
              </p>
              <h2 className="font-serif text-3xl text-[#1A1A1A] mt-1 font-normal">
                Order Confirmed!
              </h2>
              <p className="text-xs text-[#555] mt-1">
                Your order <strong className="text-[#1A1A1A] font-semibold">{lastOrder.orderId}</strong> has been received and is being prepared for dispatch.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-[#FAF9F5] border border-[#E8E3D9] p-5 text-left text-xs space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-[#E5E0D8]">
                <span className="font-semibold text-[#1A1A1A]">Consignee: {lastOrder.customerName}</span>
                <span className="text-[#666]">{lastOrder.date}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[#555]">
                <p><strong>Phone:</strong> {lastOrder.phone}</p>
                <p><strong>City:</strong> {lastOrder.city}</p>
                <p className="col-span-2"><strong>Address:</strong> {lastOrder.address}</p>
                <p><strong>Payment:</strong> {lastOrder.paymentMethod}</p>
                <p><strong>Courier:</strong> {lastOrder.courier}</p>
              </div>

              {/* Items List */}
              <div className="pt-3 border-t border-[#E5E0D8] space-y-1.5">
                <span className="font-medium text-[#1A1A1A]">Ordered Designs:</span>
                {lastOrder.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between text-[#444]">
                    <span>{it.quantity}x {it.product.title} ({it.selectedSize})</span>
                    <span className="tabular-nums font-medium">{formatPrice(it.product.pricePKR * it.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-[#E5E0D8] flex justify-between text-sm font-bold text-[#1A1A1A]">
                <span>Total Payable:</span>
                <span className="tabular-nums">{formatPrice(lastOrder.total)}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2.5 border border-[#1A1A1A] text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] hover:bg-[#FAF8F5] cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Invoice</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setLastOrder(null);
                  setCheckoutModalOpen(false);
                }}
                className="px-6 py-2.5 bg-[#1A1A1A] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#333] cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Input Form */
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#8A8275] font-medium mb-1">
              <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
              <span>Safe &amp; Secure Checkout</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1A1A1A] font-normal mb-1">
              Order Shipping &amp; Payment
            </h2>
            <p className="text-xs text-[#6B655B] font-light mb-6">
              Complete your order details below. Cash on Delivery is available across all major cities of Pakistan.
            </p>

            <form onSubmit={handleSubmitOrder} className="space-y-6">
              {/* Customer Contact Details */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider border-b border-[#F0ECE3] pb-1.5">
                  1. Contact Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-[#444] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Ayesha Khan"
                      className="w-full text-xs bg-[#FAF9F5] border border-[#DDD7CD] p-2 text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#444] mb-1">
                      Mobile Number (for Courier SMS) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0300-1234567"
                      className="w-full text-xs bg-[#FAF9F5] border border-[#DDD7CD] p-2 text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#444] mb-1">
                    Email Address (for Digital Receipt)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full text-xs bg-[#FAF9F5] border border-[#DDD7CD] p-2 text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>
              </div>

              {/* Delivery Address */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider border-b border-[#F0ECE3] pb-1.5">
                  2. Shipping Destination
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-[#444] mb-1">
                      Destination City *
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full text-xs bg-[#FAF9F5] border border-[#DDD7CD] p-2 text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] cursor-pointer"
                    >
                      {CITIES_PAKISTAN.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#444] mb-1">
                      Express Courier Partner
                    </label>
                    <select
                      value={courier}
                      onChange={(e) => setCourier(e.target.value)}
                      className="w-full text-xs bg-[#FAF9F5] border border-[#DDD7CD] p-2 text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] cursor-pointer"
                    >
                      <option value="TCS Express Courier (1-2 Days)">TCS Express Courier (1–2 Days)</option>
                      <option value="Leopards Courier (2-3 Days)">Leopards Courier Service (2–3 Days)</option>
                      <option value="Trax Logistics Priority">Trax Priority Logistics</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#444] mb-1">
                    Complete Street Address &amp; House/Apartment No. *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="House/Plot number, Street, Sector / Area name"
                    className="w-full text-xs bg-[#FAF9F5] border border-[#DDD7CD] p-2 text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider border-b border-[#F0ECE3] pb-1.5">
                  3. Payment Method
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      paymentMethod === 'cod'
                        ? 'border-[#1A1A1A] bg-[#FAF8F5] ring-1 ring-[#1A1A1A]'
                        : 'border-[#DDD7CD] hover:border-[#999]'
                    }`}
                  >
                    <Banknote className="w-5 h-5 text-[#C5A880] mb-2" />
                    <div>
                      <span className="block text-xs font-bold text-[#1A1A1A]">Cash on Delivery</span>
                      <span className="text-[10px] text-[#666]">Pay in cash to rider</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-[#1A1A1A] bg-[#FAF8F5] ring-1 ring-[#1A1A1A]'
                        : 'border-[#DDD7CD] hover:border-[#999]'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-[#C5A880] mb-2" />
                    <div>
                      <span className="block text-xs font-bold text-[#1A1A1A]">Credit / Debit Card</span>
                      <span className="text-[10px] text-[#666]">Visa / Mastercard 3D Secure</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('wallet')}
                    className={`p-3 border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      paymentMethod === 'wallet'
                        ? 'border-[#1A1A1A] bg-[#FAF8F5] ring-1 ring-[#1A1A1A]'
                        : 'border-[#DDD7CD] hover:border-[#999]'
                    }`}
                  >
                    <Truck className="w-5 h-5 text-[#C5A880] mb-2" />
                    <div>
                      <span className="block text-xs font-bold text-[#1A1A1A]">JazzCash / EasyPaisa</span>
                      <span className="text-[10px] text-[#666]">Mobile wallet transfer</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Order Final Total & Action */}
              <div className="pt-4 border-t border-[#E8E3D9] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-[#736D63]">Total Payable:</span>
                  <div className="text-xl font-bold text-[#1A1A1A] tabular-nums">
                    {formatPrice(grandTotalPKR)}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || cart.length === 0}
                  className="px-8 py-3.5 bg-[#1A1A1A] hover:bg-[#333] text-white text-xs font-semibold uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Placing Order...</span>
                  ) : (
                    <>
                      <span>Confirm &amp; Place Order</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
