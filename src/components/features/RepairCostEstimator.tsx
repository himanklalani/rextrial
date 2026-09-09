'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { siteSettings } from '@/lib/data/site-settings';
import { trackEvent } from '@/lib/analytics';

interface RepairCostEstimatorProps {
  serviceSlug: string;
  serviceName: string;
  canonicalUrl?: string;
}

interface ProblemProfile {
  id: string;
  symptom: string;
  culprit: string;
  benchCost: string;
  newMachineCost: string;
  savings: string;
  turnaround: string;
  methodology: string;
}

interface ServiceData {
  models: string[];
  problems: ProblemProfile[];
  benchStartingPrice: string;
  onsiteStartingPrice: string;
}

const SERVICE_CONFIGS: Record<string, ServiceData> = {
  'dotmatrix-head-repair': {
    models: [
      'Epson LQ-310 / LQ-1150 (24-Pin)',
      'TVS MSP 240 / 245 Star (9/24-Pin)',
      'Epson PLQ-20 / PLQ-30 (Passbook)',
      'TVS MSP 250 Champion',
      'Wipro HQ / Lipi High-Speed Invoicing'
    ],
    benchStartingPrice: '₹800',
    onsiteStartingPrice: '₹1,400',
    problems: [
      {
        id: 'dropping-pins',
        symptom: 'Missing dots / faint horizontal gaps across printed characters',
        culprit: 'Burnt tungsten pin solenoid coil or snapped tungsten needle',
        benchCost: '₹800 – ₹1,400 (rebuilt to component level)',
        newMachineCost: '₹16,500 (new printer)',
        savings: 'Save up to ₹15,100',
        turnaround: 'Same-day (3–5 hours) or 24-hr burn-in test',
        methodology: 'We open the printhead casing, replace only the broken tungsten needle or rewound coil using OEM parts, and run a 100-page continuous print test.'
      },
      {
        id: 'light-copy',
        symptom: 'Faint characters on copy 2 & 3 of multipart GST bill books',
        culprit: 'Worn ruby nose-piece guide or improper platen gap calibration',
        benchCost: '₹800 – ₹1,100',
        newMachineCost: '₹16,500 (new printer)',
        savings: 'Save up to ₹15,400',
        turnaround: '2 to 4 hours',
        methodology: 'Carriage guide re-alignment, impact force calibration, and platen roller re-surfacing.'
      },
      {
        id: 'carriage-jam',
        symptom: 'Printhead jerks, stops, or emits loud screeching gear noise',
        culprit: 'Stripped Delrin tractor reduction gear or dry carriage rail',
        benchCost: '₹650 – ₹1,200',
        newMachineCost: '₹16,500 (new printer)',
        savings: 'Save up to ₹15,300',
        turnaround: 'Same-day bench service',
        methodology: 'Ultrasonic degreasing of carriage rails, precision Delrin replacement gear installation, and high-temp synthetic lubrication.'
      }
    ]
  },
  'laser-printer-servicing': {
    models: [
      'HP LaserJet 1020 Plus / M1005 / M1136',
      'Canon imageCLASS LBP2900B / MF3010',
      'HP LaserJet Pro M404 / M428 (Duplex)',
      'Brother HL-L2321D / DCP-L2541DW',
      'Xerox WorkCentre / Ricoh SP Series'
    ],
    benchStartingPrice: '₹900',
    onsiteStartingPrice: '₹1,400',
    problems: [
      {
        id: 'vertical-streak',
        symptom: 'Thick black vertical streak or repetitive gray ghosting down the page',
        culprit: 'Scratched OPC drum unit or grooved doctor/wiper blade',
        benchCost: '₹450 – ₹900 (drum/blade replacement)',
        newMachineCost: '₹18,000 (new laser printer)',
        savings: 'Save up to ₹17,100',
        turnaround: '30 to 45 minutes',
        methodology: 'Interior vacuuming of stray toner paste, corona wire cleaning, and replacement with genuine OEM-grade OPC drum.'
      },
      {
        id: 'accordion-jam',
        symptom: 'Paper crinkles like an accordion or gets stuck inside hot fuser exit',
        culprit: 'Torn Teflon fuser film sleeve or collapsed silicon pressure roller',
        benchCost: '₹850 – ₹1,600 (fuser overhaul)',
        newMachineCost: '₹18,000 (new laser printer)',
        savings: 'Save up to ₹16,400',
        turnaround: '2 to 4 hours',
        methodology: 'Disassembly of high-heat fuser module, thermistor temperature check, fresh ceramic grease application, and new high-durability Teflon sleeve.'
      },
      {
        id: 'pickup-slip',
        symptom: 'Printer makes grinding noise, feeds multiple sheets, or shows Out of Paper',
        culprit: 'Worn paper pickup roller rubber or sticky pickup solenoid pad',
        benchCost: '₹500 – ₹900',
        newMachineCost: '₹18,000 (new laser printer)',
        savings: 'Save up to ₹17,100',
        turnaround: 'Same-day',
        methodology: 'Pickup assembly deglazing or replacement of high-traction ribbed rubber tires, plus solenoid buffer replacement.'
      }
    ]
  },
  'inktank-deep-cleaning': {
    models: [
      'Epson EcoTank L3110 / L3150 / L3250 / L3252',
      'Canon PIXMA G2010 / G2020 / G3010 / G3020',
      'Epson EcoTank L4260 / L6270 (Duplex)',
      'HP Smart Tank 515 / 580 / 670 Wireless',
      'Brother DCP-T420W / DCP-T520W / DCP-T820DW'
    ],
    benchStartingPrice: '₹950',
    onsiteStartingPrice: '₹1,500',
    problems: [
      {
        id: 'white-banding',
        symptom: 'Horizontal white lines across text/photos, or colors dropping out',
        culprit: 'Microscopic dried pigment crystals clogging 20-micron piezo jets',
        benchCost: '₹950 – ₹1,400 (chemical flush & alignment)',
        newMachineCost: '₹14,500 (new EcoTank)',
        savings: 'Save up to ₹13,100',
        turnaround: '3 to 5 hours (Same-Day)',
        methodology: 'Multi-stage ultrasonic chemical flush to dissolve dried ink without stripping the delicate piezoelectric crystal membrane.'
      },
      {
        id: 'air-in-tubes',
        symptom: 'Tanks are full of ink but printer outputs 100% blank pages',
        culprit: 'Air pockets in silicone feeder lines & collapsed internal dampers',
        benchCost: '₹750 – ₹950 (peristaltic de-airing)',
        newMachineCost: '₹14,500 (new EcoTank)',
        savings: 'Save up to ₹13,550',
        turnaround: '1 to 2 hours',
        methodology: 'Negative vacuum pressure purge through peristaltic tubes, refilling individual dampers with fresh ink.'
      },
      {
        id: 'ink-pad-full',
        symptom: 'Red lights blinking alternately & error "Ink absorber pad is full"',
        culprit: 'Internal waste ink counter lockout & saturated absorber pads',
        benchCost: '₹600 – ₹1,100 (hardware pad + digital reset)',
        newMachineCost: '₹14,500 (new EcoTank)',
        savings: 'Save up to ₹13,400',
        turnaround: '30 to 45 minutes',
        methodology: 'Replacement or deep-wash of physical waste felt pads and authorized EEPROM counter reset.'
      }
    ]
  },
  'on-site-emergency-repair': {
    models: [
      'Corporate Office Multi-Function Laser Arrays',
      'Warehouse Continuous Waybill Dispatch Printers',
      'Bank Teller Passbook & Cheque Printers',
      'Pharma & Retail POS Bill Book Printers',
      'Healthcare Diagnostic Pathology Report Printers'
    ],
    benchStartingPrice: '₹800 (Mulund Workshop)',
    onsiteStartingPrice: '₹1,400 (4-Hr Doorstep Dispatch)',
    problems: [
      {
        id: 'critical-halt',
        symptom: 'Emergency breakdown halting billing or shipping operations',
        culprit: 'Mechanical component failure, gear shear, or optical sensor blackout',
        benchCost: 'From ₹1,400 (all labor covered under No Fix No Fee)',
        newMachineCost: 'Varies by model',
        savings: 'Prevents thousands of rupees in operational downtime',
        turnaround: 'Technician dispatched within 4 hours across Mumbai & Thane',
        methodology: 'Technician arrives with mobile buffer kit containing common OEM rollers, fusers, gears, and logic boards to resolve fault on first visit.'
      },
      {
        id: 'network-offline',
        symptom: 'Printer offline across entire office network / spooler crash',
        culprit: 'Network interface card glitch, firmware corruption, or IP conflict',
        benchCost: '₹1,200 – ₹1,800',
        newMachineCost: 'N/A',
        savings: 'Instant office productivity restoration',
        turnaround: 'Same-day on-site resolution',
        methodology: 'Full network diagnostics, IP port reconfiguration, firmware update, and driver reinstall across client workstations.'
      }
    ]
  }
};

