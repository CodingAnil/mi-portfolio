"use client";
import { useEffect, useRef, useState } from "react";

class Segment {
  x: number;
  y: number;
  angle: number = 0;
  length: number;

  constructor(x: number, y: number, length: number) {
    this.x = x;
    this.y = y;
    this.length = length;
  }

  follow(tx: number, ty: number) {
    const dx = tx - this.x;
    const dy = ty - this.y;
    this.angle = Math.atan2(dy, dx);
    this.x = tx - Math.cos(this.angle) * this.length;
    this.y = ty - Math.sin(this.angle) * this.length;
  }

  draw(ctx: CanvasRenderingContext2D, width: number = 2) {
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    const ex = this.x + Math.cos(this.angle) * this.length;
    const ey = this.y + Math.sin(this.angle) * this.length;
    ctx.lineTo(ex, ey);
    ctx.stroke();
  }
}

export default function ScorpionCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    const aboutSection = document.getElementById("about");
    if (aboutSection) observer.observe(aboutSection);

    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    let mouse = { x: W / 2, y: H / 2 };
    let animId: number;

    const bodySegments: Segment[] = [];
    const numBody = 20;
    for (let i = 0; i < numBody; i++) {
      bodySegments.push(new Segment(W / 2, H / 2, 8));
    }

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

    const drawLeg = (
      ctx: CanvasRenderingContext2D,
      baseX: number,
      baseY: number,
      angle: number,
      side: number,
      t: number,
      index: number,
    ) => {
      const speed = 0.05;
      const phase = index * 0.5;
      const lift = Math.abs(Math.sin(t * speed + phase)) * 10;
      const reach = Math.cos(t * speed + phase) * 15;

      const jointX = baseX + Math.cos(angle + (side * Math.PI) / 2) * 10;
      const jointY = baseY + Math.sin(angle + (side * Math.PI) / 2) * 10;

      const kneeX =
        jointX + Math.cos(angle + ((side * Math.PI) / 2) * 0.5) * 20;
      const kneeY =
        jointY + Math.sin(angle + ((side * Math.PI) / 2) * 0.5) * 20 - lift;

      const footX = kneeX + Math.cos(angle + (side * Math.PI) / 2) * 20 + reach;
      const footY = kneeY + Math.sin(angle + (side * Math.PI) / 2) * 20;

      ctx.strokeStyle = "rgba(79, 142, 247, 0.4)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(baseX, baseY);
      ctx.lineTo(jointX, jointY);
      ctx.lineTo(kneeX, kneeY);
      ctx.lineTo(footX, footY);
      ctx.stroke();

      ctx.fillStyle = "rgba(167, 139, 250, 0.6)";
      ctx.beginPath();
      ctx.arc(footX, footY, 1.5, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawRibs = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      angle: number,
      width: number,
    ) => {
      const ribLen = width * 1.5;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
      ctx.lineWidth = 1;
      const sideAngle = angle + Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(
        x + Math.cos(sideAngle) * ribLen,
        y + Math.sin(sideAngle) * ribLen,
      );
      ctx.lineTo(
        x - Math.cos(sideAngle) * ribLen,
        y - Math.sin(sideAngle) * ribLen,
      );
      ctx.stroke();
    };

    let t = 0;
    let headX = W / 2;
    let headY = H / 2;

    const loop = () => {
      t++;
      ctx.clearRect(0, 0, W, H);

      headX += (mouse.x - headX) * 0.1;
      headY += (mouse.y - headY) * 0.1;

      let targetX = headX;
      let targetY = headY;

      for (let i = 0; i < bodySegments.length; i++) {
        bodySegments[i].follow(targetX, targetY);
        targetX = bodySegments[i].x;
        targetY = bodySegments[i].y;

        const seg = bodySegments[i];
        ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
        ctx.shadowBlur = i < 5 ? 10 : 0;
        ctx.shadowColor = "rgba(79, 142, 247, 0.5)";
        seg.draw(ctx, Math.max(0.5, 3 - i * 0.1));
        ctx.shadowBlur = 0;

        if (i < 15) {
          drawRibs(ctx, seg.x, seg.y, seg.angle, 15 - i * 0.5);
        }

        if (i >= 4 && i <= 8) {
          drawLeg(ctx, seg.x, seg.y, seg.angle, 1, t, i);
          drawLeg(ctx, seg.x, seg.y, seg.angle, -1, t, i);
        }

        if (i === bodySegments.length - 1) {
          ctx.fillStyle = "rgba(167, 139, 250, 0.9)";
          ctx.shadowBlur = 15;
          ctx.shadowColor = "rgba(167, 139, 250, 0.8)";
          ctx.beginPath();
          const stingerX = seg.x + Math.cos(seg.angle) * 10;
          const stingerY = seg.y + Math.sin(seg.angle) * 10;
          ctx.arc(stingerX, stingerY, 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        if (i === 1) {
          const pincerAngle = 0.8;
          ctx.strokeStyle = "rgba(45, 212, 191, 0.5)";
          drawLeg(ctx, seg.x, seg.y, seg.angle + pincerAngle, 1, t, 0);
          drawLeg(ctx, seg.x, seg.y, seg.angle - pincerAngle, -1, t, 0);
        }
      }

      animId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      if (aboutSection) observer.unobserve(aboutSection);
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
        opacity: active ? 1 : 0,
        transition: "opacity 0.5s ease",
      }}
    />
  );
}
