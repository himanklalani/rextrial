export interface SeoMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
}

export interface SiteSettings {
  name: string;
  description: string;
  url: string;
  founders: string[];
  experienceYears: number;
  phones: string[];
  whatsappNumber: string;
  email: string;
  address: string;
  socialLinks?: Record<string, string>;
  seo: SeoMetadata;
}

export interface ProductCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  seo: SeoMetadata;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  categoryId: string;
  shortDescription: string;
  detailedDescription: string;
  priceRange: string;
  features: string[];
  useCases?: { title: string; description: string }[];
  specifications?: Record<string, string>;
  imageUrl?: string;
  isAvailable: boolean;
  seo: SeoMetadata;
}

export interface ServiceCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface Service {
  id: string;
  slug: string;
  name: string;
  categoryId: string;
  shortDescription: string;
  detailedDescription: string;
  startingPrice: string;
  features: string[];
  supportedBrands?: string[];
  faqs?: ServiceFAQ[];
  seo: SeoMetadata;
}

export interface Inquiry {
  id: string;
  type: 'product' | 'service' | 'general';
  referenceId?: string; // Product or Service ID
  customerName: string;
  customerPhone: string;
  message: string;
  createdAt: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
}
