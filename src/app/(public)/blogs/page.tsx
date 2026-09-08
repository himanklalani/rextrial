import { Metadata } from 'next';
import Link from 'next/link';
import TextType from '@/components/ui/TextType';
import { connectDB, Blog } from '@/lib/db';
import { staticBlogs } from '@/lib/data/blogs';

export const metadata: Metadata = {
  title: 'Technical Insights & Engineering Guides | Rex International Mumbai',
  description: 'Authoritative engineering guides on corporate printer AMCs, Epson EcoTank nozzle chemical flushes, industrial dotmatrix printers, and banking passbook SLAs.',
  alternates: { canonical: '/blogs' }
};

export default async function BlogsPage() {
  let dbBlogs: Array<{
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    publishedAt: string | Date;
    author: string;
    category?: string;
    readTime?: string;
    imageUrl?: string;
  }> = [];

  try {
    await connectDB();
    const blogsRaw = await Blog.find({}).sort({ publishedAt: -1 }).lean();
    if (blogsRaw && blogsRaw.length > 0) {
      dbBlogs = blogsRaw.map(b => ({
        ...b,
        _id: b._id.toString(),
        publishedAt: b.publishedAt || new Date(),
        imageUrl: (b as any).imageUrl || "https://res.cloudinary.com/dl4ohcjuk/image/upload/f_auto,q_auto/v1782656160/nvqsiexrp4hs3hpb5xeh.jpg"
      }));
    }
  } catch {
    dbBlogs = [];
  }

  // Curated static authority articles are ALWAYS the primary pillar guides
  const staticArticles = staticBlogs.map(b => ({
    _id: b.id,
    title: b.title,
    slug: b.slug,
    excerpt: b.excerpt,
    publishedAt: b.publishedAt,
    author: b.author,
    category: b.category,
    readTime: b.readTime,
    imageUrl: b.imageUrl
  }));

  // Combine static authority pillars first, then append any unique DB blogs
  const staticSlugs = new Set(staticArticles.map(s => s.slug));
  const uniqueDbBlogs = dbBlogs.filter(d => !staticSlugs.has(d.slug));
  const blogs = [...staticArticles, ...uniqueDbBlogs];

  return (
    <main className="flex-1 bg-brand-white pt-32 pb-16">
      <div className="container-inner max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="grid md:grid-cols-12 gap-8 mb-14 md:mb-20 items-end border-b border-brand-gray/30 pb-12">
          <div className="md:col-span-8 lg:col-span-9">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-brand-green mb-3 block">
              Rex Technical Knowledge Base
            </span>
            <TextType
              as="h1"
              className="text-4xl sm:text-6xl lg:text-[5.5rem] font-bold font-outfit text-brand-dark tracking-[-0.04em] leading-[0.95]"
              text="Technical Insights"
              startOnVisible={true}
              loop={false}
            />
          </div>
          <div className="md:col-span-4 lg:col-span-3">
            <p className="text-brand-dark-muted text-base md:text-lg border-l-2 border-brand-green pl-5 py-1">
              Field-tested maintenance blueprints, hardware teardowns, and procurement guides backed by 45+ years of bench engineering.
            </p>
          </div>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center py-20 bg-brand-white-pure rounded-2xl border border-brand-gray/20">
            <p className="text-brand-dark-muted">No technical insights published yet. Check back soon!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-12">
            {/* Featured Hero Post */}
            {blogs[0] && (
              <Link
                key={blogs[0]._id}
                href={`/blogs/${blogs[0].slug}`}
                className="group block bg-brand-white-pure rounded-3xl border border-brand-gray/20 p-6 md:p-10 hover:shadow-xl hover:border-brand-green/40 transition-all duration-300"
              >
                <div className="grid md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-7 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3 text-xs font-mono mb-4">
                        {blogs[0].category && (
                          <span className="bg-brand-green/15 text-brand-green px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                            {blogs[0].category}
                          </span>
                        )}
                        <span className="text-brand-dark-muted">•</span>
                        <span className="text-brand-dark-muted font-bold">{blogs[0].readTime || '8 min read'}</span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-outfit font-bold text-brand-dark mb-4 tracking-tight leading-snug group-hover:text-brand-green transition-colors">
                        {blogs[0].title}
                      </h2>
                      <p className="text-brand-dark-muted text-base md:text-lg leading-relaxed mb-6 line-clamp-3">
                        {blogs[0].excerpt}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-brand-gray/20 text-sm">
                      <span className="font-mono text-brand-dark font-medium">By {blogs[0].author}</span>
                      <span className="text-brand-green font-bold font-mono group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        Read Blueprint →
                      </span>
                    </div>
                  </div>
                  <div className="md:col-span-5">
                    <div className="relative aspect-16/10 rounded-2xl overflow-hidden bg-brand-dark/5">
                      <img
                        src={blogs[0].imageUrl || "https://res.cloudinary.com/dl4ohcjuk/image/upload/f_auto,q_auto/v1782656160/nvqsiexrp4hs3hpb5xeh.jpg"}
                        alt={blogs[0].title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="eager"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Grid of Remaining Posts */}
            {blogs.length > 1 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {blogs.slice(1).map((blog) => (
                  <Link
                    key={blog._id}
                    href={`/blogs/${blog.slug}`}
                    className="group flex flex-col bg-brand-white-pure rounded-2xl border border-brand-gray/20 overflow-hidden hover:shadow-lg hover:border-brand-green/40 transition-all duration-300"
                  >
                    <div className="relative aspect-16/10 overflow-hidden bg-brand-dark/5">
                      <img
                        src={blog.imageUrl || "https://res.cloudinary.com/dl4ohcjuk/image/upload/f_auto,q_auto/v1782653597/ub0fz4fjv6ineu68wtrb.png"}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      {blog.category && (
                        <span className="absolute top-3 left-3 bg-brand-dark/80 backdrop-blur-sm text-brand-white-pure text-[11px] font-mono font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                          {blog.category}
                        </span>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-1 justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-mono text-brand-dark-muted mb-3">
                          <time suppressHydrationWarning>
                            {new Date(blog.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </time>
                          <span>•</span>
                          <span>{blog.readTime || '7 min read'}</span>
                        </div>
                        <h3 className="text-xl font-outfit font-bold text-brand-dark mb-3 leading-snug group-hover:text-brand-green transition-colors line-clamp-2">
                          {blog.title}
                        </h3>
                        <p className="text-brand-dark-muted text-sm leading-relaxed mb-6 line-clamp-3">
                          {blog.excerpt}
                        </p>
                      </div>
                      <div className="pt-4 border-t border-brand-gray/15 flex items-center justify-between text-xs font-mono">
                        <span className="text-brand-dark/70">By {blog.author}</span>
                        <span className="text-brand-green font-bold group-hover:translate-x-1 transition-transform">
                          Read Guide →
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Dual-Intent B2B + B2C Bridge Banner */}
        <div className="mt-20 pt-12 border-t border-brand-gray/30 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-brand-dark text-brand-white p-8 rounded-2xl border-l-4 border-brand-green flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-green mb-2 block">
                Enterprise & Operations
              </span>
              <h3 className="text-2xl font-outfit font-bold mb-3 text-brand-white-pure">
                Looking for Corporate Fleet AMCs?
              </h3>
              <p className="text-brand-gray-light leading-relaxed mb-6 text-sm">
                Protect banking teller passbook printers, logistics waybill continuous units, and healthcare MFPs with 4-hour breakdown SLAs, preventive maintenance, and standby printer buffers.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/services/corporate-amc"
                className="bg-brand-green text-brand-dark font-bold px-5 py-2.5 rounded text-sm hover:bg-brand-white-pure transition-colors"
              >
                Explore Corporate AMC
              </Link>
              <Link
                href="/industries"
                className="border border-white/20 text-white font-medium px-5 py-2.5 rounded text-sm hover:bg-white/10 transition-colors"
              >
                Browse Industries
              </Link>
            </div>
          </div>

          <div className="bg-brand-white-pure p-8 rounded-2xl border border-brand-gray/30 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-green mb-2 block">
                Local Walk-In Diagnostic
              </span>
              <h3 className="text-2xl font-outfit font-bold mb-3 text-brand-dark">
                Urgent Machine Repair in Mumbai?
              </h3>
              <p className="text-brand-dark-muted leading-relaxed mb-6 text-sm">
                Walk into our central Mulund West service workshop (Office No. 8, Ground Floor, Kamala Nehru Shopping Centre, next to Vikas Centre) between 10:00 AM and 6:30 PM, Monday through Saturday, for a free 30-minute diagnostic check.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/repairs/walk-in-mulund"
                className="bg-brand-dark text-brand-white font-bold px-5 py-2.5 rounded text-sm hover:bg-brand-green hover:text-brand-dark transition-colors"
              >
                Mulund Workshop Info
              </Link>
              <Link
                href="/repairs"
                className="border border-brand-dark/20 text-brand-dark font-medium px-5 py-2.5 rounded text-sm hover:bg-brand-dark/5 transition-colors"
              >
                Repair Solutions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
