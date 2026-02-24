"use client";
import { motion } from "framer-motion";
import { Project } from "@/types";

interface Props {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="glass p-6 group cursor-default"
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-6">
          <div className="p-3 rounded-xl bg-brand-blue/10 border border-brand-blue/20 group-hover:border-brand-blue/40 transition-colors">
            <svg
              className="w-6 h-6 text-brand-blue"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
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
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded bg-brand-blue/20 text-brand-blue border border-brand-blue/30">
              Featured
            </span>
          )}
        </div>

        <h4 className="text-xl font-bold text-white mb-2 tracking-tight group-hover:text-brand-blue transition-colors">
          {project.title}
        </h4>
        <p className="text-brand-teal text-xs font-semibold uppercase tracking-widest mb-4">
          {project.subtitle}
        </p>

        <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-white/5 px-2 py-0.5 rounded border border-white/5"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
