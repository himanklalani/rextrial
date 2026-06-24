import { ProductCategory, ServiceCategory } from '@/types';

export const productCategories: ProductCategory[] = [
  {
    id: "cat-dotmatrix",
    slug: "dotmatrix-printers",
    name: "Dotmatrix Printers & Parts",
    description: "Durable and reliable dotmatrix printing solutions.",
    seo: { title: "Dotmatrix Printers | Rex International", description: "High-quality dotmatrix printers and parts." }
  },
  {
    id: "cat-laser",
    slug: "laser-printers",
    name: "Laser Printers & Consumables",
    description: "Fast, high-resolution laser printers.",
    seo: { title: "Laser Printers | Rex International", description: "Efficient laser printers and toner cartridges." }
  },
  {
    id: "cat-inktank",
    slug: "inktank-printers",
    name: "Ink Tank Printers",
    description: "Cost-effective ink tank solutions for high volume printing.",
    seo: { title: "Ink Tank Printers | Rex International", description: "Best ink tank printers for home and office." }
  },
  {
    id: "cat-peripherals",
    slug: "computer-peripherals",
    name: "Computer Peripherals",
    description: "Essential computer accessories and peripherals.",
    seo: { title: "Computer Peripherals | Rex International", description: "Quality computer accessories." }
  }
];

export const serviceCategories: ServiceCategory[] = [
  {
    id: "scat-repair",
    slug: "printer-repair",
    name: "Printer Repair & Maintenance",
    description: "Expert repair services for all printer types."
  },
  {
    id: "scat-amc",
    slug: "annual-maintenance",
    name: "Annual Maintenance Contracts (AMC)",
    description: "Comprehensive yearly maintenance for businesses."
  }
];
