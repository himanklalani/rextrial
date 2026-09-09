import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { services } from '@/lib/data/services';
import Link from 'next/link';
import { createWhatsAppGeneralUrl } from '@/lib/utils';
import { WhatsAppCTA } from '@/components/ui/WhatsAppCTA';
import { getBaseUrl } from '@/lib/seo';
import { ExecutiveAmcProposal } from '@/components/features/ExecutiveAmcProposal';

// Tell Next.js to pre-render these pages at build time
export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return { title: 'Service Not Found' };

  const ogImageUrl = 'https://res.cloudinary.com/dl4ohcjuk/image/upload/f_auto,q_auto/v1782656160/nvqsiexrp4hs3hpb5xeh.jpg';
  const pageUrl = `${getBaseUrl()}/services/${service.slug}`;

  return {
    title: `${service.seo.title} | Rex International Mumbai`,
    description: service.seo.description,
    keywords: [service.name, 'Mumbai', 'Printer Repair', 'Rex International', 'printer service Mumbai', service.supportedBrands?.[0] ?? ''],
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title: `${service.seo.title} | Rex International Mumbai`,
      description: service.seo.description,
      url: pageUrl,
      siteName: 'Rex International',
      type: 'article',
      locale: 'en_IN',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${service.name} - Rex International Mumbai`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.seo.title} | Rex International Mumbai`,
      description: service.seo.description,
      images: [ogImageUrl],
    },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return notFound();

  const whatsappUrl = createWhatsAppGeneralUrl();
  const pageUrl = `${getBaseUrl()}/services/${service.slug}`;

  // Service Structured Data
  const serviceJsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": service.name,
    "name": `${service.name} in Mumbai`,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Rex International",
      "telephone": "+919323906493",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Office No. 8, Ground Floor, Kamala Nehru Shopping Centre, Netaji Subhash Road, Next to Vikas Centre",
        "addressLocality": "Mulund West, Mumbai",
        "postalCode": "400080",
        "addressRegion": "Maharashtra",
        "addressCountry": "IN"
      }
    },
    "areaServed": [
      { "@type": "City", "name": "Mumbai" },
      { "@type": "City", "name": "Thane" },
      { "@type": "City", "name": "Navi Mumbai" }
    ],
    "description": service.detailedDescription,
    "offers": {
      "@type": "Offer",
      "priceCurrency": "INR",
      "price": service.startingPrice.replace(/[^0-9]/g, '')
    }
  };

  if (service.slug === 'corporate-amc') {
    serviceJsonLd.serviceOutput = "Guaranteed 4-Hour On-Site SLA with Standby Buffer Units";
    serviceJsonLd.termsOfService = "Comprehensive and Non-Comprehensive Corporate Annual Maintenance Contracts";
    serviceJsonLd.hasOfferCatalog = {
      "@type": "OfferCatalog",
      "name": "Corporate Printer AMC Fleet Tiers",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": "Small Fleet AMC (3 to 10 Printers)",
          "description": "Quarterly bench maintenance, 4-hour on-site response SLA, standby buffer guarantee."
        },
        {
          "@type": "Offer",
          "name": "Mid-Enterprise Fleet AMC (11 to 50 Printers)",
          "description": "Bi-monthly maintenance, 3-to-4 hour SLA, dedicated hot-swap standby units."
        },
        {
          "@type": "Offer",
          "name": "Institutional & Banking Network AMC (51 to 500+ Printers)",
          "description": "Priority 2-to-4 hour escalation SLA, monthly maintenance, passbook & continuous dotmatrix coverage."
        }
      ]
    };
  }

  // FAQ Structured Data
  const faqJsonLd = service.faqs && service.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": service.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  // Breadcrumb Structured Data
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": `${getBaseUrl()}/` },
      { "@type": "ListItem", "position": 2, "name": "Services", "item": `${getBaseUrl()}/services` },
      { "@type": "ListItem", "position": 3, "name": service.name, "item": `${getBaseUrl()}/services/${service.slug}` }
    ]
  };

  return (
    <div className="bg-brand-dark min-h-screen pt-32 pb-24 text-brand-white-pure">
      {/* JSON-LD Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="max-w-4xl mx-auto px-6">

        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs font-mono text-brand-white-pure/40">
            <li><Link href="/" className="hover:text-brand-green transition-colors">Home</Link></li>
            <li className="text-brand-white-pure/20">/</li>
            <li><Link href="/services" className="hover:text-brand-green transition-colors">Services</Link></li>
            <li className="text-brand-white-pure/20">/</li>
            <li className="text-brand-white-pure/70 truncate">{service.name}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-8 border-b border-brand-white-pure/10 pb-8">
          <h1 className="text-4xl md:text-5xl font-outfit font-bold mb-4 leading-tight text-brand-white-pure">
            {service.name} <span className="text-brand-green">in Mumbai</span>
          </h1>
          <p className="text-xl text-brand-gray-light">
            {service.shortDescription}
          </p>
        </div>

        <div className="prose prose-invert prose-brand max-w-none">

          {/* Detailed Description */}
          <h2 className="text-2xl font-outfit font-bold text-brand-green mt-8 mb-4">About This Service</h2>
          <p className="text-brand-gray-light leading-relaxed mb-8 text-base">
            {service.detailedDescription}
          </p>

          {/* Key Benefits */}
          <h2 className="text-2xl font-outfit font-bold text-brand-green mt-10 mb-4">What's Included</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10 not-prose">
            {service.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-3 bg-brand-white-pure/5 p-4 rounded-lg border border-brand-white-pure/10">
                <span className="text-brand-green flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </span>
                <span className="text-brand-gray-light text-sm">{feature}</span>
              </li>
            ))}
          </ul>

          {/* Supported Brands */}
          {service.supportedBrands && service.supportedBrands.length > 0 && (
            <>
              <h2 className="text-2xl font-outfit font-bold text-brand-green mt-10 mb-4">Brands We Service</h2>
              <p className="text-brand-gray-light text-sm mb-4">
                We cover all major manufacturer models. If your brand isn't listed, contact us, we almost certainly cover it.
              </p>
              <div className="flex flex-wrap gap-2 mb-10 not-prose">
                {service.supportedBrands.map((brand, i) => (
                  <span key={i} className="inline-block bg-brand-white-pure/5 border border-brand-green/20 text-brand-white-pure text-xs font-mono px-3 py-1.5 rounded-full">
                    {brand}
                  </span>
                ))}
              </div>
            </>
          )}

          {/* Dedicated B2B Executive AMC Teardown (Only for corporate-amc) */}
          {service.slug === 'corporate-amc' && (
            <ExecutiveAmcProposal canonicalUrl={pageUrl} />
          )}

          {/* CTA Block */}
          <div className="bg-brand-green/10 border border-brand-green/20 p-8 rounded-xl text-center my-10 not-prose">
            <h3 className="text-2xl font-outfit font-bold mb-2 text-brand-white-pure">Ready to Book?</h3>
            <p className="text-brand-gray-light mb-6 text-sm">Starting from <strong className="text-brand-white-pure">{service.startingPrice}</strong></p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-block bg-brand-green text-brand-dark font-bold font-mono uppercase tracking-wider px-8 py-4 rounded hover:bg-brand-green/90 transition-colors w-full sm:w-auto text-center"
              >
                Get a Free Quote
              </Link>
              <WhatsAppCTA
                url={whatsappUrl}
                label="WhatsApp Us"
                variant="custom"
                className="inline-flex items-center justify-center gap-2 bg-brand-white-pure/10 text-brand-white-pure font-bold border border-brand-white-pure/20 px-8 py-4 rounded hover:bg-brand-white-pure hover:text-brand-dark transition-colors w-full sm:w-auto"
              />
            </div>
          </div>

          {/* FAQ Section */}
          {service.faqs && service.faqs.length > 0 && (
            <>
              <h2 className="text-2xl font-outfit font-bold text-brand-green mt-12 mb-6">Frequently Asked Questions</h2>
              <div className="flex flex-col gap-4 not-prose">
                {service.faqs.map((faq, i) => (
                  <details key={i} className="bg-brand-white-pure/5 border border-brand-white-pure/10 rounded-xl group">
                    <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-brand-white-pure list-none">
                      <span>{faq.question}</span>
                      <span className="text-brand-green flex-shrink-0 ml-4 group-open:rotate-180 transition-transform duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
                      </span>
                    </summary>
                    <p className="px-5 pb-5 text-brand-gray-light leading-relaxed text-sm border-t border-brand-white-pure/10 pt-4">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </>
          )}

          {/* Internal linking to related pages */}
          <div className="mt-12 pt-8 border-t border-brand-white-pure/10 not-prose">
            <p className="text-xs font-mono text-brand-white-pure/30 uppercase tracking-wider mb-4">Explore Related Services</p>
            <div className="flex flex-wrap gap-3">
              {services.filter(s => s.slug !== slug).slice(0, 3).map(s => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="text-sm text-brand-gray-light hover:text-brand-green border border-brand-white-pure/10 hover:border-brand-green/30 px-4 py-2 rounded-lg transition-colors"
                >
                  {s.name}
                </Link>
              ))}
              <Link
                href="/contact"
                className="text-sm text-brand-gray-light hover:text-brand-green border border-brand-white-pure/10 hover:border-brand-green/30 px-4 py-2 rounded-lg transition-colors"
              >
                Contact Us →
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
