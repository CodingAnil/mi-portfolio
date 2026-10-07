import type { EducationItem, LanguageItem } from "@/types";

// ─── Personal Information ────────────────────────────────────────────────────
export const PERSONAL = {
  name: "Anil Kumar",
  title: "Senior MERN Stack Developer",
  tagline:
    "Building scalable SaaS platforms, AI-powered systems, and high-performance web applications.",
  email: "programmeranil36@gmail.com",
  phone: "+91 9518002533",
  location: "Mohali (Punjab), India",
  github: "https://github.com/CodingAnil",
  linkedin: "https://www.linkedin.com/in/anil-kumar-mern",
  resumeUrl: "/file/Anil_Kumar_CV.pdf",
} as const;

// ─── Skills ───────────────────────────────────────────────────────────────────
export const SKILLS: { category: string; items: string[] }[] = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "View.js", "Redux", "TypeScript", "JavaScript"],
  },
  {
    category: "Backend",
    items: [
      "Node.js",
      "NestJS",
      "Express",
      "REST APIs",
      "Microservices",
      "Swagger Docs",
    ],
  },
  {
    category: "Database",
    items: ["MongoDB", "PostgreSQL", "MySQL", "MariaDB", "DynamoDB"],
  },
  {
    category: "DevOps & Tools",
    items: [
      "AWS S3",
      "Cloudinary",
      "Swagger",
      "WebSockets",
      "JWT",
      "OAuth2",
      "Stripe",
      "Razorpay",
      "Twilio",
      "SendGrid",
      "Shopify",
    ],
  },
  {
    category: "Coding & AI Tools",
    items: [
      "OpenAI (GPT)",
      "Gemini",
      "Claude",
      "Antigravity",
      "Cursor",
      "OpenAI Codex",
      "Perplexity AI",
    ],
  },
];

// ─── Experience ───────────────────────────────────────────────────────────────
export const EXPERIENCE = [
  {
    company: "Eminence Technology",
    location: "Mohali, Punjab",
    role: "Senior MERN Stack Developer",
    period: "Jun 2022 – Present",
    highlights: [
      "Promoted from Frontend Developer to Sr. MERN Stack Developer",
      "Delivered 18+ production projects across diverse domains",
      "Built 400+ secure REST APIs with authentication & authorization",
      "Designed backend architecture for 15+ production systems",
      "Implemented microservices architecture for scalable platforms",
      "Integrated payment (Stripe, Razorpay) & communication APIs (Twilio, SendGrid)",
      // "Worked in 4–5 member agile teams with cross-functional collaboration",
    ],
  },
  {
    company: "KMA Technoware",
    location: "Hisar",
    role: "Frontend Developer",
    period: "Jun 2021 – May 2022",
    highlights: [
      "Software Development Training (6 months)",
      "Built educational platforms & online classroom systems",
      "Developed Blackboard online classroom management interfaces",
    ],
  },
];

// ─── Projects ─────────────────────────────────────────────────────────────────
/** Shared gallery until each project has its own screenshots. */
export const PROJECT_GALLERY_IMAGES = [
  "/project_imgs/danjoo_ai_home.png",
  "/project_imgs/danjoo_ai_products.png",
  "/project_imgs/danjoo_ai_admin_agents.png",
  "/project_imgs/danjoo_ai_integrations.png",
] as const;

export const UPCHAT_GALLERY_IMAGES = [
  "/project_imgs/upchat_home.png",
  "/project_imgs/upchat_products.png",
  "/project_imgs/upchat_bot_steps.png",
  "/project_imgs/upchat_widget_bot.png",
] as const;

export const SKILL_ANALYSER_GALLERY_IMAGES = [
  "/project_imgs/skillanalyser_home.png",
  "/project_imgs/skillanalyser_measures.png",
  "/project_imgs/skillanalyser_graph.png",
  "/project_imgs/skillanalyser_enterprise.png",
] as const;

export const HEYWEEK_GALLERY_IMAGES = [
  "/project_imgs/heyweek_home.png",
  "/project_imgs/heyweek_web_home.png",
  "/project_imgs/heyweek_start.png",
  "/project_imgs/heyweek_web_tools.png",
  "/project_imgs/heyweek_setting.png",
  "/project_imgs/heyweek_login.png",
] as const;

export const FUTURE_FLOW_GALLERY_IMAGES = [
  "/project_imgs/FF_home.png",
  "/project_imgs/FF_map.png",
  "/project_imgs/FF_allfleets.png",
  "/project_imgs/FF_fleet_des.png",
  "/project_imgs/FF_whatsapp.png",
] as const;

