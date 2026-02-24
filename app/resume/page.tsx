import type { Metadata } from "next";
import { EXPERIENCE, PERSONAL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Professional resume of Anil Kumar — Senior MERN Stack Developer with 4+ years of experience.",
};

export default function ResumePage() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        {/* ── Page header ─────────────────────────────────────────── */}
        <div className="text-center mb-6">
          <h1 className="page-title">Resume</h1>
          <p className="page-subtitle">Professional experience & education</p>
        </div>
        <hr className="border-[#d8d8d6] mb-14" />

        {/* ── Two-column layout ────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* ── LEFT column ── contact / education / skills summary ── */}
          <aside className="space-y-10">
            {/* Contact */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#3d9088] mb-4">
                Contact
              </h2>
              <div className="space-y-2 text-sm text-[#555]">
                <p>
                  <a
                    href={`tel:${PERSONAL.phone}`}
                    className="hover:text-[#2d7a70] transition-colors"
                  >
                    {PERSONAL.phone}
                  </a>
                </p>
                <p>
                  <a
                    href={`mailto:${PERSONAL.email}`}
                    className="hover:text-[#2d7a70] transition-colors"
                  >
                    {PERSONAL.email}
                  </a>
                </p>
                <p>{PERSONAL.location}</p>
                <p>
                  <a
                    href={PERSONAL.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#3d9088] hover:underline"
                  >
                    LinkedIn
                  </a>
                  {" · "}
                  <a
                    href={PERSONAL.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#3d9088] hover:underline"
                  >
                    GitHub
                  </a>
                </p>
              </div>
            </div>

            {/* Education */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#3d9088] mb-4">
                Education
              </h2>
              <div className="space-y-4 text-sm text-[#555]">
                <div>
                  <p className="font-semibold text-neutral-800">
                    Choudhary Devi Lal University
                  </p>
                  <p className="text-xs text-[#888] font-medium uppercase tracking-wide">
                    Sirsa
                  </p>
                  <p className="mt-1">2018 – 2021</p>
                  <p>Bachelor of Art, Geography</p>
                </div>
                <div>
                  <p className="font-semibold text-neutral-800">
                    KMA Technoware, Hisar
                  </p>
                  <p className="mt-1">2021 – 2022</p>
                  <p>Software Dev Training, Basic Computer Course</p>
                </div>
              </div>
            </div>

            {/* Languages */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#3d9088] mb-4">
                Language
              </h2>
              <ul className="space-y-1 text-sm text-[#555]">
                <li>English — Professional</li>
                <li>Hindi — Native</li>
                <li>Punjabi — Conversational</li>
              </ul>
            </div>

            {/* Download */}
            <div>
              <a
                href={PERSONAL.resumeUrl}
                download
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#3d9088] text-white text-sm font-medium rounded-full hover:bg-[#2d7a70] transition-colors"
                aria-label="Download Resume PDF"
              >
                ↓ Download PDF
              </a>
            </div>
          </aside>

          {/* ── RIGHT column ── Experience ───────────────────────── */}
          <div className="lg:col-span-2 space-y-12">
            {/* Profile summary */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#3d9088] mb-4">
                Profile
              </h2>
              <p className="text-[15px] text-[#444] leading-relaxed">
                Senior MERN Stack Developer with 4+ years experience in SaaS,
                AI, chatbot, and multi-tenant platforms. Delivered 18+
                production systems, built 400+ APIs, and designed 15+ backend
                architectures. Strong in Node.js, NestJS, Next.js,
                microservices, and real-time applications.
              </p>
            </div>

            {/* Experience */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#3d9088] mb-6">
                Experience
              </h2>
              <div className="space-y-10">
                {EXPERIENCE.map((job) => (
                  <div key={job.company}>
                    {/* Company header */}
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-3">
                      <div>
                        <h3 className="font-bold text-neutral-900 text-sm uppercase tracking-wide">
                          {job.company}
                          <span className="font-normal text-[#888]">
                            {" "}
                            — {job.location}
                          </span>
                        </h3>
                        <p className="text-sm font-medium text-[#3d9088] mt-0.5">
                          {job.role}
                        </p>
                      </div>
                      <span className="text-xs text-[#888] flex-shrink-0">
                        {job.period}
                      </span>
                    </div>

                    {/* Highlights */}
                    <ul className="space-y-2 ml-1" role="list">
                      {job.highlights.map((h, i) => (
                        <li key={i} className="exp-bullet">
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
