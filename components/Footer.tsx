"use client";

import { motion } from "framer-motion";
import { PERSONAL, NAV_LINKS } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 py-6 bg-bg-primary border-t border-white/[0.05]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          {/* Logo & Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center">
                <span className="font-black text-accent-cyan text-sm">A</span>
              </div>
              <span className="font-black text-white text-lg tracking-tight">
                {PERSONAL.name}
              </span>
            </div>
            <p className="text-text-muted text-xs leading-relaxed max-w-[240px]">
              Crafting high-performance MERN solutions & AI-driven experiences
              since 2021.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex justify-center gap-6 md:gap-8">
            <div className="text-[10px] font-black uppercase tracking-widest text-text-muted hover:text-accent-cyan transition-colors">
              <span>Thanks for visiting</span>
              <motion.span
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-accent-purple"
              >
                ❤️
              </motion.span>
            </div>{" "}
            {/* {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[10px] font-black uppercase tracking-widest text-text-muted hover:text-accent-cyan transition-colors"
              >
                {link.label}
              </a>
            ))} */}
          </div>

          {/* Socials & Copyright */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right gap-4">
            <div className="flex gap-4">
              {[
                {
                  icon: (
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  ),
                  href: PERSONAL.github,
                },
                {
                  icon: (
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  ),
                  href: PERSONAL.linkedin,
                },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-center text-text-muted hover:border-accent-cyan/30 hover:text-accent-cyan hover:bg-accent-cyan/5 transition-all"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {s.icon}
                  </svg>
                </a>
              ))}
            </div>
            <div className="space-y-1">
              <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest">
                © {currentYear} • Built with Passion
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
