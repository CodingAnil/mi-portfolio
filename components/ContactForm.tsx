"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { ContactFormData, ContactFormState } from "@/types";
import { PERSONAL } from "@/lib/constants";
import SectionHeader from "@/components/SectionHeader";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { THEME_EVENT, isLightTheme } from "@/lib/theme";

/** Web3Forms-provided site key; free plan — see https://docs.web3forms.com/getting-started/customizations/spam-protection/hcaptcha */
const WEB3FORMS_HCAPTCHA_SITEKEY = "50b2fe65-b00b-4b9e-ad62-3ba471098be2";

const HCaptchaWidget = dynamic(() => import("@hcaptcha/react-hcaptcha"), {
  ssr: false,
});

const INITIAL_FORM: ContactFormData = { name: "", email: "", message: "" };
const INITIAL_STATE: ContactFormState = { status: "idle", message: "" };
const FIELD_ORDER: (keyof ContactFormData)[] = ["name", "email", "message"];
/** How long the success / error banner stays on screen. */
const STATUS_TIMEOUT_MS = 6000;

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormData>(INITIAL_FORM);
  const [state, setState] = useState<ContactFormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const fieldRefs = {
    name: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    message: useRef<HTMLTextAreaElement>(null),
  };
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState(false);
  const [captchaMountKey, setCaptchaMountKey] = useState(0);
  const [lightTheme, setLightTheme] = useState(true);

  useEffect(() => {
    const sync = () => setLightTheme(isLightTheme());
    sync();
    window.addEventListener(THEME_EVENT, sync);
    return () => window.removeEventListener(THEME_EVENT, sync);
  }, []);

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
    const firstInvalid = FIELD_ORDER.find((field) => e[field]);
    if (firstInvalid) fieldRefs[firstInvalid].current?.focus();
    return !firstInvalid;
  };

  const handleChange = (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = ev.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData])
      setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const reduceMotion = useReducedMotion();

  /** Clear the success / error banner once the visitor has had time to read it. */
  useEffect(() => {
    if (state.status !== "success" && state.status !== "error") return;
    const timer = setTimeout(() => setState(INITIAL_STATE), STATUS_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, [state]);

  const bannerMotion = reduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.15 },
      }
    : {
        initial: { opacity: 0, y: -4 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -4 },
        transition: { duration: 0.25 },
      };

  /** Direct-email fallback, prefilled with what the visitor already typed. */
  const mailtoFallback = `mailto:${PERSONAL.email}?subject=${encodeURIComponent(
    form.name.trim()
      ? `Portfolio enquiry from ${form.name.trim()}`
      : "Portfolio enquiry",
  )}&body=${encodeURIComponent(form.message)}`;

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (!validate()) return;
    if (!captchaToken) {
      setCaptchaError(true);
      return;
    }
    setCaptchaError(false);
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
          botcheck: false,
          "h-captcha-response": captchaToken,
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
        setCaptchaToken(null);
        setCaptchaMountKey((k) => k + 1);
      } else {
        setState({
          status: "error",
          message:
            typeof result.message === "string"
              ? result.message
              : "Submission failed.",
        });
        setCaptchaToken(null);
        setCaptchaMountKey((k) => k + 1);
      }
    } catch {
      setState({
        status: "error",
        message: "Something went wrong. Please try again later.",
      });
      setCaptchaToken(null);
      setCaptchaMountKey((k) => k + 1);
    }
  };

  const fieldClass = (hasError: boolean) =>
    `input-field ${hasError ? "!border-red-500/50" : ""}`;

  return (
    <section
      id="contact"
      className="section-padding relative overflow-hidden bg-bg-secondary/40 border-t border-white/[0.04]"
    >
      <div className="page-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <SectionHeader
              eyebrow="06 · Contact"
              title={
                <>
                  Get in <span className="text-gradient-accent">touch</span>
                </>
              }
              description="Open to opportunities and collaborations. Questions, project ideas, or a quick hello — I'll do my best to reply."
            />

            <div className="space-y-3 -mt-4">
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
                  className="flex items-center gap-4 group rounded-xl border border-transparent hover:border-white/[0.06] hover:bg-white/[0.02] px-3 py-2.5 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-accent-cyan group-hover:border-accent-cyan/30 transition-colors">
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
                    className="text-sm font-medium text-text-primary group-hover:text-accent-cyan transition-colors"
                  >
                    {item.value}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Form Side */}
          <div className="glass-card p-6 md:p-7">
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-name"
                  className="text-xs font-medium text-text-secondary"
                >
                  Full name
                </label>
                <input
                  id="contact-name"
                  ref={fieldRefs.name}
                  name="name"
                  aria-invalid={!!errors.name}
                  aria-describedby={
                    errors.name ? "contact-name-error" : undefined
                  }
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={fieldClass(!!errors.name)}
                />
                {errors.name && (
                  <p
                    id="contact-name-error"
                    className="text-red-400 text-xs font-medium ml-1"
                  >
                    {errors.name}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-email"
                  className="text-xs font-medium text-text-secondary"
                >
                  Email address
                </label>
                <input
                  id="contact-email"
                  ref={fieldRefs.email}
                  name="email"
                  aria-invalid={!!errors.email}
                  aria-describedby={
                    errors.email ? "contact-email-error" : undefined
                  }
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className={fieldClass(!!errors.email)}
                />
                {errors.email && (
                  <p
                    id="contact-email-error"
                    className="text-red-400 text-xs font-medium ml-1"
                  >
                    {errors.email}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-message"
                  className="text-xs font-medium text-text-secondary"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  ref={fieldRefs.message}
                  name="message"
                  aria-invalid={!!errors.message}
                  aria-describedby={
                    errors.message ? "contact-message-error" : undefined
                  }
                  rows={3}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  className={`${fieldClass(!!errors.message)} min-h-[5.25rem] resize-none`}
                />
                {errors.message && (
                  <p
                    id="contact-message-error"
                    className="text-red-400 text-xs font-medium ml-1"
                  >
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5 w-full">
                <span className="text-xs font-medium text-text-secondary">
                  Verification
                </span>
                <div
                  className={`rounded-xl border px-3 py-3 transition-all ${
                    captchaError
                      ? "border-red-500/50 bg-red-500/[0.03]"
                      : "border-white/10 bg-white/[0.02] focus-within:border-accent-cyan/40"
                  }`}
                >
                  <div className="contact-form-captcha w-full">
                    <HCaptchaWidget
                      key={`${captchaMountKey}-${lightTheme ? "light" : "dark"}`}
                      sitekey={WEB3FORMS_HCAPTCHA_SITEKEY}
                      reCaptchaCompat={false}
                      size="compact"
                      theme={{
                        palette: lightTheme
                          ? {
                              mode: "light",
                              primary: "#7c3aed",
                              canvas: "#ffffff",
                              text: "#111827",
                              secondary: "#64748b",
                              inputBorder: "rgba(15, 23, 42, 0.12)",
                              inputFill: "#f8fafc",
                            }
                          : {
                              mode: "dark",
                              primary: "#38bdf8",
                              canvas: "#0c0f16",
                              text: "#f1f5f9",
                              secondary: "#64748b",
                              inputBorder: "rgba(255, 255, 255, 0.12)",
                              inputFill: "rgba(255, 255, 255, 0.04)",
                            },
                      }}
                      onVerify={(token) => {
                        setCaptchaToken(token);
                        setCaptchaError(false);
                      }}
                      onExpire={() => setCaptchaToken(null)}
                    />
                  </div>
                </div>
                {captchaError && (
                  <p className="text-red-400 text-xs font-medium">
                    Please complete the verification.
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={state.status === "loading"}
                className="btn-primary w-full group"
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

              <AnimatePresence>
                {state.status === "success" && (
                  <motion.p
                    key="contact-success"
                    role="status"
                    {...bannerMotion}
                    className="rounded-xl border border-accent-green/40 bg-accent-green/[0.07] px-4 py-3 text-center text-accent-green text-xs font-bold"
                  >
                    ✓ {state.message}
                  </motion.p>
                )}

                {state.status === "error" && (
                  <motion.div
                    key="contact-error"
                    role="alert"
                    {...bannerMotion}
                    className="rounded-xl border border-red-500/40 bg-red-500/[0.07] px-4 py-3 space-y-1"
                  >
                    <p className="text-red-400 text-xs font-bold">
                      {state.message}
                    </p>
                    <p className="text-text-secondary text-xs">
                      Your message was not sent.{" "}
                      <a
                        href={mailtoFallback}
                        className="text-accent-cyan font-semibold underline underline-offset-2 hover:text-white transition-colors"
                      >
                        Email me directly
                      </a>{" "}
                      instead.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
