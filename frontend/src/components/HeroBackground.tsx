import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  speed: number;
  opacity: number;
  fadeDelay: number;
  fadeStart: number;
  fadingOut: boolean;
};

export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let particles: Particle[] = [];

    const setSize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };

    const count = () => Math.floor((canvas.width * canvas.height) / 7000);

    const make = (): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: Math.random() / 5 + 0.1,
      opacity: 0.7,
      fadeDelay: Math.random() * 600 + 100,
      fadeStart: Date.now() + Math.random() * 600 + 100,
      fadingOut: false,
    });

    const reset = (p: Particle) => {
      p.x = Math.random() * canvas.width;
      p.y = Math.random() * canvas.height;
      p.speed = Math.random() / 5 + 0.1;
      p.opacity = 0.7;
      p.fadeDelay = Math.random() * 600 + 100;
      p.fadeStart = Date.now() + p.fadeDelay;
      p.fadingOut = false;
    };

    const init = () => {
      particles = [];
      const n = count();
      for (let i = 0; i < n; i++) particles.push(make());
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.y -= p.speed;
        if (p.y < 0) reset(p);
        if (!p.fadingOut && Date.now() > p.fadeStart) p.fadingOut = true;
        if (p.fadingOut) {
          p.opacity -= 0.008;
          if (p.opacity <= 0) reset(p);
        }
        ctx.fillStyle = `rgba(0, 0, 0, ${p.opacity * 0.2})`;
        ctx.fillRect(p.x, p.y, 0.6, Math.random() * 2 + 1);
      }
      raf = requestAnimationFrame(draw);
    };

    const onResize = () => {
      setSize();
      init();
    };

    setSize();
    init();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-80"
      />

      {/* Accent grid lines */}
      <div className="absolute inset-0">
        {/* Horizontal */}
        <div className="hero-line-h" style={{ top: "20%", animationDelay: "150ms" }} />
        <div className="hero-line-h" style={{ top: "50%", animationDelay: "280ms" }} />
        <div className="hero-line-h" style={{ top: "80%", animationDelay: "410ms" }} />
        {/* Vertical */}
        <div className="hero-line-v" style={{ left: "20%", animationDelay: "520ms" }} />
        <div className="hero-line-v" style={{ left: "50%", animationDelay: "640ms" }} />
        <div className="hero-line-v" style={{ left: "80%", animationDelay: "760ms" }} />
      </div>
    </div>
  );
}
