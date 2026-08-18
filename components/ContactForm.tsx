"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { ContactFormData, ContactFormState } from "@/types";
import { PERSONAL } from "@/lib/constants";
import { motion } from "framer-motion";

/** Web3Forms-provided site key; free plan — see https://docs.web3forms.com/getting-started/customizations/spam-protection/hcaptcha */
const WEB3FORMS_HCAPTCHA_SITEKEY = "50b2fe65-b00b-4b9e-ad62-3ba471098be2";

const HCaptchaWidget = dynamic(() => import("@hcaptcha/react-hcaptcha"), {
  ssr: false,
});

const INITIAL_FORM: ContactFormData = { name: "", email: "", message: "" };
const INITIAL_STATE: ContactFormState = { status: "idle", message: "" };
const FIELD_ORDER: (keyof ContactFormData)[] = ["name", "email", "message"];

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormData>(INITIAL_FORM);
  const [state, setState] = useState<ContactFormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const fieldRefs = {
    name: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    message: useRef<HTMLTextAreaElement>(null),
  };
  const [captchaToken, setCaptchaToken] = useState<string | null>(
    "P1_eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.haJwZACjZXhwzmn0UKencGFzc2tlecUFFZcl77gAUQts-QVAGVwfg3yaLWOGR52SCb9oPZmHiHPNAL1E_KFG-qUJAOPgZ_drdGFMFT_O5MXvydOJf4AJ9kUUMG-4BFK2gNndJ2lJKUuCwk5zeXvhGg5V_UWJir8vajYyXcDnkLpztJFmu6u16D-M4scG4dSi4GUCfvH9Qnq5dP3U3YcRM2wc67o19Qomx2qSAXLsJFYSUxuqwpu5DOjpUQ4QJfDPqB5YLIpYZ00ZSPMycUtchvPMQDDJGNOARR5LLD1-qLfnQ49o_z2bmDq4tbC8BrfqG52hTV7c27pT3B3Y8OMCpNe8g7UHoE9r6MCYdBPu1WDRpeGnz0UIxzBbr8NygiJY-hdES1JZIAPQVbhxK94lsTFWdct1tNV9hI9ZEHZP1bOfSn_bqLl2rexEYd4nr3TsiU0Un1ME7Kn5ewkEEjBm9fCmArdqey2Leg2TbWYSzBriIWi2xFPxl3lkxBCCEQwLWGqWqGkRsmZFGTPtI5mpJwlFdJp_nN3oK-DtyKA1KpRnq1UYjnViqw6GlDFRFsGv2uWq8ZNR7u2hnc8ec884dM0lVI4TluJVJMqo8GJNvur4E0dpvURyyo8j0wyWvsPoaUpDb7szx_dfDz4IcvXzr3pEdas-5xjrLHnuPTwGNCdghj0lK5PQh6vGtqAzlWtxwELF8EAta2rJgXMI3XGwlWIfsLIzdACw_yd1DZVqT62xlynI_KutZrQappQFyw6M-nZ4DmY2AfD5sZhGXPG8DgvGeHnJ2Zqe0UQLomil5Rmm4bP9RAG-h9geUalxmREZm_tp55G1iXiLbkZkEJLAc4C6lNs8azRj0WI2UjMyrdRdekFOMQrBnMU1GqdBVHr8Y82EbsL_bR5r0n0uteLrN2Jm1msSeW28dnTgpEsKiZWY24djBVQRDT2TfJ_mEY9dboDFYyT_jex2Hr0ftr8a6BtwtweKVfZQpDLQQbYy95_pZOuAq2JKfELdf1D-vmaVd7CUFE1JknIOR9MEeFfBb8If0Ua1NSBXlOhm6g3YB9EAcy-DMCb37m4FKeOdEPDPeyFfK1HMObyPtQ3jRKHOHnAJFPnHEZ36NhW6vdp4qsRZfoDLGqUzcR3nXKBm8L1rtayXCeiTFsIQPYIaiaHbNf2qCdlURlaA0q6OQ2iY_bJVl8GhB7owrxB5oTGBR3xBubTioqjjo5onl9L1Wgb4YjXFDHFelaRBeOwTaxlCTeHYowScxX0IsGCCEkfi1J3EIBlCnQ9ni2hj6N7ZH2hkTLw7gDR-L6-pe1njsy2-dITyggOGQ0gZOaVcN3jTaByidTwKhrskNf6B3XH61p-bD0Bt09YAB1o9IViROYLKUq8XwFBcAWmmX5353K3NeKkZGVriFqy201mNQbXq7uulPYSnOdtY0ra05WlASuzDz5a4Guj_-3Y_ErFr8t19OLsEPYe8wJ4f0XT73cYzP9cr3kOhSOvYvpgHxXLwEkyjt6dA91YvDcel8_UhcpVSWV0uhzJZc7HpzUB86spMKRBm9ad4136mQ_geS0t3j06cw1ePBa4FFX6KLmrClZyRQGJxgNEgCsJL_hUcrrebxHpPwjEDH8Va-Kww2IZ9zZD2jgfJhnlDnDJDw6B_7aNl-sycwbN6-yi1ycULn9T6eW1qFIUKNca6qCBdPUTs-c97K9GRCyv1w295z4_iFBrSvANQ2gGg5CRh7YlGVS3jNfU2VQ0CPpuCdwaACpsjA_HaomtypzgxMGQ5OWGoc2hhcmRfaWTOD3Lqbw.RMfSURm-96Pm6FG4brl-zI6hKV391xdoCTIhOKGZxsQ",
  );
  const [captchaError, setCaptchaError] = useState(false);
  const [captchaMountKey, setCaptchaMountKey] = useState(0);

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
          // "h-captcha-response": captchaToken,
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

  return (
    <section
      id="contact"
      className="py-12 md:py-16 bg-bg-primary relative overflow-hidden"
      style={{ background: "var(--bg-secondary)" }}
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 reveal visible">
          {/* Info Side */}
          <div>
            <h2 className="section-label">05. Contact</h2>
            <h3 className="text-3xl md:text-4xl font-black mb-5 text-white leading-tight">
              Get In{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-purple">
                Touch
              </span>
            </h3>
            <p className="text-text-secondary text-base leading-relaxed mb-8">
              I&apos;m currently open to new opportunities and collaborations.
              Whether you have a question or just want to say hi, I&apos;ll try
              my best to get back to you!
            </p>

            <div className="space-y-4">
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
          <div className="glass-card p-5 md:p-6 rounded-2xl">
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">
                  Full Name
                </label>
                <input
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
                  className={`w-full bg-white/[0.03] border text-sm ${errors.name ? "border-red-500/50" : "border-white/10"} focus:border-accent-cyan/50 focus:bg-white/[0.06] outline-none rounded-xl px-4 py-2.5 text-white transition-all placeholder:text-text-muted/30`}
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
                <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">
                  Email Address
                </label>
                <input
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
                  className={`w-full bg-white/[0.03] border text-sm ${errors.email ? "border-red-500/50" : "border-white/10"} focus:border-accent-cyan/50 focus:bg-white/[0.06] outline-none rounded-xl px-4 py-2.5 text-white transition-all placeholder:text-text-muted/30`}
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
                <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">
                  Your Message
                </label>
                <textarea
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
                  className={`w-full bg-white/[0.03] border text-sm min-h-[5.25rem] ${errors.message ? "border-red-500/50" : "border-white/10"} focus:border-accent-cyan/50 focus:bg-white/[0.06] outline-none rounded-xl px-4 py-2.5 text-white transition-all placeholder:text-text-muted/30 resize-none`}
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

              {/* <div className="space-y-1.5 w-full">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">
                  Verification
                </label>
                <div
                  className={`w-full bg-white/[0.03] border text-sm rounded-xl px-4 py-3 transition-all outline-none ${
                    captchaError
                      ? "border-red-500/50"
                      : "border-white/10 focus-within:border-accent-cyan/50 focus-within:bg-white/[0.06]"
                  }`}
                >
                  <div className="contact-form-captcha w-full">
                    <HCaptchaWidget
                      key={captchaMountKey}
                      sitekey={WEB3FORMS_HCAPTCHA_SITEKEY}
                      reCaptchaCompat={false}
                      size="normal"
                      theme={{
                        palette: {
                          mode: "dark",
                          primary: "#00d4ff",
                          canvas: "#0d1526",
                          text: "#e2e8f0",
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
                  <p className="text-red-400 text-xs font-medium ml-1">
                    Please complete the verification.
                  </p>
                )}
              </div> */}

              <button
                type="submit"
                disabled={state.status === "loading"}
                className="btn-primary w-full group overflow-hidden !py-3 !px-5 text-sm rounded-xl"
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
