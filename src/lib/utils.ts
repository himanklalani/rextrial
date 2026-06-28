import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { siteSettings } from './data/site-settings';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createWhatsAppUrl(message: string): string {
  return `https://wa.me/${siteSettings.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function createWhatsAppProductUrl(productName: string): string {
  const text = `Hi Rex International, I am interested in the product: ${productName}. Please provide more details.`;
  return createWhatsAppUrl(text);
}

export function createWhatsAppServiceUrl(serviceName: string, startingPrice: string): string {
  const text = `Hi Rex International, I want to inquire about the service: ${serviceName} (Starting from ${startingPrice}). Please guide me.`;
  return createWhatsAppUrl(text);
}

export function createWhatsAppGeneralUrl(): string {
  const text = `Hi Rex International, I have a general inquiry.`;
  return createWhatsAppUrl(text);
}
