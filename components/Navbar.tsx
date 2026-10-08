"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PERSONAL, NAV_LINKS } from "@/lib/constants";
import SectionLink from "@/components/SectionLink";
import { isSectionNavHref } from "@/lib/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import { togglePortfolioTheme } from "@/lib/theme";

function NavItem({
  href,
  label,
  className,
  onNavigate,
}: {
  href: string;
  label: string;
  className: string;
  onNavigate: () => void;
}) {
  if (isSectionNavHref(href)) {
    return (
      <SectionLink
        sectionId={href}
        onNavigate={onNavigate}
        className={className}
      >
        {label}
      </SectionLink>
    );
  }
  return (
    <Link href={href} onClick={onNavigate} className={className}>
      {label}
    </Link>
  );
}

/** Matches `page-container` horizontal inset so the nav card aligns with page content. */
const NAV_INSET = "px-5 sm:px-6 lg:px-8";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.header
      initial={false}
      className={`fixed top-0 left-0 right-0 z-50 pt-3 sm:pt-4 ${NAV_INSET}`}
    >
      <div
        className={`site-nav mx-auto w-full max-w-6xl rounded-2xl border transition-all duration-300 ${
          scrolled
            ? "is-scrolled border-white/10 bg-bg-card/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] px-4 sm:px-5 py-2.5"
            : "border-transparent bg-transparent px-3 sm:px-4 py-2"
        }`}
      >
        <nav
          className="flex items-center justify-between gap-4"
          aria-label="Main"
        >
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => togglePortfolioTheme()}
              className="w-9 h-9 shrink-0 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center transition-colors hover:border-accent-cyan/40"
              aria-label="Toggle light and dark mode"
              title="Toggle theme"
            >
              <span className="font-display font-bold text-accent-cyan text-sm">
                A
              </span>
            </button>
            <Link href="/" className="flex flex-col min-w-0 group" aria-label="Home">
              <span className="font-display font-semibold text-white text-sm tracking-tight truncate">
                {PERSONAL.name}
              </span>
              <span className="text-[10px] text-text-muted font-medium truncate hidden sm:block">
                {PERSONAL.title}
              </span>
            </Link>
          </div>

          <ul className="hidden md:flex items-center gap-1" role="list">
            <li className="mr-1">
              <ThemeToggle />
            </li>
            {NAV_LINKS.map((item) => (
              <li key={item.href}>
                <NavItem
                  href={item.href}
                  label={item.label}
                  onNavigate={() => setMobileOpen(false)}
                  className="inline-flex h-9 items-center justify-center px-3.5 rounded-lg text-xs font-medium text-text-secondary hover:text-white hover:bg-white/[0.05] transition-colors"
                />
              </li>
            ))}
            <li className="ml-2">
              <Link href="/resume" className="btn-primary !py-2 !px-4 text-xs">
                <span>Resume</span>
              </Link>
            </li>
          </ul>

          <div className="md:hidden">
            <ThemeToggle />
          </div>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2.5 rounded-lg border border-white/10 hover:bg-white/[0.04] transition-colors"
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block w-5 h-0.5 bg-text-primary"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-5 h-0.5 bg-text-primary"
            />
            <motion.span
              animate={
                mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }
              }
              className="block w-5 h-0.5 bg-text-primary"
            />
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-2 mx-auto w-full max-w-6xl rounded-2xl border border-white/10 bg-bg-card/95 backdrop-blur-xl overflow-hidden"
          >
            <ul className="px-4 py-5 flex flex-col gap-1" role="list">
              <li className="mb-2">
                <ThemeToggle />
              </li>
              {NAV_LINKS.map((item) => (
                <li key={item.href}>
                  <NavItem
                    href={item.href}
                    label={item.label}
                    onNavigate={() => setMobileOpen(false)}
                    className="block rounded-lg px-3 py-3 text-sm font-medium text-text-secondary hover:text-white hover:bg-white/[0.05] transition-colors"
                  />
                </li>
              ))}
              <li className="pt-3">
                <Link
                  href="/resume"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary block w-full text-center text-sm"
                >
                  <span>View resume</span>
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
