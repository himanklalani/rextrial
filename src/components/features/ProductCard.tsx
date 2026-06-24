import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link 
      href={`/store/${product.slug}`} 
      className="group flex flex-col overflow-hidden rounded-2xl bg-brand-white-pure border border-brand-gray/20 hover:border-brand-green/40 hover:shadow-lg transition-all duration-300"
    >
      {/* Image area */}
      <div className="relative w-full aspect-[4/3] bg-brand-white overflow-hidden">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-brand-dark/20 text-xs font-medium">Image Pending</span>
          </div>
        )}
        {!product.isAvailable && (
          <div className="absolute top-2 left-2 bg-brand-maroon text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            Out of Stock
          </div>
        )}
      </div>

      {/* Content area */}
      <div className="flex flex-col flex-1 p-3 sm:p-4 gap-1.5">
        <h2 className="text-sm sm:text-base font-bold font-outfit text-brand-dark leading-tight line-clamp-2">
          {product.name}
        </h2>
        <p className="text-[11px] sm:text-xs text-brand-dark-muted line-clamp-1 flex-grow">
          {product.shortDescription}
        </p>

        <div className="mt-2 pt-2 border-t border-brand-gray/15 flex items-center justify-between">
          <span className="text-xs sm:text-sm font-bold text-brand-green leading-tight">
            {product.priceRange.split(' - ')[0]}
            <span className="hidden sm:inline"> - {product.priceRange.split(' - ')[1]}</span>
          </span>
          <span className="flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-brand-dark group-hover:text-brand-green transition-colors duration-200">
            View
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform duration-200">
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
