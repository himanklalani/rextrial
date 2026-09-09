import { Metadata } from 'next';
import Link from 'next/link';
import { siteSettings } from '@/lib/data/site-settings';
import { getBaseUrl } from '@/lib/seo';
import TextType from '@/components/ui/TextType';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { SnapEstimateCTA } from '@/components/ui/SnapEstimateCTA';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { WhatsAppShareButton } from '@/components/ui/WhatsAppShareButton';

export const metadata: Metadata = {
  title: 'Printer Repair Shop Mulund West | Walk-In Diagnostics | Rex International',
  description: 'Walk-in printer repair workshop in Mulund West. Fast 30-minute bench diagnostic, No Fix No Fee, Epson, HP, Canon, TVS. 2 mins from Mulund Station.',
  alternates: { canonical: '/repairs/walk-in-mulund' },
  keywords: [
    'printer repair shop near me',
    'printer repair Mulund West',
    'Epson printer service Mulund',
    'HP printer repair Mulund',
    'printer repair Kamala Nehru shopping centre',
    'dotmatrix head repair Mumbai'
  ]
};

export default function MulundWalkInPage() {
  const baseUrl = getBaseUrl();
  const mapsUrl = siteSettings.googleMapsUrl;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${baseUrl}/repairs/walk-in-mulund#workshop`,
    "name": "Rex International - Printer Repair Workshop Mulund West",
    "image": `${baseUrl}/og-image.jpg`,
    "url": `${baseUrl}/repairs/walk-in-mulund`,
    "hasMap": siteSettings.googleMapsUrl,
    "telephone": siteSettings.phones[0],
    "priceRange": "₹₹",
    "sameAs": siteSettings.directories || [],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Office No. 8, Ground Floor, Next to Vikas Centre, Kamala Nehru Shopping Centre, Netaji Subhash Road",
      "addressLocality": "Mulund West, Mumbai",
      "postalCode": "400080",
      "addressRegion": "Maharashtra",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 19.1743158,
      "longitude": 72.954961
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "10:00",
        "closes": "18:30"
      }
    ],
    "description": "Walk-in printer diagnostic and repair workshop in Mulund West. Specializing in component-level printhead re-pinning, ink tank nozzle flushes, and laser fuser repairs."
  };

  return (
    <main className="flex-1 bg-brand-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Visual Breadcrumb */}
      <div className="bg-brand-dark pt-28 pb-4 border-b border-brand-white-pure/10">
        <div className="container-inner max-w-6xl mx-auto px-4">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-xs font-mono text-brand-gray-light/60">
              <li><Link href="/" className="hover:text-brand-green transition-colors">Home</Link></li>
              <li>/</li>
              <li><Link href="/repairs" className="hover:text-brand-green transition-colors">Repairs</Link></li>
              <li>/</li>
              <li className="text-brand-white-pure font-bold truncate">Mulund Walk-In Workshop</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero Header */}
      <section className="py-16 md:py-24 bg-brand-dark text-brand-white-pure border-b-4 border-brand-green">
        <div className="container-inner max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green border border-brand-green/30 px-3.5 py-1.5 rounded-full">
              Walk-In Diagnostic Center
            </span>
            <span className="text-xs font-mono text-brand-gray-light/60">
              2 Mins from Mulund Railway Station West
            </span>
          </div>

          <TextType
            as="h1"
            className="text-4xl sm:text-5xl md:text-7xl font-bold font-outfit tracking-tight mb-6 leading-[1.05]"
            text="Walk-In Printer Diagnostics in Mulund West."
            typingSpeed={35}
            startOnVisible={true}
            loop={false}
          />
          <p className="text-lg md:text-2xl text-brand-gray-light/80 max-w-3xl font-light leading-relaxed mb-8">
            Don't wait days for a field technician. Walk into our central Mulund West workshop with your printer or printhead for a fast, free 30-minute bench diagnostic with transparent estimates and genuine replacement parts.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-4 px-8 rounded-full bg-brand-green text-brand-white-pure font-bold text-center text-sm md:text-base hover:bg-brand-green-dark transition-colors flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span>Get Directions to Workshop</span>
            </a>
            <TrackedLink
              href={`tel:${siteSettings.phones[0].replace(/\s+/g, '')}`}
              eventType="phone_click"
              eventLabel="mulund_page_call_desk"
              className="py-4 px-8 rounded-full bg-brand-white-pure/10 text-brand-white-pure border border-brand-white-pure/20 font-bold text-center text-sm md:text-base hover:bg-brand-white-pure/20 transition-colors"
            >
              Call Workshop Desk: {siteSettings.phones[0]}
            </TrackedLink>
            <WhatsAppShareButton
              title="Rex International Printer Workshop (Mulund West)"
              url={`${baseUrl}/repairs/walk-in-mulund`}
              context="repair"
              label="Forward Workshop Address"
              className="py-3.5 px-6 rounded-full self-center sm:self-auto"
            />
          </div>
        </div>
      </section>

      {/* Workshop Highlights Strip */}
      <section className="py-12 bg-brand-white-pure border-b border-brand-gray/20">
        <div className="container-inner max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="border-l-4 border-brand-green pl-4">
              <span className="block text-2xl font-bold font-outfit text-brand-dark">30 Mins</span>
              <span className="text-xs text-brand-dark-muted font-medium">Free Bench Diagnostic</span>
            </div>
            <div className="border-l-4 border-brand-green pl-4">
              <span className="block text-2xl font-bold font-outfit text-brand-dark">No Fix No Fee</span>
              <span className="text-xs text-brand-dark-muted font-medium">100% Risk-Free Policy</span>
            </div>
            <div className="border-l-4 border-brand-green pl-4">
              <span className="block text-2xl font-bold font-outfit text-brand-dark">Mon–Sat</span>
              <span className="text-xs text-brand-dark-muted font-medium">10:00 AM – 6:30 PM</span>
            </div>
            <div className="border-l-4 border-brand-green pl-4">
              <span className="block text-2xl font-bold font-outfit text-brand-dark">45+ Years</span>
              <span className="text-xs text-brand-dark-muted font-medium">Heritage in Mulund</span>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Landmark Guidance */}
      <section className="section-padding bg-brand-white">
        <div className="container-inner max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-green mb-2 block">
                How to Reach Us
              </span>
              <h2 className="text-3xl md:text-5xl font-bold font-outfit text-brand-dark mb-6 tracking-tight">
                Exact Landmark Directions
              </h2>
              <div className="prose text-brand-dark-muted leading-relaxed space-y-4 mb-8">
                <p>
                  Our workshop is situated in the heart of commercial Mulund West, easily accessible from Mulund Railway Station, LBS Marg, and Eastern Express Highway.
                </p>
                <div className="bg-brand-gray-light/20 p-6 rounded-2xl border border-brand-gray/20">
                  <h3 className="text-base font-bold text-brand-dark mb-2 font-outfit">
                    Full Workshop Address:
                  </h3>
                  <p className="font-mono text-sm text-brand-dark font-medium leading-relaxed">
                    REX INTERNATIONAL<br />
                    Office No. 8, Ground Floor, Next to Vikas Centre,<br />
                    Kamala Nehru Shopping Centre, Netaji Subhash Road,<br />
                    Mulund West, Mumbai, Maharashtra 400080.
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-sm text-brand-dark-muted">
                <div className="flex items-start gap-3">
                  <span className="text-brand-green font-bold shrink-0">📍 By Train:</span>
                  <span>Alight at Mulund Railway Station (West side). Walk down Netaji Subhash Road towards Vikas Centre. We are inside Kamala Nehru Shopping Centre on the Ground Floor (2-minute walk).</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-brand-green font-bold shrink-0">🚗 By Car / Bike:</span>
                  <span>Take Netaji Subhash Road from LBS Marg or MG Road junction. Ample municipal two-wheeler and four-wheeler parking is available nearby.</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-brand-green font-bold shrink-0">🕒 Timing:</span>
                  <span className="font-semibold text-brand-dark">Monday through Saturday: 10:00 AM to 6:30 PM. (Closed Sundays).</span>
                </div>
              </div>
            </div>

            {/* Right Card: Quick Actions */}
            <div className="lg:col-span-5 bg-brand-white-pure p-8 rounded-3xl border border-brand-gray/20 shadow-xl space-y-6">
              <h3 className="text-2xl font-bold font-outfit text-brand-dark">
                Planning a Visit Today?
              </h3>
              <p className="text-sm text-brand-dark-muted leading-relaxed">
                Drop off your machine in the morning and pick it up on your commute back. Bring your power cable and any sample defective printouts.
              </p>

              <div className="space-y-3 pt-2">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-xl bg-brand-dark text-brand-white-pure font-bold text-sm text-center block hover:bg-brand-green transition-colors"
                >
                  Open in Google Maps App →
                </a>
                <TrackedLink
                  href={`tel:${siteSettings.phones[0].replace(/\s+/g, '')}`}
                  eventType="phone_click"
                  eventLabel="mulund_card_direct_call"
                  className="w-full py-3.5 px-6 rounded-xl bg-brand-gray-light/20 text-brand-dark font-bold text-sm text-center block hover:bg-brand-gray-light/40 transition-colors"
                >
                  Call Ahead: {siteSettings.phones[0]}
                </TrackedLink>
              </div>

              <div className="pt-4 border-t border-brand-gray/20 text-xs text-brand-dark-muted space-y-1">
                <div className="flex justify-between">
                  <span>Chemist / Billing Printers:</span>
                  <span className="text-brand-green font-bold">2-Hr Express Counter</span>
                </div>
                <div className="flex justify-between">
                  <span>Ink Tank Chemical Flush:</span>
                  <span className="text-brand-dark font-semibold">Same-Day Service</span>
                </div>
                <div className="flex justify-between">
                  <span>Laser Fuser Re-Sleeving:</span>
                  <span className="text-brand-dark font-semibold">2–4 Hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Snap & Estimate Integration */}
      <section className="section-padding bg-brand-gray-light/30 border-t border-brand-gray/20">
        <div className="container-inner max-w-5xl mx-auto px-4">
          <SnapEstimateCTA
            problemTitle="Walk-In Workshop Mulund West"
            className="w-full"
          />
        </div>
      </section>
    </main>
  );
}
