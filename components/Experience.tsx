"use client";
import { motion } from "framer-motion";
import { EXPERIENCE } from "@/lib/constants";
import AnimatedSection from "./AnimatedSection";

export default function Experience() {
  return (
    <AnimatedSection id="experience">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-label mx-auto">03. Career</h2>
          <h3 className="text-3xl md:text-4xl font-bold">Work Experience</h3>
        </div>

        <div className="relative border-l border-white/10 ml-4 space-y-12">
          {EXPERIENCE.map((job, idx) => (
            <motion.div
              key={job.company}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative pl-8"
            >
              <div className="timeline-dot" />

              <div className="glass p-6 hover:border-brand-blue/30 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-white tracking-tight">
                      {job.role}
                    </h4>
                    <p className="text-brand-blue font-medium">
                      {job.company},{" "}
                      <span className="text-slate-500">{job.location}</span>
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/5">
                    {job.period}
                  </span>
                </div>

                <ul className="space-y-3" role="list">
                  {job.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-sm text-slate-400 leading-relaxed"
                    >
                      <span className="text-brand-blue mt-1.5 flex-shrink-0">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="6" cy="6" r="3" fill="currentColor" />
                        </svg>
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
