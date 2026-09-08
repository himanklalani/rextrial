import React from 'react';
import { getSiteSettings } from '@/lib/data/queries';
import { WhatsAppCTA } from './WhatsAppCTA';
import { createWhatsAppGeneralUrl } from '@/lib/utils';
import { TrackedLink } from './TrackedLink';

export async function ContactCard() {
  const settings = await getSiteSettings();
  
  return (
    <div className="card-base p-8 bg-brand-green-dark text-brand-white-pure border-none shadow-xl">
      <h3 className="text-2xl font-bold font-outfit mb-8 text-brand-white-pure">Quick Contact</h3>
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="mt-1 text-brand-gray-light/60">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          </div>
          <div>
            <h4 className="font-bold text-xs text-brand-gray-light/60 uppercase tracking-wider mb-1">Phones</h4>
            <div className="flex flex-wrap gap-x-2 font-medium text-lg text-brand-white-pure">
              {settings.phones.map((phone, idx) => (
                <React.Fragment key={phone}>
                  <TrackedLink
                    href={`tel:${phone.replace(/\s+/g, '')}`}
                    eventType="phone_click"
                    eventLabel={`contact_card_phone_${phone}`}
                    className="hover:text-brand-green transition-colors"
                  >
                    {phone}
                  </TrackedLink>
                  {idx < settings.phones.length - 1 && <span>/</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="mt-1 text-brand-gray-light/60">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
          </div>
          <div>
            <h4 className="font-bold text-xs text-brand-gray-light/60 uppercase tracking-wider mb-1">Email</h4>
            <TrackedLink
              href={`mailto:${settings.email}`}
              eventType="email_click"
              eventLabel="contact_card_email"
              className="font-medium text-lg text-brand-white-pure hover:text-brand-green transition-colors block"
            >
              {settings.email}
            </TrackedLink>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="mt-1 text-brand-gray-light/60">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          </div>
          <div>
            <h4 className="font-bold text-xs text-brand-gray-light/60 uppercase tracking-wider mb-1">Location</h4>
            <p className="font-medium leading-relaxed text-brand-white-pure">{settings.address}</p>
          </div>
        </div>
      </div>
      <div className="pt-8 mt-8 border-t border-brand-white-pure/10">
        <WhatsAppCTA url={createWhatsAppGeneralUrl()} label="Message on WhatsApp" className="w-full" variant="accent" />
      </div>
    </div>
  );
}
