"use client";

import { useEffect, useRef } from "react";

/**
 * Ambient background clip for the hero.
 *
 * The source has no alpha channel, so it is composited with `screen` blending:
 * its near-black background contributes nothing over the page background,
 * leaving only the bright hologram visible.
 */
export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Never play for visitors who asked for reduced motion.
    if (reduceMotion) {
      video.pause();
      return;
    }

    const play = () => {
      video.play().catch(() => {
        /* autoplay can still be blocked; the first frame remains */
      });
    };

    // Only download and play while the clip is actually on screen.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !document.hidden) play();
        else video.pause();
      },
      { threshold: 0.15 },
    );
    io.observe(video);

    const onVisibility = () => (document.hidden ? video.pause() : play());
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <>
      {/*
        Height-locked so it always spans the hero, and offset from the left so
        the subject — centred in the source frame — lands on the right-hand
        side, clear of the headline.
      */}
      <video
        ref={videoRef}
        src="/file/ai_gif.webm"
        loop
        muted
        playsInline
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
        className="absolute top-0 right-[-31rem] h-full w-auto max-w-none select-none pointer-events-none"
        style={{
          // Declared up front: with preload="none" the element would otherwise
          // lay out at the default 300x150 and the right-anchored offset would
          // push it off-screen, so it would never come into view to load.
          aspectRatio: "898 / 506",
          mixBlendMode: "screen",
          opacity: 0.9,
          maskImage:
            "linear-gradient(to bottom, transparent 0%, #000 14%, #000 80%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, #000 14%, #000 80%, transparent 100%)",
        }}
      />

      {/* Scrim: keeps the headline and copy fully legible over the clip */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, var(--bg-primary) 0%, var(--bg-primary) 30%, rgba(10,15,30,0.92) 44%, rgba(10,15,30,0.6) 60%, rgba(10,15,30,0.18) 74%, transparent 86%)",
        }}
      />

      {/* Fade into the section below */}
      <div
        className="absolute inset-x-0 bottom-0 h-28 pointer-events-none"
        style={{
          background: "linear-gradient(to top, var(--bg-primary), transparent)",
        }}
      />
    </>
  );
}