export const GOPAL_VASTRAM_GALLERY_IMAGES = [
  "/project_imgs/gopal_home.png",
  "/project_imgs/gopal_products.png",
  "/project_imgs/gopal_checkout.png",
  "/project_imgs/gopal_admin.png",
] as const;

export const SNAKESTER_GALLERY_IMAGES = [
  "/project_imgs/SS_home.png",
  "/project_imgs/SS_menu.png",
  "/project_imgs/SS_reviews.png",
] as const;

export const REELSTORE_GALLERY_IMAGES = [
  "/project_imgs/reelstore_home.png",
  "/project_imgs/reelstore_product_review.png",
  "/project_imgs/reelstore_reviews.png",
  "/project_imgs/reelstore_admin.png",
] as const;

export const PET_RESCUE_GALLERY_IMAGES = [
  "/project_imgs/dog_home.png",
  "/project_imgs/dog_animals.png",
  "/project_imgs/dog_treatment.png",
  "/project_imgs/dog_donation.png",
] as const;

export const FRUIT_NUT_GALLERY_IMAGES = [
  "/project_imgs/FN_home.png",
  "/project_imgs/FN_plan.png",
  "/project_imgs/FN_dait_details.png",
] as const;

const PROJECT_LINK_DEFAULTS = {
  url: "https://danjoo.ai/",
  images: PROJECT_GALLERY_IMAGES,
} as const;

export const PROJECTS = [
  {
    ...PROJECT_LINK_DEFAULTS,
    title: "Danjoo AI",
    subtitle: "AI Customer Journey Automation",
    description:
      "Production SaaS that automates calls, chat, email, SMS, and campaigns with intelligent agents — 24/7 voice assistants for inbound/outbound calls, appointment booking, smart routing, knowledge-base training, outbound campaigns, and real-time dashboards for leads, conversations, and performance.",
    tags: ["NestJS", "React", "MongoDB", "WebSockets", "AI Integration"],
    featured: true,
  },
  {
    title: "UpChat",
    subtitle: "AI Agent for Chat, Calls & Booking",
    description:
      "Unified AI agent platform — one trained brain powers website chat, AI call taking, appointment booking, and live human handoff. Captures and routes leads into a single inbox with transcripts, qualifies visitors from your content, and runs 24/7 across channels with integrations, analytics, and scalable SaaS plans.",
    tags: ["Node.js", "React", "MongoDB", "REST APIs"],
    featured: true,
    url: "https://upchat.io/",
    images: UPCHAT_GALLERY_IMAGES,
  },
  {
    title: "HeyWeek",
    subtitle: "Professional Services Automation (PSA)",
    description:
      "All-in-one business workspace — time tracking, tasks, projects, clients, invoicing, bank-connected cashflow, team Pulse feed, chat, absence, and reports in one tab. Workflows chain from message to task to time entry to invoice so freelancers, agencies, and startups run operations without juggling separate tools.",
    tags: ["Next.js", "React", "Node.js", "PostgreSQL", "FinTech"],
    featured: true,
    url: "https://heyweek.com/",
    images: HEYWEEK_GALLERY_IMAGES,
  },
  {
    title: "Future-Flow",
    subtitle: "Courier & Logistics Platform",
    description:
      "End-to-end courier operations for FutureFlow Logistics — public marketing site, quote requests, fleet showcase, live shipment map views, and customer communication. Built for UK-wide same-day, next-day, and multi-drop delivery workflows with real-time visibility for dispatch and clients.",
    tags: [
      "Next.js",
      "React",
      "Node.js",
      "PostgreSQL",
      "Maps & Tracking",
    ],
    featured: true,
    url: "https://www.futureflowlogistics.co.uk/",
    images: FUTURE_FLOW_GALLERY_IMAGES,
  },
  {
    title: "Skill Analyzer",
    subtitle: "Employability Platform (Skillmotion.AI)",
    description:
      "Skill-tech platform for workforce and career readiness — AI-assisted skill-gap analysis, readiness assessments, question banks, enterprise views, and personalized upskilling insights. Helps teams and individuals map strengths to roles, measure agility, and act on data-driven growth plans.",
    tags: ["React", "Node.js", "MongoDB", "AI", "Analytics"],
    featured: true,
    url: "https://www.skillmotion.ai/",
    images: SKILL_ANALYSER_GALLERY_IMAGES,
  },
  {
    title: "Pet Rescue",
    subtitle: "Animal Rescue NGO (Paw & Prints)",
    description:
      "Public website for a voiceless-animal rescue mission — impact stats, rescue-to-adoption journey, success stories, and how donations fund medical care, food, and shelter. Built to drive support, volunteer sign-ups, and transparent giving for stray and injured animals.",
    tags: ["Next.js", "React", "Tailwind CSS", "Donations", "Non-Profit"],
    featured: false,
    url: "https://paw-prints-rescue-six.vercel.app/",
    images: PET_RESCUE_GALLERY_IMAGES,
  },
  {
    title: "Fruit-Nut",
    subtitle: "Fresh Fruit Store (FrutNut)",
    description:
      "Brand site for a Chandigarh & Mohali fresh-fruit business — hero and menu positioning, combo offerings, subscription plans, and contact-first ordering with free local delivery messaging. Customization and diet-detail pages for health-focused customers.",
    tags: ["Next.js", "React", "Tailwind CSS", "E-Commerce", "Subscriptions"],
    featured: false,
    url: "https://frutnut.vercel.app/",
    images: FRUIT_NUT_GALLERY_IMAGES,
  },
  {
    title: "Gopal-Vastarm",
    subtitle: "Devotional E-Commerce (Balgopaal Vastram)",
    description:
      "Full-stack storefront for handcrafted Laddu Gopal devotional wear — vastra, mukut, and bansuri. Product catalog with variants and favorites, cart and checkout, customer-facing marketing pages, and an admin panel to manage inventory and orders for a Haryana-based brand.",
    tags: ["Next.js", "React", "Node.js", "E-Commerce", "Admin Panel"],
    featured: true,
    url: "https://balgopaal-vastram-dg29.vercel.app/",
    images: GOPAL_VASTRAM_GALLERY_IMAGES,
  },
  {
    title: "Reel-Store",
    subtitle: "Digital Reels Marketplace (ReelStore)",
    description:
      "Conversion-focused storefront for premium AI hybrid reel bundles — featured packs, product previews, social proof, and secure checkout with UPI and wallet payments. Instant post-purchase download, lifetime access, and admin tooling to manage bundles, buyers, and content delivery.",
    tags: ["Next.js", "React", "Node.js", "Payments", "Digital Downloads"],
    featured: false,
    url: "https://www.digitlhub.online/",
    images: REELSTORE_GALLERY_IMAGES,
  },
  {
    title: "Snake-Ster",
    subtitle: "Late-Night Snacks Delivery (SnackSter)",
    description:
      "Mohali-focused delivery brand site for chakna, soda, and ice — hero offers, combo packs (Party, Premium, Quick Bite), snacks and liquor menus, WhatsApp-first ordering, and trust stats for 30-minute delivery, free delivery above ₹199, and late-night service.",
    tags: ["Next.js", "React", "Tailwind CSS", "WhatsApp", "Local Delivery"],
    featured: false,
    url: "https://snakester-livid.vercel.app/",
    images: SNAKESTER_GALLERY_IMAGES,
  },
  {
    title: "We-Online",
    subtitle: "Business Web Presence",
    description:
      "Marketing and service landing experience for an online-first brand — clear value sections, contact and lead paths, responsive layout, and fast Vercel deployment. Structured for easy content updates and future feature expansion.",
    tags: ["Next.js", "React", "Tailwind CSS", "Landing Page"],
    featured: false,
    url: "https://heyweek.com/",
    images: HEYWEEK_GALLERY_IMAGES,
  },
] as const;

