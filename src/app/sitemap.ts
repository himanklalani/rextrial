import { MetadataRoute } from 'next';
import { services } from '@/lib/data/services';
import { products } from '@/lib/data/products';
import { industries } from '@/lib/data/industries';
import { repairs } from '@/lib/data/repairs';
import { connectDB, Blog } from '@/lib/db';
import { getBaseUrl } from '@/lib/seo';

export const revalidate = 86400; // Rebuild once per day

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const SITE_URL = getBaseUrl();

  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/about',
    '/services',
    '/store',
    '/industries',
    '/repairs',
    '/repairs/walk-in-mulund',
    '/contact',
    '/blogs',
    '/legal/privacy',
    '/legal/terms',
  ].map(route => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : (route === '/services' || route === '/store' || route === '/industries') ? 0.9 : 0.8,
  }));

  // Dynamic service pages from our data layer (5 services)
  const serviceRoutes: MetadataRoute.Sitemap = services.map(s => ({
    url: `${SITE_URL}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  // Dynamic industry vertical fleet pages (3 industries)
  const industryRoutes: MetadataRoute.Sitemap = industries.map(i => ({
    url: `${SITE_URL}/industries/${i.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  // Dynamic symptom repair pages (3 repairs)
  const repairRoutes: MetadataRoute.Sitemap = repairs.map(r => ({
    url: `${SITE_URL}/repairs/${r.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  // Dynamic store & hardware product catalog pages (13 products)
  const productRoutes: MetadataRoute.Sitemap = products.map(p => ({
    url: `${SITE_URL}/store/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  // Dynamic blog articles from MongoDB (if any published)
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    await connectDB();
    const blogs = await Blog.find({}).select('slug updatedAt publishedAt').lean();
    blogRoutes = blogs.map((b: { slug: string; updatedAt?: Date; publishedAt?: Date }) => ({
      url: `${SITE_URL}/blogs/${b.slug}`,
      lastModified: b.updatedAt || b.publishedAt || new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
  } catch {
    // If DB is unreachable during build or static export, continue gracefully
    blogRoutes = [];
  }

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...industryRoutes,
    ...repairRoutes,
    ...productRoutes,
    ...blogRoutes,
  ];
}

