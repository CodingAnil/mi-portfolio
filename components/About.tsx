"use client";

import SectionHeader from "@/components/SectionHeader";

export default function About() {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <div className="page-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <SectionHeader
              eyebrow="01 · About"
              title={
                <>
                  Architecting{" "}
                  <span className="text-gradient-accent">reliable</span>{" "}
                  systems
                </>
              }
              description="Senior MERN developer focused on SaaS, AI platforms, and production-grade APIs — with an emphasis on clarity, security, and long-term maintainability."
            />
            <div className="space-y-4 text-text-secondary text-base leading-relaxed -mt-6">
              <p>
                Senior MERN Stack Developer with 4+ years of experience in SaaS,
                AI, chatbot, and multi-tenant platforms. I specialize in
                building high-performance web applications that solve real-world
                problems.
              </p>
              <p>
                Throughout my career, I have delivered over 18 production
                systems, designed 15+ backend architectures, and built more than
                400 secure REST APIs. My focus is always on scalability,
                security, and developer experience.
              </p>
            </div>
          </div>

          <div className="glass-card p-6 md:p-8">
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {[
                { label: "Architecture", value: "15+" },
                { label: "APIs built", value: "400+" },
                { label: "SaaS systems", value: "18+" },
                { label: "Code quality", value: "A+" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 text-center transition-colors hover:border-accent-cyan/25 hover:bg-white/[0.04]"
                >
                  <p className="font-display text-2xl md:text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </p>
                  <p className="text-[10px] text-text-muted uppercase tracking-wider font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
