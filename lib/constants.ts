// ─── Personal Information ────────────────────────────────────────────────────
export const PERSONAL = {
  name: "Anil Kumar",
  title: "Senior MERN Stack Developer",
  tagline:
    "Building scalable SaaS platforms, AI-powered systems, and high-performance web applications.",
  email: "programmeranil36@gmail.com",
  phone: "+91 9518002533",
  location: "Mohali, India",
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
export const PROJECTS = [
  {
    title: "Danjoo AI",
    subtitle: "AI Voice & Chat Agent SaaS",
    description:
      "Built AI-based calling and chat agent SaaS with a multi-panel system. Integrated voice AI, CRM, calendar, and automation workflows for end-to-end agent management.",
    tags: ["NestJS", "React", "MongoDB", "WebSockets", "AI Integration"],
    featured: true,
  },
  {
    title: "UpChat",
    subtitle: "AI Chatbot Platform",
    description:
      "Developed admin and bot management panels with full bot training and chat handling APIs. Enabled multi-tenant chatbot deployment at scale.",
    tags: ["Node.js", "React", "MongoDB", "REST APIs"],
    featured: true,
  },
  {
    title: "Paragone Gents",
    subtitle: "Booking System",
    description:
      "Built user and admin panels complete with booking workflows, calendar management, and payment processing integrations.",
    tags: ["Next.js", "Express", "PostgreSQL", "Stripe"],
    featured: false,
  },
  {
    title: "Skill Analyzer",
    subtitle: "AI Skill Assessment",
    description:
      "Built skill testing and question management panels with AI-driven assessment logic for talent evaluation.",
    tags: ["React", "Node.js", "MongoDB", "AI"],
    featured: false,
  },
  {
    title: "HeyWeek",
    subtitle: "Chrome Extension",
    description:
      "Developed a time tracking browser extension with sync APIs, background service workers, and productivity analytics dashboard.",
    tags: ["JavaScript", "Chrome APIs", "Node.js", "PostgreSQL"],
    featured: false,
  },
] as const;

// ─── Navigation ───────────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;
