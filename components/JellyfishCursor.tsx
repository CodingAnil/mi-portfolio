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

  draw(
    ctx: CanvasRenderingContext2D,
    width: number = 2,
    color: string = "rgba(255, 255, 255, 0.5)",
  ) {
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    const ex = this.x + Math.cos(this.angle) * this.length;
    const ey = this.y + Math.sin(this.angle) * this.length;
    ctx.lineTo(ex, ey);
    ctx.stroke();
  }
}

class Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  life: number;

  constructor(x: number, y: number, color: string) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 2;
    this.speedY = (Math.random() - 0.5) * 2;
    this.color = color;
    this.life = 1.0;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life -= 0.02;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.life <= 0) return;
    ctx.fillStyle = this.color.replace("OP", this.life.toString());
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

export default function JellyfishCursor() {
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

    const experienceSection = document.getElementById("experience");
    if (experienceSection) observer.observe(experienceSection);

    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    let mouse = { x: W / 2, y: H / 2 };
    let animId: number;

    const numTentacles = 10;
    const segmentsPerTentacle = 20;
    const tentacles: Segment[][] = [];

    for (let i = 0; i < numTentacles; i++) {
      const tentacle: Segment[] = [];
      for (let j = 0; j < segmentsPerTentacle; j++) {
        tentacle.push(new Segment(W / 2, H / 2, 5));
      }
      tentacles.push(tentacle);
    }

    const numOralArms = 4;
    const oralArms: Segment[][] = [];
    for (let i = 0; i < numOralArms; i++) {
      const arm: Segment[] = [];
      for (let j = 0; j < 15; j++) {
        arm.push(new Segment(W / 2, H / 2, 7));
      }
      oralArms.push(arm);
    }

    const particles: Particle[] = [];

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

    let t = 0;
    let headX = W / 2;
    let headY = H / 2;
    let velocityX = 0;
    let velocityY = 0;

    const loop = () => {
      t += 0.05;
      ctx.clearRect(0, 0, W, H);

      const targetX = mouse.x;
      const targetY = mouse.y;
      const dx = targetX - headX;
      const dy = targetY - headY;

      velocityX = dx * 0.08;
      velocityY = dy * 0.08;

      headX += velocityX;
      headY += velocityY;

      const moveAngle = Math.atan2(velocityY, velocityX);
      const speed = Math.sqrt(velocityX * velocityX + velocityY * velocityY);

      if (Math.random() > 0.7) {
        const pColor =
          Math.random() > 0.5
            ? "rgba(45, 212, 191, OP)"
            : "rgba(167, 139, 250, OP)";
        particles.push(new Particle(headX, headY, pColor));
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        if (particles[i].life <= 0) {
          particles.splice(i, 1);
        } else {
          particles[i].draw(ctx);
        }
      }

      const pulse = Math.sin(t) * 4;
      const bellWidth = 34 + pulse;
      const bellHeight = 26 - pulse / 2;

      ctx.save();
      ctx.translate(headX, headY);
      if (speed > 0.5) {
        ctx.rotate(moveAngle + Math.PI / 2);
      }

      ctx.shadowBlur = 25;
      ctx.shadowColor = "rgba(79, 142, 247, 0.5)";

      const bellGradient = ctx.createRadialGradient(0, -10, 2, 0, 0, bellWidth);
      bellGradient.addColorStop(0, "rgba(167, 139, 250, 0.8)");
      bellGradient.addColorStop(0.5, "rgba(79, 142, 247, 0.4)");
      bellGradient.addColorStop(1, "rgba(45, 212, 191, 0.1)");

      ctx.fillStyle = bellGradient;
      ctx.beginPath();
      ctx.ellipse(0, 0, bellWidth, bellHeight, 0, Math.PI, Math.PI * 2);
      ctx.lineTo(bellWidth, 0);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < 8; i++) {
        const xAngle = Math.PI + (i / 7) * Math.PI;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(
          Math.cos(xAngle) * (bellWidth * 0.9),
          Math.sin(xAngle) * (bellHeight * 0.9),
        );
        ctx.stroke();
      }
      ctx.restore();
      ctx.shadowBlur = 0;

      const updateTentacle = (
        segments: Segment[],
        offsetX: number,
        color: string,
        thickness: number,
        waveFreq: number,
        waveAmp: number,
      ) => {
        const rot = speed > 0.5 ? moveAngle + Math.PI / 2 : 0;
        const startX = headX + Math.cos(rot) * offsetX;
        const startY = headY + Math.sin(rot) * offsetX;

        let prevX = startX;
        let prevY = startY;

        for (let i = 0; i < segments.length; i++) {
          const wave =
            Math.sin(t * waveFreq + i * 0.5 + offsetX) * (waveAmp + i * 0.2);
          segments[i].follow(prevX + wave, prevY + 2);
          prevX = segments[i].x;
          prevY = segments[i].y;

          const opacity = (1 - i / segments.length) * 0.5;
          const currentThickness =
            thickness * (1 - (i / segments.length) * 0.7);
          segments[i].draw(
            ctx,
            currentThickness,
            color.replace("OP", opacity.toString()),
          );
        }
      };

      tentacles.forEach((tentacle, i) => {
        const offset = (i - numTentacles / 2) * 6;
        updateTentacle(
          tentacle,
          offset,
          "rgba(45, 212, 191, OP)",
          1.0,
          2.0,
          1.5,
        );
      });

      oralArms.forEach((arm, i) => {
        const offset = (i - numOralArms / 2) * 12;
        updateTentacle(arm, offset, "rgba(167, 139, 250, OP)", 3.0, 1.5, 3.0);
      });

      animId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      if (experienceSection) observer.unobserve(experienceSection);
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
