import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Anil Kumar — open to full-time roles, freelance projects, and collaborations.",
};

export default function ContactPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        {/* ── Page header ─────────────── */}
        <div className="text-center mb-6">
          <h1 className="page-title">Contact</h1>
          <p className="page-subtitle">
            Let&apos;s build something great together
          </p>
        </div>
        <hr className="border-[#d8d8d6] mb-14" />

        <ContactForm />
      </div>
    </div>
  );
}
