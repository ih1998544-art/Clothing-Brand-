'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { ArrowRight, Check, MapPin, Phone, Mail, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setSelectedCategory, setStoreLocatorOpen, setSizeGuideOpen } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
  };

  const handleNav = (cat: string) => {
    setSelectedCategory(cat);
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#141412] text-[#E5E0D8] pt-16 pb-12 border-t border-[#292925]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter & VIP Member Banner */}
        <div className="pb-14 border-b border-[#2C2C28] grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C5A880] font-medium mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Privilege Circle</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
              Receive 10% Off Your First Order
            </h3>
            <p className="text-xs text-[#AAA397] mt-1 font-light max-w-md">
              Subscribe for private preview access to our seasonal festive lawn launches, fragrance drops, and bespoke couture invitations.
            </p>
          </div>

          <div>
            {subscribed ? (
              <div className="p-4 bg-[#23231F] border border-[#3E3C36] flex items-center gap-3 text-xs text-[#EAE5DC]">
                <div className="w-7 h-7 rounded-full bg-[#2E6B47] text-white flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-white">Welcome to Zariya Privilege!</p>
                  <p className="text-[#AAA397]">Use code <strong className="text-[#C5A880]">WELCOME10</strong> at checkout for Rs. 1,000 off.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 bg-[#23231F] border border-[#3E3C36] px-4 py-3 text-xs text-white placeholder-[#777] focus:outline-none focus:border-[#C5A880]"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#FAF8F5] hover:bg-white text-[#1A1A1A] text-xs font-semibold uppercase tracking-wider transition-colors shrink-0 cursor-pointer flex items-center gap-1.5"
                >
                  <span>Join</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Middle Footer Navigation Links */}
        <div className="py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-xs">
          {/* Brand Info */}
          <div className="space-y-4">
            <span className="font-serif text-2xl tracking-[0.25em] text-white uppercase font-medium">
              ZARIYA
            </span>
            <p className="text-xs text-[#AAA397] leading-relaxed font-light">
              Crafted with reverence for Subcontinental textile heritage. Defining modern Eastern elegance with unmatched artisanal finesse.
            </p>
            <div className="pt-2 flex items-center gap-4 text-[#AAA397]">
              <span>Karachi</span>
              <span>·</span>
              <span>Lahore</span>
              <span>·</span>
              <span>Islamabad</span>
              <span>·</span>
              <span>Dubai</span>
            </div>
          </div>

          {/* Collections */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm text-white uppercase tracking-wider font-semibold">
              Collections
            </h4>
            <ul className="space-y-2 text-[#AAA397]">
              <li>
                <button onClick={() => handleNav('unstitched')} className="hover:text-white transition-colors cursor-pointer">
                  Unstitched Festive Lawn &apos;26
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('women-pret')} className="hover:text-white transition-colors cursor-pointer">
                  Ready-To-Wear Pret Kurtas
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('men')} className="hover:text-white transition-colors cursor-pointer">
                  Men&apos;s Royal Latha &amp; Shalwar
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('men')} className="hover:text-white transition-colors cursor-pointer">
                  Raw Silk Embroidered Waistcoats
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('fragrances')} className="hover:text-white transition-colors cursor-pointer">
                  Artisanal Oud &amp; Attar Perfumes
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('shawls')} className="hover:text-white transition-colors cursor-pointer">
                  Pashmina &amp; Kashmiri Shawls
                </button>
              </li>
            </ul>
          </div>

          {/* Client Services */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm text-white uppercase tracking-wider font-semibold">
              Client Services
            </h4>
            <ul className="space-y-2 text-[#AAA397]">
              <li>
                <button onClick={() => setSizeGuideOpen(true)} className="hover:text-white transition-colors cursor-pointer">
                  Size Guide &amp; Fit Measurements
                </button>
              </li>
              <li>
                <button onClick={() => setStoreLocatorOpen(true)} className="hover:text-white transition-colors cursor-pointer">
                  Find a Flagship Boutique
                </button>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Cash on Delivery (COD) Guidelines
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  7-Day Seamless Return &amp; Exchange
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Track Consignment (TCS / Leopards)
                </span>
              </li>
            </ul>
          </div>

          {/* Contact Concierge */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm text-white uppercase tracking-wider font-semibold">
              Atelier Concierge
            </h4>
            <div className="space-y-2.5 text-[#AAA397]">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <span>WhatsApp: +92 300 0092749<br /><span className="text-[11px] text-[#777]">Mon - Sun: 10:00 AM - 11:00 PM PKT</span></span>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <span>concierge@zariya-luxury.com</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <span>Dolmen Mall Clifton, Karachi, Pakistan</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment icons */}
        <div className="pt-8 border-t border-[#252522] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#7A746B]">
          <p>© {new Date().getFullYear()} ZARIYA Luxury Eastern Atelier. All rights reserved.</p>

          <div className="flex items-center gap-4 text-[#999]">
            <span className="bg-[#242420] px-2 py-0.5 border border-[#3E3C36] text-[10px] text-[#DDD]">Cash On Delivery</span>
            <span className="bg-[#242420] px-2 py-0.5 border border-[#3E3C36] text-[10px] text-[#DDD]">Visa / Mastercard</span>
            <span className="bg-[#242420] px-2 py-0.5 border border-[#3E3C36] text-[10px] text-[#DDD]">JazzCash / EasyPaisa</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
