"use client";
import { useEffect, useRef } from "react";

export default function SnakeCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    let animId: number;

    const mouse = { x: W / 2, y: H / 2 };

    // ── Snake config ────────────────────────────────────────────────────────
    const NUM_SEGMENTS = 30; // body length
    const SEG_LEN = 11; // pixels between each segment
    const GAP = 50; // gap between cursor tip and snake head
    const LERP_SPEED = 0.038; // how slowly head chases cursor (lower = slower)

    // Wave parameters – this is what makes it SLITHER
    const WAVE_AMP = 10; // how wide it sways side-to-side
    const WAVE_FREQ = 0.38; // spatial: radians per segment (controls S-curve width)
    const WAVE_SPEED = 0.09; // temporal: how fast wave travels head→tail

    // Spine nodes (raw IK positions, before wave offset)
    const nodes: { x: number; y: number }[] = [];
    for (let i = 0; i < NUM_SEGMENTS; i++) {
      nodes.push({ x: W / 2, y: H / 2 });
    }

    // Anchor that slowly follows mouse (separate from head so gap works correctly)
    let anchorX = W / 2;
    let anchorY = H / 2;
    let time = 0;

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    // ── Main loop ───────────────────────────────────────────────────────────
    const loop = () => {
      time++;
      ctx.clearRect(0, 0, W, H);

      // 1. Slowly move anchor toward mouse
      anchorX += (mouse.x - anchorX) * LERP_SPEED;
      anchorY += (mouse.y - anchorY) * LERP_SPEED;

      // 2. Place snake head GAP pixels away from mouse (so it never touches cursor)
      const dxG = anchorX - mouse.x;
      const dyG = anchorY - mouse.y;
      const distG = Math.sqrt(dxG * dxG + dyG * dyG) || 1;

      nodes[0].x = anchorX + (dxG / distG) * GAP;
      nodes[0].y = anchorY + (dyG / distG) * GAP;

      // 3. IK chain – pull each segment so it stays SEG_LEN behind the one ahead
      for (let i = 1; i < NUM_SEGMENTS; i++) {
        const prev = nodes[i - 1];
        const curr = nodes[i];
        const dx = curr.x - prev.x;
        const dy = curr.y - prev.y;
        const d = Math.sqrt(dx * dx + dy * dy) || 1;
        nodes[i].x = prev.x + (dx / d) * SEG_LEN;
        nodes[i].y = prev.y + (dy / d) * SEG_LEN;
      }

      // 4. Compute DISPLAY positions by adding a travelling sine wave
      //    perpendicular to the local body tangent at each segment.
      //    sin(i*FREQ - time*SPEED) → wave travels from head toward tail.
      const display: { x: number; y: number }[] = nodes.map((node, i) => {
        // Tangent = direction from neighbour behind to neighbour ahead
        const prev = nodes[Math.max(0, i - 1)];
        const next = nodes[Math.min(NUM_SEGMENTS - 1, i + 1)];
        const dx = next.x - prev.x;
        const dy = next.y - prev.y;
        const len = Math.sqrt(dx * dx + dy * dy) || 1;

        // Perpendicular (left/right of travel direction)
        const perpX = -dy / len;
        const perpY = dx / len;

        // Travelling wave amplitude tapers toward tail for realism
        const taperFactor = 1 - (i / NUM_SEGMENTS) * 0.25;
        const wave =
          Math.sin(i * WAVE_FREQ - time * WAVE_SPEED) * WAVE_AMP * taperFactor;

        return {
          x: node.x + perpX * wave,
          y: node.y + perpY * wave,
        };
      });

      // ── Draw body ─────────────────────────────────────────────────────────
      ctx.save();
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let i = 0; i < display.length - 1; i++) {
        const progress = i / (display.length - 1); // 0 = head, 1 = tail
        const thickness = Math.max(0.8, 6.5 * (1 - progress * 0.85));
        const alpha = 0.72 - progress * 0.45;
        const greenVal = Math.floor(235 - progress * 110);

        ctx.lineWidth = thickness;
        ctx.strokeStyle = `rgba(0, ${greenVal}, ${Math.floor(25 + progress * 20)}, ${alpha})`;
        ctx.shadowBlur = i < 5 ? 14 : 4;
        ctx.shadowColor = "rgba(0, 255, 80, 0.45)";

        const p0 = display[i];
        const p1 = display[i + 1];

        ctx.beginPath();
        // Quadratic bezier through midpoints → smooth S-curves along body
        if (i < display.length - 2) {
          const p2 = display[i + 2];
          const midX = (p1.x + p2.x) / 2;
          const midY = (p1.y + p2.y) / 2;
          ctx.moveTo(p0.x, p0.y);
          ctx.quadraticCurveTo(p1.x, p1.y, midX, midY);
        } else {
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
        }
        ctx.stroke();
      }

      // ── Draw head glow ────────────────────────────────────────────────────
      const head = display[0];
      const headGrad = ctx.createRadialGradient(
        head.x,
        head.y,
        0,
        head.x,
        head.y,
        9,
      );
      headGrad.addColorStop(0, "rgba(0, 255, 80, 0.95)");
      headGrad.addColorStop(0.5, "rgba(0, 210, 55, 0.55)");
      headGrad.addColorStop(1, "rgba(0, 180, 40, 0)");
      ctx.shadowBlur = 22;
      ctx.shadowColor = "rgba(0, 255, 80, 0.9)";
      ctx.fillStyle = headGrad;
      ctx.beginPath();
      ctx.arc(head.x, head.y, 6.5, 0, Math.PI * 2);
      ctx.fill();

      // ── Eyes (two tiny bright dots facing direction of travel) ────────────
      const eyeAngle = Math.atan2(
        display[0].y - display[1].y,
        display[0].x - display[1].x,
      );
      for (const side of [-1, 1]) {
        const ex =
          head.x +
          Math.cos(eyeAngle) * 5 +
          Math.cos(eyeAngle + Math.PI / 2) * side * 2.8;
        const ey =
          head.y +
          Math.sin(eyeAngle) * 5 +
          Math.sin(eyeAngle + Math.PI / 2) * side * 2.8;
        ctx.fillStyle = "rgba(210, 255, 210, 0.98)";
        ctx.shadowBlur = 5;
        ctx.shadowColor = "#00ff50";
        ctx.beginPath();
        ctx.arc(ex, ey, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
      animId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
}
