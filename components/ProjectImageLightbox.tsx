"use client";

import Image from "next/image";
import { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";

type Props = {
  open: boolean;
  images: readonly string[];
  title: string;
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

export default function ProjectImageLightbox({
  open,
  images,
  title,
  index,
  onClose,
  onIndexChange,
}: Props) {
  const count = images.length;

  const go = useCallback(
    (delta: number) => {
      if (count === 0) return;
      onIndexChange((index + delta + count) % count);
    },
    [count, index, onIndexChange],
  );

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, go]);

  if (!open || typeof document === "undefined") return null;

  const src = images[index];
  if (!src) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`${title} screenshot viewer`}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/85 backdrop-blur-sm"
        aria-label="Close preview"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-6xl flex flex-col gap-4 pointer-events-none">
        <div className="flex items-center justify-between gap-4 pointer-events-auto">
          <p className="text-sm font-medium text-white/90 truncate">
            {title}{" "}
            <span className="text-text-muted font-normal">
              ({index + 1} / {count})
            </span>
          </p>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 w-10 h-10 rounded-xl border border-white/15 bg-white/10 text-white hover:bg-white/15 transition-colors flex items-center justify-center"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="relative w-full aspect-[16/10] max-h-[min(78vh,820px)] rounded-2xl overflow-hidden border border-white/10 bg-bg-primary shadow-2xl pointer-events-auto">
          <Image
            key={src}
            src={src}
            alt={`${title} screenshot ${index + 1}`}
            fill
            sizes="(max-width: 1280px) 100vw, 1152px"
            className="object-contain object-center bg-black/40"
            priority
          />

          {count > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous screenshot"
                onClick={() => go(-1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-black/60 border border-white/15 text-white hover:bg-black/80 transition-colors flex items-center justify-center"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Next screenshot"
                onClick={() => go(1)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-black/60 border border-white/15 text-white hover:bg-black/80 transition-colors flex items-center justify-center"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>

        <p className="text-center text-xs text-text-muted pointer-events-none">
          Esc to close · Arrow keys to browse
        </p>
      </div>
    </div>,
    document.body,
  );
}
