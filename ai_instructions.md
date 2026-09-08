# 🧠 AI Architectural Execution & Strategic Guidelines (`ai_instructions.md`)
## Permanent Master Framework for Rex International (B2B + B2C Dual-Engine)

This document serves as the mandatory operational manual and strategic filter for all planning, research, architectural decisions, code modifications, and inspections on this project. Every task must be evaluated against this framework before writing or deleting a single line of code.

---

## 1. The Strict B2B + B2C Dual-Lens Rule (Mandatory Core Directive)

**STRICT DIRECTIVE:** You are strictly prohibited from planning, researching, or writing code exclusively for B2B or exclusively for B2C. Rex International has operated since 1980 as both an enterprise B2B partner and a trusted retail B2C specialist. Every strategy, route architecture, content plan, and feature must cater seamlessly to both audiences.

### The Dual Persona Matrix

| Dimension | B2B Audience (Enterprise & Institutions) | B2C Audience (Retail, SMBs & Consumers) |
| :--- | :--- | :--- |
| **Who They Are** | IT Heads, Facility Managers, Logistics Hub Operators, Bank Branch Managers, Healthcare Administrators. | Home office professionals, CA/Law practitioners, retail shopkeepers (grocery/pharma billing), students, teachers, photographers. |
| **What They Need** | Corporate Printer AMCs (3 to 500+ printers), fleet-wide uptime guarantees, 4-hour breakdown SLAs, genuine OEM parts at wholesale, centralized billing. | Fast walk-in printer diagnostics, same-day ink tank unclogging, laser toner streaking repair, affordable cartridge replacement, drop-in repair in Mulund. |
| **Primary Search Intent** | "Corporate printer AMC Mumbai", "TVS dotmatrix repair contract", "printer maintenance SLA Bhiwandi", "wholesale printer consumables Maharashtra". | "Printer repair shop near me", "Epson L3110 printing blank lines fix Mumbai", "HP laser printer repair Mulund", "printer repair cost Mumbai". |
| **Key Conversion Triggers** | SLA contracts, response time guarantees, replacement standby units, comprehensive parts coverage, verified corporate case studies. | Transparent starting prices (₹800, ₹950), free 30-minute workshop diagnostic, "No Fix, No Fee" policy, direct WhatsApp photo/video diagnostic. |
| **Primary Action** | "Request Corporate AMC Proposal" / "Talk to Fleet Specialist". | "Message on WhatsApp with Error Photo" / "Book Drop-in Diagnostic". |

---

## 2. The Proactive Strategic Mindset (Think Ahead at Step 0)

* **Proactive Evaluation from Inception:** Never wait for code to be written to evaluate its value. When analyzing data, reviewing competitor patterns, or architecting a new roadmap item, evaluate user experience, discoverability, and commercial ROI from the very first thought.
* **Continuous Purpose Audit on Active Plans:** Periodically audit every active roadmap item in `PLANNED_ROADMAP.md`. Ask:
  1. *What is the exact purpose of this feature?*
  2. *Who is using it (B2B corporate buyer or B2C retail customer), and what problem does it solve for them?*
  3. *How does it measurably drive inquiries (WhatsApp chats, RFQs, phone calls, walk-in visits)?*

---

## 3. The 3-Pillar Value Extraction Filter

Every proposed feature, content block, route, or technical tweak must pass through all three pillars:

### Pillar 1: Dual User Benefit & Experience (UX First)
* **Mental Model Alignment:** The UI must behave exactly as a human expects. If an element says "WhatsApp Us", it must launch WhatsApp with pre-filled, relevant text—never take invisible shortcuts or copy to clipboard without notice.
* **Dual-Path Navigation:** Ensure corporate buyers can quickly reach B2B contracts (`/services/corporate-amc`, `/industries/*`) while consumer/retail visitors can instantly find repair pricing, problem symptoms, and workshop locations (`/services/inktank-deep-cleaning`, `/contact`, `/store`).
* **Frictionless Conversion:** Every interaction must bring the user closer to an inquiry (WhatsApp chat, RFQ submission, phone call) without cognitive overload or competing secondary buttons.
* **Cross-Device Parity:** Must look and function seamlessly across desktop widescreen, tablet, and mobile touchscreens (iOS Safari & Android Chrome).

### Pillar 2: Total Visibility Optimization (SEO + AEO + GEO)
Every page and content structure must be engineered for the modern search trinity across both B2B and B2C:
1. **Traditional SEO (Search Engine Optimization):**
   * Server-Side Rendered (SSR) semantic HTML (`<main>`, `<article>`, `<section>`, `<h1>`–`<h3>`).
   * Clean self-referencing canonical tags, dynamic XML sitemaps with ISO 8601 `<lastmod>`, and zero soft-404s.
   * Commercial & Transactional intent capture: Both high-ticket B2B terms ("Corporate printer AMC Mumbai") and hyper-local B2C terms ("Printer repair Mulund West", "Epson printer service center Mumbai").
