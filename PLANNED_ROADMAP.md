# Rex International — Master Execution Roadmap
## All Planned & Pending Features (B2B + B2C Dual-Engine Architecture)

This document contains everything that has been **designed, audited, and planned**, but is **not yet implemented** in code. It balances **Enterprise B2B** (corporate AMCs, logistics fleets, multi-branch contracts) with **Retail B2C** (walk-in diagnostics in Mulund, home-office repairs, hardware sales, instant photo diagnostic).

---

## 1. Immediate Foundational Cleanups (Sitewide Baseline)

### A. Canonical Domain Consolidation (Pillar 2: SEO/GEO)
* **Current State:**
  * `robots.ts` and `sitemap.ts` contain hardcoded references to `https://www.lalanicomputers.com`.
  * `site.ts` contains `https://rexinternational.example.com`.
* **Planned Implementation:**
  * Unify all sitemaps, robots, canonical tags, and schema `@id` URLs to consume `getBaseUrl()`, resolving cleanly to your official production domain: `https://rexinternational.store`.

### B. Dual-Intent Soft-404 Remediation (`src/app/not-found.tsx`) (Pillar 1 & 2: UX + SEO)
* **Current State:**
  * `src/app/not-found.tsx` does not exist. Broken or mistyped links render Next.js's default error page.
* **Planned Implementation:**
  * Create a custom branded 404 page that injects `<meta name="robots" content="noindex, follow" />` to protect crawl budget.
  * Provide dual recovery pathways:
    * **For B2B Corporate Visitors:** *"Explore Corporate Printer AMCs (5-Hour SLA)"*.
    * **For B2C Retail Visitors:** *"Need Immediate Printer Repair? Book a Drop-In Diagnostic in Mulund"*.

### C. Click-to-Call (`tel:`) & Email (`mailto:`) Conversion Tracking (Pillar 1 & 3: UX + Analytics)
* **Current State:**
  * Phone numbers in `ContactCard.tsx` and `Footer.tsx` are rendered as static text (`<p>` and `<span>`). Mobile visitors cannot tap to call directly.
* **Planned Implementation:**
  * Convert all phone numbers into clickable `<a href="tel:+91...">` links and emails into `<a href="mailto:...">`.
  * Attach `trackEvent('phone_click')` and `trackEvent('email_click')` to measure exact inbound call volume from both corporate buyers and retail consumers in Google Analytics 4.

### D. Founder `Person` & Knowledge Graph Schema on `/about` (Pillar 2: GEO)
* **Current State:**
  * `/about` details 45+ years of heritage under Hansraj Lalani & Virat Lalani, but has 0 structured JSON-LD schema.
* **Planned Implementation:**
  * Inject JSON-LD `Person` schema for both founders, linking them via `@id` URI anchors to the `LocalBusiness` entity with credentials, roles, and knowledges to trigger Google Knowledge Panels.

---

## 2. B2B Enterprise Engine: High-Ticket Architecture (Phases 6 & 10)

Targeting IT Directors, Operations Heads, Bank Managers, and Logistics Directors.

### A. Dedicated Industry Vertical Landing Pages (`/industries/*`)
1. **`/industries/banking-finance`**
   * *Target Hardware:* Passbook printers (Olivetti, Epson), TVS/Epson high-volume teller dotmatrix printers, cheque scanners.
   * *Core Pitch:* 4-hour on-site SLA for branch operations, zero-downtime teller desks, monthly preventive maintenance.
   * *AEO/GEO:* Direct comparison table of Comprehensive vs. Non-Comprehensive AMC terms for financial institutions.
2. **`/industries/logistics-warehousing`**
   * *Target Hardware:* Continuous-form dotmatrix dispatch printers, heavy-duty shipping label & waybill printers.
   * *Core Pitch:* 24/7 continuous dispatch support for Bhiwandi & Mumbai logistics corridors, ribbon gear replacements in under 24 hours.
   * *AEO/GEO:* Case study passage showing dispatch bottleneck resolution.
3. **`/industries/healthcare-diagnostics`**
   * *Target Hardware:* High-resolution laser diagnostic imaging, medical report printers, laboratory barcode label printers.
   * *Core Pitch:* Crisp output for medical compliance, emergency backup replacement units.

### B. The B2B "Proof Graph" (Verified Case Studies / `/case-studies/*`)
1. **Case Study 1 (Logistics):** *"How we overhauled 60 dotmatrix invoicing printers across 12 logistics hubs in Bhiwandi with a 24-hour turnaround."*
2. **Case Study 2 (Banking):** *"Annual Maintenance Contract for a 15-branch cooperative bank: achieving 99.8% uptime SLA."*
3. **Internal Proof Links:** Bidirectional contextual links between service hubs and verified case studies.

---

## 3. B2C Retail & Consumer Engine: Local Repair & Hardware Sales (Phases 9 & 15)

Targeting home office professionals, retail shopkeepers (grocery/pharma billing), CA offices, students, and walk-in customers across Mulund, Thane, and Mumbai.

### A. Mulund Walk-In Repair & Workshop Diagnostic Hub (`/repairs/walk-in-mulund`)
* **Purpose:** Drive foot traffic and same-day drop-ins to the physical workshop in Mulund West.
* **Content Blueprint:**
  * Exact location instructions: *"Office No. 8, Ground Floor, Next to Vikas Centre, Kamala Nehru Shopping Centre, Netaji Subhash Road, Mulund West (2 mins from Mulund Railway Station)"*.
  * Free 30-minute bench diagnostic policy.
  * "No Fix, No Fee" guarantee.
  * Interactive map with parking and train transit guide.
