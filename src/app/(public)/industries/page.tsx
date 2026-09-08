import { Metadata } from 'next';
import Link from 'next/link';
import { industries } from '@/lib/data/industries';
import { caseStudies } from '@/lib/data/case-studies';
import TextType from '@/components/ui/TextType';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { getBaseUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Industry Vertical Printing Solutions & Fleet AMCs | Rex International Mumbai',
  description: 'Enterprise printer fleet management, dedicated 4-hour SLA AMCs, and heavy-duty hardware supply for Banking, Logistics, and Healthcare across Mumbai & Maharashtra.',
  alternates: { canonical: '/industries' }
};

export default function IndustriesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Rex International Industry Printing Solutions",
    "itemListElement": industries.map((ind, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": ind.title,
      "url": `${getBaseUrl()}/industries/${ind.slug}`
    }))
  };

  return (
    <main className="flex-1 bg-brand-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24 bg-brand-dark text-brand-white-pure border-b-4 border-brand-green relative overflow-hidden">
        <div className="container-inner max-w-6xl mx-auto px-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green border border-brand-green/30 px-3.5 py-1.5 rounded-full inline-block mb-6">
            Institutional Fleet Management
          </span>
          <TextType
            as="h1"
            className="text-4xl sm:text-5xl md:text-7xl font-bold font-outfit tracking-tight mb-6 leading-[1.05]"
            text="Industry-Tailored Fleet Infrastructure."
            typingSpeed={40}
            startOnVisible={true}
            loop={false}
          />
          <p className="text-lg md:text-2xl text-brand-gray-light/80 max-w-3xl font-light leading-relaxed mb-8">
            Standard multi-brand IT vendors provide generic reactive repairs. Rex International engineers dedicated hardware fleets, spare buffers, and guaranteed on-site SLAs for sectors where printer downtime directly halts business operations.
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-brand-white-pure/10">
            <div>
              <span className="block text-3xl md:text-4xl font-bold font-outfit text-brand-green">4 Hours</span>
              <span className="text-xs text-brand-gray-light/60 uppercase tracking-wider font-semibold">Max On-Site SLA</span>
            </div>
            <div>
              <span className="block text-3xl md:text-4xl font-bold font-outfit text-brand-white-pure">Hot-Swap</span>
              <span className="text-xs text-brand-gray-light/60 uppercase tracking-wider font-semibold">Standby Units</span>
            </div>
            <div>
              <span className="block text-3xl md:text-4xl font-bold font-outfit text-brand-green">Mulund Hub</span>
              <span className="text-xs text-brand-gray-light/60 uppercase tracking-wider font-semibold">Central Facility</span>
            </div>
            <div>
              <span className="block text-3xl md:text-4xl font-bold font-outfit text-brand-white-pure">45+ Yrs</span>
              <span className="text-xs text-brand-gray-light/60 uppercase tracking-wider font-semibold">Continuous Trust</span>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Verticals Grid */}
      <section className="section-padding bg-brand-white-pure">
        <div className="container-inner max-w-6xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-outfit text-brand-dark mb-4 tracking-tight">
              Sectors We Support
            </h2>
            <p className="text-brand-dark-muted text-lg">
              Select your sector to view customized fleet recommendations, SLA terms, and verified operational benchmarks.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {industries.map((ind) => (
              <div 
                key={ind.slug}
                className="flex flex-col bg-brand-white rounded-3xl p-8 border border-brand-gray/20 shadow-sm hover:shadow-xl hover:border-brand-green/40 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-green bg-brand-green/10 px-3 py-1 rounded-full">
                    {ind.badge}
                  </span>
                  <span className="text-xs font-mono font-bold text-brand-dark-muted">
                    {ind.criticalMetric.stat}
                  </span>
                </div>

                <h3 className="text-2xl font-bold font-outfit text-brand-dark mb-3">
                  {ind.title}
                </h3>
                <p className="text-sm text-brand-dark-muted leading-relaxed mb-6 flex-grow">
                  {ind.headline}
                </p>

                <div className="border-t border-brand-gray/20 pt-6 mb-6 space-y-2 text-xs text-brand-dark-muted">
                  <div className="flex justify-between">
                    <span className="font-semibold text-brand-dark">SLA Response:</span>
                    <span>{ind.slaCommitment.responseTime.split(" ")[0]} {ind.slaCommitment.responseTime.split(" ")[1]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-brand-dark">Backup Fleet:</span>
                    <span className="text-brand-green font-semibold">Included</span>
                  </div>
                </div>

                <Link
                  href={`/industries/${ind.slug}`}
                  className="w-full text-center py-3.5 px-6 rounded-xl bg-brand-dark text-brand-white-pure font-bold text-sm hover:bg-brand-green transition-colors"
                >
                  Explore Industry SLA →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verified B2B Case Studies */}
      <section className="section-padding bg-brand-gray-light/30 border-t border-brand-gray/20">
        <div className="container-inner max-w-6xl mx-auto px-4">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-green mb-2 block">
              Proven Performance
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-outfit text-brand-dark tracking-tight">
              Institutional Proof Graph
            </h2>
            <p className="text-brand-dark-muted text-base md:text-lg mt-2">
              Real SLA data and operational turnarounds delivered across Mumbai's enterprise landscape.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {caseStudies.map((cs) => (
              <div 
                key={cs.id}
                className="bg-brand-white-pure rounded-3xl p-8 border border-brand-gray/20 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-brand-dark uppercase tracking-wider">
                      {cs.industry}
                    </span>
                    <span className="text-xs text-brand-dark-muted font-mono">{cs.location.split(",")[0]}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold font-outfit text-brand-dark mb-4">
                    {cs.title}
                  </h3>
                  <p className="text-sm text-brand-dark-muted leading-relaxed mb-6">
                    {cs.challenge}
                  </p>
                </div>

                <div className="border-t border-brand-gray/20 pt-6">
                  <div className="grid grid-cols-3 gap-2 text-center mb-6">
                    {cs.results.map((r, idx) => (
                      <div key={idx} className="bg-brand-gray-light/20 p-3 rounded-xl">
                        <span className="block text-lg md:text-xl font-bold font-outfit text-brand-green">{r.metric}</span>
                        <span className="text-[10px] text-brand-dark-muted leading-tight block">{r.label}</span>
                      </div>
                    ))}
                  </div>
                  {cs.testimonialQuote && (
                    <blockquote className="text-xs italic text-brand-dark-muted border-l-2 border-brand-green pl-4">
                      "{cs.testimonialQuote.quote}"
                      <footer className="text-[10px] font-bold text-brand-dark mt-1 not-italic">
                        — {cs.testimonialQuote.author}, {cs.testimonialQuote.role}
                      </footer>
                    </blockquote>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Corporate CTA */}
          <div className="mt-16 bg-brand-dark rounded-3xl p-8 md:p-12 text-brand-white-pure flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold font-outfit mb-2">
                Need an Enterprise Fleet Assessment?
              </h3>
              <p className="text-brand-gray-light/80 text-sm md:text-base max-w-xl">
                Speak directly with Virat Lalani or our technical director to schedule an on-site audit of your printer infrastructure.
              </p>
            </div>
            <Link
              href="/contact"
              className="py-4 px-8 rounded-full bg-brand-green text-brand-white-pure font-bold text-base hover:bg-brand-green-dark transition-colors shrink-0"
            >
              Request Corporate Proposal
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
