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
  hidden: { opacity: 0, y: 32 },
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
      className={`relative z-10 py-24 ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
      variants={variants}
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-10">{children}</div>
    </motion.section>
  );
}
