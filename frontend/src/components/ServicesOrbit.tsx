import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import "./services-orbit.css";
import { pillars, services, type PillarId } from "@/data/services";

/**
 * Orbital view of the service catalogue.
 *
 * The point is the `related` field: it shows the services compound rather than
 * being ten separate things to buy. Selecting a node swings it to the top of
 * the ring and hangs its card below, inside the circle, so the card is always
 * fully on screen no matter where the node was when it was clicked.
 *
 * Adapted from the reference component: no gradient core, no "energy" or
 * status semantics, keyboard operable, and the ring keeps turning except while
 * a card is open, for reduced-motion users, or when the section is off-screen.
 */

interface OrbitNode {
  slug: string;
  label: string;
  pillar: PillarId;
  /** Slugs of services that make this one work harder. */
  related: string[];
}

const ORBIT: OrbitNode[] = [
  { slug: "web-development", label: "Web & App Build", pillar: "built",
    related: ["technical-architecture", "seo", "ai-search-optimization"] },
  { slug: "mobile-app-development", label: "Mobile Apps", pillar: "built",
    related: ["web-development", "ai-infrastructure"] },
  { slug: "technical-architecture", label: "Architecture", pillar: "built",
    related: ["web-development", "seo", "ai-search-optimization"] },
  { slug: "ai-search-optimization", label: "AI Search", pillar: "found",
    related: ["seo", "technical-architecture"] },
  { slug: "seo", label: "SEO", pillar: "found",
    related: ["ai-search-optimization", "local-seo", "web-development"] },
  { slug: "local-seo", label: "Local SEO", pillar: "found",
    related: ["seo", "ai-receptionist"] },
  { slug: "ai-receptionist", label: "AI Receptionist", pillar: "run",
    related: ["speed-to-lead", "local-seo"] },
  { slug: "speed-to-lead", label: "Speed to Lead", pillar: "run",
    related: ["ai-receptionist", "workflow-automation"] },
  { slug: "workflow-automation", label: "Automation", pillar: "run",
    related: ["speed-to-lead", "ai-infrastructure"] },
  { slug: "ai-infrastructure", label: "AI Infrastructure", pillar: "run",
    related: ["workflow-automation", "mobile-app-development"] },
];

const RADIUS = 210;
const DEGREES_PER_TICK = 0.25;
const TICK_MS = 50;
/** Screen angle that puts a node at the top of the ring (y = R*sin). */
const TOP_ANGLE = 270;

