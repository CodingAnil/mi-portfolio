import type { Metadata } from "next";
import {
  EDUCATION,
  EXPERIENCE,
  LANGUAGES,
  PERSONAL,
  PROFILE_SUMMARY,
  RESUME_HIGHLIGHTS,
  SKILLS,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume of Anil Kumar — Senior MERN Stack Developer with 4+ years of experience building SaaS, AI, and multi-tenant platforms.",
  alternates: {
    canonical: "/resume",
  },
};

const CONTACT_ROWS = [
  { label: "Email", value: PERSONAL.email, href: `mailto:${PERSONAL.email}` },
  { label: "Phone", value: PERSONAL.phone, href: `tel:${PERSONAL.phone}` },
  { label: "Location", value: PERSONAL.location },
  { label: "LinkedIn", value: "anil-kumar-mern", href: PERSONAL.linkedin },
  { label: "GitHub", value: "CodingAnil", href: PERSONAL.github },
];

/** Small labelled heading used above every block in the resume. */
function BlockHeading({ id, children }: { id: string; children: string }) {
  return (
    <h2
      id={id}
      className="resume-heading text-[10px] font-black uppercase tracking-[0.3em] text-accent-cyan mb-5"
    >
      {children}
    </h2>
  );
}

/** Cyan dot used as the list marker throughout. */
function Bullet() {
  return (
    <span
      className="w-1.5 h-1.5 rounded-full bg-accent-cyan mt-[0.5rem] flex-shrink-0"
      aria-hidden="true"
    />
  );
}

export default function ResumePage() {
  return (
    <div className="resume-page pt-28 pb-24 bg-bg-primary">
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        {/* ── Header ─────────────────────────────────────────────── */}
        <header className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <p className="section-label">Resume</p>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                Anil{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-purple resume-gradient-text">
                  Kumar
                </span>
              </h1>
              <p className="text-text-secondary font-bold uppercase tracking-[0.2em] text-xs mt-3">
                {PERSONAL.title}
              </p>
            </div>

            <a
              href={PERSONAL.resumeUrl}
              download
              className="btn-primary self-start sm:self-auto whitespace-nowrap print:hidden"
            >
              <span>↓ Download PDF</span>
            </a>
          </div>

          {/* Contact — inline so it stays near the top when printed */}
          <dl className="flex flex-wrap gap-x-8 gap-y-4 mt-8 pt-8 border-t border-white/10">
            {CONTACT_ROWS.map((row) => (
              <div key={row.label}>
                <dt className="text-[10px] uppercase tracking-widest text-text-muted font-bold mb-1">
                  {row.label}
                </dt>
                <dd className="text-sm text-text-primary">
                  {row.href ? (
                    <a
                      href={row.href}
                      target={
                        row.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        row.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="hover:text-accent-cyan transition-colors"
                    >
                      {row.value}
                    </a>
                  ) : (
                    row.value
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <p className="text-text-secondary leading-relaxed mt-8 max-w-3xl">
            {PROFILE_SUMMARY}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
          {/* ── Main column ──────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-12">
            <section aria-labelledby="experience-block">
              <BlockHeading id="experience-block">Experience</BlockHeading>
              <div className="space-y-6">
                {EXPERIENCE.map((job) => (
                  <article
                    key={job.company}
                    className="glass-card p-6 resume-entry"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-4">
                      <div>
                        <h3 className="text-lg font-black text-white tracking-tight">
                          {job.role}
                        </h3>
                        <p className="text-accent-purple font-bold text-xs tracking-widest uppercase mt-1">
                          {job.company},{" "}
                          <span className="text-text-muted normal-case font-medium tracking-normal">
                            {job.location}
                          </span>
                        </p>
                      </div>
                      <span className="text-[10px] font-black text-white uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-full border border-white/10 whitespace-nowrap self-start">
                        {job.period}
                      </span>
                    </div>
                    <ul className="space-y-2.5">
                      {job.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex gap-3 text-sm text-text-secondary leading-relaxed"
                        >
                          <Bullet />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>

            <section aria-labelledby="skills-block">
              <BlockHeading id="skills-block">Technical Skills</BlockHeading>
              <div className="glass-card p-6 space-y-5">
                {SKILLS.map((category) => (
                  <div
                    key={category.category}
                    className="grid grid-cols-1 sm:grid-cols-[9rem_1fr] gap-2 sm:gap-4 resume-entry"
                  >
                    <h3 className="text-white font-bold text-sm">
                      {category.category}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {category.items.join(" · ")}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section aria-labelledby="highlights-block">
              <BlockHeading id="highlights-block">Highlights</BlockHeading>
              <ul className="glass-card p-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                {RESUME_HIGHLIGHTS.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm text-text-secondary leading-relaxed resume-entry"
                  >
                    <Bullet />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* ── Sidebar ──────────────────────────────────────────── */}
          <aside className="space-y-10">
            <section
              className="glass-card p-6"
              aria-labelledby="education-block"
            >
              <BlockHeading id="education-block">Education</BlockHeading>
              <div className="space-y-5 text-sm">
                {EDUCATION.map((item) => (
                  <div key={item.institution} className="resume-entry">
                    <h3 className="text-white font-bold leading-snug">
                      {item.institution}
                    </h3>
                    <p className="text-[10px] uppercase tracking-widest text-text-muted font-bold mt-1">
                      {item.location} · {item.period}
                    </p>
                    <p className="text-text-secondary mt-1.5">
                      {item.qualification}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section
              className="glass-card p-6"
              aria-labelledby="languages-block"
            >
              <BlockHeading id="languages-block">Languages</BlockHeading>
              <ul className="space-y-2 text-sm">
                {LANGUAGES.map((lang) => (
                  <li
                    key={lang.name}
                    className="flex justify-between gap-4 resume-entry"
                  >
                    <span className="text-text-primary">{lang.name}</span>
                    <span className="text-text-muted text-xs uppercase tracking-widest font-bold self-center">
                      {lang.level}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
