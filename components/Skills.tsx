"use client";
import { motion, Variants } from "framer-motion";
import { SKILLS } from "@/lib/constants";
import AnimatedSection from "./AnimatedSection";

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
};

export default function Skills() {
  return (
    <AnimatedSection id="skills" className="bg-dark-800/30">
      <div className="text-center mb-16">
        <h2 className="section-label mx-auto">02. Tech Stack</h2>
        <h3 className="text-3xl md:text-4xl font-bold">
          Skills & Technologies
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {SKILLS.map((category) => (
          <div key={category.category} className="glass p-6 flex flex-col">
            <h4 className="text-white font-bold mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
              {category.category}
            </h4>
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-wrap gap-2 mt-auto"
            >
              {category.items.map((skill) => (
                <motion.span
                  key={skill}
                  variants={item}
                  className="skill-badge"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
}
