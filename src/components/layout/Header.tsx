'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { navLinks, siteSettings } from '@/lib/data/site-settings';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="border-b border-brand-gray/30 bg-brand-white/95 backdrop-blur-md sticky top-0 z-50">
      <div className="container-inner h-20 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-brand-green font-outfit tracking-tight hover:text-brand-green-light transition-colors">
          {siteSettings.name.substring(0, 8)}<span className="text-brand-maroon">.</span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-semibold text-brand-dark hover:text-brand-green transition-colors uppercase tracking-wide">
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className="btn-primary py-2.5 px-6 text-sm">
            Get in Touch
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-brand-dark hover:text-brand-green focus:outline-none"
          aria-label="Toggle Menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-b border-brand-gray/30 bg-brand-white-pure">
          <nav className="flex flex-col p-6 space-y-4">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className="text-base font-semibold text-brand-dark hover:text-brand-green transition-colors uppercase tracking-wide py-2 border-b border-brand-gray/10 last:border-none"
              >
                {link.label}
              </Link>
            ))}
            <Link 
              href="/contact" 
              onClick={() => setIsOpen(false)}
              className="btn-primary w-full text-center py-3"
            >
              Get in Touch
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
