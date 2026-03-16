"use client";

import React, { useEffect, useRef } from "react";

const reasons = [
  {
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
    ),
    title: "Clean Architecture",
    desc: "Every system is designed for maintainability, testability, and long-term scale — not just the next sprint.",
    color: "#00D4FF",
  },
  {
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    title: "Scalable APIs",
    desc: "400+ production REST APIs built with auth, rate limiting, versioning, and Swagger documentation.",
    color: "#7C3AED",
  },
  {
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    title: "Production-Ready Code",
    desc: "Not demo projects. Real systems serving real users with proper error handling, logging, and monitoring.",
    color: "#10D98A",
  },
  {
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
    title: "AI & Automation",
    desc: "Hands-on experience with OpenAI GPT, LangChain, chatbot systems, and AI workflow automation.",
    color: "#F59E0B",
  },
  {
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Fast Delivery",
    desc: "Consistent track record of shipping complex features on schedule without compromising code quality.",
    color: "#3B82F6",
  },
  {
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 6h16M4 10h16M4 14h16M4 18h16"
        />
      </svg>
    ),
    title: "Full-Stack Depth",
    desc: "Strong in both frontend (React, Next.js) and backend (NestJS, Node.js) — no handoff gaps.",
    color: "#EC4899",
  },
  {
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    ),
    title: "Secure Systems",
    desc: "JWT auth, OAuth, RBAC, data encryption, and security best practices embedded from day one.",
    color: "#00D4FF",
  },
  {
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    title: "Strong Problem Solver",
    desc: "Complex debugging, architectural decisions, and performance optimization — comfortable under pressure.",
    color: "#7C3AED",
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
      ref={sectionRef}
      className="py-20 bg-bg-secondary relative overflow-hidden grid-overlay"
    >
      {/* Background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-64 opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(0,212,255,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 reveal visible">
          <p className="text-xs font-bold uppercase tracking-widest text-accent-cyan mb-4">
            Why Choose Me
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
            Built for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-purple">
              Scale,
            </span>{" "}
            Speed &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-brand-purple to-accent-purple">
              Reliability.
            </span>
          </h2>
          <p className="text-text-muted mt-6 max-w-2xl mx-auto text-lg">
            Not a generalist developer. A specialist in building
            production-grade MERN systems that handle real-world complexity.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((r, i) => (
            <div
              key={r.title}
              className="why-card reveal visible"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: `${r.color}15`, color: r.color }}
              >
                {r.icon}
              </div>
              <h3 className="font-bold text-white text-lg mb-3">{r.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">
                {r.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Summary Card */}
        <div
          className="mt-16 glass-card p-10 reveal visible"
          style={{ border: "1px solid rgba(0, 212, 255, 0.1)" }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {[
              { value: "18+", label: "Production Projects", color: "#00D4FF" },
              { value: "400+", label: "REST APIs Built", color: "#7C3AED" },
              { value: "4+", label: "Years Experience", color: "#10D98A" },
              { value: "100%", label: "On-Time Delivery", color: "#F59E0B" },
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <div
                  className="text-4xl font-black"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </div>
                <div className="text-[10px] text-text-muted uppercase tracking-[0.2em] font-bold">
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
