'use client';

import React from 'react';
import { trackEvent } from '@/lib/analytics';

interface WhatsAppShareButtonProps {
  title: string;
  url?: string;
  context?: 'repair' | 'blog' | 'general';
  label?: string;
  className?: string;
}

export function WhatsAppShareButton({
  title,
  url = 'https://www.rexinternational.store',
  context = 'general',
  label = 'Forward on WhatsApp',
  className = '',
}: WhatsAppShareButtonProps) {
  const targetUrl = url;

  let shareText = '';
  if (context === 'repair') {
    shareText = `Check out this printer repair guide / workshop in Mulund West (Rex International):\n\n*${title}*\n${targetUrl}\n\n📍 Office No. 8, Kamala Nehru Shopping Centre, Mulund West, Mumbai. Mon–Sat 10am–6:30pm.`;
  } else if (context === 'blog') {
    shareText = `Check out this technical printer guide by Rex International (Mulund West):\n\n*${title}*\n${targetUrl}\n\nIndustrial printer specialists since 1980.`;
  } else {
    shareText = `Check out ${title} from Rex International (Mulund West):\n${targetUrl}`;
  }

  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(shareText)}`;

  const handleClick = () => {
    trackEvent('whatsapp_share', {
      context,
      title,
      target_url: targetUrl,
    });
  };

  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label={`Share ${title} on WhatsApp`}
      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-brand-green/10 hover:bg-brand-green border border-brand-green/30 hover:border-brand-green text-brand-green hover:text-brand-dark transition-all duration-200 text-xs font-mono font-bold shadow-sm group cursor-pointer ${className}`}
      title="Forward this guide directly on WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="shrink-0 transition-transform duration-200 group-hover:scale-110"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
      </svg>
      <span>{label}</span>
    </a>
  );
}
