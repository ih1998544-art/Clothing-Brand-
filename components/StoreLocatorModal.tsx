'use client';

import React from 'react';
import { useStore } from '@/lib/store';
import { STORE_LOCATIONS } from '@/lib/data';
import { X, MapPin, Phone, Clock } from 'lucide-react';

export const StoreLocatorModal: React.FC = () => {
  const { storeLocatorOpen, setStoreLocatorOpen } = useStore();

  if (!storeLocatorOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl bg-white border border-[#DDD7CD] shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          aria-label="Close store locator"
          onClick={() => setStoreLocatorOpen(false)}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#FAF8F5] hover:bg-[#EBE6DD] flex items-center justify-center text-[#1A1A1A] cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#8A8275] font-medium mb-1">
          <MapPin className="w-4 h-4 text-[#C5A880]" />
          <span>Ateliers &amp; Boutiques</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl text-[#1A1A1A] font-normal mb-2">
          Flagship Store Boutiques
        </h2>
        <p className="text-xs text-[#6B655B] font-light max-w-lg mb-6">
          Experience our fabrics, bespoke tailoring consultations, and scent-testing bars in person at our flagship locations across Pakistan and the United Arab Emirates.
        </p>

        {/* Store Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {STORE_LOCATIONS.map((loc) => (
            <div
              key={loc.name}
              className="p-5 bg-[#FAF9F5] border border-[#E8E3D9] flex flex-col justify-between space-y-3"
            >
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-bold">
                  {loc.city} Flagship
                </span>
                <h3 className="font-serif text-lg text-[#1A1A1A] font-medium mt-0.5">
                  {loc.name}
                </h3>
                <p className="text-xs text-[#595349] mt-2 leading-relaxed">
                  {loc.address}
                </p>
              </div>

              <div className="pt-3 border-t border-[#EAE5DC] space-y-1 text-xs text-[#666]">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#1A1A1A]" />
                  <span>{loc.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#1A1A1A]" />
                  <span>{loc.hours}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Support Footer */}
        <div className="mt-6 pt-4 border-t border-[#EAE5DC] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#666]">
          <span>Need directions or assistance booking a bridal consultation?</span>
          <a
            href="https://wa.me/923000092749"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[#1A1A1A] font-semibold hover:text-[#C5A880] transition-colors"
          >
            <span>Message WhatsApp Concierge</span>
          </a>
        </div>
      </div>
    </div>
  );
};
