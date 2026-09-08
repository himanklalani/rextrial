export interface IndustryHardware {
  name: string;
  category: string;
  role: string;
  whyChosen: string;
  specSummary: string;
}

export interface IndustryVertical {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  subheadline: string;
  badge: string;
  criticalMetric: {
    stat: string;
    label: string;
  };
  operationalContext: string;
  commonFailurePoints: {
    title: string;
    description: string;
    impact: string;
  }[];
  slaCommitment: {
    responseTime: string;
    standbyPolicy: string;
    maintenanceSchedule: string;
    partsCoverage: string;
  };
  recommendedFleet: IndustryHardware[];
  comparisonTable: {
    headers: string[];
    rows: string[][];
  };
  faq: {
    question: string;
    answer: string;
  }[];
}

export const industries: IndustryVertical[] = [
  {
    slug: "banking-finance",
    title: "Banking & Financial Services",
    metaTitle: "Banking & Passbook Printer Fleet AMC Mumbai | Rex International",
    metaDescription: "Mission-critical printing infrastructure for cooperative & commercial banks. 4-hour on-site SLA, passbook printer head repair, and zero-downtime teller desks.",
    headline: "Zero-Downtime Printing for Bank Branches & Teller Desks",
    subheadline: "Guaranteed 4-hour on-site response SLA, passbook platen calibrations, and dedicated standby machines across Mumbai, Thane & Navi Mumbai.",
    badge: "BFSI Fleet Infrastructure",
    criticalMetric: {
      stat: "4 Hours",
      label: "Guaranteed On-Site Branch SLA"
    },
    operationalContext: "In commercial and cooperative bank branches, a malfunctioning teller passbook printer or a jammed statement printer immediately halts customer service, creating teller counter queues and compliance audit risks. Rex International provides specialized hardware support for dual-carriage passbook printers, cheque slip printers, and high-volume ledger laser printers.",
    commonFailurePoints: [
      {
        title: "Passbook Jamming & Skew Misalignment",
        description: "Thick passbook cover seams causing sensor optical errors and platen carriage stalls.",
        impact: "Teller desk downtime during peak customer banking hours."
      },
      {
        title: "Printhead Pin Fracture from Non-Standard Books",
        description: "Impact pins breaking when printing over metallic staples or dense passbook binding glue.",
        impact: "Illegible transaction entries and customer dispute exposure."
      },
      {
        title: "High-Volume End-of-Day Statement Failures",
        description: "Heavy laser fuser wear from continuous ledger printing batches.",
        impact: "Branch closing delay and reporting bottlenecks."
      }
    ],
    slaCommitment: {
      responseTime: "4 Hours Maximum across Mumbai MMR",
      standbyPolicy: "Immediate hot-swap standby passbook printer placed on branch site",
      maintenanceSchedule: "Monthly optical sensor de-dusting and platen gap calibration",
      partsCoverage: "Comprehensive OEM gears, logic boards, and 24-pin printhead assemblies"
    },
    recommendedFleet: [
      {
        name: "Epson PLQ-30",
        category: "Passbook & Teller Printer",
        role: "Primary teller counter passbook and receipt printer",
        whyChosen: "Auto platen gap adjustment (up to 2.6mm) handles any passbook thickness without manual intervention.",
        specSummary: "24 pins, 585 cps ultra-fast draft, ribbon yield up to 10M characters"
      },
      {
        name: "Canon imageCLASS MF244dw",
        category: "Workgroup Laser MFP",
        role: "Branch manager correspondence, KYC scanning, and daily ledgers",
        whyChosen: "High-duty monochrome engine with fast first-print-out time of 6 seconds.",
        specSummary: "27 ppm, auto-duplex, 15,000-page monthly duty cycle"
      },
      {
        name: "Epson LQ-2090II",
        category: "Heavy-Duty Dotmatrix",
        role: "Back-office multi-part voucher and end-of-day clearing journal printing",
        whyChosen: "136-column wide carriage built for continuous ledger feeds with 25,000 POH MTBF.",
        specSummary: "Up to 584 cps, 7-part forms (1 original + 6 copies)"
      }
    ],
    comparisonTable: {
      headers: ["Metric", "Rex International Banking AMC", "Standard Market Multi-Brand AMC"],
      rows: [
        ["On-Site Response SLA", "Guaranteed Under 4 Hours", "Next-Business-Day (24–48 Hours)"],
        ["Passbook Standby Units", "Pre-positioned at Branch / Hub", "Not Provided (Branch waits for fix)"],
        ["Printhead Pin Repair", "In-house micro-soldering & repinning", "Full unit replacement required (high cost)"],
        ["Preventive Maintenance", "Monthly optical & platen tuning", "Only reactive when printer breaks down"],
        ["Parts Warranty", "100% Genuine OEM / Vetted", "Mixed unverified compatible parts"]
      ]
    },
    faq: [
      {
        question: "How quickly can a technician reach our bank branch during an emergency printer breakdown?",
        answer: "Under our Banking AMC, we guarantee a certified technician on-site within 4 hours anywhere across Mumbai, Thane, and Navi Mumbai. If the hardware requires board-level extraction, we immediately install a pre-configured standby loaner machine."
      },
      {
        question: "Do you supply spare parts for legacy passbook printers like Epson PLQ-20 and Olivetti PR2?",
        answer: "Yes. Rex International maintains direct import access for legacy passbook logic boards, ribbon drive units, and optical alignment sensors dating back over 25 years."
      },
      {
        question: "Can we include both teller passbook printers and office laser printers under one corporate contract?",
        answer: "Yes. We offer unified multi-device corporate AMCs covering your entire branch fleet—dotmatrix teller printers, passbook units, and administrative laser MFPs—under a single consolidated SLA."
      }
    ]
  },
  {
    slug: "logistics-warehousing",
    title: "Logistics, Warehousing & Supply Chain",
    metaTitle: "Logistics Warehouse Printer AMC & Fleet Supply Mumbai | Rex International",
    metaDescription: "Heavy-duty continuous dotmatrix & waybill printer maintenance for Mumbai logistics hubs. Rapid on-site technician dispatch from our central Mulund West facility.",
    headline: "Non-Stop Dispatch Invoicing for Logistics & Warehouse Hubs",
    subheadline: "Heavy-duty dotmatrix dispatch printers, high-volume waybills, and overnight standby fleets. Dispatched on-site across Mumbai MMR from our central Mulund workshop.",
    badge: "Supply Chain & Freight Infrastructure",
    criticalMetric: {
      stat: "On-Site",
      label: "Fleet Technician Dispatch"
    },
    operationalContext: "In high-throughput 3PL logistics facilities and dispatch centers, trucks cannot roll without legally required tri-part dispatch challans and lorry receipts (LRs). Constant cardboard dust and 24/7 continuous tractor-feed duty cycles push standard printers to catastrophic failure. Rex International provides specialized on-site field maintenance and hardware supply dispatched directly from our central Mulund West hub.",
    commonFailurePoints: [
      {
        title: "Tractor Feed Gear Stripping under Multi-Part Load",
        description: "Heavy 4-part carbon continuous stationery tearing sprocket holes and wearing nylon drive gears.",
        impact: "Loading dock gridlock with trucks held at warehouse departure gates."
      },
      {
        title: "Printhead Overheating in Non-AC Warehouse Hubs",
        description: "Continuous 8-hour print runs in dusty environments causing head coil thermal shutdowns.",
        impact: "Faded invoices and barcode scan rejections at toll checkposts."
      },
      {
        title: "Paper Dust Optical Sensor Blindness",
        description: "Fine cardboard fibers accumulating on paper-out and carriage position sensors.",
        impact: "False 'Out of Paper' error stops during batch dispatch cycles."
      }
    ],
    slaCommitment: {
      responseTime: "Under 3–4 Hours across Mumbai, Thane & Navi Mumbai logistics hubs",
      standbyPolicy: "Pre-staged backup tractor machines deployed directly on your dispatch floor",
      maintenanceSchedule: "Bi-weekly high-pressure dust vacuuming and carriage rail silicone lubrication",
      partsCoverage: "All tractors, ribbon gears, logic boards, and heavy impact printheads"
    },
    recommendedFleet: [
      {
        name: "Epson LQ-2090II",
        category: "Heavy-Duty Wide Carriage",
        role: "Primary dispatch counter multi-part LR and GST invoice printing",
        whyChosen: "Rated for 25,000 power-on hours with exceptional heat dissipation for non-stop warehouse shifts.",
        specSummary: "136 columns, 584 cps, 7-part paper handling, extreme dust resistance"
      },
      {
        name: "Epson LQ-310",
        category: "Compact Impact Workhorse",
        role: "Dock gate security checkpost and weighbridge slip printing",
        whyChosen: "Compact footprint fits inside small security cabins; native serial & parallel support.",
        specSummary: "24 pins, 416 cps, 10,000 POH MTBF rating"
      },
      {
        name: "HP LaserJet Pro MFP M126nw+",
        category: "High-Yield Network Laser",
        role: "Manifest printing, picking lists, and warehouse shipping documents",
        whyChosen: "Heavy monthly duty cycle with cost-effective 88A toner architecture.",
        specSummary: "Fast 20 ppm, wireless & Ethernet network integration"
      }
    ],
    comparisonTable: {
      headers: ["Feature", "Rex International Logistics AMC", "Standard IT Vendor Support"],
      rows: [
        ["On-Site Service Reach", "Dispatched from central Mulund West across Mumbai MMR", "Central Mumbai only (slow next-day courier)"],
        ["Dust & Debris Maintenance", "Bi-weekly pneumatic cleaning & lubrication", "Annual reactive check"],
        ["Multi-Copy Tractor Tuning", "Calibrated specifically for 4-to-6 part paper", "Generic setting (causes jams)"],
        ["Standby Unit on Site", "Pre-positioned hot-standby machine on floor", "None"],
        ["Spare Ribbon Inventory", "Direct manufacturer-grade bulk ribbons", "Retail-bought ribbons at high cost"]
      ]
    },
    faq: [
      {
        question: "Do your technicians travel on-site to warehouse hubs outside Mulund?",
        answer: "Yes. Operating from our central facility in Mulund West (Kamala Nehru Shopping Centre), our field service technicians travel directly on-site to warehouse depots and transport hubs across Mumbai, Thane, and Navi Mumbai for emergency repairs and regular AMC visits."
      },
      {
        question: "What happens if a dispatch printer fails during the middle of the night?",
        answer: "For logistics clients under our 24/7 Corporate AMC, we pre-position a hot-standby machine directly on your dispatch floor. If your primary unit fails, your team switches to the standby instantly while our morning tech repairs the primary machine."
      },
      {
        question: "Can Rex supply bulk continuous computer stationery and ribbon cassettes directly?",
        answer: "Yes. Having manufactured ribbon cassettes since 1980, we supply wholesale bulk ribbon cartridges and indigenous inks directly to logistics operators with significant volume savings."
      }
    ]
  },
  {
    slug: "healthcare-diagnostics",
    title: "Healthcare, Pathology & Diagnostic Labs",
    metaTitle: "Healthcare & Pathology Lab Printer AMC Mumbai | Rex International",
    metaDescription: "Medical-grade print clarity for pathology reports, diagnostic charts & barcode specimen labels. 4-hour SLA and preventive printer maintenance for clinics & hospitals.",
    headline: "Flawless Diagnostic Report Printing & Barcode Clarity",
    subheadline: "Medical-grade laser report calibration, lab specimen label printing, and infection-free clean maintenance for hospitals and pathology networks.",
    badge: "Medical & Diagnostic Infrastructure",
    criticalMetric: {
      stat: "100%",
      label: "Barcode Scannability Guarantee"
    },
    operationalContext: "In pathology laboratories, multi-specialty hospitals, and diagnostic testing chains, a printer is directly tied to patient care. A faint barcode on a blood sample vial leads to misidentified samples; streaked or illegible pathology values risk incorrect medical decisions. Rex International engineers calibrated printing environments that meet rigorous healthcare compliance.",
    commonFailurePoints: [
      {
        title: "Fuser Roller Toner Ghosting on Medical Reports",
        description: "Worn Teflon fuser sleeves leaving faint residual impressions of previous patient results on new report pages.",
        impact: "Critical risk of misread medical diagnostic numbers."
      },
      {
        title: "Thermal & Laser Barcode Print Bleed",
        description: "Inaccurate toner fusing causing sample tube barcode lines to blur slightly, failing laboratory automated scanners.",
        impact: "Specimen rejection and patient re-testing delays."
      },
      {
        title: "Morning Rush Hour Pickup Roller Slippage",
        description: "Cardboard and chemical disinfectant residue on pickup rollers causing multi-sheet misfeeds during the 8 AM blood report rush.",
        impact: "Severe patient queue delays in collection centers."
      }
    ],
    slaCommitment: {
      responseTime: "Under 4 Hours across hospital & diagnostic networks",
      standbyPolicy: "Pre-tested backup laser printer unit deployed at central lab",
      maintenanceSchedule: "Monthly optical drum cleaning and fuser temperature heat checks",
      partsCoverage: "Medical-grade OEM fusers, high-voltage power boards, and rollers"
    },
    recommendedFleet: [
      {
        name: "HP LaserJet Pro M1136",
        category: "Enterprise Monochrome Workhorse",
        role: "Pathology diagnostic test report generation and patient bills",
        whyChosen: "True 1200 dpi effective resolution guarantees crisp numerical values and zero ghosting.",
        specSummary: "18 ppm, fast first-page out, 8,000 pages monthly duty cycle"
      },
      {
        name: "Canon LBP2900B",
        category: "High-Reliability Compact Laser",
        role: "Blood collection center counter receipt and sample sheet printing",
        whyChosen: "Legendary robust engine with zero software bloat; operates reliably on legacy hospital ERP systems.",
        specSummary: "Compact footprint, 12 ppm, instant recovery on standby"
      },
      {
        name: "Canon MAXIFY GX2070",
        category: "High-Volume Business Ink Tank",
        role: "Color ultrasound, endoscopy, and radiology summary printouts",
        whyChosen: "All-pigment ink formula produces smudge-proof, highlighter-resistant color clinical reports at low cost.",
        specSummary: "Pigment inks, auto duplex, water-resistant medical prints"
      }
    ],
    comparisonTable: {
      headers: ["Requirement", "Rex International Medical AMC", "Generic IT Maintenance"],
      rows: [
        ["Report Text Sharpness", "Calibrated for micro-font diagnostic values", "Standard office text setting"],
        ["Barcode Verification", "Every machine tested with optical barcode scanner", "Visual check only"],
        ["Hospital Disinfectant Care", "Anti-static, residue-free chemical cleaning", "Dry cloth wiping (spreads dust)"],
        ["Emergency Standby", "Hot-swap standby laser pre-configured", "Requires 2–3 days lead time"],
        ["Toner Density Stability", "High-density certified magnetic toner only", "Recycled faint toner (fails audits)"]
      ]
    },
    faq: [
      {
        question: "How do you ensure pathology test reports never print faint or with ghosted numbers?",
        answer: "We replace laser fuser sleeves and pressure rollers well before their manufacturer wear limit, and calibrate toner transfer voltage to guarantee rich, uniform 1200 dpi black output on all diagnostic report pages."
      },
      {
        question: "Can our hospital network cover multiple diagnostic collection centers across Mumbai?",
        answer: "Yes. Rex International covers multi-branch diagnostic chains across Mumbai, Thane, and Navi Mumbai under a single master SLA with centralized billing and localized technician dispatch."
      },
      {
        question: "Do your technicians comply with clean room and hygiene requirements in medical labs?",
        answer: "Yes. Our field service technicians use specialized anti-static, residue-free cleaning agents and follow hygiene protocols suitable for hospital laboratory environments."
      }
    ]
  }
];
