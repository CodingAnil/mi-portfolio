"use client";

import Image from "next/image";
import SectionHeader from "@/components/SectionHeader";

const STATS = [
  { label: "Architecture", value: "15+" },
  { label: "APIs built", value: "400+" },
  { label: "SaaS systems", value: "18+" },
  { label: "Code quality", value: "A+" },
] as const;

export default function About() {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <div
        className="pointer-events-none absolute top-1/4 -left-32 w-72 h-72 bg-accent-cyan/10 rounded-full blur-[100px] opacity-50"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 w-96 h-96 bg-accent-purple/10 rounded-full blur-[120px] opacity-40"
        aria-hidden
      />

      <div className="page-container relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 xl:gap-16 items-stretch">
          <div className="w-full max-w-[420px] lg:max-w-none mx-auto lg:mx-0 flex lg:items-center lg:justify-start order-1">
            <div className="relative w-full lg:max-w-[440px] xl:max-w-[460px]">
              <div
                className="absolute -inset-3 rounded-[1.4rem] bg-gradient-to-br from-accent-cyan/25 via-accent-cyan/5 to-accent-purple/20 blur-2xl opacity-90 pointer-events-none"
                aria-hidden
              />
              <div className="relative rounded-2xl p-[1px] bg-gradient-to-br from-white/25 via-accent-cyan/30 to-accent-purple/15 shadow-[0_24px_60px_rgba(0,0,0,0.5)]">
                <div className="relative rounded-[calc(1rem-1px)] overflow-hidden border border-white/[0.1] bg-bg-card/40 backdrop-blur-md">
                  <div className="relative w-full h-[320px] sm:h-[360px] md:h-[400px] lg:h-[min(520px,72vh)] xl:h-[540px]">
                    <Image
                      src="/images/profile.jpg"
                      alt="Anil Kumar – Senior MERN Stack Developer"
                      fill
                      sizes="(max-width: 1024px) 420px, 460px"
                      className="object-cover object-[center_22%]"
                      priority={false}
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/25 to-transparent pointer-events-none"
                      aria-hidden
                    />
                    <div
                      className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none"
                      aria-hidden
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col order-2">
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

            <div className="mt-8 lg:mt-auto lg:pt-10">
              <div className="glass-card p-5 sm:p-6 md:p-7">
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  {STATS.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 text-center transition-all duration-300 hover:border-accent-cyan/25 hover:bg-white/[0.04] hover:shadow-[0_0_24px_rgba(56,189,248,0.08)]"
                    >
                      <p className="font-display text-2xl sm:text-3xl font-bold text-white mb-1">
                        {stat.value}
                      </p>
                      <p className="text-[10px] sm:text-[11px] text-text-muted uppercase tracking-wider font-medium">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
