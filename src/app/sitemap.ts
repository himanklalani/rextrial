import { MetadataRoute } from 'next';
import { services } from '@/lib/data/services';

export const revalidate = 86400; // Rebuild once per day

export default function sitemap(): MetadataRoute.Sitemap {
  const SITE_URL = 'https://www.lalanicomputers.com';

  const staticRoutes = ['', '/about', '/services', '/store', '/contact', '/legal'].map(route => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic service pages from our data layer
  const serviceRoutes = services.map(s => ({
    url: `${SITE_URL}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
