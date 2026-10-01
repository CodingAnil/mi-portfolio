import type { Metadata } from "next";
import Link from "next/link";
import { PROJECTS } from "@/lib/constants";
import ProjectCard from "@/components/ProjectCard";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Production systems built by Anil Kumar — AI voice and chat agent platforms, multi-tenant chatbots, booking systems with payments, and browser extensions.",
  alternates: {
    canonical: "/projects",
  },
};

export default function ProjectsPage() {
  const featured = PROJECTS.filter((project) => project.featured);
  const others = PROJECTS.filter((project) => !project.featured);

  return (
    <div className="pt-8 pb-24 bg-bg-primary">
      <div className="page-container">
        <header className="mb-16 text-center">
          <p className="section-eyebrow justify-center mb-4">Portfolio</p>
          <h1 className="section-title">
            All <span className="text-gradient-accent">projects</span>
          </h1>
          <p className="text-text-secondary text-lg leading-relaxed mt-6 max-w-2xl mx-auto">
            Production systems I have designed and delivered — AI agent
            platforms, multi-tenant SaaS, booking and payment workflows, and
            browser tooling.
          </p>
        </header>

        {/* ── Featured ────────────────────────────────────────────── */}
        <section aria-labelledby="featured-projects" className="mb-16">
          <h2
            id="featured-projects"
            className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-cyan mb-6"
          >
            Featured
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((project, idx) => (
              <ProjectCard key={project.title} project={project} index={idx} />
            ))}
          </div>
        </section>

        {/* ── Everything else ─────────────────────────────────────── */}
        {others.length > 0 && (
          <section aria-labelledby="more-projects">
            <h2
              id="more-projects"
              className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-cyan mb-6"
            >
              More Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {others.map((project, idx) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  index={idx}
                />
              ))}
            </div>
          </section>
        )}

        {/* ── Footer note + back ──────────────────────────────────── */}
        <div className="mt-16 pt-10 border-t border-white/[0.06] text-center">
          <p className="text-text-muted text-sm max-w-2xl mx-auto leading-relaxed">
            Delivered 18+ production projects across MERN and AI platforms.
            Detailed case studies and architecture walkthroughs are available on
            request.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mt-8">
            <Link href="/#projects" className="btn-ghost">
              ← Back to portfolio
            </Link>
            <Link href="/#contact" className="btn-primary">
              <span>Discuss a project</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
