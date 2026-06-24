import React from 'react';
import { Service } from '@/types';
import { createWhatsAppServiceUrl } from '@/lib/utils';
import Link from 'next/link';
import { Wrench, ClipboardCheck, Truck, Settings } from 'lucide-react';

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  "scat-repair":  Wrench,
  "scat-amc":     ClipboardCheck,
  "scat-onsite":  Truck,
};

export function ServiceCard({ service }: { service: Service }) {
  const whatsappUrl = createWhatsAppServiceUrl(service.name, service.startingPrice);
  const IconComponent = CATEGORY_ICONS[service.categoryId] || Settings;

  return (
    <div className="group relative flex flex-col bg-brand-white-pure rounded-2xl border border-brand-gray/20 hover:border-brand-green/40 hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Top accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-brand-green to-brand-green/30" />

      <div className="flex flex-col flex-1 p-5 sm:p-6">
        {/* Icon + Title row */}
        <div className="flex items-start gap-3 mb-3">
          <div className="flex-shrink-0 mt-0.5 w-8 h-8 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green">
            <IconComponent size={16} strokeWidth={2.5} />
          </div>
          <Link href={`/services/${service.slug}`}>
            <h2 className="text-base sm:text-lg font-bold font-outfit text-brand-dark leading-snug hover:text-brand-green transition-colors">
              {service.name}
            </h2>
          </Link>
        </div>

        {/* Description */}
        <p className="text-sm text-brand-dark-muted leading-relaxed mb-4 flex-grow">
          {service.shortDescription}
        </p>

        {/* Feature pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {service.features.map((f) => (
            <span key={f} className="text-[11px] font-semibold bg-brand-green/10 text-brand-green px-2 py-0.5 rounded-full border border-brand-green/20">
              {f}
            </span>
          ))}
        </div>

        {/* Price + CTA row */}
        <div className="flex items-center justify-between pt-4 border-t border-brand-gray/15 mt-auto">
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-widest text-brand-dark/40">From</span>
            <span className="text-base font-bold text-brand-green">{service.startingPrice}</span>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-brand-dark text-brand-white-pure text-xs font-bold px-3 py-2 rounded-lg hover:bg-brand-green transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            Inquire
          </a>
        </div>
      </div>
    </div>
  );
}
