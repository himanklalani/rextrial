import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { repairs } from '@/lib/data/repairs';
import { getBaseUrl } from '@/lib/seo';
import TextType from '@/components/ui/TextType';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { SnapEstimateCTA } from '@/components/ui/SnapEstimateCTA';

export function generateStaticParams() {
  return repairs.map((rep) => ({
    slug: rep.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const repair = repairs.find((r) => r.slug === slug);
  if (!repair) return { title: 'Repair Solution Not Found' };

  return {
    title: repair.metaTitle,
    description: repair.metaDescription,
    alternates: {
      canonical: `/repairs/${slug}`,
    },
    openGraph: {
      title: repair.metaTitle,
      description: repair.metaDescription,
      url: `${getBaseUrl()}/repairs/${slug}`,
      siteName: 'Rex International',
      type: 'article',
      locale: 'en_IN',
    }
  };
}

export default async function RepairDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const repair = repairs.find((r) => r.slug === slug);
  if (!repair) notFound();

  const baseUrl = getBaseUrl();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${baseUrl}/repairs/${repair.slug}#service`,
        "name": repair.title,
        "description": repair.metaDescription,
        "offers": {
          "@type": "Offer",
          "price": repair.startingPrice.replace(/[^\d]/g, ''),
          "priceCurrency": "INR"
        },
        "provider": {
          "@type": "LocalBusiness",
          "@id": baseUrl,
          "name": "Rex International"
        }
      },
      {
        "@type": "FAQPage",
        "@id": `${baseUrl}/repairs/${repair.slug}#faq`,
        "mainEntity": repair.faq.map((item) => ({
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
        "@id": `${baseUrl}/repairs/${repair.slug}#breadcrumb`,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": baseUrl },
          { "@type": "ListItem", "position": 2, "name": "Repairs", "item": `${baseUrl}/repairs` },
          { "@type": "ListItem", "position": 3, "name": repair.title, "item": `${baseUrl}/repairs/${repair.slug}` }
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
              <li><Link href="/repairs" className="hover:text-brand-green transition-colors">Repairs</Link></li>
              <li>/</li>
              <li className="text-brand-white-pure font-bold truncate">{repair.title}</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero Header */}
      <section className="py-16 md:py-24 bg-brand-dark text-brand-white-pure border-b-4 border-brand-green">
        <div className="container-inner max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-green border border-brand-green/30 px-3.5 py-1.5 rounded-full">
              {repair.printerCategory}
            </span>
            <span className="text-xs font-mono text-brand-gray-light/60">
              Starting from {repair.startingPrice} • {repair.turnaroundTime}
            </span>
          </div>

          <TextType
            as="h1"
            className="text-3xl sm:text-5xl md:text-6xl font-bold font-outfit tracking-tight mb-6 leading-[1.1] max-w-4xl"
            text={repair.headline}
            typingSpeed={35}
            startOnVisible={true}
            loop={false}
          />
          <p className="text-lg md:text-xl text-brand-gray-light/80 max-w-3xl font-light leading-relaxed mb-8">
            {repair.subheadline}
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <div className="bg-brand-white-pure/10 border border-brand-white-pure/15 px-5 py-3 rounded-2xl">
              <span className="text-xs text-brand-gray-light/60 uppercase tracking-wider block">Transparent Price</span>
              <span className="text-xl font-bold font-outfit text-brand-green">{repair.startingPrice}</span>
            </div>
            <div className="bg-brand-white-pure/10 border border-brand-white-pure/15 px-5 py-3 rounded-2xl">
              <span className="text-xs text-brand-gray-light/60 uppercase tracking-wider block">Turnaround</span>
              <span className="text-xl font-bold font-outfit text-brand-white-pure">{repair.turnaroundTime}</span>
            </div>
            <div className="bg-brand-white-pure/10 border border-brand-white-pure/15 px-5 py-3 rounded-2xl">
              <span className="text-xs text-brand-gray-light/60 uppercase tracking-wider block">Warranty</span>
              <span className="text-xl font-bold font-outfit text-brand-white-pure">{repair.warranty}</span>
            </div>
          </div>
        </div>
      </section>

      {/* AEO Strategic Direct Answer Block (Google Snippet Optimized) */}
      <section className="py-12 bg-brand-white-pure border-b border-brand-gray/20">
        <div className="container-inner max-w-6xl mx-auto px-4">
          <div className="bg-brand-gray-light/20 p-6 md:p-8 rounded-2xl border-l-4 border-brand-green">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-dark mb-2">
              Quick Diagnostic Summary (Technical Answer)
            </h2>
            <p className="text-base md:text-lg text-brand-dark-muted leading-relaxed">
              {repair.aeoDirectAnswer}
            </p>
          </div>
        </div>
      </section>

      {/* Symptoms Checklist & Root Cause */}
      <section className="section-padding bg-brand-white">
        <div className="container-inner max-w-6xl mx-auto px-4 grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-green block">
              Symptom Audit
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-outfit text-brand-dark tracking-tight">
              Does Your Printer Show These Signs?
            </h2>
            <ul className="space-y-3 pt-2">
              {repair.symptoms.map((symptom, idx) => (
                <li key={idx} className="flex items-start gap-3 bg-brand-white-pure p-4 rounded-xl border border-brand-gray/20 text-sm font-medium text-brand-dark">
                  <span className="text-brand-green font-bold shrink-0 mt-0.5">✓</span>
                  <span>{symptom}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-green block">
              Engineering Root Cause
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-outfit text-brand-dark tracking-tight">
              Why This Failure Happens
            </h2>
            <p className="text-sm md:text-base text-brand-dark-muted leading-relaxed">
              {repair.rootCauseAnalysis}
            </p>

            <div className="bg-brand-maroon/5 border-l-4 border-brand-maroon p-5 rounded-r-xl">
              <h3 className="text-xs font-bold uppercase tracking-wider text-brand-maroon mb-1">
                ⚠️ Avoid Unverified DIY Shortcuts:
              </h3>
              <p className="text-xs text-brand-dark leading-relaxed">
                {repair.diyWarning}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Technical Repair Process */}
      <section className="section-padding bg-brand-white-pure border-t border-brand-gray/20">
        <div className="container-inner max-w-6xl mx-auto px-4">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-green mb-2 block">
              Our Bench Methodology
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-outfit text-brand-dark tracking-tight">
              The 4-Step Restoration Process
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {repair.repairProcess.map((proc) => (
              <div key={proc.step} className="bg-brand-white p-6 rounded-2xl border border-brand-gray/20 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-brand-green mb-2 block">STEP {proc.step}</span>
                  <h3 className="text-lg font-bold font-outfit text-brand-dark mb-2">{proc.title}</h3>
                  <p className="text-xs text-brand-dark-muted leading-relaxed">{proc.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Models List */}
      <section className="py-12 bg-brand-gray-light/30 border-t border-brand-gray/20">
        <div className="container-inner max-w-6xl mx-auto px-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-brand-dark-muted mb-4">
            Tested & Verified Models Covered Under This Service:
          </h3>
          <div className="flex flex-wrap gap-2">
            {repair.supportedModels.map((model, idx) => (
              <span key={idx} className="text-xs font-mono bg-brand-white-pure border border-brand-gray/20 px-3.5 py-1.5 rounded-lg text-brand-dark font-medium">
                {model}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Snap & Estimate Integration */}
      <section className="section-padding bg-brand-white border-t border-brand-gray/20">
        <div className="container-inner max-w-5xl mx-auto px-4">
          <SnapEstimateCTA
            problemTitle={repair.title}
            className="w-full"
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-brand-white-pure border-t border-brand-gray/20">
        <div className="container-inner max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-outfit text-brand-dark mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-brand-dark-muted text-base">
              Common questions answered regarding {repair.title.toLowerCase()}.
            </p>
          </div>

          <div className="space-y-6">
            {repair.faq.map((item, idx) => (
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
        </div>
      </section>
    </main>
  );
}
