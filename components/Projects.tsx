"use client";

import Link from "next/link";
import { PROJECTS } from "@/lib/constants";
import AnimatedSection from "./AnimatedSection";
import ProjectCard from "./ProjectCard";
import SectionHeader from "./SectionHeader";

export default function Projects() {
  const featured = PROJECTS.filter((project) => project.featured);
  const remaining = PROJECTS.length - featured.length;

  return (
    <AnimatedSection id="projects" className="bg-bg-secondary/30 border-y border-white/[0.04]">
      <SectionHeader
        align="center"
        eyebrow="04 · Portfolio"
        title={
          <>
            Featured{" "}
            <span className="text-gradient-accent">projects</span>
          </>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {featured.map((project, idx) => (
          <ProjectCard key={project.title} project={project} index={idx} />
        ))}
      </div>

      <div className="mt-12 flex flex-col items-center gap-4">
        <Link href="/projects" className="btn-primary group">
          <span className="flex items-center gap-2">
            View all projects
            <span className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </span>
        </Link>
        <p className="text-text-muted text-sm max-w-lg text-center leading-relaxed">
          {remaining > 0 ? `Plus ${remaining} more on the projects page. ` : ""}
          Delivered 18+ production projects across MERN and AI platforms.
        </p>
      </div>
    </AnimatedSection>
  );
}
