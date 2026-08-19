"use client";

import { useEffect, useRef } from "react";

/**
 * Decorative background clip anchored to the hero's right corner.
 *
 * The source has no alpha channel, so it is composited with `screen`
 * blending and feathered with a radial mask — the near-black background of
 * the clip contributes nothing, leaving only the bright particles visible.
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
        /* autoplay can still be blocked; the poster frame remains */
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
    <video
      ref={videoRef}
      src="/file/ai_gif.webm"
      loop
      muted
      playsInline
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
      className="w-full h-auto select-none pointer-events-none"
      style={{
        mixBlendMode: "screen",
        opacity: 0.8,
        // Weighted to the right so the clip fades out well before it reaches
        // the headline, and softens against every edge of the hero.
        maskImage:
          "radial-gradient(ellipse 62% 66% at 66% 50%, #000 24%, transparent 76%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 62% 66% at 66% 50%, #000 24%, transparent 76%)",
      }}
    />
  );
}
