# Changelog

All notable changes to this project will be documented in this file.

## [2026-09-08] - Wave 1: Foundational Baseline Hardening Completed

### Added
- **Custom Dual-Recovery 404 Page (`src/app/not-found.tsx`)**
  - *Problem:* Default Next.js 404 offered no brand continuity, no B2B/B2C recovery paths, and leaked crawl equity.
  - *Solution:* Built a high-conversion, branded 404 page featuring clear B2B AMC quote routing and B2C Mulund workshop drop-in links with explicit `robots: { index: false, follow: true }` metadata.
- **Tracked Conversion Link Component (`src/components/ui/TrackedLink.tsx`)**
  - *Problem:* Phone calls and email inquiries from headers, footers, and contact cards went unmeasured in analytics.
  - *Solution:* Created client-side `<TrackedLink>` component with non-blocking GA4 event dispatch (`phone_click` and `email_click`) and resilient fallbacks.
- **Person Knowledge Graph Schema (`src/app/(public)/about/page.tsx`)**
  - *Problem:* Search engines lacked structured entity relationships connecting Rex International's 45-year history to founders Hansraj Lalani & Virat Lalani.
  - *Solution:* Injected Schema.org `Person` JSON-LD graph linking founders directly to the `LocalBusiness` `@id`.

### Updated / Fixed
- **Dynamic Sitemap Full-Catalog Expansion (`src/app/sitemap.ts`)**
  - *Problem:* Previous sitemap only contained static routes and service pages, omitting all 13 hardware store products and dynamic technical blog articles from search engine crawlers.
  - *Solution:* Upgraded `sitemap.ts` to dynamically crawl and include: all 8 core static routes, all 5 specialized service sub-pages, all 13 hardware product catalog items (`/store/[slug]`), and dynamic blog articles from MongoDB (totaling 33 indexed endpoints) with resilient database fallback.
- **Hardware Catalog Pre-rendering & Product Schema Fix (`src/app/(public)/store/[slug]/page.tsx`)**
  - *Problem:* Product detail pages lacked `generateStaticParams()` resulting in dynamic rendering overhead, and product schema had a redundant base URL prefix prepended to Cloudinary image URLs.
  - *Solution:* Implemented `generateStaticParams()` to pre-render all 13 products at build time (bringing SSG pages from 17 to 30) and corrected JSON-LD image resolution.
- **Privacy Policy Analytics Realignment (`src/app/(public)/legal/privacy/page.tsx`)**
  - *Problem:* Privacy policy text still referenced legacy Vercel Analytics instead of the active Google Analytics 4 implementation.
  - *Solution:* Updated privacy documentation to accurately reflect Google Analytics 4 usage and user cookie preference controls.

---

## [2026-09-07] - Post-Mortem Cleanup & Focus Realignment

### Removed / Discarded
- **B2B Clipboard Share Button (`ShareServiceCTA.tsx`)**
  - *Problem:* Left in the codebase under the assumption that it was "harmless," but live inspection revealed multiple UX and technical flaws: it broke user expectations (did not actually open WhatsApp or share directly), cluttered the CTA area alongside "WhatsApp Us", and failed in insecure/mobile contexts.
  - *Solution:* Completely removed the component and button from the codebase. Full post-mortem documented in `DISCARDED_CHANGES.md`. CTA section restored to two high-converting, proven actions: "Get a Free Quote" and "WhatsApp Us".

---

## [2026-09-05] - SEO, AEO & B2B Foundation Updates

### Added
- **Google Analytics 4 Pipeline (`src/lib/analytics.ts` & `src/app/layout.tsx`)**
  - *Problem:* The application had zero conversion visibility into which service offerings generate business inquiries, and required a 100% free, permanent, non-expiring analytics infrastructure.
  - *Solution:* Integrated official `@next/third-parties/google` with a resilient `trackEvent()` utility to dispatch GA4 custom events (`whatsapp_click`, `form_submission`) without degrading page speed or Lighthouse scores.
- **Google Search Console Verification Hook (`src/lib/seo.ts`)**
  - *Problem:* Google Search Console ownership verification was missing from metadata, blocking search performance tracking and dynamic sitemap indexing.
  - *Solution:* Added automated `verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }` meta tag generation into the sitewide Next.js metadata pipeline.

### Updated / Fixed
- **WhatsApp Lead Conversion Tracking (`WhatsAppCTA.tsx`)**
  - *Problem:* Direct WhatsApp inquiries—the company's primary closing channel—were untracked, making it impossible to attribute leads to specific services.
  - *Solution:* Converted component to a client-side component and attached non-blocking `trackEvent('whatsapp_click')` capturing the service and URL.
- **Contact Form RFQ Tracking (`ContactForm.tsx`)**
  - *Problem:* Form submissions were saved to MongoDB but had no marketing conversion signal to measure lead acquisition rates.
  - *Solution:* Attached `trackEvent('form_submission')` triggered immediately upon confirmed server action success.
- **WhatsApp Rich Open Graph Previews (`src/app/(public)/services/[slug]/page.tsx`)**
  - *Problem:* Pasting service links in WhatsApp rendered a blank, plain box showing only `rexinternational.store` twice with no banner image, bold headline, or SLA description.
  - *Solution:* Upgraded `generateMetadata` with full Open Graph specifications: 1200x630 high-resolution image banner, article type, locale, and unified production canonical URLs.
- **Content Security Policy Permissions (`next.config.ts`)**
  - *Problem:* Strict CSP security headers were rejecting external script loading and analytics beacons, causing red browser console errors.
  - *Solution:* Whitelisted `googletagmanager.com` and `google-analytics.com` across `script-src`, `connect-src`, and `img-src` directives.

---

## [Previous Releases]

### Updated / Fixed
- **Typography Layout (`HeroOverlay.tsx`)**
  - *Problem:* The main heading text was clipping and getting cut off on laptops with smaller screens or high display scaling due to rigid font sizing and hidden overflow constraints.
  - *Solution:* Implemented fluid typography (`clamp()`) and removed rigid bounding box constraints so the text perfectly scales and wraps on all desktop sizes.

- **Scroll Choreography Layout (`scroll-choreography.tsx`)**
  - *Problem:* The top images in the grid were positioned too high, causing them to overlap with the global navigation bar on shorter screens.
  - *Solution:* Adjusted vertical spacing (`yTop`) and image heights to guarantee a safe clearance zone below the navbar.

- **Animation Performance (`scroll-choreography.tsx`)**
  - *Problem:* The scrolling animation was lagging and stuttering on older laptops because it was forcing the CPU to constantly recalculate the physical width and height of the images.
  - *Solution:* Replaced the CPU-heavy dimension animations with a GPU-accelerated `clip-path` expansion, resulting in a flawlessly smooth framerate.

- **Scroll Lock Jitter (`ScrollytellHero.tsx`)**
  - *Problem:* A background script was fighting the user's trackpad by aggressively forcing the scroll position, causing massive screen shaking on Windows laptops.
  - *Solution:* Removed the hidden `window.scrollTo` script entirely, fully restoring smooth native scrolling.
