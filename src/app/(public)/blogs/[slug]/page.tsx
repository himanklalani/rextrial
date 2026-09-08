import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { services } from '@/lib/data/services';
import { connectDB, Blog } from '@/lib/db';
import { getBaseUrl } from '@/lib/seo';
import { staticBlogs } from '@/lib/data/blogs';

export async function generateStaticParams() {
  return staticBlogs.map(blog => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  
  // Check static blogs first
  let blog: { title: string; excerpt: string; slug: string; imageUrl?: string } | null = staticBlogs.find(b => b.slug === slug) || null;
  
  if (!blog) {
    try {
      await connectDB();
      blog = await Blog.findOne({ slug }).lean();
    } catch {
      blog = null;
    }
  }
  
  if (!blog) return { title: 'Not Found' };

  return {
    title: `${blog.title} | Rex Technical Insights`,
    description: blog.excerpt,
    alternates: {
      canonical: `${getBaseUrl()}/blogs/${blog.slug}`,
    },
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      url: `${getBaseUrl()}/blogs/${blog.slug}`,
      type: 'article',
      images: [
        {
          url: blog.imageUrl || 'https://res.cloudinary.com/dl4ohcjuk/image/upload/f_auto,q_auto/v1782656160/nvqsiexrp4hs3hpb5xeh.jpg',
          width: 1200,
          height: 630,
          alt: blog.title,
        }
      ]
    }
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const siteUrl = getBaseUrl();
  
  // Check static blogs first
  let blog: any = staticBlogs.find(b => b.slug === slug) || null;

  if (!blog) {
    try {
      await connectDB();
      blog = await Blog.findOne({ slug }).lean();
    } catch {
      blog = null;
    }
  }
  
  if (!blog) return notFound();

  const relatedService = services.find(s => s.slug === blog.relatedServiceSlug);
  const heroImage = blog.imageUrl || "https://res.cloudinary.com/dl4ohcjuk/image/upload/f_auto,q_auto/v1782656160/nvqsiexrp4hs3hpb5xeh.jpg";

  // JSON-LD Article Schema + BreadcrumbList
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": siteUrl
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Technical Insights",
            "item": `${siteUrl}/blogs`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": blog.title,
            "item": `${siteUrl}/blogs/${blog.slug}`
          }
        ]
      },
      {
        "@type": "Article",
        "@id": `${siteUrl}/blogs/${blog.slug}#article`,
        "isPartOf": {
          "@type": "WebPage",
          "@id": `${siteUrl}/blogs/${blog.slug}`
        },
        "headline": blog.title,
        "description": blog.excerpt,
        "image": heroImage,
        "author": {
          "@type": "Person",
          "name": blog.author || "Virat Lalani",
          "jobTitle": "Lead Printing Systems Engineer",
          "worksFor": {
            "@type": "Organization",
            "name": "Rex International",
            "url": siteUrl
          }
        },
        "publisher": {
          "@type": "Organization",
          "name": "Rex International",
          "url": siteUrl,
          "logo": {
            "@type": "ImageObject",
            "url": `${siteUrl}/icon.png`
          }
        },
        "datePublished": blog.publishedAt,
        "dateModified": blog.publishedAt,
        "mainEntityOfPage": `${siteUrl}/blogs/${blog.slug}`
      }
    ]
  };

  return (
    <article className="bg-brand-white min-h-screen pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-mono text-brand-dark-muted mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-brand-green transition-colors">Home</Link>
          <span>/</span>
          <Link href="/blogs" className="hover:text-brand-green transition-colors">Insights</Link>
          <span>/</span>
          <span className="text-brand-dark font-medium truncate max-w-xs">{blog.title}</span>
        </nav>
        
        <header className="mb-10 pb-8 border-b border-brand-gray/20">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono mb-4">
            {blog.category && (
              <span className="bg-brand-green/15 text-brand-green px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                {blog.category}
              </span>
            )}
            <span className="text-brand-dark-muted">•</span>
            <span className="text-brand-dark-muted font-bold">{blog.readTime || '7 min read'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-bold text-brand-dark mb-6 leading-tight tracking-tight">
            {blog.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-brand-dark-muted font-mono">
            <span className="font-semibold text-brand-dark">By {blog.author}</span>
            <span>•</span>
            <time suppressHydrationWarning>
              {new Date(blog.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            </time>
          </div>

          {/* Hero Featured Article Image */}
          <div className="mt-8 relative aspect-16/9 rounded-3xl overflow-hidden bg-brand-dark/5 border border-brand-gray/20 shadow-md">
            <img
              src={heroImage}
              alt={blog.title}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        </header>

        {/* Article Body Content */}
        <div 
          className="prose prose-lg prose-brand max-w-none text-brand-dark/85 leading-relaxed font-sans"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Dual-Intent B2B + B2C Conversion & SEO Internal Linking Firewall */}
        <section className="mt-16 pt-12 border-t border-brand-gray/20">
          <h2 className="text-2xl md:text-3xl font-outfit font-bold text-brand-dark mb-6 tracking-tight">
            Need Expert Assistance with Your Printers?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* B2B Corporate Fleet Card */}
            <div className="bg-brand-dark text-brand-white-pure p-7 rounded-2xl border-l-4 border-brand-green flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold tracking-widest text-brand-green uppercase block mb-2">
                  Enterprise & Corporate Fleets
                </span>
                <h3 className="text-xl font-outfit font-bold mb-3 text-brand-white-pure">
                  Corporate Printer AMC & On-Site Fleet Support
                </h3>
                <p className="text-sm text-brand-gray-light leading-relaxed mb-6">
                  Managing banking teller passbook units, high-volume continuous dotmatrix dispatch machines, or diagnostic lab MFPs? We provide 4-hour breakdown response SLAs, dedicated standby buffer units, and genuine OEM parts dispatched across Mumbai and Thane from our Mulund workshop.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  href="/services/corporate-amc"
                  className="inline-flex items-center justify-center bg-brand-green text-brand-dark font-bold text-sm px-5 py-2.5 rounded hover:bg-brand-white-pure transition-colors"
                >
                  Explore Corporate AMCs
                </Link>
                <Link
                  href="/industries"
                  className="inline-flex items-center justify-center border border-white/20 text-white font-medium text-sm px-5 py-2.5 rounded hover:bg-white/10 transition-colors"
                >
                  Industry Verticals
                </Link>
              </div>
            </div>

            {/* B2C Walk-In Repair Card */}
            <div className="bg-brand-gray-light/30 text-brand-dark p-7 rounded-2xl border border-brand-gray/20 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold tracking-widest text-brand-green uppercase block mb-2">
                  Walk-In Repair & SMBs
                </span>
                <h3 className="text-xl font-outfit font-bold mb-3 text-brand-dark">
                  Free 30-Min Diagnostic at Mulund Workshop
                </h3>
                <p className="text-sm text-brand-dark-muted leading-relaxed mb-6">
                  Facing blank lines, toner streaks, paper jams, or printhead errors? Walk into our Mulund West workshop (Office No. 8, Ground Floor, Kamala Nehru Shopping Centre, next to Vikas Centre) between 10:00 AM and 6:30 PM, Monday through Saturday.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  href="/repairs/walk-in-mulund"
                  className="inline-flex items-center justify-center bg-brand-dark text-brand-white font-bold text-sm px-5 py-2.5 rounded hover:bg-brand-green hover:text-brand-dark transition-colors"
                >
                  Mulund Walk-In Hub
                </Link>
                <Link
                  href="/repairs"
                  className="inline-flex items-center justify-center border border-brand-dark/20 text-brand-dark font-medium text-sm px-5 py-2.5 rounded hover:bg-brand-dark/5 transition-colors"
                >
                  Troubleshooting Guides
                </Link>
              </div>
            </div>
          </div>

          {/* Related Service Feature if present */}
          {relatedService && (
            <div className="mt-6 p-6 rounded-xl bg-brand-white-pure border border-brand-green/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-brand-green font-bold uppercase tracking-wider block">Direct Service Match</span>
                <p className="text-brand-dark font-semibold">
                  Looking specifically for professional {relatedService.name}?
                </p>
              </div>
              <Link
                href={`/services/${relatedService.slug}`}
                className="inline-flex items-center justify-center bg-brand-green/20 text-brand-green font-bold text-sm px-5 py-2.5 rounded hover:bg-brand-green hover:text-brand-dark transition-colors shrink-0"
              >
                View Service Details →
              </Link>
            </div>
          )}
        </section>
      </div>
    </article>
  );
}
