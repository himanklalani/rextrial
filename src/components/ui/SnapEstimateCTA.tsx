'use client';

import React from 'react';
import { trackEvent } from '@/lib/analytics';
import { siteSettings } from '@/lib/data/site-settings';

interface SnapEstimateCTAProps {
  modelName?: string;
  problemTitle?: string;
  className?: string;
}

export function SnapEstimateCTA({
  modelName,
  problemTitle,
  className = '',
}: SnapEstimateCTAProps) {
  const defaultText = `Hi Rex International, I need a diagnostic repair estimate. My printer is ${modelName ? `model: ${modelName}` : 'facing an issue'}${problemTitle ? ` (${problemTitle})` : ''}. Here is a photo/video of the printout and error light. Can you provide a repair estimate and timeline?`;

  const whatsappUrl = `https://wa.me/${siteSettings.whatsappNumber}?text=${encodeURIComponent(defaultText)}`;

  const handleClick = () => {
    trackEvent('whatsapp_click', {
      service: problemTitle || modelName || 'snap_estimate_cta',
      target_url: whatsappUrl,
    });
  };

  return (
    <div className={`bg-gradient-to-br from-brand-dark to-brand-green-dark text-brand-white-pure rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl border border-brand-green/30 relative overflow-hidden ${className}`}>
      <div className="absolute top-0 right-0 translate-x-8 -translate-y-8 w-40 h-40 bg-brand-green/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">📸</span>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-green">
              Fast Visual Diagnostic
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold font-outfit text-brand-white-pure mb-2 leading-tight">
            Send Error Photo on WhatsApp for Instant Estimate
          </h3>
          <p className="text-sm sm:text-base text-brand-gray-light/80 leading-relaxed">
            Take a quick photo of your printer's blinking lights, faded print sample, or paper jam. Our senior technicians diagnose the exact faulty component and reply with transparent pricing within 15 minutes.
          </p>
        </div>

        <div className="shrink-0 w-full md:w-auto">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className="group flex items-center justify-center gap-3 w-full md:w-auto py-4 px-8 rounded-full bg-brand-green text-brand-white-pure font-bold text-base hover:bg-brand-green-dark hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
              <circle cx="12" cy="13" r="3"/>
            </svg>
            <span>WhatsApp Photo Now</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
          <span className="block text-[11px] text-center text-brand-gray-light/60 mt-2 font-mono">
            Free 15-Min Photo Assessment • No Obligation
          </span>
        </div>
      </div>
    </div>
  );
}
