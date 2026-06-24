'use client';

import React, { useState, useTransition } from 'react';
import { createBlog, deleteBlog, updateBlog } from '@/app/actions/blogs';

interface BlogMeta {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  relatedServiceSlug: string;
  publishedAt: string;
}

export default function BlogsClientManager({ initialBlogs }: { initialBlogs: BlogMeta[] }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '', slug: '', excerpt: '', content: '', relatedServiceSlug: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (blog: BlogMeta) => {
    setError(null);
    setSuccess(false);
    setEditingBlogId(blog.id);
    setFormData({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
      relatedServiceSlug: blog.relatedServiceSlug
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingBlogId(null);
    setFormData({ title: '', slug: '', excerpt: '', content: '', relatedServiceSlug: '' });
    setError(null);
    setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    
    const submitData = new FormData();
    submitData.append('title', formData.title);
    submitData.append('slug', formData.slug);
    submitData.append('excerpt', formData.excerpt);
    submitData.append('content', formData.content);
    submitData.append('relatedServiceSlug', formData.relatedServiceSlug);
    
    startTransition(async () => {
      let result;
      if (editingBlogId) {
        result = await updateBlog(editingBlogId, submitData);
      } else {
        result = await createBlog(submitData);
      }
      
      if (result.success) {
        setSuccess(true);
        if (!editingBlogId) {
          setFormData({ title: '', slug: '', excerpt: '', content: '', relatedServiceSlug: '' });
        }
      } else {
        setError(result.error || 'Something went wrong');
      }
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog? This cannot be undone.')) return;
    
    startTransition(async () => {
      await deleteBlog(id);
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* Blog Creation Form */}
      <div className="lg:col-span-1 bg-brand-white-pure/5 p-6 rounded-2xl border border-brand-white-pure/10 h-fit sticky top-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold font-outfit text-brand-green">
            {editingBlogId ? 'Edit Post' : 'Create New Post'}
          </h2>
          {editingBlogId && (
            <button onClick={cancelEdit} className="text-xs text-brand-gray-light hover:text-brand-white-pure bg-brand-white-pure/10 px-2 py-1 rounded">
              Cancel
            </button>
          )}
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray-light/60 mb-2">Title</label>
            <input 
              required
              name="title"
              value={formData.title}
              onChange={handleChange}
              type="text" 
              placeholder="e.g. Laser vs Ink Tank"
              className="w-full bg-brand-dark border border-brand-white-pure/20 rounded p-3 text-brand-white-pure focus:outline-none focus:border-brand-green transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray-light/60 mb-2">URL Slug</label>
            <input 
              required
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              type="text" 
              placeholder="e.g. laser-vs-ink-tank"
              className="w-full bg-brand-dark border border-brand-white-pure/20 rounded p-3 text-brand-white-pure focus:outline-none focus:border-brand-green transition-colors font-mono text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray-light/60 mb-2">Related Service Slug (Optional)</label>
            <input 
              name="relatedServiceSlug"
              value={formData.relatedServiceSlug}
              onChange={handleChange}
              type="text" 
              placeholder="e.g. inktank-deep-cleaning"
              className="w-full bg-brand-dark border border-brand-white-pure/20 rounded p-3 text-brand-white-pure focus:outline-none focus:border-brand-green transition-colors font-mono text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray-light/60 mb-2">Excerpt (Meta Description)</label>
            <textarea 
              required
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              rows={2}
              placeholder="A short summary of the post..."
              className="w-full bg-brand-dark border border-brand-white-pure/20 rounded p-3 text-brand-white-pure focus:outline-none focus:border-brand-green transition-colors resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-gray-light/60 mb-2">HTML Content</label>
            <textarea 
              required
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={8}
              placeholder="<h2>Heading</h2><p>Paragraph...</p>"
              className="w-full bg-brand-dark border border-brand-white-pure/20 rounded p-3 text-brand-white-pure focus:outline-none focus:border-brand-green transition-colors font-mono text-sm resize-y"
            />
          </div>

          {error && <div className="text-red-400 text-sm bg-red-400/10 p-3 rounded border border-red-400/20">{error}</div>}
          {success && <div className="text-brand-green text-sm bg-brand-green/10 p-3 rounded border border-brand-green/20">Blog {editingBlogId ? 'updated' : 'published'} successfully!</div>}

          <button 
            type="submit" 
            disabled={isPending}
            className="w-full bg-brand-green text-brand-dark font-bold font-mono tracking-wider py-3 rounded mt-2 hover:bg-brand-white-pure transition-colors disabled:opacity-50"
          >
            {isPending ? 'SAVING...' : (editingBlogId ? 'UPDATE BLOG' : 'PUBLISH BLOG')}
          </button>
        </form>
      </div>

      {/* Blogs List */}
      <div className="lg:col-span-2">
        <h2 className="text-xl font-bold font-outfit mb-6 text-brand-white-pure">Published Blogs ({initialBlogs.length})</h2>
        
        {initialBlogs.length === 0 ? (
          <div className="bg-brand-white-pure/5 p-8 rounded-2xl text-center border border-brand-white-pure/10">
            <p className="text-brand-gray-light/50">No blogs published yet.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {initialBlogs.map((blog) => (
              <div key={blog.id} className="bg-brand-white-pure/5 p-5 rounded-xl border border-brand-white-pure/10 flex flex-col md:flex-row gap-4 justify-between md:items-center">
                <div>
                  <h3 className="text-lg font-bold text-brand-white-pure mb-1">{blog.title}</h3>
                  <div className="flex items-center gap-3 text-xs font-mono text-brand-gray-light/60">
                    <span>/{blog.slug}</span>
                    <span>•</span>
                    <span suppressHydrationWarning>{new Date(blog.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <a 
                    href={`/blogs/${blog.slug}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm px-3 py-1.5 rounded bg-brand-white-pure/10 hover:bg-brand-white-pure hover:text-brand-dark transition-colors"
                  >
                    View
                  </a>
                  <button 
                    onClick={() => handleEdit(blog)}
                    disabled={isPending}
                    className="text-sm px-3 py-1.5 rounded bg-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white transition-colors"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(blog.id)}
                    disabled={isPending}
                    className="text-sm px-3 py-1.5 rounded bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
