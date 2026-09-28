'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { SIZE_CHART } from '@/lib/data';
import { X, Ruler } from 'lucide-react';

export const SizeGuideModal: React.FC = () => {
  const { sizeGuideOpen, setSizeGuideOpen } = useStore();
  const [genderTab, setGenderTab] = useState<'women' | 'men'>('women');
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');

  if (!sizeGuideOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-white border border-[#DDD7CD] shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          aria-label="Close size guide"
          onClick={() => setSizeGuideOpen(false)}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F5F2EB] hover:bg-[#EBE6DD] flex items-center justify-center text-[#1A1A1A] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#8A8275] font-medium mb-1">
          <Ruler className="w-4 h-4 text-[#C5A880]" />
          <span>Measurement Chart</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl text-[#1A1A1A] font-normal mb-2">
          Eastern Fit &amp; Size Guide
        </h2>
        <p className="text-xs text-[#6B655B] font-light max-w-lg mb-6">
          Measurements provided are garment dimensions. For standard comfort fit in Eastern kurtas and shirts, choose a size 2 inches larger than your body measurement.
        </p>

        {/* Segmented Controls for Category & Unit */}
        <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-[#EFECE6] mb-6">
          <div className="flex items-center p-1 bg-[#F5F2EB]">
            <button
              type="button"
              onClick={() => setGenderTab('women')}
              className={`px-4 py-1.5 text-xs uppercase tracking-wider font-medium transition-all cursor-pointer ${
                genderTab === 'women' ? 'bg-[#1A1A1A] text-white shadow-sm' : 'text-[#666] hover:text-[#1A1A1A]'
              }`}
            >
              Women Ready-To-Wear
            </button>
            <button
              type="button"
              onClick={() => setGenderTab('men')}
              className={`px-4 py-1.5 text-xs uppercase tracking-wider font-medium transition-all cursor-pointer ${
                genderTab === 'men' ? 'bg-[#1A1A1A] text-white shadow-sm' : 'text-[#666] hover:text-[#1A1A1A]'
              }`}
            >
              Men Traditional Kurta
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#555]">
            <span>Unit:</span>
            <button
              type="button"
              onClick={() => setUnit('inches')}
              className={`px-2 py-0.5 border text-xs cursor-pointer ${
                unit === 'inches' ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white font-medium' : 'border-[#DDD] text-[#666]'
              }`}
            >
              Inches
            </button>
            <button
              type="button"
              onClick={() => setUnit('cm')}
              className={`px-2 py-0.5 border text-xs cursor-pointer ${
                unit === 'cm' ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white font-medium' : 'border-[#DDD] text-[#666]'
              }`}
            >
              CM
            </button>
          </div>
        </div>

        {/* Measurement Table */}
        <div className="overflow-x-auto">
          {genderTab === 'women' ? (
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#FAF8F5] border-b border-[#E5E0D8] text-[#1A1A1A] uppercase tracking-wider">
                  <th className="py-3 px-3 font-semibold">Size</th>
                  <th className="py-3 px-3 font-semibold">Chest</th>
                  <th className="py-3 px-3 font-semibold">Length</th>
                  <th className="py-3 px-3 font-semibold">Shoulder</th>
                  <th className="py-3 px-3 font-semibold">Waist</th>
                  <th className="py-3 px-3 font-semibold">Hip</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFECE6] text-[#4A453F] tabular-nums">
                {SIZE_CHART.women.map((row) => (
                  <tr key={row.size} className="hover:bg-[#FAF8F5]">
                    <td className="py-3 px-3 font-bold text-[#1A1A1A]">{row.size}</td>
                    <td className="py-3 px-3">{unit === 'inches' ? row.chest : `${Math.round(parseFloat(row.chest) * 2.54)} cm`}</td>
                    <td className="py-3 px-3">{unit === 'inches' ? row.length : `${Math.round(parseFloat(row.length) * 2.54)} cm`}</td>
                    <td className="py-3 px-3">{unit === 'inches' ? row.shoulder : `${Math.round(parseFloat(row.shoulder) * 2.54)} cm`}</td>
                    <td className="py-3 px-3">{unit === 'inches' ? row.waist : `${Math.round(parseFloat(row.waist) * 2.54)} cm`}</td>
                    <td className="py-3 px-3">{unit === 'inches' ? row.hip : `${Math.round(parseFloat(row.hip) * 2.54)} cm`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#FAF8F5] border-b border-[#E5E0D8] text-[#1A1A1A] uppercase tracking-wider">
                  <th className="py-3 px-3 font-semibold">Size</th>
                  <th className="py-3 px-3 font-semibold">Chest</th>
                  <th className="py-3 px-3 font-semibold">Length</th>
                  <th className="py-3 px-3 font-semibold">Shoulder</th>
                  <th className="py-3 px-3 font-semibold">Collar</th>
                  <th className="py-3 px-3 font-semibold">Sleeve</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFECE6] text-[#4A453F] tabular-nums">
                {SIZE_CHART.men.map((row) => (
                  <tr key={row.size} className="hover:bg-[#FAF8F5]">
                    <td className="py-3 px-3 font-bold text-[#1A1A1A]">{row.size}</td>
                    <td className="py-3 px-3">{unit === 'inches' ? row.chest : `${Math.round(parseFloat(row.chest) * 2.54)} cm`}</td>
                    <td className="py-3 px-3">{unit === 'inches' ? row.length : `${Math.round(parseFloat(row.length) * 2.54)} cm`}</td>
                    <td className="py-3 px-3">{unit === 'inches' ? row.shoulder : `${Math.round(parseFloat(row.shoulder) * 2.54)} cm`}</td>
                    <td className="py-3 px-3">{unit === 'inches' ? row.collar : `${Math.round(parseFloat(row.collar) * 2.54)} cm`}</td>
                    <td className="py-3 px-3">{unit === 'inches' ? row.sleeve : `${Math.round(parseFloat(row.sleeve) * 2.54)} cm`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Tip Box */}
        <div className="mt-6 p-4 bg-[#FAF9F5] border border-[#E8E3D9] text-xs text-[#524C44] space-y-1">
          <p className="font-semibold text-[#1A1A1A]">Need custom tailoring advice?</p>
          <p>
            You can reach our master bespoke stylists directly on WhatsApp at <strong>+92 300 0092749</strong> with your exact measurements.
          </p>
        </div>
      </div>
    </div>
  );
};
