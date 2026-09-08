export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  clientType: string;
  location: string;
  fleetSize: string;
  industry: string;
  challenge: string;
  intervention: string;
  results: {
    metric: string;
    label: string;
  }[];
  testimonialQuote?: {
    quote: string;
    author: string;
    role: string;
  };
}

export const caseStudies: CaseStudy[] = [
  {
    id: "cs-mumbai-logistics-fleet",
    slug: "mumbai-logistics-fleet-overhaul",
    title: "Overhauling 60 Continuous Dotmatrix Invoicing Printers for Mumbai Regional Logistics Hubs",
    clientType: "Tier-1 Express Freight & 3PL Logistics Operator",
    location: "Regional Logistics Hubs (Serviced from Mulund West)",
    fleetSize: "60 Dotmatrix Printers + 18 Manifest Laser Systems",
    industry: "Logistics, Warehousing & Supply Chain",
    challenge: "Heavy cement dust and 24/7 continuous 4-part lorry receipt (LR) printing was causing weekly tractor gear stripping and head thermal shutdowns. Trucks were delayed up to 3 hours at exit docks waiting for invoice reprints, incurring significant delay penalty fees.",
    intervention: "Dispatched from our central Mulund West workshop, Rex International deployed standardized Epson LQ-2090II heavy-duty units with customized multi-copy tractor clearances, implemented a bi-weekly pneumatic dust vacuuming protocol, and pre-positioned 6 hot-standby loaner machines across critical warehouse docks.",
    results: [
      { metric: "99.8%", label: "Fleet Uptime SLA Maintained" },
      { metric: "0 min", label: "Loading Dock Invoicing Delays" },
      { metric: "35%", label: "Annual Consumable Cost Reduction" }
    ],
    testimonialQuote: {
      quote: "Before Rex International, a broken dispatch printer meant trucks standing idle on the highway. With their standby units and rapid on-site dispatch from Mulund West, our docks have operated without a single dispatch stoppage for over 18 months.",
      author: "N. Sharma",
      role: "VP Operations, Regional Freight Hub"
    }
  },
  {
    id: "cs-coop-bank-network",
    slug: "cooperative-bank-passbook-fleet-amc",
    title: "Zero-Downtime Teller Desk Support Across 24 Cooperative Bank Branches in Mumbai & Thane",
    clientType: "Multi-Branch Scheduled Urban Cooperative Bank",
    location: "Mumbai MMR (South Mumbai to Mulund, Thane & Navi Mumbai)",
    fleetSize: "72 Passbook Printers (Epson PLQ-30) + 28 Canon Laser MFPs",
    industry: "Banking & Financial Services",
    challenge: "The bank was facing recurrent printhead pin breakage from thick passbook cover seams. The previous IT maintenance contractor took 48 to 72 hours to replace heads at exorbitant vendor rates, causing severe customer counter frustration.",
    intervention: "Rex International executed a comprehensive 4-hour on-site SLA contract with component-level in-house head re-pinning. A dedicated buffer of 8 calibrated standby passbook units was placed on active reserve in our central Mulund workshop for immediate dispatch.",
    results: [
      { metric: "< 4 Hrs", label: "Average On-Site Technician Response" },
      { metric: "42%", label: "Direct Savings vs. OEM Maintenance Quotes" },
      { metric: "100%", label: "Branch Compliance Audit Sign-Off" }
    ],
    testimonialQuote: {
      quote: "The 4-hour SLA isn't marketing—they actually show up with the right passbook head or a swap machine. Our branch managers finally don't have to face angry customer queues over printer breakdowns.",
      author: "V. Kadam",
      role: "Head of IT Infrastructure"
    }
  }
];
