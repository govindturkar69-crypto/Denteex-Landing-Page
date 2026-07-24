export const brand = {
  name: "Denteex",
  tagline: "Collaborate for Million Smiles",
  rating: 4.9,
  reviewCount: 200,
};

export const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Product", href: "#product" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

export const hero = {
  eyebrow: "Dental Practice Management, Reimagined",
  headline: "Run your practice. Not your paperwork.",
  subheadline:
    "Denteex is the cloud-based platform that unifies patient records, scheduling, reminders, and billing — so your team can focus on chairside care, not admin.",
  primaryCta: { label: "Book a Demo", href: "#pricing" },
  secondaryCta: { label: "See How It Works", href: "#product" },
};

export const features = [
  {
    icon: "Users",
    title: "Patient Management",
    description:
      "Customizable patient records that adapt to your clinic's exact workflow — no rigid templates.",
  },
  {
    icon: "CalendarCheck",
    title: "Smart Scheduling",
    description:
      "Online booking with self-serve rescheduling, so your front desk spends less time on the phone.",
  },
  {
    icon: "BellRing",
    title: "Automated Reminders",
    description:
      "Multi-channel email, SMS, and WhatsApp reminders that measurably cut down no-shows.",
  },
  {
    icon: "BarChart3",
    title: "Reports & Analytics",
    description:
      "Real-time visibility into visits, scheduling load, and financial performance in one dashboard.",
  },
  {
    icon: "ShieldCheck",
    title: "Secure & Encrypted",
    description:
      "Bank-grade encryption and compliant storage for every treatment note, image, and record.",
  },
  {
    icon: "Smartphone",
    title: "Patient Portal",
    description:
      "Self-service access to records and appointments — fewer calls in, happier patients out.",
  },
] as const;

export const productHighlights = [
  { label: "Today's Appointments", value: "24", trend: "+12%" },
  { label: "Patient Satisfaction", value: "97%", trend: "+4%" },
  { label: "Revenue This Month", value: "$48.2k", trend: "+18%" },
  { label: "No-Show Rate", value: "3.1%", trend: "-35%" },
];

export const stats = [
  { label: "Average Rating", value: 4.9, suffix: "★" },
  { label: "Clinic Reviews", value: 200, suffix: "+" },
  { label: "Clinics Onboarded", value: 150, suffix: "+" },
  { label: "Platform Uptime", value: 99.9, suffix: "%" },
];

export const testimonial = {
  quote:
    "Denteex has been an invaluable addition to our practice — it streamlined our operations, improved patient engagement, and made managing finances effortless.",
  author: "Practice Owner",
  role: "Choice Dental Care",
};

export type BillingCycle = "monthly" | "annual";

export const pricingTiers = [
  {
    name: "Starter",
    description: "For solo practitioners getting off spreadsheets.",
    monthly: 29,
    annual: 23,
    featured: false,
    features: [
      "Up to 1 clinic location",
      "Patient records & scheduling",
      "Email reminders",
      "Basic reports",
      "Standard support",
    ],
    cta: "Start Free Trial",
  },
  {
    name: "Growth",
    description: "For growing clinics that need automation and insight.",
    monthly: 79,
    annual: 63,
    featured: true,
    features: [
      "Up to 5 clinic locations",
      "Everything in Starter",
      "SMS + WhatsApp reminders",
      "Advanced analytics",
      "Patient self-service portal",
      "Priority support",
    ],
    cta: "Book a Demo",
  },
  {
    name: "Enterprise",
    description: "For multi-location groups with custom needs.",
    monthly: 199,
    annual: 159,
    featured: false,
    features: [
      "Unlimited locations",
      "Everything in Growth",
      "Custom integrations & API",
      "Dedicated account manager",
      "24/7 priority support",
      "Onboarding & migration support",
    ],
    cta: "Contact Sales",
  },
] as const;

export const faqs = [
  {
    question: "How secure is our patient data on Denteex?",
    answer:
      "All records are encrypted in transit and at rest, hosted on infrastructure built for healthcare-grade compliance. Access is role-based, and every action is logged for audit purposes.",
  },
  {
    question: "Can we migrate records from our existing system?",
    answer:
      "Yes — our onboarding team handles bulk imports of patient records, treatment history, and scheduling data from most common practice management tools at no extra cost on Growth and Enterprise plans.",
  },
  {
    question: "How long does it take to train our staff?",
    answer:
      "Most front-desk teams are comfortable within a single afternoon. Denteex is built around familiar workflows, and every plan includes guided onboarding sessions.",
  },
  {
    question: "Do WhatsApp reminders cost extra?",
    answer:
      "WhatsApp and SMS reminders are included in the Growth and Enterprise plans. Starter includes unlimited email reminders, with SMS available as an add-on.",
  },
  {
    question: "Are we locked into a long-term contract?",
    answer:
      "No. All plans are billed monthly or annually with no long-term lock-in — cancel anytime, and we'll help you export your data.",
  },
] as const;

export const ctaBanner = {
  headline: "Give your practice its glow-up.",
  subheadline:
    "Join clinics already saving hours a week with Denteex. Set up takes minutes — see it for yourself.",
  primaryCta: { label: "Book a Demo", href: "#pricing" },
  secondaryCta: { label: "Talk to Sales", href: "#faq" },
};

export const footerLinks = {
  product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Product Tour", href: "#product" },
  ],
  company: [
    { label: "About", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
  ],
  resources: [
    { label: "FAQ", href: "#faq" },
    { label: "Support", href: "#" },
    { label: "Status", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

export const socials = [
  { label: "Facebook", icon: "Facebook", href: "#" },
  { label: "LinkedIn", icon: "Linkedin", href: "#" },
  { label: "Instagram", icon: "Instagram", href: "#" },
];

export const contact = {
  email: "hello@example.com",
  phone: "+1 (555) 010-1234",
  address: "Your City, Your Country",
};
