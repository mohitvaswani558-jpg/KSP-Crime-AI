import React, { useEffect, useRef } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = { x: null, y: null, targetX: 0, targetY: 0, active: false };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.targetX = (e.clientX - width / 2) * 0.05;
      mouse.targetY = (e.clientY - height / 2) * 0.05;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.targetX = 0;
      mouse.targetY = 0;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    class Particle {
      constructor() {
        this.reset();
        this.z = Math.random() * 800;
      }

      reset() {
        this.x = (Math.random() - 0.5) * width * 1.5;
        this.y = (Math.random() - 0.5) * height * 1.5;
        this.z = 800;
        this.size = Math.random() * 1.5 + 0.5;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.vz = -Math.random() * 0.8 - 0.2;
        this.color = Math.random() > 0.4 
          ? "rgba(239, 68, 68, " // red-500
          : Math.random() > 0.5 
            ? "rgba(220, 38, 38, " // red-600 (crimson)
            : "rgba(185, 28, 28, "; // red-700 (deep)
      }

      update(tiltX, tiltY) {
        this.x += this.vx;
        this.y += this.vy;
        this.z += this.vz;

        if (mouse.active && mouse.x !== null && mouse.y !== null) {
          const fov = 400;
          const scale = fov / (fov + this.z);
          const projX = this.x * scale + width / 2 + tiltX;
          const projY = this.y * scale + height / 2 + tiltY;

          const dx = mouse.x - projX;
          const dy = mouse.y - projY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 180) {
            const force = (180 - dist) * 0.002;
            this.x -= dx * force * (1 / scale);
            this.y -= dy * force * (1 / scale);
          }
        }

        if (this.z <= 0) {
          this.reset();
        }
      }

      draw(tiltX, tiltY) {
        const fov = 400;
        const scale = fov / (fov + this.z);
        const projX = this.x * scale + width / 2 + tiltX;
        const projY = this.y * scale + height / 2 + tiltY;

        if (projX >= 0 && projX <= width && projY >= 0 && projY <= height) {
          const alpha = (1 - this.z / 800) * 0.6;
          ctx.beginPath();
          ctx.arc(projX, projY, this.size * scale * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = this.color + alpha + ")";
          ctx.fill();

          if (this.z < 250) {
            ctx.shadowBlur = 6;
            ctx.shadowColor = "#ef4444";
          } else {
            ctx.shadowBlur = 0;
          }
        }
      }
    }

    const maxParticles = 90;
    const particles = Array.from({ length: maxParticles }, () => new Particle());

    let currentTiltX = 0;
    let currentTiltY = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      currentTiltX += (mouse.targetX - currentTiltX) * 0.08;
      currentTiltY += (mouse.targetY - currentTiltY) * 0.08;

      // Draw light grid
      ctx.strokeStyle = "rgba(220, 38, 38, 0.012)";
      ctx.lineWidth = 1;
      const gridSpacing = 60;
      const offsetX = currentTiltX * 0.2;
      const offsetY = currentTiltY * 0.2;

      for (let x = offsetX % gridSpacing; x < width; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = offsetY % gridSpacing; y < height; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      particles.forEach((p) => {
        p.update(currentTiltX, currentTiltY);
        p.draw(currentTiltX, currentTiltY);
      });

      ctx.shadowBlur = 0;
      const fov = 400;
      for (let i = 0; i < maxParticles; i++) {
        const p1 = particles[i];
        const scale1 = fov / (fov + p1.z);
        const x1 = p1.x * scale1 + width / 2 + currentTiltX;
        const y1 = p1.y * scale1 + height / 2 + currentTiltY;

        for (let j = i + 1; j < maxParticles; j++) {
          const p2 = particles[j];
          const scale2 = fov / (fov + p2.z);
          const x2 = p2.x * scale2 + width / 2 + currentTiltX;
          const y2 = p2.y * scale2 + height / 2 + currentTiltY;

          const dx = x1 - x2;
          const dy = y1 - y2;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100 && Math.abs(p1.z - p2.z) < 120) {
            const avgZ = (p1.z + p2.z) / 2;
            const alpha = (1 - dist / 100) * (1 - avgZ / 800) * 0.12;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = `rgba(239, 68, 68, ${alpha})`;
            ctx.lineWidth = scale1 * 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}
