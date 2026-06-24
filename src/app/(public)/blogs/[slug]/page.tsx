import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { services } from '@/lib/data/services';
import { connectDB, Blog } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  await connectDB();
  const blog = await Blog.findOne({ slug }).lean();
  
  if (!blog) return { title: 'Not Found' };

  return {
    title: `${blog.title} | Rex Insights`,
    description: blog.excerpt,
    alternates: {
      canonical: `https://www.lalanicomputers.com/blogs/${blog.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await connectDB();
  const blog = await Blog.findOne({ slug }).lean();
  
  if (!blog) return notFound();

  const relatedService = services.find(s => s.slug === blog.relatedServiceSlug);

  // JSON-LD Article Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": blog.title,
    "author": { "@type": "Organization", "name": "Rex International" },
    "datePublished": blog.publishedAt,
    "publisher": {
      "@type": "Organization",
      "name": "Rex International"
    }
  };

  return (
    <article className="bg-brand-white min-h-screen pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/blogs" className="text-brand-green font-bold hover:text-brand-green/80 text-sm font-mono uppercase tracking-wider mb-8 inline-block">
          ← Back to Insights
        </Link>
        
        <header className="mb-10 pb-8 border-b border-brand-gray/20">
          <h1 className="text-4xl md:text-5xl font-outfit font-bold text-brand-dark mb-4 leading-tight">
            {blog.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-brand-dark-muted font-mono">
            <span>By {blog.author}</span>
            <span>•</span>
            <time suppressHydrationWarning>{new Date(blog.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</time>
          </div>
        </header>

        <div 
          className="prose prose-lg prose-brand max-w-none text-brand-dark/80"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* SEO Internal Linking to Service */}
        {relatedService && (
          <div className="mt-16 bg-brand-dark text-brand-white-pure p-8 rounded-2xl border-l-4 border-brand-green">
            <h3 className="text-2xl font-outfit font-bold mb-3">Need Professional Help?</h3>
            <p className="text-brand-gray-light mb-6">
              Learn more about our <strong className="text-brand-white-pure">{relatedService.name}</strong> service.
            </p>
            <Link 
              href={`/services/${relatedService.slug}`}
              className="inline-block bg-brand-green text-brand-dark font-bold px-6 py-3 rounded hover:bg-brand-white-pure transition-colors"
            >
              View Service Details
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}
