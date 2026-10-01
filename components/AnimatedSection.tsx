"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  id?: string;
  className?: string;
  children: ReactNode;
  delay?: number;
}

const variants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
};

export default function AnimatedSection({
  id,
  className = "",
  children,
  delay = 0,
}: Props) {
  return (
    <motion.section
      id={id}
      className={`relative z-10 section-padding ${className}`}
      initial={false}
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
      variants={variants}
    >
      <div className="page-container">{children}</div>
    </motion.section>
  );
}
