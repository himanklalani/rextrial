'use server';

import { connectDB, Blog } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function createBlog(formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const excerpt = formData.get('excerpt') as string;
    const content = formData.get('content') as string;
    const relatedServiceSlug = formData.get('relatedServiceSlug') as string;

    if (!title || !slug || !excerpt || !content) {
      return { success: false, error: 'Missing required fields' };
    }

    await connectDB();
    
    // Check if slug exists
    const existing = await Blog.findOne({ slug });
    if (existing) {
      return { success: false, error: 'A blog with this slug already exists.' };
    }

    await Blog.create({
      title,
      slug: slug.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
      excerpt,
      content,
      relatedServiceSlug: relatedServiceSlug || undefined,
    });

    revalidatePath('/blogs');
    revalidatePath(`/blogs/${slug}`);
    
    return { success: true };
  } catch (error: any) {
    console.error('Failed to create blog:', error);
    return { success: false, error: error.message || 'Failed to create blog' };
  }
}
export async function updateBlog(id: string, formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const excerpt = formData.get('excerpt') as string;
    const content = formData.get('content') as string;
    const relatedServiceSlug = formData.get('relatedServiceSlug') as string;

    if (!title || !slug || !excerpt || !content) {
      return { success: false, error: 'Missing required fields' };
    }

    await connectDB();
    
    // Check if new slug conflicts with another blog
    const existing = await Blog.findOne({ slug, _id: { $ne: id } });
    if (existing) {
      return { success: false, error: 'A different blog with this slug already exists.' };
    }

    await Blog.findByIdAndUpdate(id, {
      title,
      slug: slug.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
      excerpt,
      content,
      relatedServiceSlug: relatedServiceSlug || undefined,
    });

    revalidatePath('/blogs');
    revalidatePath(`/blogs/${slug}`);
    
    return { success: true };
  } catch (error: any) {
    console.error('Failed to update blog:', error);
    return { success: false, error: error.message || 'Failed to update blog' };
  }
}

export async function deleteBlog(id: string) {
  try {
    await connectDB();
    await Blog.findByIdAndDelete(id);
    
    revalidatePath('/blogs');
    
    return { success: true };
  } catch (error: any) {
    console.error('Failed to delete blog:', error);
    return { success: false, error: 'Failed to delete blog' };
  }
}
