import Link from 'next/link';
import { Suspense } from 'react';
import { Metadata } from 'next';
import ScrollytellHero from '@/components/features/ScrollytellHero';
import { WhatsAppCTA } from '@/components/ui/WhatsAppCTA';
import { createWhatsAppGeneralUrl } from '@/lib/utils';
import { ScrollChoreography } from '@/components/ui/scroll-choreography';
import LegacyTrustSection from '@/components/features/LegacyTrustSection';
import HardwareSection from '@/components/features/HardwareSection';
import FinalCTA from '@/components/features/FinalCTA';

import HeroOverlay from '@/components/features/HeroOverlay';

export const metadata: Metadata = {
  title: 'Printer Repair & AMC Services in Mumbai | Rex International',
  description: 'Rex International — Mumbai’s most trusted printer specialist since 1980. Expert repair, corporate AMC contracts & sales of dotmatrix, laser, and ink tank printers. Mulund, Thane & Mumbai-wide service.',
  alternates: { canonical: '/' },
  keywords: ['printer repair Mumbai', 'dotmatrix printer repair Mumbai', 'printer AMC Mumbai', 'laser printer service Mumbai', 'ink tank printer Mumbai', 'Rex International']
};

// ─── Page ─────────────────────────────────────────────────────────────────────

const choreoImages = {
  topLeft: "https://images.unsplash.com/photo-1741454570867-4a10f31fc5e3?q=100&w=2832&fm=webp&auto=format&fit=crop",
  topRight: "https://images.unsplash.com/photo-1755456068400-fbcdce2f795a?q=100&w=2832&fm=webp&auto=format&fit=crop",
  bottomLeft: "https://images.unsplash.com/photo-1755456068249-13d384440902?q=100&w=2832&fm=webp&auto=format&fit=crop",
  bottomRight: "https://images.unsplash.com/photo-1741454570904-a22d9d6ea511?q=100&w=2832&fm=webp&auto=format&fit=crop",
};

export default function HomePage() {
  return (
    <main className="flex-1 flex flex-col">
      {/*
        ScrollytellHero:
          - Renders a full-screen <canvas> fixed to the viewport.
          - Scrubs through 186 frames as the user scrolls.
          - After the final frame, the <HeroContent> children fade in on top.
      */}
      <Suspense fallback={<div className="min-h-screen bg-brand-white" />}>
        <ScrollytellHero>
          <HeroOverlay />
        </ScrollytellHero>
      </Suspense>

      {/* Legacy/Trust Section replaces the old static badges */}
      <LegacyTrustSection />

      {/* Scroll Choreography Section */}
      <section className="relative w-full bg-brand-white z-10">
        <ScrollChoreography images={choreoImages} />
      </section>

      {/* Hardware Section */}
      <HardwareSection />

      {/* Final CTA */}
      <FinalCTA />
    </main>
  );
}
