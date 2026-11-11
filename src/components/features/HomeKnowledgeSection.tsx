import Link from 'next/link';
import { staticBlogs } from '@/lib/data/blogs';

export default function HomeKnowledgeSection() {
  return (
    <section className="py-20 md:py-28 bg-brand-white-pure border-t border-brand-gray/20">
      <div className="container-inner max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/10 border border-brand-green/30 text-brand-green text-xs font-mono font-semibold tracking-wider uppercase mb-4">
              <span>📚</span>
              <span>Engineering Insights & Field Manuals</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-outfit text-brand-dark tracking-tight leading-tight">
              Hardware Diagnostics & Fleet Maintenance Guides
            </h2>
            <p className="text-brand-dark-muted text-base md:text-lg mt-3 leading-relaxed">
              Actionable maintenance protocols, component teardowns, and B2B procurement guides written directly by our senior bench technicians.
            </p>
          </div>
          <div>
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 bg-brand-dark hover:bg-brand-green text-brand-white-pure font-bold text-sm px-6 py-3.5 rounded-xl transition-all shadow-sm hover:shadow"
            >
              <span>View All 4 Guides</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>

        {/* 4 Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {staticBlogs.map((blog) => (
            <article
              key={blog.id}
              className="group flex flex-col bg-brand-white rounded-2xl border border-brand-gray/20 hover:border-brand-green/40 hover:shadow-lg transition-all duration-300 p-5"
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-brand-dark-muted mb-3">
                <span className="text-brand-green font-bold uppercase tracking-wider">{blog.category}</span>
                <span>{blog.readTime}</span>
              </div>

              <h3 className="text-base font-bold font-outfit text-brand-dark leading-snug line-clamp-2 group-hover:text-brand-green transition-colors mb-2 min-h-[2.75rem]">
                <Link href={`/blogs/${blog.slug}`}>
                  {blog.title}
                </Link>
              </h3>

              <p className="text-xs text-brand-dark-muted line-clamp-3 leading-relaxed mb-4 flex-1">
                {blog.excerpt}
              </p>

              <div className="pt-3 border-t border-brand-gray/15 flex items-center justify-between mt-auto">
                <span className="text-[11px] font-mono text-brand-dark-muted">By {blog.author}</span>
                <Link
                  href={`/blogs/${blog.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-brand-green hover:underline"
                >
                  Read Guide →
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
