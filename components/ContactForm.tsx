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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
      <div>
        <h2 className="section-label">05. Contact</h2>
        <h3 className="text-3xl font-bold mb-6 text-white">Get In Touch</h3>
        <p className="text-slate-400 leading-relaxed mb-8">
          I&apos;m currently open to new opportunities and collaborations.
          Whether you have a question or just want to say hi, I&apos;ll try my
          best to get back to you!
        </p>

        <div className="space-y-6">
          <div className="flex items-center gap-4 text-slate-400 hover:text-white transition-colors">
            <div className="w-10 h-10 rounded-xl glass flex items-center justify-center text-brand-blue">
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
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <a
              href={`mailto:${PERSONAL.email}`}
              className="text-sm font-medium tracking-tight"
            >
              {PERSONAL.email}
            </a>
          </div>

          <div className="flex items-center gap-4 text-slate-400 hover:text-white transition-colors">
            <div className="w-10 h-10 rounded-xl glass flex items-center justify-center text-brand-blue">
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
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.826L10.242 9.242a4 4 0 115.656 5.656l-1.101 1.101m-.758-4.826L12 12"
                />
              </svg>
            </div>
            <a
              href={PERSONAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium tracking-tight"
            >
              Anil Kumar (LinkedIn)
            </a>
          </div>

          <div className="flex items-center gap-4 text-slate-400 hover:text-white transition-colors">
            <div className="w-10 h-10 rounded-xl glass flex items-center justify-center text-brand-blue">
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
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <span className="text-sm font-medium tracking-tight">
              {PERSONAL.location}
            </span>
          </div>
        </div>
      </div>

      <motion.form
        onSubmit={handleSubmit}
        noValidate
        className="glass p-8 space-y-5"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <div>
          <label
            htmlFor="c-name"
            className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2"
          >
            Full Name
          </label>
          <input
            id="c-name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="John Doe"
            className={`c-input ${errors.name ? "ring-red-500/50" : ""}`}
          />
          {errors.name && (
            <p className="text-[10px] text-red-500 mt-1 font-bold uppercase tracking-wide">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="c-email"
            className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2"
          >
            Email Address
          </label>
          <input
            id="c-email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className={`c-input ${errors.email ? "ring-red-500/50" : ""}`}
          />
          {errors.email && (
            <p className="text-[10px] text-red-500 mt-1 font-bold uppercase tracking-wide">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="c-message"
            className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2"
          >
            Your Message
          </label>
          <textarea
            id="c-message"
            name="message"
            rows={4}
            value={form.message}
            onChange={handleChange}
            placeholder="I'd like to talk about..."
            className={`c-input resize-none ${errors.message ? "ring-red-500/50" : ""}`}
          />
          {errors.message && (
            <p className="text-[10px] text-red-500 mt-1 font-bold uppercase tracking-wide">
              {errors.message}
            </p>
          )}
        </div>

        {state.status === "success" ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center"
          >
            <p className="text-emerald-400 text-sm font-bold tracking-tight">
              ✓ Message Sent Successfully!
            </p>
          </motion.div>
        ) : state.status === "error" ? (
          <div className="space-y-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-center"
            >
              <p className="text-red-400 text-sm font-bold tracking-tight">
                ⚠ {state.message || "Something went wrong. Try again."}
              </p>
            </motion.div>
            <button
              type="submit"
              className="btn-glow w-full justify-center group"
            >
              Try Again
            </button>
          </div>
        ) : (
          <button
            type="submit"
            disabled={state.status === "loading"}
            className="btn-glow w-full justify-center group"
          >
            {state.status === "loading"
              ? "Encrypting & Sending..."
              : "Send Message"}
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
          </button>
        )}
      </motion.form>
    </div>
  );
}
