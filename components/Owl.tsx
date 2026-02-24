"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

export default function Owl() {
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // ── Mouse tracking for neck/head rotation ───────────────────────
  const mouseX = useSpring(0, { stiffness: 120, damping: 25 });
  const mouseY = useSpring(0, { stiffness: 120, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const x = (e.clientX - centerX) / (window.innerWidth / 2);
      const y = (e.clientY - centerY) / (window.innerHeight / 2);

      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Neck movements (limited to natural owl angles)
  const headRotateY = useTransform(mouseX, [-1, 1], [-30, 30]);
  const headRotateX = useTransform(mouseY, [-1, 1], [20, -10]);
  const headTranslateX = useTransform(mouseX, [-1, 1], [-2, 2]);

  // ── Audio logic ───────────────────────────────────────────────────
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio("/audio/owl_voice2.mp3");
        audioRef.current.volume = 0.35;
      }
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    } catch {}
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative z-20 cursor-pointer select-none"
      style={{ width: 150, height: 180 }}
    >
      <motion.div
        className="relative w-full h-full flex items-center justify-center"
        animate={{ y: [0, -6, 0] }}
        transition={{ y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
      >
        <svg
          viewBox="0 0 100 120"
          className="w-full h-full pointer-events-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        >
          <defs>
            {/* Realistic feather texture */}
            <filter
              id="featherTexture"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.6"
                numOctaves="3"
                result="noise"
              />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" />
            </filter>

            <radialGradient id="irisGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffee58" />
              <stop offset="60%" stopColor="#fdd835" />
              <stop offset="100%" stopColor="#f57f17" />
            </radialGradient>

            <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fdd835" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#fdd835" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="80%" stopColor="#f5f5f5" />
              <stop offset="100%" stopColor="#e0e0e0" />
            </linearGradient>

            <mask id="bodyMask">
              <path
                d="M30 60 C30 40, 70 40, 70 60 L78 105 Q78 118, 50 118 Q22 118, 22 105 Z"
                fill="white"
              />
            </mask>
          </defs>

          {/* ── Realistic Body ────────────────────────────────────────── */}
          <g mask="url(#bodyMask)">
            {/* Base Body */}
            <path
              d="M20 50 Q50 35 80 50 L85 110 Q85 125 50 125 Q15 125 15 110 Z"
              fill="url(#bodyGrad)"
            />
            {/* Feather details */}
            <g opacity="0.4" filter="url(#featherTexture)">
              {[...Array(6)].map((_, i) => (
                <path
                  key={i}
                  d={`M${25 + i * 5} ${70 + i * 3} Q50 ${65 + i * 3} ${75 - i * 5} ${70 + i * 3}`}
                  stroke="#cfd8dc"
                  strokeWidth="1.5"
                  fill="none"
                />
              ))}
            </g>
            {/* Wing shadows */}
            <path d="M25 65 Q18 90 32 110" fill="rgba(0,0,0,0.05)" />
            <path d="M75 65 Q82 90 68 110" fill="rgba(0,0,0,0.05)" />
          </g>

          {/* ── Realistic Interactive Head/Neck ────────────────────────── */}
          <motion.g
            style={{
              rotateY: headRotateY,
              rotateX: headRotateX,
              x: headTranslateX,
              transformOrigin: "50% 55px",
            }}
          >
            {/* Head Base */}
            <circle cx="50" cy="48" r="23" fill="#ffffff" />
            <ellipse
              cx="50"
              cy="50"
              rx="18"
              ry="16"
              fill="#fcfcfc"
              opacity="0.9"
            />

            {/* Horns/Tufts */}
            <path d="M32 32 L22 18 L38 28 Z" fill="#ffffff" />
            <path d="M68 32 L78 18 L62 28 Z" fill="#ffffff" />
            <path d="M32 32 L26 22 L36 30 Z" fill="#f5f5f5" />
            <path d="M68 32 L74 22 L64 30 Z" fill="#f5f5f5" />

            {/* Face Mask Shadow */}
            <path
              d="M30 48 Q50 38 70 48"
              stroke="#f0f0f0"
              strokeWidth="2"
              fill="none"
            />

            {/* Realistic Eyes */}
            <g filter="url(#softShadow)">
              {/* Left Eye */}
              <circle cx="41" cy="46" r="9" fill="#263238" />
              <circle cx="41" cy="46" r="7.5" fill="url(#irisGrad)" />
              <circle cx="41" cy="46" r="4" fill="#000000" />
              <circle cx="42.5" cy="44.5" r="1.5" fill="white" opacity="0.8" />
              {isHovered && (
                <motion.circle
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  cx="41"
                  cy="46"
                  r="10"
                  fill="url(#eyeGlow)"
                />
              )}

              {/* Right Eye */}
              <circle cx="59" cy="46" r="9" fill="#263238" />
              <circle cx="59" cy="46" r="7.5" fill="url(#irisGrad)" />
              <circle cx="59" cy="46" r="4" fill="#000000" />
              <circle cx="60.5" cy="44.5" r="1.5" fill="white" opacity="0.8" />
              {isHovered && (
                <motion.circle
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  cx="59"
                  cy="46"
                  r="10"
                  fill="url(#eyeGlow)"
                />
              )}
            </g>

            {/* Beak */}
            <path d="M50 50 L46 58 Q50 62 54 58 Z" fill="#37474f" />
            <path
              d="M47 54 L53 54"
              stroke="#263238"
              strokeWidth="0.5"
              opacity="0.5"
            />

            {/* Facial details */}
            <g opacity="0.3" filter="url(#featherTexture)">
              <path
                d="M35 56 Q50 52 65 56"
                stroke="#cfd8dc"
                strokeWidth="1"
                fill="none"
              />
            </g>
          </motion.g>

          {/* Feet */}
          <g fill="#455a64" filter="url(#softShadow)">
            <rect x="42" y="114" width="4" height="6" rx="2" />
            <rect x="54" y="114" width="4" height="6" rx="2" />
          </g>
        </svg>

        {/* Ambient Glow */}
        <motion.div
          animate={{ opacity: isHovered ? 0.2 : 0 }}
          className="absolute inset-0 rounded-full blur-[60px] bg-brand-blue -z-10"
        />
      </motion.div>
    </div>
  );
}
