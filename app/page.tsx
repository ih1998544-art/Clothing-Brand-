'use client';

import React from 'react';
import { StoreProvider } from '@/lib/store';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Header } from '@/components/Header';
import { HeroBanner } from '@/components/HeroBanner';
import { CategoryCurations } from '@/components/CategoryCurations';
import { ProductGrid } from '@/components/ProductGrid';
import { BrandStory } from '@/components/BrandStory';
import { Footer } from '@/components/Footer';
import { QuickViewModal } from '@/components/QuickViewModal';
import { SizeGuideModal } from '@/components/SizeGuideModal';
import { CartDrawer } from '@/components/CartDrawer';
import { CheckoutModal } from '@/components/CheckoutModal';
import { StoreLocatorModal } from '@/components/StoreLocatorModal';

export default function HomePage() {
  return (
    <StoreProvider>
      <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-[#1A1A1A]">
        {/* 1. Global Announcement & Currency Switcher Bar */}
        <AnnouncementBar />

        {/* 2. Top Bar Navigation (Strict 3-zone contract) */}
        <Header />

        <main className="flex-1">
          {/* 3. Luxury Campaign Editorial Hero Banner */}
          <HeroBanner />

          {/* 4. Curated Category Universes (Women Pret, Unstitched, Men, Fragrances) */}
          <CategoryCurations />

          {/* 5. Featured Creations Catalog & Product Grid (with instant filters, quick view, swatches) */}
          <ProductGrid />

          {/* 6. Heritage Craftsmanship & Editorial Atelier Section */}
          <BrandStory />
        </main>

        {/* 7. Comprehensive Brand Footer & VIP Newsletter Club */}
        <Footer />

        {/* 8. Interactive Modals & Slide-over Drawers */}
        <QuickViewModal />
        <SizeGuideModal />
        <CartDrawer />
        <CheckoutModal />
        <StoreLocatorModal />
      </div>
    </StoreProvider>
  );
}
