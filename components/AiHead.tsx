"use client";

import { useEffect, useRef } from "react";

type Point3 = { x: number; y: number; z: number };

const LAT = 46; // horizontal slices, crown → neck
const LON = 40; // segments around each slice

/**
 * Anatomical profile of a head, sampled top-down.
 * y: height (1 = crown, negative = below the chin)
 * w: half-width, dF: half-depth of the face, dB: half-depth of the skull
 */
const PROFILE: { y: number; w: number; dF: number; dB: number }[] = [
  { y: 1.0, w: 0.3, dF: 0.3, dB: 0.34 }, // crown
  { y: 0.86, w: 0.58, dF: 0.55, dB: 0.64 },
  { y: 0.7, w: 0.74, dF: 0.66, dB: 0.8 }, // upper skull
  { y: 0.52, w: 0.8, dF: 0.7, dB: 0.86 }, // forehead
  { y: 0.34, w: 0.82, dF: 0.71, dB: 0.88 }, // brow
  { y: 0.18, w: 0.82, dF: 0.69, dB: 0.87 }, // eyes / ears
  { y: 0.02, w: 0.79, dF: 0.66, dB: 0.83 }, // cheekbones
  { y: -0.14, w: 0.73, dF: 0.63, dB: 0.77 }, // nose base
  { y: -0.32, w: 0.64, dF: 0.58, dB: 0.69 }, // mouth
  { y: -0.5, w: 0.54, dF: 0.52, dB: 0.59 }, // jaw
  { y: -0.66, w: 0.42, dF: 0.45, dB: 0.47 }, // chin
  { y: -0.8, w: 0.28, dF: 0.34, dB: 0.34 }, // chin tip
  { y: -0.9, w: 0.23, dF: 0.24, dB: 0.26 }, // under the jaw
  { y: -1.02, w: 0.24, dF: 0.22, dB: 0.26 }, // neck
  { y: -1.12, w: 0.25, dF: 0.22, dB: 0.27 }, // neck base
];

/** Smooth 0→1 ramp. */
const smooth = (edge0: number, edge1: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
};

const bump = (value: number, center: number, spread: number) =>
  Math.exp(-((value - center) ** 2) / spread);

/** Linear interpolation through the profile table at an arbitrary height. */
function sampleProfile(y: number) {
  if (y >= PROFILE[0].y) return PROFILE[0];
  const last = PROFILE[PROFILE.length - 1];
  if (y <= last.y) return last;
  for (let i = 0; i < PROFILE.length - 1; i++) {
    const a = PROFILE[i];
    const b = PROFILE[i + 1];
    if (y <= a.y && y >= b.y) {
      const t = (a.y - y) / (a.y - b.y);
      return {
        y,
        w: a.w + (b.w - a.w) * t,
        dF: a.dF + (b.dF - a.dF) * t,
        dB: a.dB + (b.dB - a.dB) * t,
      };
    }
  }
  return last;
}

/** Sculpted surface position for a given height and angle around the head. */
function surfacePoint(y: number, theta: number): Point3 {
  const p = sampleProfile(y);
  const cx = Math.cos(theta); // -1 … 1 across the face
  const cz = Math.sin(theta); // 1 = facing forward, -1 = back of skull
  const faceMask = Math.max(0, cz);

  const depth = cz >= 0 ? p.dF : p.dB;
  let x = p.w * cx;
  let z = depth * cz;

  // Brow ridge
  z += faceMask * bump(y, 0.32, 0.006) * bump(cx, 0, 0.18) * 0.06;
  // Eye sockets, set back either side of the bridge
  z -=
    faceMask *
    bump(y, 0.19, 0.005) *
    (bump(cx, 0.36, 0.014) + bump(cx, -0.36, 0.014)) *
    0.075;
  // Nose: a ridge from the brow down to a rounded tip
  const midline = bump(cx, 0, 0.03);
  z +=
    midline *
    faceMask *
    (smooth(0.3, -0.02, y) * 0.07 + bump(y, -0.08, 0.01) * 0.075);
  // Lips
  z += faceMask * bump(cx, 0, 0.05) * bump(y, -0.33, 0.0022) * 0.045;
  // Cheekbones
  z +=
    faceMask *
    (bump(cx, 0.5, 0.02) + bump(cx, -0.5, 0.02)) *
    bump(y, 0.0, 0.02) *
    0.035;
  // Chin
  z += faceMask * bump(cx, 0, 0.06) * bump(y, -0.7, 0.008) * 0.06;
  // Ears sit at the widest point of the skull, slightly behind centre
  const ear = bump(Math.abs(cx), 1, 0.02) * bump(y, 0.1, 0.014);
  x += Math.sign(cx) * ear * 0.1;
  z -= ear * 0.06;

  return { x, y, z };
}

