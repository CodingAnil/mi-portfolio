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
  const handleScrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-screen flex items-center pt-20 grid-overlay overflow-hidden"
      aria-label="Hero – Introduction"
    >
      {/* Background glow behind name */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Owl — top right corner */}
      <div
        className="absolute top-24 right-8 md:right-16 z-20 hidden sm:block"
        aria-hidden="true"
      >
        <Owl />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 w-full">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col md:flex-row items-center md:items-start gap-12 md:gap-16"
        >
          {/* Profile image with brand styling */}
          <motion.div variants={item} className="flex-shrink-0 relative">
            <div className="relative group">
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-2 border-white/10 shadow-2xl transition-all duration-500 group-hover:border-accent-cyan/30 group-hover:shadow-glow-cyan">
                <Image
                  src="/images/profile.jpg"
                  alt="Anil Kumar – Senior MERN Stack Developer"
                  width={224}
                  height={224}
                  className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
                  priority
                />
              </div>
              {/* Available badge with brand colors */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-bg-card/90 backdrop-blur-md border border-accent-green/30 rounded-full px-4 py-1.5 shadow-lg whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse shadow-[0_0_8px_#10D98A]" />
                <span className="text-[10px] text-accent-green font-bold uppercase tracking-widest">
                  Available for work
                </span>
              </div>
            </div>
          </motion.div>

          {/* Text Content */}
          <div className="flex-1 text-center md:text-left">
            <motion.p variants={item} className="section-label mb-3">
              Senior MERN Stack Developer
            </motion.p>

            <motion.h1
              variants={item}
              className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] mb-6 tracking-tight text-white"
            >
              Anil{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-purple">
                Kumar
              </span>
            </motion.h1>

            <motion.p
              variants={item}
              className="text-text-secondary text-lg leading-relaxed max-w-xl mb-8 mx-auto md:mx-0"
            >
              {PERSONAL.tagline}
            </motion.p>

            {/* Stats - Clean Row */}
            <motion.div
              variants={item}
              className="flex gap-8 mb-10 justify-center md:justify-start"
            >
              {[
                { v: "4+", l: "Years Exp." },
                { v: "18+", l: "Projects" },
                { v: "400+", l: "APIs Built" },
              ].map(({ v, l }) => (
                <div key={l}>
                  <p className="text-2xl font-black text-white">{v}</p>
                  <p className="text-[10px] text-text-muted uppercase tracking-widest font-bold">
                    {l}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* CTAs with premium styles */}
            <motion.div
              variants={item}
              className="flex flex-wrap gap-3 justify-center md:justify-start"
            >
              <button
                onClick={handleScrollToContact}
                className="btn-primary group"
              >
                <span>Hire Me →</span>
              </button>
              <Link
                href={PERSONAL.github}
                target="_blank"
                className="btn-ghost"
              >
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

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        >
          <div className="w-px h-12 bg-gradient-to-b from-accent-cyan to-transparent animate-pulse" />
        </motion.div>
      </div>
    </section>
  );
}