export function RepairCostEstimator({
  serviceSlug,
  serviceName,
  canonicalUrl = 'https://www.rexinternational.store/services',
}: RepairCostEstimatorProps) {
  const config = SERVICE_CONFIGS[serviceSlug] || SERVICE_CONFIGS['dotmatrix-head-repair'];

  const [selectedModel, setSelectedModel] = useState<string>(config.models[0]);
  const [selectedProblemId, setSelectedProblemId] = useState<string>(config.problems[0].id);
  const [serviceMode, setServiceMode] = useState<'walkin' | 'onsite'>('walkin');

  const currentProblem = config.problems.find((p) => p.id === selectedProblemId) || config.problems[0];
  const mapsUrl = siteSettings.googleMapsUrl;

  const formatWhatsAppText = () => {
    const modeText = serviceMode === 'walkin'
      ? 'I want to walk into your Mulund West workshop today'
      : 'I need an on-site technician dispatched to my office/location';

    return `Hi Rex International, I need a diagnostic estimate for my printer.\n\n*Service:* ${serviceName}\n*Printer Model:* ${selectedModel}\n*Observed Problem:* ${currentProblem.symptom}\n*Preference:* ${modeText}\n\nHere is a photo/video of the error. Can you provide confirmed estimate and timeline?`;
  };

  const whatsappUrl = `https://wa.me/${siteSettings.whatsappNumber}?text=${encodeURIComponent(formatWhatsAppText())}`;

  const handleWhatsAppClick = () => {
    trackEvent('whatsapp_click', {
      service: serviceSlug,
      model: selectedModel,
      problem: currentProblem.id,
      mode: serviceMode,
      target_url: whatsappUrl,
    });
  };

  return (
    <section className="mt-14 pt-12 border-t border-brand-white-pure/10 not-prose">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/10 border border-brand-green/30 text-brand-green text-xs font-mono font-semibold tracking-wider uppercase mb-3">
          <span>⚙️</span>
          <span>Interactive Diagnostic & Repair Estimator</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-outfit font-bold text-brand-white-pure">
          Diagnose Your Fault & Estimate Repair Cost
        </h2>
        <p className="text-brand-gray-light text-base max-w-2xl mt-2 leading-relaxed">
          Select your model and observed symptom below to view our component-level bench restoration cost, turnaround timeline, and your net savings vs. buying a new machine.
        </p>
      </div>

      {/* 2-Column Interactive Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
        {/* Left Column: Interactive Selectors */}
        <div className="lg:col-span-6 space-y-6">
          {/* Step 1: Select Model */}
          <div className="bg-brand-white-pure/5 border border-brand-white-pure/10 rounded-2xl p-5 sm:p-6">
            <span className="text-xs font-mono uppercase tracking-wider text-brand-green font-bold block mb-3">
              Step 1: Select Your Printer Family
            </span>
            <div className="space-y-2">
              {config.models.map((model) => (
                <button
                  key={model}
                  type="button"
                  onClick={() => setSelectedModel(model)}
                  className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all cursor-pointer flex items-center justify-between ${
                    selectedModel === model
                      ? 'bg-brand-green/15 border-brand-green text-brand-white-pure font-semibold'
                      : 'bg-brand-white-pure/[0.02] border-brand-white-pure/10 text-brand-gray-light hover:bg-brand-white-pure/[0.06]'
                  }`}
                >
                  <span className="truncate">{model}</span>
                  {selectedModel === model && (
                    <span className="text-brand-green font-bold ml-2">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Select Symptom */}
          <div className="bg-brand-white-pure/5 border border-brand-white-pure/10 rounded-2xl p-5 sm:p-6">
            <span className="text-xs font-mono uppercase tracking-wider text-brand-green font-bold block mb-3">
              Step 2: Select What You Are Experiencing
            </span>
            <div className="space-y-2">
              {config.problems.map((prob) => (
                <button
                  key={prob.id}
                  type="button"
                  onClick={() => setSelectedProblemId(prob.id)}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer ${
                    selectedProblemId === prob.id
                      ? 'bg-brand-green/15 border-brand-green text-brand-white-pure font-semibold shadow-sm'
                      : 'bg-brand-white-pure/[0.02] border-brand-white-pure/10 text-brand-gray-light hover:bg-brand-white-pure/[0.06]'
                  }`}
                >
                  {prob.symptom}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Service Mode Switcher */}
          <div className="bg-brand-white-pure/5 border border-brand-white-pure/10 rounded-2xl p-5 sm:p-6">
            <span className="text-xs font-mono uppercase tracking-wider text-brand-green font-bold block mb-3">
              Step 3: Choose Service Delivery Channel
            </span>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setServiceMode('walkin')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  serviceMode === 'walkin'
                    ? 'bg-brand-green/20 border-brand-green text-brand-white-pure ring-1 ring-brand-green'
                    : 'bg-brand-white-pure/[0.02] border-brand-white-pure/10 text-brand-gray-light hover:bg-brand-white-pure/[0.05]'
                }`}
              >
                <div className="text-xs font-mono text-brand-green font-bold uppercase">Walk-In Workshop</div>
                <div className="text-sm font-bold text-brand-white-pure mt-0.5">Mulund West</div>
                <div className="text-[11px] text-brand-gray-light/70 mt-1">Free 30-min check • From {config.benchStartingPrice}</div>
              </button>

              <button
                type="button"
                onClick={() => setServiceMode('onsite')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  serviceMode === 'onsite'
                    ? 'bg-brand-green/20 border-brand-green text-brand-white-pure ring-1 ring-brand-green'
                    : 'bg-brand-white-pure/[0.02] border-brand-white-pure/10 text-brand-gray-light hover:bg-brand-white-pure/[0.05]'
                }`}
              >
                <div className="text-xs font-mono text-brand-green font-bold uppercase">Doorstep Dispatch</div>
                <div className="text-sm font-bold text-brand-white-pure mt-0.5">Mumbai & Thane</div>
                <div className="text-[11px] text-brand-gray-light/70 mt-1">4-Hour SLA • From {config.onsiteStartingPrice}</div>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Diagnostic Verdict & Financial Savings Card */}
        <div className="lg:col-span-6 bg-gradient-to-br from-brand-white-pure/10 to-brand-green/10 border border-brand-green/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center justify-between gap-2 border-b border-brand-white-pure/10 pb-4 mb-6">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-brand-green font-bold block">
                  Diagnostic Result
                </span>
                <h3 className="text-xl font-outfit font-bold text-brand-white-pure mt-0.5">
                  Component-Level Assessment
                </h3>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-brand-green/20 text-brand-green border border-brand-green/30 font-bold shrink-0">
                Highly Repairable
              </span>
            </div>

            {/* Culprit Component */}
            <div className="mb-5">
              <span className="text-xs font-mono text-brand-gray-light/70 uppercase block mb-1">
                Identified Faulty Subsystem:
              </span>
              <p className="text-base text-brand-white-pure font-semibold leading-snug">
                {currentProblem.culprit}
              </p>
            </div>

            {/* Bench Methodology */}
            <div className="mb-6 p-4 rounded-xl bg-brand-white-pure/5 border border-brand-white-pure/10 text-xs text-brand-gray-light leading-relaxed">
              <strong className="text-brand-white-pure block mb-1">Bench Protocol:</strong>
              {currentProblem.methodology}
            </div>

            {/* Financial Comparison: Repair vs Replace */}
            <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-brand-dark/60 border border-brand-green/20 mb-6">
              <div>
                <span className="text-[11px] font-mono text-brand-gray-light/70 block uppercase">
                  Estimated Repair Cost
                </span>
                <span className="text-xl font-bold font-outfit text-brand-green">
                  {currentProblem.benchCost}
                </span>
              </div>
              <div>
                <span className="text-[11px] font-mono text-brand-gray-light/70 block uppercase">
                  Cost to Buy New Unit
                </span>
                <span className="text-base font-bold font-outfit text-brand-white-pure/60 line-through">
                  {currentProblem.newMachineCost}
                </span>
              </div>
              <div className="col-span-2 pt-2 border-t border-brand-white-pure/10 flex items-center justify-between text-xs">
                <span className="font-mono text-brand-green font-bold">
                  ✓ {currentProblem.savings}
                </span>
                <span className="text-brand-gray-light/80">
                  ⏱ {currentProblem.turnaround}
                </span>
              </div>
            </div>

            {/* Selected Channel Summary */}
            <div className="mb-6 p-3.5 rounded-xl bg-brand-white-pure/5 border border-brand-white-pure/10 flex items-center justify-between text-xs">
              <span className="text-brand-gray-light font-mono">
                {serviceMode === 'walkin' ? '📍 Walk-In: Rex International, Mulund W' : '🚚 Doorstep: 4-Hr Dispatch across Mumbai/Thane'}
              </span>
              <span className="text-brand-green font-bold font-mono">
                No Fix, No Fee
              </span>
            </div>

            {/* Conversion Actions */}
            <div className="space-y-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsAppClick}
                className="w-full py-4 px-6 rounded-xl bg-brand-green text-brand-dark font-bold font-mono text-sm hover:bg-brand-green-light transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span>Send Photo on WhatsApp for Instant Estimate</span>
              </a>

              {serviceMode === 'walkin' && (
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-brand-white-pure/10 hover:bg-brand-white-pure/20 border border-brand-white-pure/20 text-brand-white-pure text-xs font-mono font-bold text-center block transition-all"
                >
                  Get Directions to Rex International on Google Maps (2 mins from Mulund Station)
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