// ─── Navigation ───────────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "#contact" },
] as const;

// ─── Profile Summary ──────────────────────────────────────────────────────────
export const PROFILE_SUMMARY =
  "Senior MERN Stack Developer with 4+ years of experience in SaaS, AI, chatbot, and multi-tenant platforms. Delivered 18+ production systems, built 400+ APIs, and designed 15+ backend architectures. Strong in Node.js, NestJS, Next.js, microservices, and real-time applications.";

// ─── Education ────────────────────────────────────────────────────────────────
export const EDUCATION: EducationItem[] = [
  {
    institution: "Choudhary Devi Lal University",
    location: "Sirsa",
    period: "2018 – 2021",
    qualification: "Bachelor of Arts, Geography",
  },
  {
    institution: "KMA Technoware",
    location: "Hisar",
    period: "2021 – 2022",
    qualification: "Software Development Training, Basic Computer Course",
  },
];

// ─── Languages ────────────────────────────────────────────────────────────────
export const LANGUAGES: LanguageItem[] = [
  { name: "English", level: "Professional" },
  { name: "Hindi", level: "Native" },
  { name: "Punjabi", level: "Conversational" },
];

// ─── Resume Highlights ────────────────────────────────────────────────────────
export const RESUME_HIGHLIGHTS = [
  "400+ secure REST APIs built across production systems",
  "15+ backend architectures designed from scratch",
  "18+ production projects delivered end-to-end",
  "Multi-tenant SaaS & AI-agent platform design",
  "Real-time systems via WebSockets & Socket.IO",
  "Payment integrations: Stripe, Razorpay",
  "Communication APIs: Twilio, SendGrid",
];
