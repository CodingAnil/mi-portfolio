"use client";

import { useEffect, useRef } from "react";

type Props = {
  variant?: "desktop" | "mobile-backdrop";
};

/**
 * Ambient background clip for the hero (screen blend — dark source stays invisible).
 */
export default function HeroVideo({ variant = "desktop" }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isDesktop = variant === "desktop";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      video.pause();
      return;
    }

    const play = () => {
      video.play().catch(() => {});
    };

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
      <video
        ref={videoRef}
        src="/file/ai_gif.webm"
        loop
        muted
        playsInline
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
        className={
          isDesktop
            ? "hero-video-el absolute top-[9vh] lg:top-[10vh] right-[-2rem] md:right-[-4rem] xl:right-[-8rem] 2xl:right-[-11rem] h-[min(82vh,680px)] w-auto max-w-none select-none pointer-events-none"
            : "hero-video-el absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[min(55vh,420px)] w-auto max-w-none select-none pointer-events-none opacity-70"
        }
        style={{
          aspectRatio: "898 / 506",
          mixBlendMode: "screen",
          opacity: isDesktop ? 0.9 : 0.65,
          maskImage:
            "linear-gradient(to bottom, transparent 0%, #000 14%, #000 80%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, #000 14%, #000 80%, transparent 100%)",
        }}
      />

      {isDesktop && (
        <>
          <div
            className="hero-video-scrim absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, var(--bg-primary) 0%, var(--bg-primary) 30%, rgba(10,15,30,0.92) 44%, rgba(10,15,30,0.6) 60%, rgba(10,15,30,0.18) 74%, transparent 86%)",
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-28 pointer-events-none"
            style={{
              background: "linear-gradient(to top, var(--bg-primary), transparent)",
            }}
          />
        </>
      )}
    </>
  );
}
