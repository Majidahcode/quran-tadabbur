"use client";
import { useEffect, useRef } from "react";

export default function IslamicBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouseMove);

    const STAR_SPACING = 110;
    const buildGrid = () => {
      const stars = [];
      const cols = Math.ceil(canvas.width / STAR_SPACING) + 3;
      const rows = Math.ceil(canvas.height / STAR_SPACING) + 3;
      for (let r = -1; r < rows; r++) {
        for (let c = -1; c < cols; c++) {
          const offset = r % 2 === 0 ? 0 : STAR_SPACING / 2;
          stars.push({
            x: c * STAR_SPACING + offset,
            y: r * STAR_SPACING * 0.866,
            phase: (r * 7 + c * 13) % 360,
          });
        }
      }
      return stars;
    };

    const drawOctagram = (cx, cy, R, opacity, rotation) => {
      if (opacity < 0.003) return;
      ctx.save();
      ctx.globalAlpha = Math.min(opacity, 1);
      ctx.strokeStyle = "#d4af37";
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      for (let i = 0; i < 16; i++) {
        const angle = (i * Math.PI / 8) - Math.PI / 2 + rotation;
        const r = i % 2 === 0 ? R : R * 0.42;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, R * 0.28, 0, Math.PI * 2);
      ctx.stroke();

      ctx.globalAlpha = Math.min(opacity * 0.5, 1);
      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI / 4) - Math.PI / 8 + rotation;
        const x = cx + Math.cos(angle) * (R * 1.15);
        const y = cy + Math.sin(angle) * (R * 1.15);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    };

    let stars = buildGrid();
    window.addEventListener("resize", () => { stars = buildGrid(); });

    const render = () => {
      rafRef.current = requestAnimationFrame(render);
      timeRef.current += 0.004;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      stars.forEach((star) => {
        const dx = star.x - mx;
        const dy = star.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let opacity = 0.04 + Math.sin(timeRef.current * 0.5 + star.phase * 0.017) * 0.01;
        if (dist < 250) {
          const reveal = 1 - dist / 250;
          opacity += reveal * reveal * 0.28;
        }
        const rot = timeRef.current * 0.015 + star.phase * 0.01;
        drawOctagram(star.x, star.y, 30, opacity, rot);
      });

      if (mx > 0) {
        const grd = ctx.createRadialGradient(mx, my, 0, mx, my, 200);
        grd.addColorStop(0, "rgba(212,175,55,0.04)");
        grd.addColorStop(1, "rgba(212,175,55,0)");
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(mx, my, 200, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    render();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
    />
  );
}
