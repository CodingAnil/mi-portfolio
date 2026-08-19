import type { Metadata } from "next";
import Link from "next/link";
import { PERSONAL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-24 bg-bg-primary grid-overlay">
      <div className="max-w-xl w-full text-center">
        <p className="section-label mx-auto">Error 404</p>

        <h1 className="text-6xl md:text-7xl font-black tracking-tight leading-none mt-2">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-purple">
            Page not found
          </span>
        </h1>

        <p className="text-text-secondary text-lg leading-relaxed mt-6">
          That page doesn&apos;t exist — it may have been moved or removed. The
          portfolio lives on a single page, so everything is one scroll away.
        </p>

        <div className="flex flex-wrap gap-3 justify-center mt-10">
          <Link href="/" className="btn-primary">
            <span>← Back to portfolio</span>
          </Link>
          <Link href="/resume" className="btn-ghost">
            View resume
          </Link>
          <a href={`mailto:${PERSONAL.email}`} className="btn-ghost">
            Email me
          </a>
        </div>

        <nav aria-label="Portfolio sections" className="mt-12">
          <ul className="flex flex-wrap gap-x-6 gap-y-3 justify-center">
            {[
              { label: "About", href: "/#about" },
              { label: "Skills", href: "/#skills" },
              { label: "Experience", href: "/#experience" },
              { label: "Projects", href: "/#projects" },
              { label: "Contact", href: "/#contact" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-xs font-bold uppercase tracking-widest text-text-muted hover:text-accent-cyan transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
