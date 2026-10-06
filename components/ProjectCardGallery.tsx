"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import ProjectImageLightbox from "./ProjectImageLightbox";

const AUTO_ADVANCE_MS = 4500;

type Props = {
  images: readonly string[];
  title: string;
};

export default function ProjectCardGallery({ images, title }: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const count = images.length;

  const go = useCallback(
    (delta: number) => {
      if (count === 0) return;
      setIndex((i) => (i + delta + count) % count);
    },
    [count],
  );

  useEffect(() => {
    if (count <= 1 || paused || lightboxOpen) return;
    const id = window.setInterval(() => go(1), AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [count, paused, lightboxOpen, go]);

  if (count === 0) return null;

  return (
    <>
      <div
        className="relative mb-5 -mx-6 -mt-6 md:-mx-7 md:-mt-7 rounded-t-2xl overflow-hidden border-b border-white/[0.06] bg-bg-secondary/50 aspect-[16/10] group/gallery"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {images.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={`${title} preview ${i + 1} of ${count}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover object-top transition-opacity duration-500 pointer-events-none ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            priority={i === 0}
          />
        ))}

        <button
          type="button"
          className="absolute inset-0 z-[5] cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/50 focus-visible:ring-inset"
          aria-label={`View ${title} screenshot full size`}
          onClick={() => setLightboxOpen(true)}
        />

        <span className="pointer-events-none absolute top-2 right-2 z-[6] rounded-md bg-black/55 border border-white/10 px-2 py-1 text-[10px] font-medium text-white/90 opacity-0 group-hover/gallery:opacity-100 transition-opacity">
          Click to enlarge
        </span>

        {count > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous screenshot"
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-lg bg-black/50 border border-white/15 text-white opacity-0 group-hover/gallery:opacity-100 focus:opacity-100 hover:bg-black/70 transition-opacity flex items-center justify-center"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next screenshot"
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-lg bg-black/50 border border-white/15 text-white opacity-0 group-hover/gallery:opacity-100 focus:opacity-100 hover:bg-black/70 transition-opacity flex items-center justify-center"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-10 pointer-events-auto">
              {images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  aria-label={`Show screenshot ${i + 1}`}
                  aria-current={i === index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIndex(i);
                  }}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index
                      ? "w-5 bg-accent-cyan"
                      : "w-1.5 bg-white/40 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <ProjectImageLightbox
        open={lightboxOpen}
        images={images}
        title={title}
        index={index}
        onClose={() => setLightboxOpen(false)}
        onIndexChange={setIndex}
      />
    </>
  );
}
