"use client";
import { PROJECTS } from "@/lib/constants";
import AnimatedSection from "./AnimatedSection";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <AnimatedSection id="projects" className="bg-dark-800/30">
      <div className="text-center mb-16">
        <h2 className="section-label mx-auto">04. Portfolio</h2>
        <h3 className="text-3xl md:text-4xl font-bold">Key Projects</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.map((project, idx) => (
          <ProjectCard key={project.title} project={project} index={idx} />
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="text-slate-500 text-sm max-w-xl mx-auto">
          Delivered 18+ production projects across MERN and AI platforms.
          Detailed case studies and system architecture diagrams available upon
          request.
        </p>
      </div>
    </AnimatedSection>
  );
}
