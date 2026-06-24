import { getProductBySlug, getAllProducts } from "@/lib/data/queries";
import { createWhatsAppProductUrl } from "@/lib/utils";
import { notFound } from "next/navigation";
import { Metadata } from 'next';
import { getBaseUrl } from '@/lib/seo';
import ProductDetailClient from '@/components/features/ProductDetailClient';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: 'Product Not Found' };
  
  return { 
    title: product.seo.title, 
    description: product.seo.description,
    alternates: {
      canonical: `/store/${slug}`,
    },
    openGraph: {
      title: product.seo.title,
      description: product.seo.description,
      images: [{ url: product.imageUrl || '/og-image.jpg' }]
    }
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  
  const whatsappUrl = createWhatsAppProductUrl(product.name, product.priceRange);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": product.imageUrl ? `${getBaseUrl()}${product.imageUrl}` : `${getBaseUrl()}/og-image.jpg`,
    "description": product.detailedDescription,
    "sku": product.id,
    "brand": {
      "@type": "Brand",
      "name": product.name.split(' ')[0] === 'Epson' ? 'Epson' :
              product.name.split(' ')[0] === 'HP' ? 'HP' :
              product.name.split(' ')[0] === 'Canon' ? 'Canon' :
              product.name.split(' ')[0] === 'Brother' ? 'Brother' :
              product.name.split(' ')[0] === 'TVS' ? 'TVS Electronics' : product.name.split(' ')[0]
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "INR",
      "availability": product.isAvailable ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "description": `Value Range: ${product.priceRange}`
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "12",
      "bestRating": "5"
    }
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": getBaseUrl() },
      { "@type": "ListItem", "position": 2, "name": "Hardware Catalog", "item": `${getBaseUrl()}/store` },
      { "@type": "ListItem", "position": 3, "name": product.name, "item": `${getBaseUrl()}/store/${slug}` }
    ]
  };

  return (
    <main className="section-padding bg-brand-white flex-1">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      
      {/* Visual Breadcrumbs */}
      <div className="container-inner max-w-6xl mx-auto mb-6">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-xs font-mono text-brand-dark-muted">
            <li><Link href="/" className="hover:text-brand-green transition-colors">Home</Link></li>
            <li className="text-brand-dark/20">/</li>
            <li><Link href="/store" className="hover:text-brand-green transition-colors">Hardware Catalog</Link></li>
            <li className="text-brand-dark/20">/</li>
            <li className="text-brand-dark truncate">{product.name}</li>
          </ol>
        </nav>
      </div>

      <ProductDetailClient product={product} whatsappUrl={whatsappUrl} />
    </main>
  );
}
