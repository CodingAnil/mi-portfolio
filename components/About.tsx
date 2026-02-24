"use client";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

export default function About() {
  return (
    <AnimatedSection id="about">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="section-label">01. About Me</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            Architecting <span className="text-brand-blue">Reliable</span>{" "}
            Solutions.
          </h3>
          <div className="space-y-4 text-slate-400">
            <p>
              Senior MERN Stack Developer with 4+ years of experience in SaaS,
              AI, chatbot, and multi-tenant platforms. I specialize in building
              high-performance web applications that solve real-world problems.
            </p>
            <p>
              Throughout my career, I have delivered over 18 production systems,
              designed 15+ backend architectures, and built more than 400 secure
              REST APIs. My focus is always on scalability, security, and
              developer experience.
            </p>
            <p>
              I thrive in environments that challenge my problem-solving skills
              and allow me to lead technical initiatives that drive business
              value.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="glass p-8 relative z-10">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Architecture", value: "15+" },
                { label: "APIs Built", value: "400+" },
                { label: "SaaS Systems", value: "18+" },
                { label: "Code Quality", value: "A+" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 rounded-xl bg-white/5 border border-white/5"
                >
                  <p className="text-2xl font-bold text-white mb-1">
                    {stat.value}
                  </p>
                  <p className="text-xs text-slate-500 uppercase tracking-widest">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-brand-blue/10 blur-3xl rounded-full" />
          <div className="absolute -top-6 -left-6 w-32 h-32 bg-brand-teal/10 blur-3xl rounded-full" />
        </div>
      </div>
    </AnimatedSection>
  );
}
