"use client";
import Image from "next/image";
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
      className="relative min-h-[92vh] flex items-center pt-24 pb-16 overflow-hidden"
      aria-label="Hero – Introduction"
    >
      <div className="absolute inset-0 ai-ambient" aria-hidden="true" />
      <div className="absolute inset-0 grid-overlay opacity-80" aria-hidden="true" />

      <div
        className="absolute inset-0 z-0 hidden lg:block overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-bg-primary via-bg-primary/85 to-bg-primary/20 z-[1]" />
        <HeroVideo />
      </div>

      <div className="relative z-10 page-container w-full">
        <motion.div
          variants={container}
          initial={false}
          animate="visible"
          className="flex flex-col lg:flex-row items-center lg:items-center gap-12 lg:gap-16"
        >
          <motion.div variants={item} className="flex-shrink-0 relative">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-accent-cyan/30 to-accent-purple/20 blur-md opacity-60" />
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-52 md:h-52 rounded-full overflow-hidden border border-white/15 ring-1 ring-white/10 shadow-2xl">
                <Image
                  src="/images/profile.jpg"
                  alt="Anil Kumar – Senior MERN Stack Developer"
                  width={208}
                  height={208}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 availability-badge shadow-lg">
                <span className="availability-dot" />
                Available for work
              </div>
            </div>
          </motion.div>

          <div className="flex-1 text-center lg:text-left max-w-2xl lg:max-w-none">
            <motion.p variants={item} className="section-eyebrow mb-4 justify-center lg:justify-start">
              Senior MERN Stack Developer
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
              className="text-text-secondary text-base md:text-lg leading-relaxed mb-8 mx-auto lg:mx-0"
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}
