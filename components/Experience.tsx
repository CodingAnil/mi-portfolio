"use client";

import { motion } from "framer-motion";
import { EXPERIENCE } from "@/lib/constants";
import SectionHeader from "@/components/SectionHeader";

export default function Experience() {
  return (
    <section id="experience" className="section-padding relative overflow-hidden">
      <div className="page-container max-w-3xl">
        <SectionHeader
          align="center"
          eyebrow="03 · Career"
          title={
            <>
              Work{" "}
              <span className="text-gradient-accent">experience</span>
            </>
          }
        />

        <div className="relative space-y-6 md:space-y-8">
          <div
            className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-accent-cyan/40 via-white/10 to-transparent"
            aria-hidden
          />
          {EXPERIENCE.map((job, idx) => (
            <motion.article
              key={job.company}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.45 }}
              className="relative pl-8"
            >
              <div
                className="absolute left-0 top-6 w-[15px] h-[15px] rounded-full border-2 border-bg-primary bg-accent-cyan/90 ring-4 ring-accent-cyan/10"
                aria-hidden
              />

              <div className="glass-card p-6 md:p-7 group">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                  <div>
                    <h4 className="font-display text-lg font-semibold text-white group-hover:text-accent-cyan transition-colors">
                      {job.role}
                    </h4>
                    <p className="text-sm text-text-secondary mt-1">
                      <span className="text-accent-cyan/90 font-medium">
                        {job.company}
                      </span>
                      <span className="text-text-muted"> · {job.location}</span>
                    </p>
                  </div>
                  <span className="text-[11px] font-medium text-text-muted uppercase tracking-wide bg-white/[0.04] px-3 py-1.5 rounded-lg border border-white/[0.06] w-fit">
                    {job.period}
                  </span>
                </div>

                <ul className="space-y-3" role="list">
                  {job.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-sm text-text-secondary leading-relaxed"
                    >
                      <span className="mt-2 w-1 h-1 rounded-full bg-accent-cyan flex-shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