* **Schema:** Rich `LocalBusiness` schema with `openingHoursSpecification`, `geo` coordinates, `priceRange`, and accepted payment methods.

### B. Hyper-Local Problem & Diagnostic Hubs (`/repairs/*`)
Direct answers to high-volume Mumbai retail search queries:
1. **`/repairs/inktank-cleaning-mumbai` (Epson EcoTank & Canon PIXMA):**
   * *User Problem:* Printer printing horizontal white lines, faded colors, or completely blank pages due to dried ink in nozzles.
   * *Transparent Solution:* ₹950 deep manual chemical flush and ultrasonic head alignment.
   * *AEO Block:* 50-word clear explanation of why automatic cleaning fails and manual flush is necessary.
2. **`/repairs/laser-toner-repair-mumbai` (HP LaserJet & Canon imageCLASS):**
   * *User Problem:* Vertical black streaks, squeaking gears, repeated paper jams, faded grey print.
   * *Transparent Solution:* ₹900 fuser roller overhaul, corona wire degreasing, and pickup roller replacement.
3. **`/repairs/retail-billing-printer-mumbai` (Dotmatrix Invoicing for Grocery & Pharma):**
   * *User Problem:* Worn ribbon gear, snapped wire, faint 3rd carbon copy on bill books.
   * *Transparent Solution:* ₹800 component-level pin replacement and 100-page burn-in certification.

### C. B2C Visual WhatsApp Diagnostic CTA ("Snap & Estimate")
* On all retail repair pages: A dedicated, frictionless CTA:  
  `[ 📸 Send Printer Error Photo on WhatsApp for Free Diagnostic ]`
* Launches WhatsApp with pre-filled text: *"Hi Rex International, my printer model is [Model] and it is showing an error. Here is a photo/video. Can you provide a diagnostic estimate?"*

### D. Hardware Catalog Instant Inquiry & Price Request
* On `/store` and `/store/[slug]`: Add an instant "Request B2C/B2B Quotation" button on every product card (Epson LQ 310, HP M1136, Epson L3250) linking directly to sales with the product name attached.

---

## 4. SEO, Crawl Budget & Search Visibility Infrastructure (Phases 8, 11, 12)

### A. Dynamic XML Sitemap Expansion (Phase 8)
* Update `src/app/sitemap.ts` to automatically ingest:
  * All static routes (`/`, `/about`, `/services`, `/store`, `/contact`, `/legal/*`)
  * All 5 core services (`/services/*`)
  * All 3 B2B industry vertical pages (`/industries/*`)
  * All 3 B2C problem/repair hubs (`/repairs/*`)
  * All verified case studies (`/case-studies/*`)
  * Dynamic products (`/store/*`)
* Provide exact `<lastmod>` timestamps formatted in ISO 8601.

### B. Internal Link Intent Firewall (Phase 11)
* Ensure all existing technical blogs link to commercial service pages using exact commercial anchor text (e.g., *"consult our [corporate printer AMC technicians]"* or *"book our [Epson ink tank cleaning service in Mumbai]"*) rather than generic phrases (*"click here"*).

### C. Core Web Vitals LCP Hero Preloading (Phase 12)
* Preload the above-the-fold hero background assets on the homepage using `<link rel="preload" as="image" ... fetchpriority="high">` to guarantee Largest Contentful Paint (LCP) under 1.2 seconds.

---

## 5. Off-Page Authority & Dual Directory Blueprint (Phase 14)

* **B2B Directories:** IndiaMART (Verified Supplier), TradeIndia, LinkedIn Company Page.
* **B2C & Local Directories:** Google Business Profile (Mulund West - optimized for "printer repair near me"), JustDial, Sulekha, Apple Maps.

---

## 6. Ongoing Maintenance & Final Verification (Phases 17 & 18)

* **Rich Results Testing:** Validate JSON-LD schemas (`LocalBusiness`, `Service`, `FAQPage`, `BreadcrumbList`, `Product`, `Person`) through Google's Rich Results Testing tool.
* **Google Search Console Indexing Ping:** Submit `https://rexinternational.store/sitemap.xml` directly to GSC.
* **Quarterly Decay Audit:** Review search impression trends for both B2B queries ("corporate amc") and B2C queries ("printer repair mulund") every 90 days.

### D. External Account Activation (When You Are Ready)
* **Current Status:** Accounts not created yet by you. 
* **Safe Code Isolation:** The codebase is safely **environment-variable gated**:
  * Until you add `NEXT_PUBLIC_GA_ID` to `.env`, Google Analytics will not load and will not throw errors.
  * Until you add `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` to `.env`, verification meta tags stay dormant.
  * 100% of RFQ and inquiry leads are saved directly to your internal **MongoDB database** (`/admin/leads/[secret]`) with zero reliance on external accounts.
* **When Ready (2-Minute Setup):**
  1. *For GA4:* Create a free account at [analytics.google.com](https://analytics.google.com), copy your `G-XXXXXXXXXX` Measurement ID, and paste it into `.env` as `NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"`.
  2. *For GSC:* Go to [search.google.com/search-console](https://search.google.com/search-console), choose HTML tag verification, copy the code, and paste it into `.env` as `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION="xyz..."`.
