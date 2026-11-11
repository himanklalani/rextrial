"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { createWhatsAppProductUrl } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';

export function ProductCard({ product }: { product: Product }) {
  const whatsappUrl = createWhatsAppProductUrl(product.name);

  const handleWhatsAppInquiry = () => {
    trackEvent('whatsapp_click', {
      label: 'Inquire Quote',
      product: product.name,
      url: whatsappUrl,
    });
  };

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-brand-white-pure border border-brand-gray/25 hover:border-brand-green/30 hover:shadow-lg transition-all duration-300">
      {/* Image container */}
      <Link 
        href={`/store/${product.slug}`} 
        className="relative w-full aspect-[4/3] bg-gradient-to-b from-[#FAFAFA] to-[#F3F4F6] p-4 flex items-center justify-center overflow-hidden block border-b border-brand-gray/15"
      >
        {product.imageUrl ? (
          <div className="relative w-full h-full">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-contain p-2 mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-brand-dark/20 text-xs font-medium">Image Pending</span>
          </div>
        )}
        {!product.isAvailable ? (
          <div className="absolute top-3 left-3 bg-brand-maroon text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            Out of Stock
          </div>
        ) : (
          <div className="absolute top-3 left-3 bg-brand-white-pure/90 backdrop-blur-sm text-brand-dark-muted text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md border border-brand-gray/30">
            B2B • In Stock
          </div>
        )}
      </Link>

      {/* Content area */}
      <div className="flex flex-col flex-1 p-4 sm:p-5">
        {/* Title */}
        <Link href={`/store/${product.slug}`}>
          <h2 className="text-sm sm:text-base font-bold font-outfit text-brand-dark leading-snug line-clamp-2 hover:text-brand-green transition-colors min-h-[2.75rem] flex items-center">
            {product.name}
          </h2>
        </Link>

        {/* Description */}
        <p className="text-xs text-brand-dark-muted line-clamp-2 leading-relaxed min-h-[2.25rem] mt-1 mb-4">
          {product.shortDescription}
        </p>

        {/* Action Row: Pure clickable text links (No box, no container) */}
        <div className="mt-auto pt-3 border-t border-brand-gray/15 flex items-center justify-between gap-2">
          {/* Inquire Quote: Pure Clickable Text with WhatsApp icon */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsAppInquiry}
            className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-bold text-brand-green hover:text-emerald-600 transition-colors cursor-pointer group/wa"
            aria-label={`Inquire Quote for ${product.name} on WhatsApp`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="text-emerald-600 group-hover/wa:scale-110 transition-transform duration-200">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
            <span className="group-hover/wa:underline">Inquire Quote</span>
          </a>

          {/* View Specs: Pure Clickable Text */}
          <Link
            href={`/store/${product.slug}`}
            className="inline-flex items-center gap-1 text-xs sm:text-[13px] font-semibold text-brand-dark hover:text-brand-green transition-colors cursor-pointer group/specs"
          >
            <span className="group-hover/specs:underline">View Specs</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover/specs:translate-x-0.5 transition-transform duration-200">
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
