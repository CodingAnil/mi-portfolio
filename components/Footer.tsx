"use client";

import { PERSONAL } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-white/[0.06] bg-bg-primary/80">
      <div className="page-container py-10 md:py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center">
                <span className="font-display font-bold text-accent-cyan text-sm">
                  A
                </span>
              </div>
              <span className="font-display font-semibold text-white">
                {PERSONAL.name}
              </span>
            </div>
            <p className="text-text-muted text-sm max-w-xs leading-relaxed">
              MERN engineering & AI-driven products — built for production.
            </p>
          </div>

          <div className="flex items-center justify-center gap-3">
            {[
              {
                icon: (
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                ),
                href: PERSONAL.github,
                label: "GitHub",
              },
              {
                icon: (
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                ),
                href: PERSONAL.linkedin,
                label: "LinkedIn",
              },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-text-muted hover:border-accent-cyan/30 hover:text-accent-cyan hover:bg-accent-cyan/5 transition-all"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  {s.icon}
                </svg>
              </a>
            ))}
          </div>

          <p className="text-center md:text-right text-xs text-text-muted">
            © {currentYear} {PERSONAL.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