2. **AEO (Answer Engine Optimization):**
   * Direct, concise declarative answer blocks (40–60 words) immediately following primary questions and H2 headers so voice and answer engines (Siri, Google Assistant, Featured Snippets) can extract them effortlessly.
   * Example: *"To fix an Epson EcoTank printing with horizontal white lines in Mumbai, professional nozzle flushing is required to dissolve dried pigment ink without damaging the piezoelectric nozzle plate..."*
   * Granular `FAQPage`, `Service`, `LocalBusiness`, and `Product` JSON-LD schemas.
3. **GEO (Generative Engine Optimization for LLMs):**
   * LLMs (Google AI Overviews, Perplexity, SearchGPT, Claude) prioritize dense semantic passages, comparison tables (`<table>`), and structured data over fluffy prose.
   * Entity Resolution via `@id` URI architecture linking Rex International, its Mulund headquarters, its founders (Hansraj & Virat Lalani), and its 45+ year legacy into the Knowledge Graph.

### Pillar 3: Cascading Strategic Benefits
* **Core Web Vitals Excellence:** Sub-1.2s Largest Contentful Paint (LCP), Interaction to Next Paint (INP) < 150ms, and Cumulative Layout Shift (CLS) < 0.05.
* **Clean Code & Long-Term Maintainability:** Zero orphaned files, zero unused packages, minimal runtime overhead, and strong TypeScript types.

---

## 4. The "Don't Just Delete — Pivot" Protocol

When a feature, plan, or test reveals a flaw or is marked for removal:
1. **Extract the Core Business Intent:** Identify *why* the idea was conceived in the first place.
2. **Diagnose the Failure Mode:** Pinpoint why the specific execution failed.
3. **Pivot to a Superior Dual-Audience Alternative:**
   * *Example 1 (B2B Link Share):* Instead of an unvetted clipboard button that broke user expectations, pivot to an **Executive Contract Teardown / SLA Summary** that users can directly forward on WhatsApp or download as a 1-page PDF.
   * *Example 2 (Consumer SEO Blogs):* Instead of generic global blogs ("History of printers") that attract zero-value traffic, pivot to **Local B2C Diagnostic & Troubleshooting Guides** ("How to clear Epson L3250 nozzle clogs in Mumbai", "HP LaserJet fuser black streak repair Mulund") that directly funnel local retail customers into paid workshop repairs.

---

## 5. The Zero-Inspection-Failure Standard (Post-Mortem Rules)

### Rule 1: Never Assume Code is "Safe" or "Harmless"
* Discarded or paused scope must be **100% cleanly excised**. Never leave behind orphaned components, unused buttons, or dormant script tags under the assumption that "it seems fine on the surface."
* If code does not have an explicit purpose, verified test coverage, and human approval, it does not belong in the repository.

### Rule 2: Complete Failure-Mode & Context Matrix
Before recommending or writing code, rigorously evaluate:
* **Security & Environment Contexts:** Does this rely on APIs (like Clipboard, Geolocation, Notifications) that fail on HTTP, LAN development IPs, or permission-restricted mobile browsers?
* **Viewport & Input Methods:** Does this work on touch screens, mouse hover, mobile keyboards, and small laptop resolutions?
* **Visual Hierarchy:** Does this compete with or distract from primary conversion actions?

### Rule 3: Inspection-Grade Verification Protocol
* **Build Passing is NOT Verification:** "Compiled with 0 errors" only proves syntactic correctness—it does not prove functionality, UX, or design fidelity.
* **The Final Inspection Protocol:**
  1. Inspect the live DOM in the browser across viewport sizes.
  2. Perform the exact end-to-end user click/touch flow.
  3. Verify console logs, network calls, and event tracking signals.
  4. Ensure zero UI jitter, zero unexpected layout shifts, and zero dead ends.

---

## 6. Mandatory Pre-Execution Checklist

Before executing any plan or code change, run through this mental checklist:
- [ ] **Dual-Audience Alignment:** Does this clearly serve either B2B enterprise clients, B2C retail customers, or both?
- [ ] **Purpose:** Do I know exactly what business outcome this achieves for Rex International?
- [ ] **User Benefit:** Is this interaction intuitive, obvious, and delightful for a real human visitor?
- [ ] **Visibility (SEO/AEO/GEO):** Does this maximize discoverability across traditional search, answer engines, and AI overviews?
- [ ] **Edge Cases:** Have I checked mobile, permissions, environment security, and network failure modes?
- [ ] **Clean Scope:** Am I adding *only* what is approved, and pruning anything that is obsolete?