export function ServicesOrbit() {
  const [angle, setAngle] = useState(0);
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [onScreen, setOnScreen] = useState(false);
  const [reduced, setReduced] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const bySlug = useMemo(() => Object.fromEntries(services.map((s) => [s.slug, s])), []);
  const pillarOf = useMemo(() => Object.fromEntries(pillars.map((p) => [p.id, p])), []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Don't run a timer while the section is nowhere near the viewport.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), {
      rootMargin: "120px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Escape always closes, so a card can never become unreachable.
  useEffect(() => {
    if (!openSlug) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenSlug(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openSlug]);

  const spinning = onScreen && !reduced && !openSlug;

  useEffect(() => {
    if (!spinning) return;
    const timer = setInterval(
      () => setAngle((a) => Number(((a + DEGREES_PER_TICK) % 360).toFixed(3))),
      TICK_MS
    );
    return () => clearInterval(timer);
  }, [spinning]);

  /** Swing the chosen node to the top; the card then hangs inside the ring. */
  const select = (index: number, slug: string) => {
    if (openSlug === slug) {
      setOpenSlug(null);
      return;
    }
    const own = (index / ORBIT.length) * 360;
    setAngle(((TOP_ANGLE - own) % 360 + 360) % 360);
    setOpenSlug(slug);
  };

  const open = openSlug ? ORBIT.find((n) => n.slug === openSlug) ?? null : null;

  return (
    <div
      ref={containerRef}
      className="minimal-service-orbit relative mx-auto hidden lg:block"
      style={{ width: RADIUS * 2 + 300, height: RADIUS * 2 + 130 }}
    >
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15 minimal-orbit-ring"
        style={{ width: RADIUS * 2, height: RADIUS * 2 }}
        aria-hidden="true"
      />

      {/* Click anywhere off a node to dismiss */}
      {open && (
        <button
          type="button"
          aria-label="Close service details"
          className="absolute inset-0 z-10 cursor-default"
          onClick={() => setOpenSlug(null)}
        />
      )}

      {/* Hub, hidden while a card occupies the middle */}
      <div
        className={`absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 ${
          open ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="minimal-orbit-hub flex h-20 w-20 items-center justify-center rounded-full border border-white/25 bg-black">
          <img src="/new_logo.png" alt="Unkommon" className="h-8 w-8 object-contain" width={32} height={32} />
        </div>
      </div>

      {ORBIT.map((node, i) => {
        const theta = ((i / ORBIT.length) * 360 + angle) % 360;
        const rad = (theta * Math.PI) / 180;
        const x = RADIUS * Math.cos(rad);
        const y = RADIUS * Math.sin(rad);

        const isOpen = openSlug === node.slug;
        const related = Boolean(open && !isOpen && open.related.includes(node.slug));
        const dimmed = Boolean(open && !isOpen && !related);
        const service = bySlug[node.slug];

        return (
          <div
            key={node.slug}
            className="absolute left-1/2 top-1/2 transition-all duration-700"
            style={{
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              zIndex: isOpen ? 40 : Math.round(20 + 10 * Math.cos(rad)),
              opacity: dimmed ? 0.3 : 1,
            }}
          >
            <button
              type="button"
              onClick={() => select(i, node.slug)}
              aria-expanded={isOpen}
              className="group flex flex-col items-center focus:outline-none"
            >
              <span
                className={`minimal-orbit-node ${isOpen ? "is-selected" : ""} flex items-center justify-center rounded-full border font-mono tabular-nums transition-all duration-300 group-focus-visible:ring-2 group-focus-visible:ring-white group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-black ${
                  isOpen
                    ? "h-14 w-14 border-white bg-white text-[13px] text-black shadow-[0_0_28px_rgba(255,255,255,0.35)]"
                    : related
                    ? "h-11 w-11 border-white bg-white/20 text-[11px] text-white"
                    : "h-11 w-11 border-white/35 bg-black text-[11px] text-white/70 group-hover:border-white group-hover:text-white"
                }`}
              >
                {pillarOf[node.pillar]?.number}
              </span>
              <span
                className={`mt-2 whitespace-nowrap transition-all duration-300 ${
                  isOpen
                    ? "text-[13px] font-medium text-white"
                    : "text-[12px] text-white/70 group-hover:text-white"
                }`}
              >
                {node.label}
              </span>
            </button>

            {/* Card hangs below the node. The node is always at the top of the
                ring when open, so this always lands inside the container. */}
            {isOpen && service && (
              <div className="absolute left-1/2 top-[84px] z-40 w-[300px] -translate-x-1/2">
                <span
                  className="absolute -top-3 left-1/2 h-3 w-px -translate-x-1/2 bg-white/40"
                  aria-hidden="true"
                />
                <div className="rounded-xl border border-white/20 bg-black p-5 text-left shadow-2xl">
                  <p className="mb-1 text-[10px] uppercase tracking-[0.14em] text-white/45">
                    {pillarOf[node.pillar]?.number} {pillarOf[node.pillar]?.name}
                  </p>
                  <h3 className="mb-2 text-[16px] font-medium text-white">{service.subtitle}</h3>
                  <p className="mb-4 text-[13px] leading-relaxed text-white/60">{service.outcome}</p>

                  {node.related.length > 0 && (
                    <div className="mb-4 border-t border-white/10 pt-3">
                      <p className="mb-2 text-[10px] uppercase tracking-[0.14em] text-white/45">
                        Works with
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {node.related.map((slug) => {
                          const idx = ORBIT.findIndex((n) => n.slug === slug);
                          return (
                            <button
                              key={slug}
                              type="button"
                              onClick={() => select(idx, slug)}
                              className="rounded-md border border-white/20 px-2 py-1 text-[11px] text-white/70 transition-colors hover:border-white hover:text-white"
                            >
                              {ORBIT[idx]?.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <Link
                      href={`/services/${node.slug}`}
                      className="inline-flex items-center gap-1.5 text-[13px] text-white hover:opacity-70"
                    >
                      View service
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => setOpenSlug(null)}
                      className="text-[12px] text-white/45 transition-colors hover:text-white"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ServicesOrbit;
