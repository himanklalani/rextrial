import { connectDB, Blog } from '@/lib/db';
import { notFound } from 'next/navigation';
import React from 'react';
import Link from 'next/link';
import BlogsClientManager from './BlogsClientManager';

export const dynamic = 'force-dynamic';

export default async function AdminBlogsPage({ params }: { params: Promise<{ secret: string }> }) {
  // 1. Verify Secret Key
  const validSecret = process.env.ADMIN_SECRET_KEY;
  const { secret } = await params;
  
  if (!validSecret || secret !== validSecret) {
    return notFound();
  }

  // 2. Fetch all blogs
  await connectDB();
  const blogsRaw = await Blog.find({}).sort({ publishedAt: -1 }).lean();
  
  const blogs = blogsRaw.map(b => ({
    id: b._id.toString(),
    title: b.title,
    slug: b.slug,
    excerpt: b.excerpt,
    content: b.content,
    relatedServiceSlug: b.relatedServiceSlug || '',
    publishedAt: b.publishedAt.toISOString(),
  }));

  return (
    <div className="min-h-screen bg-brand-dark text-brand-white-pure p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 border-b border-brand-white-pure/10 pb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold font-outfit text-brand-green mb-2">Blogs Dashboard</h1>
            <p className="text-brand-gray-light/60">Create, view, and delete technical insights.</p>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              href={`/admin/leads/${secret}`}
              className="text-sm font-bold bg-brand-gray-light/10 text-brand-white-pure px-4 py-2 rounded border border-brand-white-pure/20 hover:bg-brand-white-pure hover:text-brand-dark transition-colors"
            >
              ← Back to Leads
            </Link>
            <div className="text-xs font-mono bg-brand-white-pure/5 px-3 py-1.5 rounded-md border border-brand-white-pure/10">
              Secure Session Active
            </div>
          </div>
        </div>

        {/* Manager Component */}
        <BlogsClientManager initialBlogs={blogs} />

      </div>
    </div>
  );
}
