// ─── Skill Types ──────────────────────────────────────────────────────────────
export interface SkillCategory {
  category: string;
  items: string[];
}

// ─── Experience Types ─────────────────────────────────────────────────────────
export interface ExperienceItem {
  company: string;
  location: string;
  role: string;
  period: string;
  highlights: string[];
}

// ─── Project Types ────────────────────────────────────────────────────────────
export interface Project {
  title: string;
  subtitle: string;
  description: string;
  tags: readonly string[];
  featured: boolean;
}

// ─── Navigation Types ─────────────────────────────────────────────────────────
export interface NavLink {
  label: string;
  href: string;
}

// ─── Contact Form Types ───────────────────────────────────────────────────────
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactFormState {
  status: "idle" | "loading" | "success" | "error";
  message: string;
}

// ─── Section Component Types ───────────────────────────────────────────────────
export interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}
