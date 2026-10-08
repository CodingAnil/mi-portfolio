"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { PERSONAL } from "@/lib/constants";
import dynamic from "next/dynamic";

const HeroVideo = dynamic(() => import("./HeroVideo"), { ssr: false });

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 1, y: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  const handleScrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-[88vh] sm:min-h-[92vh] flex items-center pt-24 pb-14 sm:pb-16 overflow-hidden"
      aria-label="Hero – Introduction"
    >
      <div className="absolute inset-0 ai-ambient" aria-hidden="true" />
      <div className="absolute inset-0 grid-overlay opacity-80" aria-hidden="true" />

      <div
        className="hero-ambient-video absolute inset-0 z-0 hidden lg:block overflow-hidden"
        aria-hidden="true"
      >
        <div className="hero-video-wash absolute inset-0 bg-gradient-to-r from-bg-primary via-bg-primary/88 to-bg-primary/15 z-[1]" />
        <HeroVideo variant="desktop" />
      </div>

      <div
        className="hero-ambient-video absolute inset-0 z-0 overflow-hidden lg:hidden pointer-events-none"
        aria-hidden
      >
        <div className="hero-video-wash absolute inset-0 bg-gradient-to-b from-bg-primary/75 via-bg-primary/88 to-bg-primary z-[1]" />
        <HeroVideo variant="mobile-backdrop" />
      </div>

      <div className="relative z-10 page-container w-full">
        <motion.div
          variants={container}
          initial={false}
          animate="visible"
          className="max-w-2xl md:max-w-3xl text-center lg:text-left"
        >
          <motion.p
            variants={item}
            className="section-eyebrow mb-4 justify-center lg:justify-start"
          >
            MERN Stack Developer
          </motion.p>

          <motion.h1
            variants={item}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.08] mb-5"
          >
            Anil{" "}
            <span className="text-gradient-accent">Kumar</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="text-text-secondary text-base md:text-lg leading-relaxed mb-8 mx-auto lg:mx-0 max-w-lg"
          >
            {PERSONAL.tagline}
          </motion.p>

          <motion.div
            variants={item}
            className="grid grid-cols-3 gap-3 sm:gap-4 mb-8 max-w-md mx-auto lg:mx-0"
          >
            {[
              { v: "4+", l: "Years" },
              { v: "18+", l: "Projects" },
              { v: "400+", l: "APIs" },
            ].map(({ v, l }) => (
              <div
                key={l}
                className="glass-card rounded-xl px-3 py-3 sm:px-4 sm:py-3.5 text-center hover:transform-none"
              >
                <p className="font-display text-xl sm:text-2xl font-bold text-white">
                  {v}
                </p>
                <p className="text-[10px] text-text-muted uppercase tracking-wider font-medium mt-0.5">
                  {l}
                </p>
              </div>
            ))}
          </motion.div>

          <motion.div
            variants={item}
            className="flex flex-wrap gap-3 justify-center lg:justify-start"
          >
            <button
              type="button"
              onClick={handleScrollToContact}
              className="btn-primary group"
            >
              <span>Hire me</span>
            </button>
            <Link href={PERSONAL.github} target="_blank" className="btn-ghost">
              GitHub
            </Link>
            <Link
              href={PERSONAL.linkedin}
              target="_blank"
              className="btn-ghost"
            >
              LinkedIn
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
