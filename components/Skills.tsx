"use client";

import { motion, Variants } from "framer-motion";
import { SKILLS } from "@/lib/constants";
import SectionHeader from "@/components/SectionHeader";

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
};

const item: Variants = {
  hidden: { opacity: 1, y: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35 },
  },
};

export default function Skills() {
  return (
    <section
      id="skills"
      className="section-padding relative overflow-hidden bg-bg-secondary/50 border-y border-white/[0.04]"
    >
      <div className="page-container">
        <SectionHeader
          align="center"
          eyebrow="02 · Tech stack"
          title={
            <>
              Skills &{" "}
              <span className="text-gradient-accent">technologies</span>
            </>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {SKILLS.map((category) => (
            <div
              key={category.category}
              className="glass-card p-6 flex flex-col hover:transform-none"
            >
              <h4 className="font-display text-sm font-semibold text-white mb-5 flex items-center gap-2">
                <span className="w-1 h-4 rounded-full bg-accent-cyan/80" />
                {category.category}
              </h4>
              <motion.div
                variants={container}
                initial={false}
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap gap-2"
              >
                {category.items.map((skill) => (
                  <motion.span key={skill} variants={item} className="skill-badge">
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          ))}

          <div className="glass-card p-8 md:p-10 flex flex-col items-center text-center lg:col-span-3 mt-2 border-accent-cyan/10">
            <div className="w-12 h-12 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center text-accent-cyan mb-5">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="font-display text-xl font-bold text-white mb-3">
              Always learning
            </h3>
            <p className="text-text-secondary text-sm md:text-base max-w-xl leading-relaxed">
              Technology never stops evolving, and neither do I. Currently
              deepening expertise in systems architecture and advanced AI
              workflows.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
