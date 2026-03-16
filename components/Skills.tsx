"use client";
import { motion, Variants } from "framer-motion";
import { SKILLS } from "@/lib/constants";

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
};

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-20 bg-bg-primary relative overflow-hidden"
      style={{ background: "var(--bg-secondary)" }}
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16 reveal visible">
          <p className="section-label mx-auto">02. Tech Stack</p>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            Skills &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-purple">
              Technologies
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILLS.map((category) => (
            <div
              key={category.category}
              className="glass-card p-8 flex flex-col items-start reveal visible"
            >
              <h4 className="text-white font-bold mb-8 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-accent-cyan shadow-[0_0_8px_#00D4FF]" />
                {category.category}
              </h4>
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap gap-2.5"
              >
                {category.items.map((skill) => (
                  <motion.span
                    key={skill}
                    variants={item}
                    whileHover={{ scale: 1.05 }}
                    className="skill-badge"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          ))}

          {/* Always Learning Card */}
          <div
            className="glass-card p-10 flex flex-col items-center text-center reveal visible lg:col-span-3 mt-4"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,212,255,0.03) 0%, rgba(124,58,237,0.03) 100%)",
            }}
          >
            <div className="w-16 h-16 rounded-full bg-accent-cyan/10 flex items-center justify-center text-accent-cyan mb-6 animate-float">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-black text-white mb-4">
              Always Learning
            </h3>
            <p className="text-text-secondary max-w-2xl mx-auto mb-8">
              Technology never stops evolving, and neither do I. Currently
              deepening my expertise in systems architecture and advanced AI
              workflows.
            </p>
            {/* <div className="flex flex-wrap justify-center gap-3">
              {["GoLang", "System Design", "Vector DBs", "LLM Fine-tuning"].map(
                (skill) => (
                  <span
                    key={skill}
                    className="skill-badge hover:!border-accent-purple/40 hover:!bg-accent-purple/10 hover:!text-accent-purple"
                  >
                    {skill}
                  </span>
                ),
              )}
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
