import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import type { ShaderMount } from "@paper-design/shaders";
import { cn } from "@/lib/utils";
import "./liquid-metal-button.css";

interface LiquidMetalButtonProps {
  href: string;
  children: ReactNode;
  variant?: "dark" | "light" | "outline";
  className?: string;
}

/** Liquid-metal reference adapted for real navigation, responsive labels, and accessible contrast. */
export function LiquidMetalButton({ href, children, variant = "dark", className }: LiquidMetalButtonProps) {
  const shaderRef = useRef<HTMLSpanElement>(null);
  const mountRef = useRef<ShaderMount | null>(null);
  const rippleId = useRef(0);
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    const element = shaderRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const element = shaderRef.current;
    if (!element || !visible || reduced !== false) return;
    let cancelled = false;
    // Load the shader separately from the main application bundle.
    void import("@paper-design/shaders").then(({ ShaderMount, liquidMetalFragmentShader }) => {
      if (cancelled) return;
      try {
        mountRef.current = new ShaderMount(element, liquidMetalFragmentShader, {
          u_colorBack: [0.6, 0.6, 0.63, 1], u_colorTint: [1, 1, 1, 1],
          u_repetition: 4, u_softness: 0.5, u_shiftRed: 0, u_shiftBlue: 0,
          u_distortion: 0.1, u_contour: 0, u_angle: 45, u_shape: 1, u_isImage: false,
          u_fit: 2, u_scale: 8, u_rotation: 0, u_originX: 0.5, u_originY: 0.5,
          u_offsetX: 0.1, u_offsetY: -0.1, u_worldWidth: 0, u_worldHeight: 0,
        }, undefined, 0.35, 0, 1, 120000);
      } catch {
        // The CSS metal rim remains usable without WebGL (or if context creation fails).
        element.replaceChildren();
      }
    }).catch(() => { /* Keep the static fallback if the optional chunk cannot load. */ });
    return () => {
      cancelled = true;
      mountRef.current?.dispose();
      mountRef.current = null;
    };
  }, [visible, reduced]);

  function addRipple(event: MouseEvent<HTMLAnchorElement>) {
    if (reduced) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const keyboard = event.detail === 0;
    const ripple = {
      id: rippleId.current++,
      x: keyboard ? rect.width / 2 : event.clientX - rect.left,
      y: keyboard ? rect.height / 2 : event.clientY - rect.top,
    };
    setRipples((current) => [...current.slice(-3), ripple]);
  }

  return (
    <Link href={href} className={cn("liquid-metal-button", `liquid-metal-${variant}`, className)}
      onPointerEnter={() => mountRef.current?.setSpeed(0.9)}
      onPointerLeave={() => mountRef.current?.setSpeed(0.35)}
      onFocus={() => mountRef.current?.setSpeed(0.9)}
      onBlur={() => mountRef.current?.setSpeed(0.35)}
      onClick={addRipple}>
      <span ref={shaderRef} className="liquid-metal-shader" aria-hidden="true" />
      <span className="liquid-metal-face" aria-hidden="true" />
      <span className="liquid-metal-label">{children}</span>
      <ArrowRight className="liquid-metal-arrow" size={16} aria-hidden="true" />
      <span className="liquid-metal-ripples" aria-hidden="true">
        {ripples.map((ripple) => <span key={ripple.id} className="liquid-metal-ripple"
          style={{ left: ripple.x, top: ripple.y }}
          onAnimationEnd={() => setRipples((current) => current.filter((item) => item.id !== ripple.id))} />)}
      </span>
    </Link>
  );
}
