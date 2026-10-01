"use client";

import { motion } from "framer-motion";
import { Project } from "@/types";

interface Props {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: Props) {
  return (
    <motion.article
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.45 }}
      className="glass-card p-6 md:p-7 group h-full flex flex-col"
    >
      <div className="flex items-start justify-between gap-3 mb-6">
        <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-accent-cyan group-hover:border-accent-cyan/30 transition-colors">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
          </svg>
        </div>
        {project.featured && (
          <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20">
            Featured
          </span>
        )}
      </div>

      <div className="space-y-2 mb-4">
        <h4 className="font-display text-lg font-semibold text-white group-hover:text-accent-cyan transition-colors">
          {project.title}
        </h4>
        <p className="text-[11px] font-medium uppercase tracking-wider text-text-muted">
          {project.subtitle}
        </p>
      </div>

      <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-1">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/[0.06]">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-medium text-text-muted bg-white/[0.03] px-2.5 py-1 rounded-md border border-white/[0.06]"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.article>
  );
}
