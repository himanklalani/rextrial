import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { WhatsAppCTA } from '@/components/ui/WhatsAppCTA';
import { createWhatsAppGeneralUrl } from '@/lib/utils';
import { siteSettings } from '@/lib/data/site-settings';

export const metadata: Metadata = {
  title: 'Page Not Found | Rex International',
  description: 'The requested page could not be found. Explore Rex International printer repair services, corporate AMCs, and hardware store in Mumbai.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  const whatsappUrl = createWhatsAppGeneralUrl();

  return (
    <main className="flex-1 bg-brand-white min-h-[75vh] flex items-center justify-center py-20 px-6">
      <div className="max-w-2xl mx-auto text-center">
        {/* Error Badge */}
        <span className="inline-block text-xs font-mono font-bold uppercase tracking-[0.2em] text-brand-green bg-brand-green/10 border border-brand-green/30 px-4 py-1.5 rounded-full mb-6">
          Error 404 &bull; Page Not Found
        </span>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl font-outfit font-bold text-brand-dark mb-4 tracking-tight leading-tight">
          Looking for Printer Service or Hardware?
        </h1>

        {/* Subtitle */}
        <p className="text-brand-dark-muted text-base sm:text-lg mb-10 max-w-lg mx-auto leading-relaxed">
          The specific link you followed may have moved or been updated. Choose from our active enterprise and retail solutions below:
        </p>

        {/* Dual-Recovery CTAs (B2B & B2C) */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8 text-left">
          {/* B2B Card */}
          <Link
            href="/services/corporate-amc"
            className="card-base p-6 border border-brand-gray/30 hover:border-brand-green hover:shadow-md transition-all group bg-brand-white-pure"
          >
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-green block mb-1">
              Enterprise & B2B
            </span>
            <h2 className="text-lg font-bold font-outfit text-brand-dark group-hover:text-brand-green transition-colors mb-2">
              Corporate Printer AMC &rarr;
            </h2>
            <p className="text-xs text-brand-dark-muted leading-relaxed">
              Annual contracts, 4-hour breakdown SLAs, and multi-brand fleet coverage for offices & warehouses.
            </p>
          </Link>

          {/* B2C Card */}
          <Link
            href="/services"
            className="card-base p-6 border border-brand-gray/30 hover:border-brand-green hover:shadow-md transition-all group bg-brand-white-pure"
          >
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-green block mb-1">
              Retail & Repair
            </span>
            <h2 className="text-lg font-bold font-outfit text-brand-dark group-hover:text-brand-green transition-colors mb-2">
              Printer Repair & Services &rarr;
            </h2>
            <p className="text-xs text-brand-dark-muted leading-relaxed">
              Dotmatrix head rebuilds, laser servicing, and ink tank nozzle cleaning starting at ₹800.
            </p>
          </Link>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 border-t border-brand-gray/20">
          <Link href="/" className="btn-secondary w-full sm:w-auto text-sm px-6 py-3">
            Return to Homepage
          </Link>
          <WhatsAppCTA
            url={whatsappUrl}
            label="Inquire on WhatsApp"
            variant="accent"
            className="w-full sm:w-auto text-sm px-6 py-3"
          />
        </div>

        {/* Help Note */}
        <p className="text-xs text-brand-dark-muted mt-8">
          Need immediate assistance? Call our Mulund workshop directly at{' '}
          <a
            href={`tel:${siteSettings.phones[0].replace(/\s+/g, '')}`}
            className="font-bold text-brand-dark hover:text-brand-green transition-colors underline"
          >
            {siteSettings.phones[0]}
          </a>
        </p>
      </div>
    </main>
  );
}
