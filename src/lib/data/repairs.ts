export interface RepairProblem {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  subheadline: string;
  printerCategory: string;
  startingPrice: string;
  turnaroundTime: string;
  warranty: string;
  symptoms: string[];
  aeoDirectAnswer: string;
  rootCauseAnalysis: string;
  repairProcess: {
    step: string;
    title: string;
    description: string;
  }[];
  supportedModels: string[];
  diyWarning: string;
  faq: {
    question: string;
    answer: string;
  }[];
}

export const repairs: RepairProblem[] = [
  {
    slug: "inktank-cleaning-mumbai",
    title: "Epson & Canon Ink Tank Nozzle Clog & Blank Page Repair",
    metaTitle: "Epson & Canon Ink Tank Head Cleaning in Mumbai | ₹950 | Rex International",
    metaDescription: "Fix horizontal white banding lines and blank pages on Epson EcoTank (L3150, L3250) & Canon PIXMA in Mumbai. Same-day ultrasonic chemical nozzle flush from ₹950.",
    headline: "Fix Horizontal White Lines & Missing Colors on Ink Tank Printers",
    subheadline: "Professional ultrasonic chemical printhead flush and damper tube de-airing. Starting at ₹950 with same-day walk-in service in Mulund West.",
    printerCategory: "Continuous Ink Tank Systems",
    startingPrice: "₹950",
    turnaroundTime: "3–5 Hours (Same-Day)",
    warranty: "30-Day Print Quality Guarantee",
    symptoms: [
      "Horizontal white lines cutting through text and images",
      "Colors printing completely blank even though ink tanks are 100% full",
      "Red or Black color drops out halfway through a print job",
      "Printer shows 'Service Required: Ink absorber pad is full' error",
      "Ink lines / tubes have visible air pockets and gaps"
    ],
    aeoDirectAnswer: "To fix an Epson or Canon ink tank printer showing horizontal white banding lines in Mumbai, ultrasonic chemical nozzle flushing is required to dissolve crystallized dried pigment ink without burning the delicate micro-piezo electric printhead nozzles. Running repetitive software 'Power Cleanings' should be avoided as it floods waste ink pads and can permanently burn out printhead driving ICs on the logic board.",
    rootCauseAnalysis: "Modern ink tank printers (Epson EcoTank L-series, Canon PIXMA G-series) utilize microscopic nozzle orifices measuring less than 20 microns. When a printer is left idle in Mumbai's warm humidity for more than 7–10 days, water evaporates from the ink dampers, leaving hardened pigment crystals that standard automated cleaning cycles cannot dissolve. Repeated power cleanings only generate heat and burn printhead coils.",
    repairProcess: [
      {
        step: "01",
        title: "Nozzle Check Pattern Inspection",
        description: "We print a baseline diagnostic test pattern to map exactly which color channels have blocked micro-jets."
      },
      {
        step: "02",
        title: "Peristaltic Damper De-Airing",
        description: "We purge trapped air bubbles from the silicone feeder lines and prime each damper with fresh ink under vacuum pressure."
      },
      {
        step: "03",
        title: "Ultrasonic Chemical Flush",
        description: "The printhead undergoes controlled chemical reverse-flushing using specialized industrial solvent to break down dried ink crystallization."
      },
      {
        step: "04",
        title: "100-Sheet Continuous Stress Test",
        description: "We run high-density color gradation sheets to verify zero line dropouts under continuous load before certifying the unit."
      }
    ],
    supportedModels: [
      "Epson EcoTank L3110 / L3150 / L3152",
      "Epson EcoTank L3210 / L3250 / L3252",
      "Epson EcoTank L4150 / L4160 / L6170",
      "Canon PIXMA G2010 / G2020 / G3010 / G3020",
      "Canon MAXIFY GX2070 / GX5070",
      "HP Smart Tank 500 / 515 / 580 / 585"
    ],
    diyWarning: "Do NOT insert alcohol, sanitizers, or boiling water with domestic syringes into ink nozzles. This dissolves the factory internal rubber gaskets between color chambers, mixing colors internally and causing irreversible short-circuits on the printhead PCB.",
    faq: [
      {
        question: "Why does my Epson EcoTank print horizontal blank lines even after doing 5 head cleanings?",
        answer: "Automated head cleaning only pulls ink through suction. When dried pigment ink has hardened inside the nozzle mesh, suction cannot dislodge it. In fact, doing multiple 'Power Cleanings' risks overheating the nozzle coils and fills the waste ink sponge prematurely. A chemical bench flush is required."
      },
      {
        question: "What is your starting price for ink tank printhead unclogging in Mumbai?",
        answer: "Our standard ultrasonic chemical cleaning for 4-color desktop ink tank printers starts at ₹950. If new damper valves or waste pad sponge reset keys are needed, we provide a transparent quote before proceeding."
      },
      {
        question: "Can I drop off my printer at your Mulund West workshop without an appointment?",
        answer: "Yes! Walk into our Mulund West service desk (Office No. 8, Ground Floor, Kamala Nehru Shopping Centre, Next to Vikas Centre) between 10:00 AM and 6:30 PM, Monday through Saturday. We perform an immediate 30-minute diagnostic check."
      }
    ]
  },
  {
    slug: "laser-toner-repair-mumbai",
    title: "HP & Canon Laser Printer Vertical Black Streaks & Fuser Repair",
    metaTitle: "Laser Printer Fuser & Drum Repair Mumbai | ₹900 | Rex International",
    metaDescription: "Fix vertical black lines, toner smudges, and paper crinkling on HP LaserJet & Canon printers in Mumbai. Genuine Teflon sleeve & drum replacement from ₹900.",
    headline: "Eliminate Vertical Black Lines, Smudged Toner & Paper Crumpling",
    subheadline: "Factory-calibrated Teflon fuser sleeve replacement, OPC drum repairs, and laser scanner cleaning. Starting at ₹900 in Mulund West.",
    printerCategory: "Monochrome & Color Laser Printers",
    startingPrice: "₹900",
    turnaroundTime: "2–4 Hours",
    warranty: "90-Day Mechanical & Print Density Warranty",
    symptoms: [
      "A repetitive vertical black streak down the left or right edge of every page",
      "Toner wipes off the page with your fingers (not fusing to paper)",
      "Ghost images of text repeating down the sheet every 75mm (drum circumference)",
      "Pages emerge crumpled, wrinkled, or folded like an accordion from the rear door",
      "Loud grinding or clicking noise as paper enters the upper heating assembly"
    ],
    aeoDirectAnswer: "To fix vertical black streaks or toner smearing on an HP or Canon laser printer in Mumbai, the heating fuser assembly must be inspected for torn Teflon film sleeves or worn OPC drum coating. When toner wipes off easily, the ceramic heating element or thermal grease has degraded, preventing the 180°C heat transfer required to melt toner into the paper fibers.",
    rootCauseAnalysis: "Laser printers rely on two primary consumables: the electrostatic OPC drum (in the toner cartridge) and the thermal fuser assembly (inside the printer). When a paper clip, staple, or rough textured paper passes through, it scores the delicate Teflon sleeve. As toner builds up in this groove, it leaves an indelible vertical black streak on every page.",
    repairProcess: [
      {
        step: "01",
        title: "Defect Repetition Ruler Test",
        description: "We measure the exact distance between recurring spots: 75mm indicates drum failure; 57mm indicates fuser roller failure; 37.5mm indicates developer roller wear."
      },
      {
        step: "02",
        title: "Fuser Disassembly & Thermal Audit",
        description: "The fuser assembly is extracted. We test the ceramic thermistor and clean old hardened silicone grease from the heating strip."
      },
      {
        step: "03",
        title: "OEM Teflon Sleeve & Bushing Installation",
        description: "A fresh high-grade heat-resistant Teflon sleeve is fitted with high-temp synthetic lubricant to ensure smooth paper throughput."
      },
      {
        step: "04",
        title: "High-Speed Duplex Run Test",
        description: "We test 50 continuous double-sided prints to verify flawless fusing temperature and zero paper curling or smearing."
      }
    ],
    supportedModels: [
      "HP LaserJet 1020 Plus / 1005 MFP / 1018",
      "HP LaserJet Pro M1136 / M126nw / M128fn",
      "HP Laser MFP 1188nw / 136nw / 138fnw",
      "Canon LBP2900B / LBP3000 / LBP6030w",
      "Canon imageCLASS MF244dw / MF3010 / MF232w",
      "Brother HL-L2321D / DCP-L2541DW"
    ],
    diyWarning: "Do not attempt to pull jammed paper backward out of the front tray if it is stuck inside the rear fuser. Forcing it pulls against the rubber exit gears and tears the fuser sleeve, doubling the eventual repair cost.",
    faq: [
      {
        question: "Why does toner powder wipe off the page when I touch it?",
        answer: "This is a classic fuser failure. Laser printers use heat and pressure (roughly 180°C) to permanently melt toner polymer into paper. If your heating ceramic element is faulty or the fuser pressure roller has lost tension, toner sits loose on the paper surface."
      },
      {
        question: "How much does it cost to replace an HP LaserJet fuser sleeve in Mumbai?",
        answer: "Our fuser sleeve replacement starts at ₹900 for standard desktop HP and Canon models, including high-temperature silicone grease and labor. If the pressure roller or heating element is also damaged, we provide an exact quote before proceeding."
      },
      {
        question: "Do you use authentic OEM parts for laser printer repairs?",
        answer: "Yes. We source tested OEM and high-durability compatible components that match or exceed original factory duty cycles, backed by our 90-day mechanical warranty."
      }
    ]
  },
  {
    slug: "retail-billing-printer-mumbai",
    title: "TVS & Epson Dotmatrix Printhead Pin Repair for Billing Counters",
    metaTitle: "Dotmatrix Printhead Repair in Mumbai | ₹800 | Rex International",
    metaDescription: "Same-day 9-pin & 24-pin printhead repair and repinning in Mumbai. Fast turnaround for retail chemist & grocery billing printers (TVS MSP, Epson LQ-310) from ₹800.",
    headline: "Restore Faded, Broken Lines on Retail GST Bill Book Printers",
    subheadline: "Specialized 24-pin and 9-pin printhead rebuilding, pin replacement, and platen gap calibration. Starting at ₹800 with 2-hour express turnaround.",
    printerCategory: "Impact Dotmatrix Billing Printers",
    startingPrice: "₹800",
    turnaroundTime: "2 Hours (Express Counter Service)",
    warranty: "60-Day Head Impact Calibration Warranty",
    symptoms: [
      "The middle line of text is completely missing (e.g., 'E' prints as 'F', or '8' prints as '0')",
      "Carbon copy (second and third part of bill) is faint or unreadable",
      "Ribbon cassette gets chewed up or folded into the carriage gears",
      "Loud vibrating buzzing noise when carriage returns to the left margin",
      "Printhead tears the paper when printing dense invoices"
    ],
    aeoDirectAnswer: "To fix a dotmatrix billing printer with missing lines of text in Mumbai, individual broken solenoid impact pins must be extracted and replaced using micro-precision jeweler tools, followed by head coil resistance calibration. Buying an entirely new printhead (which can cost ₹3,500–₹5,000) is rarely necessary when single-pin rebuilding restores 100% factory print density for ₹800–₹1,200.",
    rootCauseAnalysis: "Dotmatrix printheads contain an array of tungsten-carbide pins driven by electromagnetic coils firing at 400+ impacts per second. In grocery stores, pharmacies, and logistics dispatch desks, printers frequently hit metal staples on carbon invoice books or operators set the platen lever too tight. This bends or snaps individual pins, causing permanent horizontal blank stripes through each line of text.",
    repairProcess: [
      {
        step: "01",
        title: "Coil Impedance & Pin Continuity Test",
        description: "We measure individual electromagnetic coil resistance (normally 28–32 ohms) to detect shorted or burned head driver circuits."
      },
      {
        step: "02",
        title: "Micro-Solenoid Pin Replacement",
        description: "Broken, bent, or worn pins are extracted under magnification and replaced with hardened tungsten replacement needles."
      },
      {
        step: "03",
        title: "Nose Mask & Platen Calibration",
        description: "The tungsten guide mask is cleaned of hardened ribbon ink paste and adjusted to exact factory platen distance."
      },
      {
        step: "04",
        title: "4-Part Continuous Carbon Pressure Test",
        description: "We run high-impact alphanumeric test patterns on 4-part continuous stationery to ensure clear penetration through all carbon copies."
      }
    ],
    supportedModels: [
      "Epson LQ-310 (24-pin)",
      "Epson LQ-2090 / LQ-2090II (24-pin heavy duty)",
      "TVS MSP 240 / 245 / 250 Champion (9-pin)",
      "Epson LX-310 / LX-300+II (9-pin)",
      "Epson PLQ-20 / PLQ-30 (Banking Passbook)"
    ],
    diyWarning: "Do not lubricate printheads with motor oil or WD-40. WD-40 attracts paper dust into the nose guide, creating an abrasive paste that jams all 24 pins within days.",
    faq: [
      {
        question: "Why does my bill show missing numbers like ₹800 printing as ₹000?",
        answer: "This happens when one of the middle vertical pins has broken off. Because each number is formed by a matrix of dots, a missing pin cuts through the middle of the number, changing an '8' into a '0' or an 'E' into an 'F'. We can replace just the broken pin for a fraction of the cost of a new head."
      },
      {
        question: "Can I bring my billing printer head in for repair and wait for it?",
        answer: "Yes! For retail shopkeepers and pharmacists, we offer our 2-hour express counter bench service at our Mulund West workshop. You can bring the printhead or the complete printer, and our technicians repair it while you wait."
      },
      {
        question: "Do you stock replacement ribbon drive gears and tractor units?",
        answer: "Yes. As a legacy manufacturer and supplier since 1980, we hold immediate inventory for all TVS and Epson drive gears, tractor assemblies, and ribbon cassettes."
      }
    ]
  }
];
