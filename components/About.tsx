"use client";
import { motion } from "framer-motion";

export default function About() {
  const handleScrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="about"
      className="py-20 bg-bg-primary relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="reveal visible">
            <h2 className="section-label">01. About Me</h2>
            <h3 className="text-3xl md:text-5xl font-black mb-8 text-white leading-tight">
              Architecting{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-purple">
                Reliable
              </span>
              <br />
              Solutions.
            </h3>
            <div className="space-y-6 text-text-secondary text-lg leading-relaxed">
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

          <div className="relative reveal visible">
            <div className="glass-card p-8 relative z-10">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Architecture", value: "15+", color: "#00D4FF" },
                  { label: "APIs Built", value: "400+", color: "#7C3AED" },
                  { label: "SaaS Systems", value: "18+", color: "#3B82F6" },
                  { label: "Code Quality", value: "A+", color: "#10D98A" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col items-center text-center group hover:border-accent-cyan/20 transition-all duration-300"
                  >
                    <p
                      className="text-3xl font-black mb-1 transition-transform group-hover:scale-110"
                      style={{ color: stat.color }}
                    >
                      {stat.value}
                    </p>
                    <p className="text-[10px] text-text-muted uppercase tracking-[0.2em] font-bold">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            {/* Background decorative glows */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent-cyan/10 blur-3xl rounded-full" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-accent-purple/10 blur-3xl rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
