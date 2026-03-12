"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PERSONAL } from "@/lib/constants";

export default function Footer() {
  const socialLinks = [
    {
      label: "GitHub",
      href: PERSONAL.github,
      icon: "/images/github.png",
      external: true,
    },
    {
      label: "LinkedIn",
      href: PERSONAL.linkedin,
      icon: "/images/linkdinicon.png",
      external: true,
    },
    {
      label: "Email",
      href: `mailto:${PERSONAL.email}`,
      icon: "/images/emailicon.png",
      external: false,
    },
  ];

  return (
    <footer className="relative z-10 py-12 bg-dark-900 border-t border-white/5">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <p className="text-white font-bold tracking-tight mb-1 text-lg">
              Anil Kumar
            </p>
            <p className="text-slate-500 text-[10px] tracking-[0.2em] uppercase font-semibold">
              Premium Developer Experience
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-3 text-slate-400 hover:text-white transition-all duration-300"
              >
                <div className="relative w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 group-hover:border-brand-blue/50 group-hover:bg-brand-blue/5 transition-all">
                  <Image
                    src={link.icon}
                    alt={`${link.label} icon`}
                    width={18}
                    height={18}
                    className="opacity-80 group-hover:opacity-100 transition-all duration-300 object-contain"
                  />
                </div>
                <span className="text-sm font-medium">{link.label}</span>
              </a>
            ))}
          </div>

          <div className="text-white text-[11px] font-medium text-center md:text-right">
            <p>© {new Date().getFullYear()} — Designed & Built</p>
            <p className="mt-1 opacity-70 flex items-center justify-center md:justify-end gap-1.5 uppercase tracking-wider text-[9px]">
              Thanks for visiting
              <motion.span
                animate={{
                  scale: [1, 1.25, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)] inline-block"
              >
                ❤️
              </motion.span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
