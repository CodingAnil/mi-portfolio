"use client";

import React, { useEffect, useRef } from "react";
import SectionHeader from "@/components/SectionHeader";

const reasons = [
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
      />
    ),
    title: "Clean architecture",
    desc: "Systems designed for maintainability, testability, and scale — not just the next sprint.",
  },
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    ),
    title: "Scalable APIs",
    desc: "400+ production REST APIs with auth, rate limiting, versioning, and documentation.",
  },
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    ),
    title: "Production-ready",
    desc: "Real systems for real users — logging, monitoring, and robust error handling.",
  },
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
      />
    ),
    title: "AI & automation",
    desc: "OpenAI, LangChain, chatbots, and workflow automation in production environments.",
  },
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
    title: "Fast delivery",
    desc: "Complex features shipped on schedule without compromising code quality.",
  },
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M4 6h16M4 10h16M4 14h16M4 18h16"
      />
    ),
    title: "Full-stack depth",
    desc: "React, Next.js, NestJS, and Node — no handoff gaps between frontend and backend.",
  },
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    ),
    title: "Secure systems",
    desc: "JWT, OAuth, RBAC, and security best practices from day one.",
  },
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
      />
    ),
    title: "Problem solver",
    desc: "Debugging, architecture, and performance under real-world pressure.",
  },
];

const WhyChooseMe: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target
              .querySelectorAll(".reveal, .reveal-left, .reveal-right")
              .forEach((el) => {
                el.classList.add("visible");
              });
          }
        });
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="why-choose-me"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      <div className="absolute inset-0 grid-overlay opacity-60 pointer-events-none" />

      <div className="page-container relative">
        <SectionHeader
          align="center"
          eyebrow="05 · Value"
          title={
            <>
              Built for{" "}
              <span className="text-gradient-accent">scale</span>, speed &
              reliability
            </>
          }
          description="A specialist in production-grade MERN systems — not demo apps."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {reasons.map((r, i) => (
            <div
              key={r.title}
              className="why-card reveal visible hover:transform-none"
              style={{ transitionDelay: `${i * 0.05}s` }}
            >
              <div className="w-10 h-10 rounded-xl bg-accent-cyan/10 border border-accent-cyan/15 flex items-center justify-center text-accent-cyan mb-4">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  {r.icon}
                </svg>
              </div>
              <h3 className="font-display font-semibold text-white text-base mb-2">
                {r.title}
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 glass-card p-8 md:p-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: "18+", label: "Production projects" },
              { value: "400+", label: "REST APIs" },
              { value: "4+", label: "Years experience" },
              { value: "100%", label: "On-time delivery" },
            ].map((stat) => (
              <div key={stat.label} className="space-y-1">
                <div className="font-display text-3xl md:text-4xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-[11px] text-text-muted uppercase tracking-wider font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseMe;