/** Mesh vertices: a stack of slices from crown to neck. */
function buildHead() {
  const points: Point3[] = [];
  const TOP = 1.0;
  const BOTTOM = -1.12;
  for (let i = 0; i < LAT; i++) {
    const y = TOP - (i / (LAT - 1)) * (TOP - BOTTOM);
    for (let j = 0; j < LON; j++) {
      points.push(surfacePoint(y, (j / LON) * Math.PI * 2));
    }
  }
  return points;
}

/**
 * Facial landmarks — the points a face-tracking overlay would mark. They sit
 * fractionally proud of the mesh so they read as a highlighted feature set.
 */
function buildLandmarks() {
  const marks: Point3[] = [];
  const push = (y: number, theta: number) => {
    const p = surfacePoint(y, theta);
    marks.push({ x: p.x, y: p.y, z: p.z * 1.03 + 0.012 });
  };
  const FRONT = Math.PI / 2;
  // theta offset that lands near a given horizontal position on the face
  const at = (cxTarget: number) => FRONT - Math.asin(cxTarget);

  for (const side of [1, -1]) {
    // Eye ring
    for (let k = 0; k < 9; k++) {
      const a = (k / 9) * Math.PI * 2;
      push(0.19 + Math.sin(a) * 0.045, at(side * (0.36 + Math.cos(a) * 0.1)));
    }
    // Eyebrow
    for (let k = 0; k < 5; k++) {
      const t = k / 4;
      push(0.3 + Math.sin(t * Math.PI) * 0.025, at(side * (0.2 + t * 0.33)));
    }
  }
  // Nose bridge and tip
  for (let k = 0; k < 6; k++) push(0.22 - k * 0.06, at(0));
  push(-0.1, at(0.09));
  push(-0.1, at(-0.09));
  // Mouth
  for (let k = 0; k < 7; k++) {
    const t = k / 6;
    push(-0.33 + Math.sin(t * Math.PI) * 0.03, at(-0.22 + t * 0.44));
  }
  return marks;
}

const idx = (i: number, j: number) => i * LON + (j % LON);

