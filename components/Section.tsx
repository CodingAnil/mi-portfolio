import { SectionProps } from "@/types";

export default function Section({
  id,
  className = "",
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`py-20 ${className}`}
      aria-labelledby={id ? `${id}-heading` : undefined}
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-8">{children}</div>
    </section>
  );
}

// ─── Section Heading Sub-component ────────────────────────────────────────────
interface SectionHeadingProps {
  id?: string;
  label: string;
  className?: string;
}

export function SectionHeading({
  id,
  label,
  className = "",
}: SectionHeadingProps) {
  return (
    <h2
      id={id}
      className={`text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-8 ${className}`}
    >
      {label}
    </h2>
  );
}
