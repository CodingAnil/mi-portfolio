"use client";

import { motion } from "framer-motion";
import { Project } from "@/types";
import ProjectCardGallery from "./ProjectCardGallery";

interface Props {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: Props) {
  return (
    <motion.div
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.45 }}
      className="h-full"
    >
      <article className="glass-card p-6 md:p-7 group h-full flex flex-col hover:border-accent-cyan/25 transition-colors">
        <ProjectCardGallery images={project.images} title={project.title} />

        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col flex-1 min-h-0 -mx-1 px-1 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/40"
          aria-label={`${project.title} — open live project in new tab`}
        >
          {project.featured && (
            <div className="flex justify-end mb-4">
              <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20">
                Featured
              </span>
            </div>
          )}

          <div className="space-y-2 mb-3">
            <h4 className="font-display text-lg font-semibold text-white group-hover:text-accent-cyan transition-colors">
              {project.title}
            </h4>
            <p className="text-[11px] font-medium uppercase tracking-wider text-text-muted">
              {project.subtitle}
            </p>
          </div>

          <p className="text-text-secondary text-sm leading-relaxed mb-4 flex-1">
            {project.description}
          </p>

          <p className="text-xs font-medium text-accent-cyan/90 mb-4 flex items-center gap-1.5 group-hover:text-accent-cyan transition-colors">
            View live project
            <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>
              ↗
            </span>
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
        </a>
      </article>
    </motion.div>
  );
}
