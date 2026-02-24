"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { PERSONAL } from "@/lib/constants";
import dynamic from "next/dynamic";

const Owl = dynamic(() => import("./Owl"), { ssr: false });

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center pt-16"
      aria-label="Hero – Introduction"
    >
      {/* Radial glow behind name */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(79,142,247,0.07) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Owl — top right corner */}
      <div
        className="absolute top-24 right-8 md:right-16 z-10 hidden sm:block"
        aria-hidden="true"
      >
        <Owl />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-10 w-full">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col md:flex-row items-center md:items-start gap-12 md:gap-16"
        >
          {/* Profile image */}
          <motion.div variants={item} className="flex-shrink-0">
            <div className="relative">
              <div
                className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden ring-2 ring-white/10"
                style={{ boxShadow: "0 0 60px rgba(79,142,247,0.15)" }}
              >
                <Image
                  src="/images/profile.jpg"
                  alt="Anil Kumar – Senior MERN Stack Developer"
                  width={224}
                  height={224}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
              {/* Available badge */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-dark-800/90 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1 shadow-lg whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-slate-300 font-medium">
                  Available for work
                </span>
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <div className="flex-1 text-center md:text-left">
            <motion.p variants={item} className="section-label mb-3">
              Senior MERN Stack Developer
            </motion.p>

            <motion.h1
              variants={item}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-none mb-6 gradient-name"
            >
              {PERSONAL.name}
            </motion.h1>

            <motion.p
              variants={item}
              className="text-slate-400 text-lg leading-relaxed max-w-xl mb-8"
            >
              {PERSONAL.tagline}
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={item}
              className="flex gap-8 mb-8 justify-center md:justify-start"
            >
              {[
                { v: "4+", l: "Years Exp." },
                { v: "18+", l: "Projects" },
                { v: "400+", l: "APIs Built" },
              ].map(({ v, l }) => (
                <div key={l} className="text-center md:text-left">
                  <p className="text-2xl font-bold text-white">{v}</p>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mt-0.5">
                    {l}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              variants={item}
              className="flex flex-wrap gap-3 justify-center md:justify-start"
            >
              <a href={PERSONAL.resumeUrl} download className="btn-glow">
                ↓ Download Resume
              </a>
              <Link
                href={PERSONAL.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                GitHub
              </Link>
              <Link
                href={PERSONAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                LinkedIn
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <span className="text-xs text-slate-600 tracking-widest uppercase">
            .
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-slate-600 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
