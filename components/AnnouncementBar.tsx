'use client';

import React from 'react';
import { useStore } from '@/lib/store';
import { CURRENCIES } from '@/lib/data';
import { Currency } from '@/lib/types';
import { Globe, Truck, Sparkles } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const { currency, setCurrency } = useStore();

  return (
    <div className="bg-[#1A1A1A] text-[#EDE8DF] text-xs py-2 px-4 border-b border-[#2D2D2D] select-none">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Left: Free delivery reminder */}
        <div className="flex items-center gap-2 tracking-wide font-light text-center sm:text-left">
          <Truck className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
          <span>
            Free Express Nationwide Delivery on all orders above{' '}
            <strong className="font-semibold text-white">Rs. 3,500</strong>
          </span>
          <span className="hidden md:inline text-[#666]">·</span>
          <span className="hidden md:flex items-center gap-1 text-[#C5A880]">
            <Sparkles className="w-3 h-3" />
            <span>Use code <strong>EID2026</strong> for 10% off</span>
          </span>
        </div>

        {/* Right: Currency & Regional Switcher */}
        <div className="flex items-center gap-4 text-[11px] text-[#A39E93]">
          <div className="flex items-center gap-1.5">
            <Globe className="w-3 h-3 text-[#A39E93]" />
            <span className="hidden sm:inline">Currency:</span>
            <select
              aria-label="Currency Selector"
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
              className="bg-[#242424] text-white border border-[#3E3C38] rounded px-1.5 py-0.5 text-xs focus:outline-none focus:border-[#C5A880] cursor-pointer"
            >
              {Object.keys(CURRENCIES).map((currKey) => (
                <option key={currKey} value={currKey} className="bg-[#1A1A1A] text-white">
                  {currKey} ({CURRENCIES[currKey].symbol})
                </option>
              ))}
            </select>
          </div>
          <span className="text-[#444]">|</span>
          <span className="hover:text-white transition-colors cursor-pointer">
            24/7 WhatsApp: +92 300 0092749
          </span>
        </div>
      </div>
    </div>
  );
};
