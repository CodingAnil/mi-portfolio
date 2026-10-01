"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Align = "left" | "center";

interface SectionHeaderProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: Align;
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <motion.header
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`mb-12 md:mb-14 ${centered ? "text-center" : "text-left"} ${className}`}
    >
      <p className="section-eyebrow mb-4">{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
      {description ? (
        <p
          className={`mt-4 max-w-2xl text-base md:text-lg text-text-secondary leading-relaxed ${
            centered ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      ) : null}
    </motion.header>
  );
}
