"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export default function OpenToWorkBadge() {
  const [touchOpen, setTouchOpen] = useState(false);
  const [finePointer, setFinePointer] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setFinePointer(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!touchOpen || finePointer) return;
    const close = (ev: MouseEvent) => {
      if (!(ev.target as HTMLElement).closest("[data-open-to-work]")) {
        setTouchOpen(false);
      }
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [touchOpen, finePointer]);

  const onTouchTap = useCallback(
    (e: React.MouseEvent) => {
      if (finePointer) return;
      if (!touchOpen) {
        e.preventDefault();
        setTouchOpen(true);
      }
    },
    [finePointer, touchOpen],
  );

  return (
    <div className="fixed z-40 bottom-5 sm:bottom-7 md:bottom-8 right-0 pointer-events-none max-w-[calc(100vw-0.5rem)]">
      <Link
        href="/#contact"
        data-open-to-work
        onClick={onTouchTap}
        className={[
          "open-to-work-badge open-to-work-glass pointer-events-auto inline-flex items-center gap-2.5",
          "rounded-l-2xl rounded-r-md",
          "py-2.5 pl-4 pr-5 sm:py-3 sm:pl-5 sm:pr-6",
          "text-emerald-50 text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap",
          "drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]",
          "transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "motion-reduce:transition-none motion-reduce:translate-x-0",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/80 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary",
          finePointer
            ? "translate-x-1/2 hover:translate-x-0 focus-visible:translate-x-0"
            : touchOpen
              ? "translate-x-0"
              : "translate-x-1/2",
        ].join(" ")}
        aria-label="Open to work — go to contact section"
      >
        <span className="relative flex h-2 w-2 shrink-0" aria-hidden>
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300/80 opacity-60 motion-reduce:animate-none" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_8px_rgba(110,231,183,0.9)]" />
        </span>
        Open to Work
      </Link>
    </div>
  );
}
