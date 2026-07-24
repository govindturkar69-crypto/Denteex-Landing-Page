export const tourMeta = {
  title: "Denteex Client Pitch Deck",
  totalPages: 5,
};

export const page1Hero = {
  eyebrow: "Page 1 • Hero & Vision",
  brand: "DENTEEX",
  headline: "The Next-Gen Smart Dental Clinic Management Platform",
  body: "Transforming modern dental practices with automated patient scheduling, AI-powered treatment planning, digital X-ray records, and effortless billing in one unified 3D workspace.",
};

export const page2MarketGap = {
  eyebrow: "Page 2 • Market Gap",
  title: "The Problem & The Denteex Solution",
  cards: [
    {
      icon: "AlertTriangle",
      title: "Fragmented Workflow",
      description:
        "Traditional clinics use 4 different software tools for appointments, patient EHR, billing, and inventory, leading to constant context switching.",
    },
    {
      icon: "Zap",
      title: "High No-Show Rates",
      description:
        "Lack of automated WhatsApp & SMS multi-channel reminders leads to high patient dropouts and unused appointment slots.",
    },
    {
      icon: "Sparkles",
      title: "The Denteex Unified Fix",
      description:
        "An all-in-one cloud platform combining 3D tooth chart mapping, automated reminders, instant invoicing, and telemetry analytics.",
    },
  ],
} as const;

export const page3CoreTech = {
  eyebrow: "Page 3 • Core Technology",
  title: "Engineered for Modern Dentists",
  cards: [
    {
      icon: "Smile",
      title: "Interactive 3D Odontogram",
      description:
        "Visually chart adult and pediatric dental conditions using realistic, interactive 3D teeth models in real-time during diagnosis.",
      interactive: true,
    },
    {
      icon: "CalendarClock",
      title: "Smart Scheduling & Queue",
      description:
        "Drag-and-drop appointment calendar integrated with real-time patient waiting room status boards.",
      interactive: false,
    },
    {
      icon: "Receipt",
      title: "Instant Billing & Rx",
      description:
        "Generate digital prescriptions, treatment plans, insurance claims, and GST invoices in under 30 seconds.",
      interactive: false,
    },
  ],
} as const;

export const page4HowItWorks = {
  eyebrow: "Page 4 • How It Works",
  title: "4-Step Seamless Patient Journey",
  steps: [
    {
      icon: "CalendarPlus",
      number: "01",
      title: "Book",
      description:
        "Patient books online via customized clinic landing page or QR code.",
    },
    {
      icon: "ScanSearch",
      number: "02",
      title: "Diagnose",
      description: "Dentist updates 3D tooth map & attaches digital X-ray images.",
    },
    {
      icon: "ClipboardCheck",
      number: "03",
      title: "Treat",
      description:
        "Automated cost estimation & treatment phase approval from patient.",
    },
    {
      icon: "RefreshCw",
      number: "04",
      title: "Retain",
      description: "Automated post-care check-up reminders sent via WhatsApp.",
    },
  ],
} as const;

export const page5Pricing = {
  eyebrow: "Page 5 • Growth & Pricing",
  title: "Simple, Transparent Pricing",
  footerLine: "Transform your dental practice today at www.denteex.com",
  tiers: [
    {
      name: "Solo Practice",
      price: "₹1,999",
      cadence: "/mo",
      featured: false,
      features: [
        "1 Doctor Account",
        "Unlimited Patients & Appointments",
        "Interactive 3D Odontogram",
        "Standard Billing & Prescriptions",
      ],
    },
    {
      name: "Multi-Clinic Enterprise",
      price: "₹4,999",
      cadence: "/mo",
      featured: true,
      features: [
        "Unlimited Doctors & Staff",
        "Multi-location analytics dashboard",
        "WhatsApp API Integration",
        "VIP 24/7 Onboarding Support",
      ],
    },
  ],
} as const;

export const tourPages = [
  { id: "page-1", label: "Hero & Vision" },
  { id: "page-2", label: "Market Gap" },
  { id: "page-3", label: "Core Technology" },
  { id: "page-4", label: "How It Works" },
  { id: "page-5", label: "Growth & Pricing" },
] as const;

export const odontogramConditions = [
  { key: "healthy", label: "Healthy", colorVar: "--muted-foreground" },
  { key: "cavity", label: "Cavity", colorVar: "--destructive" },
  { key: "filled", label: "Filled", colorVar: "--coral-glow" },
  { key: "crown", label: "Crown", colorVar: "--teal-glow" },
] as const;

export type OdontogramConditionKey =
  (typeof odontogramConditions)[number]["key"];
