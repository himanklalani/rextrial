import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com; connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data: https://schema.org https://images.unsplash.com https://res.cloudinary.com https://www.google-analytics.com https://www.googletagmanager.com; font-src 'self'; frame-src 'self' https://maps.google.com https://www.google.com;"
  }
];

const nextConfig: NextConfig = {
  // Allow cross-origin requests during local network development
  allowedDevOrigins: ['192.168.0.109', '192.168.29.161', '192.168.0.115', 'localhost:3000'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  async headers() {
    const headers = [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];

    // Block search engines from crawling or indexing Vercel preview deployments
    if (process.env.VERCEL_ENV === 'preview') {
      headers.push({
        source: '/(.*)',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
        ],
      });
    }

    return headers;
  },
};

export default nextConfig;
