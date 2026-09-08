import { Metadata } from 'next';
import Link from 'next/link';
import { repairs } from '@/lib/data/repairs';
import TextType from '@/components/ui/TextType';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { SnapEstimateCTA } from '@/components/ui/SnapEstimateCTA';
import { getBaseUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Printer Repair Services & Diagnostics Mumbai | Rex International',
  description: 'Fast, transparent printer repair in Mumbai. Epson ink tank chemical nozzle flush, HP laser fuser repair, TVS billing printhead repinning. Starting at ₹800.',
  alternates: { canonical: '/repairs' }
};

export default function RepairsIndexPage() {
  const baseUrl = getBaseUrl();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Rex International Printer Repair & Diagnostics Directory",
    "itemListElement": repairs.map((rep, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": rep.title,
      "url": `${baseUrl}/repairs/${rep.slug}`
    }))
  };

  return (
    <main className="flex-1 bg-brand-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Header */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24 bg-brand-dark text-brand-white-pure border-b-4 border-brand-green">
        <div className="container-inner max-w-6xl mx-auto px-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green border border-brand-green/30 px-3.5 py-1.5 rounded-full inline-block mb-6">
            Component-Level Engineering
          </span>
          <TextType
            as="h1"
            className="text-4xl sm:text-5xl md:text-7xl font-bold font-outfit tracking-tight mb-6 leading-[1.05]"
            text="Transparent Diagnostics. Real Component Repairs."
            typingSpeed={35}
            startOnVisible={true}
            loop={false}
          />
          <p className="text-lg md:text-2xl text-brand-gray-light/80 max-w-3xl font-light leading-relaxed mb-8">
            Don't throw away a ₹15,000 printer over an ₹800 faulty component. Rex International diagnoses root-cause hardware failures, repairs logic boards and printheads at the chip level, and publishes transparent starting rates.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href="/repairs/walk-in-mulund"
              className="py-4 px-8 rounded-full bg-brand-green text-brand-white-pure font-bold text-center text-sm md:text-base hover:bg-brand-green-dark transition-colors"
            >
              Mulund West Walk-In Workshop Info →
            </Link>
            <a
              href="#problem-directory"
              className="py-4 px-8 rounded-full bg-brand-white-pure/10 text-brand-white-pure border border-brand-white-pure/20 font-bold text-center text-sm md:text-base hover:bg-brand-white-pure/20 transition-colors"
            >
              Browse Common Problem Diagnoses
            </a>
          </div>
        </div>
      </section>

      {/* Common Problems Directory */}
      <section id="problem-directory" className="section-padding bg-brand-white-pure">
        <div className="container-inner max-w-6xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-outfit text-brand-dark mb-4 tracking-tight">
              Select Your Printer Problem
            </h2>
            <p className="text-brand-dark-muted text-lg">
              Identify your printer symptoms below for detailed technical root-cause analyses, turnaround timelines, and upfront pricing.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {repairs.map((rep) => (
              <div
                key={rep.slug}
                className="flex flex-col bg-brand-white rounded-3xl p-8 border border-brand-gray/20 shadow-sm hover:shadow-xl hover:border-brand-green/40 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-green bg-brand-green/10 px-3 py-1 rounded-full">
                    {rep.printerCategory}
                  </span>
                  <span className="text-sm font-bold font-outfit text-brand-dark">
                    Starts {rep.startingPrice}
                  </span>
                </div>

                <h3 className="text-2xl font-bold font-outfit text-brand-dark mb-3">
                  {rep.headline}
                </h3>
                <p className="text-sm text-brand-dark-muted leading-relaxed mb-6 flex-grow">
                  {rep.subheadline}
                </p>

                <div className="border-t border-brand-gray/20 pt-4 mb-6 space-y-1.5 text-xs text-brand-dark-muted">
                  <div className="flex justify-between">
                    <span className="font-semibold text-brand-dark">Turnaround:</span>
                    <span className="text-brand-green font-semibold">{rep.turnaroundTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-brand-dark">Warranty:</span>
                    <span>{rep.warranty}</span>
                  </div>
                </div>

                <Link
                  href={`/repairs/${rep.slug}`}
                  className="w-full text-center py-3.5 px-6 rounded-xl bg-brand-dark text-brand-white-pure font-bold text-sm hover:bg-brand-green transition-colors"
                >
                  View Diagnosis & Pricing →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Snap & Estimate Banner */}
      <section className="section-padding bg-brand-gray-light/30 border-t border-brand-gray/20">
        <div className="container-inner max-w-5xl mx-auto px-4">
          <SnapEstimateCTA className="w-full" />
        </div>
      </section>
    </main>
  );
}
