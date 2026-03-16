"use client";
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Project } from "@/types";

interface Props {
  project: Project;
  index: number;
}

interface TiltState {
  rotateX: number;
  rotateY: number;
}

export default function ProjectCard({ project, index }: Props) {
  const [tilt, setTilt] = useState<TiltState>({ rotateX: 0, rotateY: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      rotateX: (y - 0.5) * -12,
      rotateY: (x - 0.5) * 12,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glass-card p-8 group cursor-default h-full relative overflow-hidden"
      style={{
        perspective: "1000px",
        transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        transition:
          tilt.rotateX === 0
            ? "all 0.5s cubic-bezier(0.23,1,0.32,1)"
            : "transform 0.1s ease",
        background: `linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.01) 100%)`,
      }}
    >
      <div className="flex flex-col h-full relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="w-12 h-12 rounded-2xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center text-accent-cyan group-hover:bg-accent-cyan group-hover:text-white transition-all duration-300">
            <svg
              className="w-6 h-6"
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
            <span className="text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20">
              Featured
            </span>
          )}
        </div>

        <div className="space-y-3 mb-6">
          <h4 className="text-2xl font-black text-white tracking-tight group-hover:text-accent-cyan transition-colors">
            {project.title}
          </h4>
          <p className="text-accent-cyan text-[10px] font-black uppercase tracking-[0.2em]">
            {project.subtitle}
          </p>
        </div>

        <p className="text-text-secondary text-sm leading-relaxed mb-8 flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-bold uppercase tracking-widest text-text-muted bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 group-hover:border-accent-cyan/20 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Background radial glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0,212,255,0.03) 0%, transparent 70%)",
        }}
      />
    </motion.div>
  );
}
