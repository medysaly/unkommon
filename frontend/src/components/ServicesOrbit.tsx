import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { pillars, services, type PillarId } from "@/data/services";

/**
 * Orbital view of the service catalogue.
 *
 * The point is not the motion, it's the `related` field: it shows that the
 * services compound rather than being ten separate things to buy. Selecting a
 * node dims everything except the services that reinforce it.
 *
 * Adapted heavily from the reference component: no fixed viewport height, no
 * gradient core, no "energy" or status semantics (a service is not 60% done),
 * keyboard operable, and the rotation stops for reduced-motion users, while a
 * node is open, on hover, and whenever the section is off-screen.
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

export function ServicesOrbit() {
  const [angle, setAngle] = useState(0);
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [hovered, setHovered] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const [reduced, setReduced] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const byslug = useMemo(
    () => Object.fromEntries(services.map((s) => [s.slug, s])),
    []
  );
  const pillarName = useMemo(
    () => Object.fromEntries(pillars.map((p) => [p.id, p])),
    []
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Don't burn a timer while the section is nowhere near the viewport.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { rootMargin: "120px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const spinning = onScreen && !reduced && !openSlug && !hovered;

  useEffect(() => {
    if (!spinning) return;
    const timer = setInterval(
      () => setAngle((a) => Number(((a + DEGREES_PER_TICK) % 360).toFixed(3))),
      TICK_MS
    );
    return () => clearInterval(timer);
  }, [spinning]);

  const open = openSlug ? ORBIT.find((n) => n.slug === openSlug) ?? null : null;
  const isRelated = (slug: string) =>
    Boolean(open && open.slug !== slug && open.related.includes(slug));
  const isDimmed = (slug: string) =>
    Boolean(open && open.slug !== slug && !open.related.includes(slug));

  return (
    <div
      ref={containerRef}
      className="relative mx-auto hidden lg:block"
      style={{ width: RADIUS * 2 + 260, height: RADIUS * 2 + 120 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Orbit ring */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15"
        style={{ width: RADIUS * 2, height: RADIUS * 2 }}
        aria-hidden="true"
      />

      {/* Hub */}
      <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-white/25 bg-black">
          <img
            src="/new_logo.png"
            alt="Unkommon"
            className="h-8 w-8 object-contain"
            width={32}
            height={32}
          />
          {spinning && (
            <span
              className="absolute inset-0 animate-ping rounded-full border border-white/20"
              aria-hidden="true"
            />
          )}
        </div>
      </div>

      {ORBIT.map((node, i) => {
        const theta = ((i / ORBIT.length) * 360 + angle) % 360;
        const rad = (theta * Math.PI) / 180;
        const x = RADIUS * Math.cos(rad);
        const y = RADIUS * Math.sin(rad);
        const isOpen = openSlug === node.slug;
        const related = isRelated(node.slug);
        const dimmed = isDimmed(node.slug);
        const service = byslug[node.slug];

        return (
          <div
            key={node.slug}
            className="absolute left-1/2 top-1/2"
            style={{
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              zIndex: isOpen ? 40 : Math.round(20 + 10 * Math.cos(rad)),
            }}
          >
            <button
              type="button"
              onClick={() => setOpenSlug(isOpen ? null : node.slug)}
              aria-expanded={isOpen}
              className={`group flex flex-col items-center transition-opacity duration-500 focus:outline-none ${
                dimmed ? "opacity-25" : "opacity-100"
              }`}
            >
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-full border text-[11px] font-mono tabular-nums transition-colors duration-300 group-focus-visible:ring-2 group-focus-visible:ring-white group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-black ${
                  isOpen
                    ? "border-white bg-white text-black"
                    : related
                    ? "border-white bg-white/20 text-white"
                    : "border-white/35 bg-black text-white/70 group-hover:border-white"
                }`}
              >
                {pillarName[node.pillar]?.number}
              </span>
              <span
                className={`mt-2 whitespace-nowrap text-[12px] transition-colors duration-300 ${
                  isOpen || related ? "text-white" : "text-white/60 group-hover:text-white"
                }`}
              >
                {node.label}
              </span>
            </button>

            {isOpen && service && (
              <div className="absolute left-1/2 top-[76px] w-64 -translate-x-1/2 rounded-xl border border-white/20 bg-black p-4 text-left shadow-xl">
                <p className="mb-1 text-[10px] uppercase tracking-[0.14em] text-white/45">
                  {pillarName[node.pillar]?.number} {pillarName[node.pillar]?.name}
                </p>
                <h3 className="mb-2 text-[15px] font-medium text-white">{service.subtitle}</h3>
                <p className="mb-3 text-[13px] leading-relaxed text-white/60">{service.outcome}</p>

                {node.related.length > 0 && (
                  <div className="mb-3 border-t border-white/10 pt-3">
                    <p className="mb-2 text-[10px] uppercase tracking-[0.14em] text-white/45">
                      Works with
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {node.related.map((slug) => (
                        <button
                          key={slug}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenSlug(slug);
                          }}
                          className="rounded-md border border-white/20 px-2 py-1 text-[11px] text-white/70 transition-colors hover:border-white hover:text-white"
                        >
                          {ORBIT.find((n) => n.slug === slug)?.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <Link
                  href={`/services/${node.slug}`}
                  className="inline-flex items-center gap-1.5 text-[13px] text-white hover:opacity-70"
                >
                  View service
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ServicesOrbit;
