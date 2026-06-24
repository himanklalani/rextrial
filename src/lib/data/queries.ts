import { products } from './products';
import { services } from './services';
import { productCategories, serviceCategories } from './categories';
import { siteSettings } from './site-settings';
import { Product, Service, ProductCategory, ServiceCategory, SiteSettings } from '@/types';

// Data access layer that acts as an abstraction over our data source.
// This allows a seamless migration to MongoDB later.

export async function getSiteSettings(): Promise<SiteSettings> {
  return siteSettings;
}

export async function getAllProducts(): Promise<Product[]> {
  return products;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const product = products.find(p => p.slug === slug);
  return product || null;
}

export async function getAllProductCategories(): Promise<ProductCategory[]> {
  return productCategories;
}

export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  return products.filter(p => p.categoryId === categoryId);
}

export async function getAllServices(): Promise<Service[]> {
  return services;
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const service = services.find(s => s.slug === slug);
  return service || null;
}

export async function getAllServiceCategories(): Promise<ServiceCategory[]> {
  return serviceCategories;
}
