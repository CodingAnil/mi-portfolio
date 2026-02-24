import { PERSONAL } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="relative z-10 py-12 bg-dark-900 border-t border-white/5">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start">
            <p className="text-white font-bold tracking-tight mb-1">
              Anil Kumar
            </p>
            <p className="text-slate-500 text-xs tracking-widest uppercase">
              Premium Developer Experience
            </p>
          </div>

          <div className="flex gap-6">
            <a
              href={PERSONAL.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href={PERSONAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${PERSONAL.email}`}
              className="text-slate-500 hover:text-white transition-colors"
            >
              Email
            </a>
          </div>

          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} — Built with Next.js & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
