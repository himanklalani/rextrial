'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { siteSettings } from '@/lib/data/site-settings';
import { trackEvent } from '@/lib/analytics';

interface FleetTier {
  id: string;
  name: string;
  range: string;
  targetProfile: string;
  description: string;
  slaResponse: string;
  standbyGuarantee: string;
  preventiveCadence: string;
  highlightBadge: string;
  idealFor: string[];
}

const FLEET_TIERS: FleetTier[] = [
  {
    id: 'small',
    name: 'Branch / Small Fleet',
    range: '3 – 10 Printers',
    targetProfile: 'Retail Chains, Regional Branch Offices, Clinics & Law Firms',
    description: 'Designed for operational hubs that cannot tolerate billing or dispatch stoppages. Covers desktop LaserJets, InkTanks, and billing receipt printers.',
    slaResponse: 'Guaranteed 4-Hour On-Site',
    standbyGuarantee: 'Same-day standby buffer if workshop turnaround exceeds 24 hours',
    preventiveCadence: 'Quarterly full-bench preventive overhaul & sensor deglazing',
    highlightBadge: 'Most Popular for SMBs',
    idealFor: ['HP LaserJet single & multi-function', 'Epson EcoTank billing printers', 'TVS retail dotmatrix'],
  },
  {
    id: 'mid',
    name: 'Mid-Enterprise Fleet',
    range: '11 – 50 Printers',
    targetProfile: 'Warehouses, Logistics Depots, Multi-Department Corporate HQs',
    description: 'Comprehensive fleet management with dedicated standby inventory pre-allocated at our Mulund West central depot for immediate hot-swapping.',
    slaResponse: 'Guaranteed 3-to-4 Hour On-Site SLA',
    standbyGuarantee: 'Dedicated buffer unit reserved at Mulund depot for zero-downtime swap',
    preventiveCadence: 'Bi-monthly comprehensive cleaning, roller deglazing & gear lubrication',
    highlightBadge: 'Best Value for Logistics',
    idealFor: ['Heavy-duty continuous dotmatrix (Epson LQ, TVS MSP)', 'Departmental workgroup laser printers', 'Thermal barcode label printers'],
  },
  {
    id: 'enterprise',
    name: 'Institutional & Banking Network',
    range: '51 – 500+ Printers',
    targetProfile: 'Nationalized & Private Banks, Diagnostic Lab Chains, FMCG Networks',
    description: 'Enterprise-grade SLA designed for mission-critical operations. Includes customized quarterly audit reports, designated senior fleet engineer, and SLA penalty guarantees.',
    slaResponse: '2-to-4 Hour Priority Escalation SLA',
    standbyGuarantee: 'On-site standby machines stationed directly at critical facilities',
    preventiveCadence: 'Monthly proactive maintenance visits with formal digital service records',
    highlightBadge: 'Enterprise / Banking Grade',
    idealFor: ['Banking passbook printers (Olivetti, Epson PLQ, Lipi)', 'High-volume 24/7 continuous dispatch printers', 'Centralized network MFPs'],
  },
];

interface ExecutiveAmcProposalProps {
  canonicalUrl?: string;
}

