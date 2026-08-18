"use client";

import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import WhyChooseMe from "@/components/WhyChooseMe";
import ContactForm from "@/components/ContactForm";

export default function HomePage() {
  return (
    <div className="flex flex-col bg-bg-primary">
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <WhyChooseMe />
      <ContactForm />
    </div>
  );
}