export default function AiHead() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const CSS_W = 220;
    const CSS_H = 264;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = CSS_W * dpr;
    canvas.height = CSS_H * dpr;
    ctx.scale(dpr, dpr);

    const points = buildHead();
    const projected = points.map(() => ({ x: 0, y: 0, z: 0, s: 0 }));
    const landmarks = buildLandmarks();
    const projectedMarks = landmarks.map(() => ({ x: 0, y: 0, z: 0, s: 0 }));

    const CX = CSS_W / 2;
    const CY = CSS_H * 0.35;
    const SCALE = CSS_H * 0.3;
    const NECK_Y = CY + 1.3 * SCALE;
    const FOCAL = 3.2;

    let raf = 0;
    let phase = 0;
    let angle = 0;
    let frame = 0;
    let running = false;

    const mix = (t: number) => {
      // cyan → violet, matching the site accents
      const r = Math.round(0 + (124 - 0) * t);
      const g = Math.round(212 + (58 - 212) * t);
      const b = Math.round(255 + (237 - 255) * t);
      return `${r},${g},${b}`;
    };

    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, CSS_W, CSS_H);

      const cos = Math.cos(angle);
      const sin = Math.sin(angle);

      for (let n = 0; n < points.length; n++) {
        const p = points[n];
        const rx = p.x * cos - p.z * sin;
        const rz = p.x * sin + p.z * cos;
        const persp = FOCAL / (FOCAL - rz);
        projected[n].x = CX + rx * SCALE * persp;
        projected[n].y = CY - p.y * SCALE * persp;
        projected[n].z = rz;
        projected[n].s = persp;
      }

      for (let n = 0; n < landmarks.length; n++) {
        const p = landmarks[n];
        const rx = p.x * cos - p.z * sin;
        const rz = p.x * sin + p.z * cos;
        const persp = FOCAL / (FOCAL - rz);
        projectedMarks[n].x = CX + rx * SCALE * persp;
        projectedMarks[n].y = CY - p.y * SCALE * persp;
        projectedMarks[n].z = rz;
        projectedMarks[n].s = persp;
      }

      // Vertical scan sweep
      const scanY = reduceMotion
        ? CY
        : CY - SCALE + (((frame * 1.6) % (SCALE * 2.6)) as number);

      // ── Wireframe ──────────────────────────────────────────────
      ctx.lineWidth = 0.6;
      for (let i = 0; i < LAT; i++) {
        for (let j = 0; j < LON; j++) {
          const a = projected[idx(i, j)];
          const b = projected[idx(i, j + 1)];
          const depth = (a.z + b.z) / 2;
          // Nearer geometry is brighter, so depth reads without shading
          const facing = Math.min(1, Math.max(0, (depth + 1) / 2));
          const alpha = 0.04 + facing ** 3 * 0.55;
          const scanBoost = Math.abs((a.y + b.y) / 2 - scanY) < 6 ? 0.28 : 0;
          const tone = mix(Math.min(1, Math.max(0, (1 - a.y / CSS_H) * 0.9)));
          ctx.strokeStyle = `rgba(${tone},${alpha + scanBoost})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();

          if (i < LAT - 1 && j % 2 === 0) {
            const c = projected[idx(i + 1, j)];
            ctx.strokeStyle = `rgba(${tone},${(alpha + scanBoost) * 0.7})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(c.x, c.y);
            ctx.stroke();
          }
        }
      }

      // ── Vertices ───────────────────────────────────────────────
      for (let n = 0; n < projected.length; n += 2) {
        const p = projected[n];
        const facing = Math.min(1, Math.max(0, (p.z + 1) / 2));
        if (facing < 0.42) continue;
        const near = Math.abs(p.y - scanY) < 6;
        const glow = facing ** 3;
        ctx.fillStyle = near
          ? `rgba(150,242,255,${0.45 + glow * 0.5})`
          : `rgba(${mix(1 - glow)},${0.1 + glow * 0.85})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, (0.5 + glow * 0.9) * p.s, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Facial landmarks ──────────────────────────────────────
      for (const m of projectedMarks) {
        const facing = Math.min(1, Math.max(0, (m.z + 1) / 2));
        if (facing < 0.55) continue;
        const strength = (facing - 0.55) / 0.45;
        ctx.fillStyle = `rgba(190,248,255,${0.25 + strength * 0.7})`;
        ctx.beginPath();
        ctx.arc(m.x, m.y, (0.9 + strength * 0.8) * m.s, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Holographic base rings ────────────────────────────────
      const baseY = CSS_H * 0.87;
      ctx.save();
      ctx.shadowBlur = 12;
      ctx.shadowColor = "rgba(0,212,255,0.5)";
      for (let r = 0; r < 3; r++) {
        const spin = reduceMotion ? 0 : frame * (0.004 + r * 0.002);
        const rw = 46 + r * 22;
        const rh = 11 + r * 5;
        ctx.strokeStyle = `rgba(${mix(r / 3)},${0.5 - r * 0.13})`;
        ctx.lineWidth = r === 0 ? 1.4 : 0.8;
        ctx.beginPath();
        ctx.ellipse(CX, baseY, rw, rh, 0, spin, spin + Math.PI * 1.55);
        ctx.stroke();
      }
      ctx.restore();

      // Beam from the base up to the head
      const beam = ctx.createLinearGradient(0, baseY, 0, NECK_Y - 20);
      beam.addColorStop(0, "rgba(0,212,255,0.16)");
      beam.addColorStop(1, "rgba(124,58,237,0)");
      ctx.fillStyle = beam;
      ctx.beginPath();
      ctx.moveTo(CX - 42, baseY);
      ctx.lineTo(CX + 42, baseY);
      ctx.lineTo(CX + 14, NECK_Y - 18);
      ctx.lineTo(CX - 14, NECK_Y - 18);
      ctx.closePath();
      ctx.fill();

      if (!reduceMotion) {
        phase += 0.0045;
        // Sweep between roughly -50° and +50° so the face stays in view
        angle = Math.sin(phase) * 0.88;
      }
      if (running) raf = requestAnimationFrame(draw);
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(draw);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    if (reduceMotion) {
      draw(); // one static frame, no loop
      return;
    }

    // Only animate while visible on screen and while the tab is focused.
    const io = new IntersectionObserver(
      ([entry]) =>
        entry.isIntersecting && !document.hidden ? start() : stop(),
      { threshold: 0.05 },
    );
    io.observe(canvas);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ width: 220, height: 264 }}
    />
  );
}
