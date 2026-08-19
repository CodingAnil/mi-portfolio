"use client";
import Link from "next/link";
import { PROJECTS } from "@/lib/constants";
import AnimatedSection from "./AnimatedSection";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  const featured = PROJECTS.filter((project) => project.featured);
  const remaining = PROJECTS.length - featured.length;

  return (
    <AnimatedSection id="projects" className="bg-bg-secondary/30">
      <div className="text-center mb-16">
        <p className="section-label mx-auto">04. Portfolio</p>
        <h2 className="text-4xl md:text-5xl font-black text-white">
          Featured{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-purple">
            Projects
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featured.map((project, idx) => (
          <ProjectCard key={project.title} project={project} index={idx} />
        ))}
      </div>

      <div className="mt-14 flex flex-col items-center gap-6">
        <Link href="/projects" className="btn-primary group">
          <span className="flex items-center gap-2">
            View all projects
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </span>
        </Link>

        <p className="text-text-muted text-sm max-w-xl mx-auto text-center">
          {remaining > 0 ? `Plus ${remaining} more on the projects page. ` : ""}
          Delivered 18+ production projects across MERN and AI platforms.
        </p>
      </div>
    </AnimatedSection>
  );
}
