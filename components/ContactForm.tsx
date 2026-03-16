"use client";

import { useState } from "react";
import type { ContactFormData, ContactFormState } from "@/types";
import { PERSONAL } from "@/lib/constants";
import { motion } from "framer-motion";

const INITIAL_FORM: ContactFormData = { name: "", email: "", message: "" };
const INITIAL_STATE: ContactFormState = { status: "idle", message: "" };

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormData>(INITIAL_FORM);
  const [state, setState] = useState<ContactFormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

  const validate = (): boolean => {
    const e: Partial<ContactFormData> = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email address.";
    if (!form.message.trim()) e.message = "Message is required.";
    else if (form.message.trim().length < 2)
      e.message = "Message must be at least 2 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = ev.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData])
      setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (!validate()) return;
    setState({ status: "loading", message: "" });

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "03838d44-2fee-4e9a-9e9d-83b218a2f1f8",
          name: form.name,
          email: form.email,
          message: form.message,
          from_name: "Portfolio Contact Form",
          subject: `New Message from ${form.name}`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setState({
          status: "success",
          message: "Message sent! I'll get back to you soon.",
        });
        setForm(INITIAL_FORM);
      } else {
        throw new Error(result.message || "Submission failed");
      }
    } catch (err) {
      setState({
        status: "error",
        message: "Something went wrong. Please try again later.",
      });
    }
  };

  return (
    <section
      id="contact"
      className="py-20 bg-bg-primary relative overflow-hidden"
      style={{ background: "var(--bg-secondary)" }}
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 reveal visible">
          {/* Info Side */}
          <div>
            <h2 className="section-label">05. Contact</h2>
            <h3 className="text-4xl md:text-5xl font-black mb-8 text-white leading-tight">
              Get In{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-purple">
                Touch
              </span>
            </h3>
            <p className="text-text-secondary text-lg leading-relaxed mb-12">
              I&apos;m currently open to new opportunities and collaborations.
              Whether you have a question or just want to say hi, I&apos;ll try
              my best to get back to you!
            </p>

            <div className="space-y-6">
              {[
                {
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  ),
                  value: PERSONAL.email,
                  href: `mailto:${PERSONAL.email}`,
                },
                {
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.826L10.242 9.242a4 4 0 115.656 5.656l-1.101 1.101m-.758-4.826L12 12"
                    />
                  ),
                  value: "Anil Kumar(LinkedIn)",
                  href: PERSONAL.linkedin,
                },
                {
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                  ),
                  value: PERSONAL.location,
                  href: "https://www.google.com/maps/search/?api=1&query=Omega+City+Mohali+Punjab",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-6 group transition-colors"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-accent-cyan group-hover:bg-accent-cyan group-hover:text-white transition-all">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {item.icon}
                    </svg>
                  </div>
                  <a
                    href={item.href}
                    target={item.value === PERSONAL.email ? "_self" : "_blank"}
                    className="text-white font-bold group-hover:text-accent-cyan transition-colors"
                  >
                    {item.value}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Form Side */}
          <div className="glass-card p-8">
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">
                  Full Name
                </label>
                <input
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`w-full bg-white/[0.03] border ${errors.name ? "border-red-500/50" : "border-white/10"} focus:border-accent-cyan/50 focus:bg-white/[0.06] outline-none rounded-2xl px-5 py-4 text-white transition-all placeholder:text-text-muted/30`}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className={`w-full bg-white/[0.03] border ${errors.email ? "border-red-500/50" : "border-white/10"} focus:border-accent-cyan/50 focus:bg-white/[0.06] outline-none rounded-2xl px-5 py-4 text-white transition-all placeholder:text-text-muted/30`}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">
                  Your Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  className={`w-full bg-white/[0.03] border ${errors.message ? "border-red-500/50" : "border-white/10"} focus:border-accent-cyan/50 focus:bg-white/[0.06] outline-none rounded-2xl px-5 py-4 text-white transition-all placeholder:text-text-muted/30 resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={state.status === "loading"}
                className="btn-primary w-full group overflow-hidden"
              >
                <span className="flex items-center justify-center gap-3">
                  {state.status === "loading" ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <svg
                        className="w-5 h-5 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </>
                  )}
                </span>
              </button>

              {state.status === "success" && (
                <p className="text-center text-accent-green font-bold text-xs uppercase tracking-widest">
                  ✓ Message Sent
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
