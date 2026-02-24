import type { Metadata } from "next";
import { PROJECTS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Key projects by Anil Kumar — AI SaaS platforms, chatbots, booking systems, and Chrome extensions.",
};

export default function ProjectsPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        {/* ── Page header ────────────────────────────────────── */}
        <div className="text-center mb-6">
          <h1 className="page-title">Projects</h1>
          <p className="page-subtitle">
            Production systems I&apos;ve architected and delivered
          </p>
        </div>
        <hr className="border-[#d8d8d6] mb-14" />

        {/* ── Project list – Dalya Baron section style ────────── */}
        <div className="space-y-0">
          {PROJECTS.map((project, i) => (
            <div key={project.title}>
              <div className="flex flex-col md:flex-row md:gap-16 gap-4 py-10">
                {/* Left – title + subtitle */}
                <div className="md:w-64 flex-shrink-0">
                  <h2 className="text-lg font-bold text-neutral-900">
                    <em>{project.title}</em>
                  </h2>
                  <p className="text-sm text-[#3d9088] font-medium mt-1">
                    {project.subtitle}
                  </p>
                  {project.featured && (
                    <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#3d9088]/10 text-[#2d7a70]">
                      Featured
                    </span>
                  )}
                </div>

                {/* Right – description + tags */}
                <div className="flex-1">
                  <p className="text-[15px] text-[#444] leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div
                    className="flex flex-wrap gap-2"
                    role="list"
                    aria-label="Tech stack"
                  >
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        role="listitem"
                        className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-white border border-[#d0d0ce] text-[#555]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Divider between projects */}
              {i < PROJECTS.length - 1 && <hr className="border-[#e4e4e2]" />}
            </div>
          ))}
        </div>

        {/* ── Footer note ──────────────────────────────────────── */}
        <div className="mt-12 pt-8 border-t border-[#d8d8d6]">
          <p className="text-sm text-[#888] text-center leading-relaxed">
            ▲ Additional 15+ projects delivered as individual contributor or
            project lead across MERN and AI platforms.
            <br />
            <span className="text-xs">
              Detailed case studies & architecture diagrams coming soon.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
