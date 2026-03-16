"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PERSONAL, NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("#")) {
      const el = document.getElementById(href.replace("#", ""));
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg-primary/70 backdrop-blur-xl border-b border-white/[0.05] py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6">
        <nav className="flex items-center justify-between">
          {/* Brand */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            aria-label="Home"
          >
            <div className="w-10 h-10 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center transition-all group-hover:bg-accent-cyan group-hover:text-white group-hover:shadow-glow-cyan">
              <span className="font-black text-accent-cyan group-hover:text-white text-lg">
                A
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-white text-sm tracking-tight leading-tight">
                {PERSONAL.name}
              </span>
              <span className="text-[10px] text-text-muted font-bold uppercase tracking-widest leading-none mt-0.5">
                {PERSONAL.title}
              </span>
            </div>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8" role="list">
            {NAV_LINKS.map((item) => (
              <li key={item.href}>
                <button
                  onClick={() => handleNav(item.href)}
                  className="text-xs font-bold uppercase tracking-widest text-text-secondary hover:text-accent-cyan transition-colors"
                >
                  {item.label}
                </button>
              </li>
            ))}
            <li>
              <a
                href={PERSONAL.resumeUrl}
                download
                className="btn-ghost text-[10px] px-4 py-2 uppercase tracking-widest font-black"
              >
                Resume
              </a>
            </li>
          </ul>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/5 transition-colors"
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="block w-5 h-0.5 bg-accent-cyan"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-5 h-0.5 bg-accent-cyan"
            />
            <motion.span
              animate={
                mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }
              }
              className="block w-5 h-0.5 bg-accent-cyan"
            />
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-bg-primary/95 backdrop-blur-2xl border-t border-white/[0.05]"
          >
            <ul
              className="px-6 py-8 flex flex-col gap-5 text-center"
              role="list"
            >
              {NAV_LINKS.map((item) => (
                <li key={item.href}>
                  <button
                    onClick={() => handleNav(item.href)}
                    className="text-sm font-bold uppercase tracking-[0.2em] text-text-secondary hover:text-accent-cyan py-2 transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li className="pt-4">
                <a
                  href={PERSONAL.resumeUrl}
                  download
                  className="btn-primary w-full justify-center text-xs"
                >
                  Download Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