export function ExecutiveAmcProposal({
  canonicalUrl = `${siteSettings.url}/services/corporate-amc`,
}: ExecutiveAmcProposalProps) {
  const [selectedTier, setSelectedTier] = useState<string>('mid');
  const activeTier = FLEET_TIERS.find((t) => t.id === selectedTier) || FLEET_TIERS[1];

  const executiveShareMessage = `Hi, here is the Executive AMC Proposal summary for our printer fleet from Rex International (Mulund West): 4-hr on-site SLA, standby buffer guarantee, comprehensive OEM parts & preventive maintenance. Review terms: ${canonicalUrl}`;
  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(executiveShareMessage)}`;

  const handleWhatsAppForward = () => {
    trackEvent('whatsapp_share', {
      type: 'executive_amc_proposal',
      tier: selectedTier,
      target_url: whatsappShareUrl,
    });
  };

  const handlePrint = () => {
    trackEvent('print_proposal', {
      type: 'executive_amc_summary',
      tier: selectedTier,
    });
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <section className="mt-14 pt-12 border-t border-brand-white-pure/10 not-prose">
      {/* Executive Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/10 border border-brand-green/30 text-brand-green text-xs font-mono font-semibold tracking-wider uppercase mb-3">
            <span>🏛️</span>
            <span>B2B Executive Teardown & SLA Matrix</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-outfit font-bold text-brand-white-pure">
            Executive Fleet AMC Proposal Breakdown
          </h2>
          <p className="text-brand-gray-light text-base max-w-2xl mt-2 leading-relaxed">
            Standardized technical parameters, response SLAs, and standby guarantees engineered for IT Directors, Facility Heads, and CFOs across Mumbai, Thane, and Navi Mumbai.
          </p>
        </div>

        {/* Quick Executive Actions */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={handlePrint}
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-brand-white-pure/10 border border-brand-white-pure/20 text-brand-white-pure text-xs font-mono font-bold hover:bg-brand-white-pure hover:text-brand-dark transition-all cursor-pointer"
            title="Print or Save 1-Page Summary as PDF"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 6 2 18 2 18 9"></polyline>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
              <rect x="6" y="14" width="12" height="8"></rect>
            </svg>
            <span>Print 1-Page Summary</span>
          </button>

          <a
            href={whatsappShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsAppForward}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-brand-green text-brand-dark text-xs font-mono font-bold hover:bg-brand-green-light transition-all shadow-md"
            title="Forward this summary directly on WhatsApp to CFO or IT Committee"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
            <span>Forward to CFO / Board</span>
          </a>
        </div>
      </div>

      {/* Interactive Fleet Tier Selector */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-mono uppercase tracking-wider text-brand-green font-bold">
            Step 1: Select Your Active Fleet Tier
          </span>
          <span className="text-xs text-brand-gray-light font-mono">
            {activeTier.range} Selected
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {FLEET_TIERS.map((tier) => {
            const isSelected = tier.id === selectedTier;
            return (
              <button
                key={tier.id}
                type="button"
                onClick={() => setSelectedTier(tier.id)}
                className={`text-left p-4 rounded-xl border transition-all cursor-pointer relative ${
                  isSelected
                    ? 'bg-brand-white-pure/10 border-brand-green shadow-lg ring-1 ring-brand-green'
                    : 'bg-brand-white-pure/5 border-brand-white-pure/10 hover:border-brand-white-pure/30 hover:bg-brand-white-pure/[0.07]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono text-brand-green font-bold uppercase tracking-wider">
                    {tier.range}
                  </span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                  )}
                </div>
                <div className="text-base font-outfit font-bold text-brand-white-pure">
                  {tier.name}
                </div>
                <div className="text-xs text-brand-gray-light/70 truncate mt-1">
                  {tier.targetProfile}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Tier Operational Profile Card */}
      <div className="bg-brand-white-pure/5 border border-brand-white-pure/10 rounded-2xl p-6 sm:p-8 mb-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-brand-white-pure/10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-2xl font-outfit font-bold text-brand-white-pure">
                {activeTier.name} ({activeTier.range})
              </h3>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-brand-green/20 text-brand-green border border-brand-green/30">
                {activeTier.highlightBadge}
              </span>
            </div>
            <p className="text-sm text-brand-gray-light leading-relaxed max-w-2xl">
              {activeTier.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <Link
              href={`/contact?service=corporate-amc&fleet=${encodeURIComponent(activeTier.range)}`}
              className="inline-flex items-center justify-center bg-brand-green text-brand-dark font-bold font-mono text-xs uppercase tracking-wider px-6 py-3.5 rounded hover:bg-brand-green/90 transition-colors text-center shadow-md"
            >
              Request Custom RFP for {activeTier.range}
            </Link>
          </div>
        </div>

        {/* 3 Core Operational Pillars for this Tier */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
          <div className="p-4 rounded-xl bg-brand-white-pure/[0.03] border border-brand-white-pure/5">
            <div className="text-xs font-mono text-brand-green uppercase font-semibold mb-1">
              Guaranteed On-Site SLA
            </div>
            <div className="text-lg font-outfit font-bold text-brand-white-pure mb-1">
              {activeTier.slaResponse}
            </div>
            <p className="text-xs text-brand-gray-light/70 leading-relaxed">
              Senior engineer dispatched directly from our Mulund West hub across Mumbai & Thane corridors.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-brand-white-pure/[0.03] border border-brand-white-pure/5">
            <div className="text-xs font-mono text-brand-green uppercase font-semibold mb-1">
              Standby Buffer Policy
            </div>
            <div className="text-lg font-outfit font-bold text-brand-white-pure mb-1">
              Zero Dispatch Interruption
            </div>
            <p className="text-xs text-brand-gray-light/70 leading-relaxed">
              {activeTier.standbyGuarantee}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-brand-white-pure/[0.03] border border-brand-white-pure/5">
            <div className="text-xs font-mono text-brand-green uppercase font-semibold mb-1">
              Preventive Maintenance
            </div>
            <div className="text-lg font-outfit font-bold text-brand-white-pure mb-1">
              Scheduled Bench Audit
            </div>
            <p className="text-xs text-brand-gray-light/70 leading-relaxed">
              {activeTier.preventiveCadence}
            </p>
          </div>
        </div>

        {/* Ideal Equipment Coverage */}
        <div className="mt-6 pt-5 border-t border-brand-white-pure/10 flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-brand-gray-light/60 uppercase mr-2">
            Standard Machine Coverage:
          </span>
          {activeTier.idealFor.map((item, idx) => (
            <span
              key={idx}
              className="text-xs font-mono bg-brand-white-pure/10 text-brand-white-pure px-3 py-1 rounded-md border border-brand-white-pure/10"
            >
              ✓ {item}
            </span>
          ))}
        </div>
      </div>

      {/* Step 2: Comprehensive vs Non-Comprehensive Comparison Table */}
      <div className="mb-12">
        <div className="mb-4">
          <span className="text-xs font-mono uppercase tracking-wider text-brand-green font-bold block mb-1">
            Step 2: Service Level Agreement (SLA) Matrix
          </span>
          <h3 className="text-2xl font-outfit font-bold text-brand-white-pure">
            Comprehensive vs. Non-Comprehensive AMC Comparison
          </h3>
          <p className="text-sm text-brand-gray-light mt-1">
            Transparent breakdown of component coverage, response times, and billing mechanisms.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-brand-white-pure/10 shadow-2xl">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-brand-white-pure/10 border-b border-brand-white-pure/10 text-brand-white-pure font-outfit">
                <th className="p-4 sm:p-5 font-bold text-base w-1/3">Contract Parameter</th>
                <th className="p-4 sm:p-5 font-bold text-base bg-brand-green/20 text-brand-green border-x border-brand-green/30 w-1/3">
                  Comprehensive AMC (All-Inclusive Shield)
                </th>
                <th className="p-4 sm:p-5 font-bold text-base w-1/3">
                  Non-Comprehensive AMC (Labor & Preventive)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-white-pure/5 text-brand-gray-light">
              <tr className="hover:bg-brand-white-pure/[0.02]">
                <td className="p-4 sm:p-5 font-semibold text-brand-white-pure">
                  On-Site Breakdown Response Time
                </td>
                <td className="p-4 sm:p-5 bg-brand-green/5 border-x border-brand-green/20 text-brand-white-pure font-semibold">
                  Guaranteed 4 Hours (2-Hour banking emergency option available)
                </td>
                <td className="p-4 sm:p-5">
                  Standard 4–6 Hours during normal business hours
                </td>
              </tr>
              <tr className="hover:bg-brand-white-pure/[0.02]">
                <td className="p-4 sm:p-5 font-semibold text-brand-white-pure">
                  Replacement Spare Parts Coverage
                </td>
                <td className="p-4 sm:p-5 bg-brand-green/5 border-x border-brand-green/20 text-brand-green font-semibold">
                  100% Free OEM Parts (Logic boards, gears, motors, pickup rollers, sensor arrays)
                </td>
                <td className="p-4 sm:p-5">
                  Labor is 100% free; parts billed at wholesale subsidized rates (30–40% below retail)
                </td>
              </tr>
              <tr className="hover:bg-brand-white-pure/[0.02]">
                <td className="p-4 sm:p-5 font-semibold text-brand-white-pure">
                  Standby Replacement Printers
                </td>
                <td className="p-4 sm:p-5 bg-brand-green/5 border-x border-brand-green/20 text-brand-white-pure font-semibold">
                  Immediate hot-swap standby unit deployed if repair requires bench overhaul
                </td>
                <td className="p-4 sm:p-5">
                  Standby units available on rental reservation or subject to availability
                </td>
              </tr>
              <tr className="hover:bg-brand-white-pure/[0.02]">
                <td className="p-4 sm:p-5 font-semibold text-brand-white-pure">
                  Preventive Maintenance Cadence
                </td>
                <td className="p-4 sm:p-5 bg-brand-green/5 border-x border-brand-green/20 text-brand-white-pure">
                  Scheduled monthly on-site overhaul, laser optical cleaning, roller deglazing, and firmware checks
                </td>
                <td className="p-4 sm:p-5">
                  Bi-monthly or quarterly preventive maintenance visits
                </td>
              </tr>
              <tr className="hover:bg-brand-white-pure/[0.02]">
                <td className="p-4 sm:p-5 font-semibold text-brand-white-pure">
                  Printhead & High-Wear Assemblies
                </td>
                <td className="p-4 sm:p-5 bg-brand-green/5 border-x border-brand-green/20 text-brand-white-pure">
                  Covered or subsidized under contract terms (customizable per RFP requirements)
                </td>
                <td className="p-4 sm:p-5">
                  Component-level re-pinning or chemical flush at subsidised partner rate
                </td>
              </tr>
              <tr className="hover:bg-brand-white-pure/[0.02]">
                <td className="p-4 sm:p-5 font-semibold text-brand-white-pure">
                  Billing & Budget Predictability
                </td>
                <td className="p-4 sm:p-5 bg-brand-green/5 border-x border-brand-green/20 text-brand-green font-semibold">
                  100% Flat Annual Fee • Zero surprise invoices • Simple CFO balance sheet budgeting
                </td>
                <td className="p-4 sm:p-5">
                  Low annual retainer + per-part invoices as components wear down
                </td>
              </tr>
              <tr className="hover:bg-brand-white-pure/[0.02]">
                <td className="p-4 sm:p-5 font-semibold text-brand-white-pure">
                  Field Technician Dispatch Hub
                </td>
                <td className="p-4 sm:p-5 bg-brand-green/5 border-x border-brand-green/20 text-brand-white-pure">
                  Direct dispatch from Mulund West Central Workshop (Central inventory access)
                </td>
                <td className="p-4 sm:p-5">
                  Direct dispatch from Mulund West Central Workshop
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Printable 1-Page Summary View (Styled for window.print()) */}
      <div id="executive-amc-print-sheet" className="hidden print:block text-black bg-white p-8">
        <div className="border-b-2 border-black pb-4 mb-6">
          <h1 className="text-2xl font-bold uppercase tracking-tight">Rex International — Executive Fleet AMC Teardown</h1>
          <p className="text-xs text-gray-700 mt-1">
            Official Workshop & Dispatch Depot: {siteSettings.address}
          </p>
          <p className="text-xs text-gray-700">
            Helpline: {siteSettings.phones.join(' / ')} • WhatsApp: +{siteSettings.whatsappNumber} • Established 1980 (45+ Years Legacy)
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2">Selected Fleet Profile: {activeTier.name} ({activeTier.range})</h2>
          <p className="text-sm text-gray-800 mb-3">{activeTier.description}</p>
          <ul className="text-xs list-disc pl-5 space-y-1">
            <li><strong>Guaranteed Response SLA:</strong> {activeTier.slaResponse}</li>
            <li><strong>Standby Buffer Guarantee:</strong> {activeTier.standbyGuarantee}</li>
            <li><strong>Preventive Maintenance:</strong> {activeTier.preventiveCadence}</li>
            <li><strong>Hardware Scope:</strong> {activeTier.idealFor.join(', ')}</li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-base font-bold mb-2">SLA & Contract Comparison Summary</h2>
          <table className="w-full text-left text-xs border border-gray-400">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border border-gray-400">Parameter</th>
                <th className="p-2 border border-gray-400">Comprehensive (Parts Included)</th>
                <th className="p-2 border border-gray-400">Non-Comprehensive (Labor Only)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-gray-400 font-semibold">Response Time SLA</td>
                <td className="p-2 border border-gray-400">Guaranteed 4 Hours (2-Hr Banking option)</td>
                <td className="p-2 border border-gray-400">4–6 Hours</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-400 font-semibold">Parts Replacement</td>
                <td className="p-2 border border-gray-400">100% Free Genuine OEM Parts</td>
                <td className="p-2 border border-gray-400">Labor Free; Parts at wholesale rates</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-400 font-semibold">Standby Units</td>
                <td className="p-2 border border-gray-400">Hot-swap buffer units guaranteed</td>
                <td className="p-2 border border-gray-400">Subject to inventory reservation</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-400 font-semibold">Billing Structure</td>
                <td className="p-2 border border-gray-400">Predictable flat annual invoice</td>
                <td className="p-2 border border-gray-400">Annual retainer + parts as used</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="border-t border-gray-400 pt-4 text-xs text-gray-600">
          <p>For custom multi-location bank or logistics RFPs, contact Virat Lalani / Hansraj Lalani directly at +91 9323906493 or visit Office No. 8, Kamala Nehru Shopping Centre, Mulund West, Mumbai 400080.</p>
        </div>
      </div>
    </section>
  );
}
