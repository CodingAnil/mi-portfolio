"use client";
import { motion } from "framer-motion";
import { EXPERIENCE } from "@/lib/constants";

export default function Experience() {
  return (
    <section
      id="experience"
      className="py-20 bg-bg-primary relative overflow-hidden"
    >
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16 reveal visible">
          <p className="section-label mx-auto">03. Career</p>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
            Work{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-purple">
              Experience
            </span>
          </h2>
        </div>

        <div className="relative border-l border-white/10 ml-4 space-y-12">
          {EXPERIENCE.map((job, idx) => (
            <motion.div
              key={job.company}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative pl-10"
            >
              <div className="absolute -left-[9px] top-6 w-4 h-4 rounded-full border-2 border-bg-primary bg-accent-cyan shadow-[0_0_15px_#00D4FF]" />

              <div className="glass-card p-8 group hover:!border-accent-cyan/30 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-4 mb-6">
                  <div>
                    <h4 className="text-xl font-black text-white tracking-tight group-hover:text-accent-cyan transition-colors">
                      {job.role}
                    </h4>
                    <p className="text-accent-purple font-bold text-sm tracking-widest uppercase">
                      {job.company},{" "}
                      <span className="text-text-muted normal-case font-medium">
                        {job.location}
                      </span>
                    </p>
                  </div>
                  <span className="text-[10px] font-black text-white uppercase tracking-widest bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
                    {job.period}
                  </span>
                </div>

                <ul className="space-y-4" role="list">
                  {job.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="flex gap-4 text-sm text-text-secondary leading-relaxed"
                    >
                      <span className="text-accent-cyan mt-1.5 flex-shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent-cyan shadow-[0_0_6px_#00D4FF]" />
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
    </section>
  );
}
