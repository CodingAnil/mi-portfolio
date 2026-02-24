import type { Metadata } from "next";
import { SKILLS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Technical skills of Anil Kumar — Frontend, Backend, Database, and DevOps expertise.",
};

export default function SkillsPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        {/* ── Page header ───────────────────────────────────── */}
        <div className="text-center mb-6">
          <h1 className="page-title">Skills</h1>
          <p className="page-subtitle">Technologies I work with every day</p>
        </div>
        <hr className="border-[#d8d8d6] mb-14" />

        {/* ── Skills grid ───────────────────────────────────── */}
        <div className="space-y-14">
          {SKILLS.map((category) => (
            <section
              key={category.category}
              aria-labelledby={`skill-${category.category}`}
            >
              {/* Category + text aligned like Dalya Baron sections */}
              <div className="flex flex-col md:flex-row md:gap-16 gap-4">
                {/* Left – category label */}
                <div className="md:w-48 flex-shrink-0">
                  <h2
                    id={`skill-${category.category}`}
                    className="text-base font-bold text-neutral-900"
                  >
                    {category.category}
                  </h2>
                </div>

                {/* Right – badges */}
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2.5" role="list">
                    {category.items.map((skill) => (
                      <span key={skill} role="listitem" className="skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Section divider */}
              <hr className="border-[#e8e8e6] mt-10" />
            </section>
          ))}
        </div>

        {/* ── Architecture highlights ───────────────────────── */}
        <div className="mt-16">
          <div className="flex flex-col md:flex-row md:gap-16 gap-4">
            <div className="md:w-48 flex-shrink-0">
              <h2 className="text-base font-bold text-neutral-900">
                Highlights
              </h2>
            </div>
            <div className="flex-1">
              <ul className="space-y-3" role="list">
                {[
                  "400+ secure REST APIs built across production systems",
                  "15+ backend architectures designed from scratch",
                  "18+ production projects delivered end-to-end",
                  "Expert in multi-tenant SaaS & AI-agent platform design",
                  "Real-time systems via WebSockets & Socket.IO",
                  "Payment integrations: Stripe, Razorpay",
                  "Communication APIs: Twilio, SendGrid",
                ].map((item, i) => (
                  <li key={i} className="exp-bullet">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
