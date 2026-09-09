import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { industries } from '@/lib/data/industries';
import { getBaseUrl } from '@/lib/seo';
import TextType from '@/components/ui/TextType';
import ScrollReveal from '@/components/ui/ScrollReveal';

export function generateStaticParams() {
  return industries.map((ind) => ({
    slug: ind.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const industry = industries.find((i) => i.slug === slug);
  if (!industry) return { title: 'Industry Not Found' };

  const ogImageUrl = 'https://res.cloudinary.com/dl4ohcjuk/image/upload/f_auto,q_auto/v1782656160/nvqsiexrp4hs3hpb5xeh.jpg';

  return {
    title: industry.metaTitle,
    description: industry.metaDescription,
    alternates: {
      canonical: `/industries/${slug}`,
    },
    openGraph: {
      title: industry.metaTitle,
      description: industry.metaDescription,
      url: `${getBaseUrl()}/industries/${slug}`,
      siteName: 'Rex International',
      type: 'website',
      locale: 'en_IN',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${industry.title} - Rex International Mumbai`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: industry.metaTitle,
      description: industry.metaDescription,
      images: [ogImageUrl],
    },
  };
}

export default async function IndustryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = industries.find((i) => i.slug === slug);
  if (!industry) notFound();

  const baseUrl = getBaseUrl();

  // Structured Data (Service + FAQ + Breadcrumb)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${baseUrl}/industries/${industry.slug}#service`,
        "name": industry.headline,
        "description": industry.metaDescription,
        "provider": {
          "@type": "LocalBusiness",
          "@id": baseUrl,
          "name": "Rex International"
        },
        "areaServed": [
          { "@type": "City", "name": "Mumbai" },
          { "@type": "City", "name": "Thane" },
          { "@type": "City", "name": "Navi Mumbai" }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `${baseUrl}/industries/${industry.slug}#faq`,
        "mainEntity": industry.faq.map((item) => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer
          }
        }))
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${baseUrl}/industries/${industry.slug}#breadcrumb`,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": baseUrl },
          { "@type": "ListItem", "position": 2, "name": "Industries", "item": `${baseUrl}/industries` },
          { "@type": "ListItem", "position": 3, "name": industry.title, "item": `${baseUrl}/industries/${industry.slug}` }
        ]
      }
    ]
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
              <li><Link href="/industries" className="hover:text-brand-green transition-colors">Industries</Link></li>
              <li>/</li>
              <li className="text-brand-white-pure font-bold truncate">{industry.title}</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero Header */}
      <section className="py-16 md:py-24 bg-brand-dark text-brand-white-pure border-b-4 border-brand-green">
        <div className="container-inner max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green border border-brand-green/30 px-3.5 py-1.5 rounded-full">
              {industry.badge}
            </span>
            <span className="text-xs font-mono text-brand-gray-light/60">
              Est. 1980 • Mumbai MMR Wide Support
            </span>
          </div>

          <TextType
            as="h1"
            className="text-3xl sm:text-5xl md:text-6xl font-bold font-outfit tracking-tight mb-6 leading-[1.1] max-w-4xl"
            text={industry.headline}
            typingSpeed={35}
            startOnVisible={true}
            loop={false}
          />
          <p className="text-lg md:text-xl text-brand-gray-light/80 max-w-3xl font-light leading-relaxed mb-8">
            {industry.subheadline}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href="/contact"
              className="py-4 px-8 rounded-full bg-brand-green text-brand-white-pure font-bold text-center text-sm md:text-base hover:bg-brand-green-dark transition-colors"
            >
              Request Corporate SLA Proposal
            </Link>
            <Link
              href="/services/corporate-amc"
              className="py-4 px-8 rounded-full bg-brand-white-pure/10 text-brand-white-pure border border-brand-white-pure/20 font-bold text-center text-sm md:text-base hover:bg-brand-white-pure/20 transition-colors"
            >
              View AMC Terms & Contract Tiers
            </Link>
          </div>
        </div>
      </section>

      {/* AEO Strategic Direct Answer Block */}
      <section className="py-12 bg-brand-white-pure border-b border-brand-gray/20">
        <div className="container-inner max-w-6xl mx-auto px-4">
          <div className="bg-brand-gray-light/20 p-6 md:p-8 rounded-2xl border-l-4 border-brand-green">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-dark mb-2">
              Operational Mandate for {industry.title}
            </h2>
            <p className="text-base md:text-lg text-brand-dark-muted leading-relaxed">
              {industry.operationalContext}
            </p>
          </div>
        </div>
      </section>

      {/* Failure Modes & Technical Interventions */}
      <section className="section-padding bg-brand-white">
        <div className="container-inner max-w-6xl mx-auto px-4">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-green mb-2 block">
              Root-Cause Engineering
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-outfit text-brand-dark tracking-tight">
              Common Industry Bottlenecks We Eliminate
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {industry.commonFailurePoints.map((fp, idx) => (
              <div 
                key={idx}
                className="bg-brand-white-pure p-8 rounded-3xl border border-brand-gray/20 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono font-bold text-brand-green mb-2 block">Failure Mode 0{idx + 1}</span>
                  <h3 className="text-xl font-bold font-outfit text-brand-dark mb-3">
                    {fp.title}
                  </h3>
                  <p className="text-sm text-brand-dark-muted leading-relaxed mb-6">
                    {fp.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-brand-gray/20">
                  <span className="text-[11px] font-bold text-brand-maroon uppercase tracking-wider block mb-1">Business Impact:</span>
                  <span className="text-xs text-brand-dark font-medium">{fp.impact}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SLA Commitment Cards */}
      <section className="py-20 bg-brand-dark text-brand-white-pure">
        <div className="container-inner max-w-6xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-green mb-2 block">
              Contractual Guarantees
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-outfit text-brand-white-pure tracking-tight">
              Our Service Level Agreement (SLA)
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-brand-white-pure/5 border border-brand-white-pure/10 p-6 rounded-2xl">
              <span className="text-xs font-mono text-brand-green uppercase tracking-wider block mb-2">Response Time</span>
              <p className="text-lg font-bold font-outfit text-brand-white-pure">{industry.slaCommitment.responseTime}</p>
            </div>
            <div className="bg-brand-white-pure/5 border border-brand-white-pure/10 p-6 rounded-2xl">
              <span className="text-xs font-mono text-brand-green uppercase tracking-wider block mb-2">Standby Policy</span>
              <p className="text-lg font-bold font-outfit text-brand-white-pure">{industry.slaCommitment.standbyPolicy}</p>
            </div>
            <div className="bg-brand-white-pure/5 border border-brand-white-pure/10 p-6 rounded-2xl">
              <span className="text-xs font-mono text-brand-green uppercase tracking-wider block mb-2">Preventive Visits</span>
              <p className="text-lg font-bold font-outfit text-brand-white-pure">{industry.slaCommitment.maintenanceSchedule}</p>
            </div>
            <div className="bg-brand-white-pure/5 border border-brand-white-pure/10 p-6 rounded-2xl">
              <span className="text-xs font-mono text-brand-green uppercase tracking-wider block mb-2">Parts Guarantee</span>
              <p className="text-lg font-bold font-outfit text-brand-white-pure">{industry.slaCommitment.partsCoverage}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Fleet Hardware */}
      <section className="section-padding bg-brand-white-pure">
        <div className="container-inner max-w-6xl mx-auto px-4">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-green mb-2 block">
              Standardized Hardware Architecture
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-outfit text-brand-dark tracking-tight">
              Recommended Fleet Deployments
            </h2>
            <p className="text-brand-dark-muted text-base mt-2">
              Standardizing on these vetted machines reduces spare part variety, accelerates technician fix times, and minimizes your total cost of operation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {industry.recommendedFleet.map((hw, idx) => (
              <div 
                key={idx}
                className="bg-brand-white p-8 rounded-3xl border border-brand-gray/20 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-green bg-brand-green/10 px-3 py-1 rounded-full inline-block mb-3">
                    {hw.category}
                  </span>
                  <h3 className="text-2xl font-bold font-outfit text-brand-dark mb-2">
                    {hw.name}
                  </h3>
                  <p className="text-xs font-semibold text-brand-dark-muted mb-4">{hw.role}</p>
                  <p className="text-sm text-brand-dark-muted leading-relaxed mb-6">
                    {hw.whyChosen}
                  </p>
                </div>
                <div className="pt-4 border-t border-brand-gray/20">
                  <span className="text-[10px] text-brand-dark font-mono font-medium block">{hw.specSummary}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GEO Dense Comparison Table */}
      <section className="section-padding bg-brand-gray-light/30 border-t border-brand-gray/20">
        <div className="container-inner max-w-6xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-outfit text-brand-dark mb-4">
              Contract Comparison Matrix
            </h2>
            <p className="text-brand-dark-muted text-base">
              Why enterprise facility managers and IT heads switch from generic multi-brand contractors to Rex International.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-brand-white-pure rounded-2xl shadow-sm border border-brand-gray/20 overflow-hidden text-sm">
              <thead className="bg-brand-dark text-brand-white-pure text-left">
                <tr>
                  {industry.comparisonTable.headers.map((h, i) => (
                    <th key={i} className="p-4 md:p-5 font-outfit font-bold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-gray/20">
                {industry.comparisonTable.rows.map((row, rIdx) => (
                  <tr key={rIdx} className={rIdx % 2 === 0 ? "bg-brand-white-pure" : "bg-brand-gray-light/10"}>
                    <td className="p-4 md:p-5 font-bold text-brand-dark">{row[0]}</td>
                    <td className="p-4 md:p-5 text-brand-green font-bold">{row[1]}</td>
                    <td className="p-4 md:p-5 text-brand-dark-muted">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section (AEO/SEO) */}
      <section className="section-padding bg-brand-white-pure border-t border-brand-gray/20">
        <div className="container-inner max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-outfit text-brand-dark mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-brand-dark-muted text-base">
              Key operational and SLA questions answered for {industry.title} leadership.
            </p>
          </div>

          <div className="space-y-6">
            {industry.faq.map((item, idx) => (
              <div key={idx} className="bg-brand-white p-6 md:p-8 rounded-2xl border border-brand-gray/20 shadow-sm">
                <h3 className="text-lg md:text-xl font-bold font-outfit text-brand-dark mb-3">
                  {item.question}
                </h3>
                <p className="text-sm md:text-base text-brand-dark-muted leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>

          {/* Final Conversion Action */}
          <div className="mt-16 text-center bg-brand-dark text-brand-white-pure p-8 md:p-12 rounded-3xl">
            <h3 className="text-2xl md:text-3xl font-bold font-outfit mb-3">
              Ready to eliminate printer downtime in your organization?
            </h3>
            <p className="text-brand-gray-light/80 text-sm md:text-base max-w-xl mx-auto mb-8">
              Schedule an on-site hardware audit or receive an itemized Corporate AMC proposal within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/contact"
                className="py-4 px-8 rounded-full bg-brand-green text-brand-white-pure font-bold hover:bg-brand-green-dark transition-colors"
              >
                Request Corporate Proposal
              </Link>
              <a
                href={`https://wa.me/919323906493?text=${encodeURIComponent(`Hi Rex International, I am reaching out regarding a corporate printer fleet contract for our ${industry.title} operations.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-4 px-8 rounded-full bg-brand-white-pure/10 text-brand-white-pure border border-brand-white-pure/20 font-bold hover:bg-brand-white-pure/20 transition-colors"
              >
                Chat with Corporate Lead on WhatsApp →
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
