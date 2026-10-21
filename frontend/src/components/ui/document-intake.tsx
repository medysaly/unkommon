import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, FileCheck2, FileText, Mail, Pause, Play, ReceiptText } from "lucide-react";
import type { Service } from "@/data/services";
import "./document-intake.css";

const icons = [ReceiptText, Mail, FileCheck2, FileText];

/** Intake-tray adaptation of the supplied animated bucket reference. */
export function DocumentIntake({ example }: { example: NonNullable<Service["intakeExample"]> }) {
  const sectionRef = useRef<HTMLElement>(null);
  const visible = useInView(sectionRef, { amount: 0.15 });
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [active, setActive] = useState(0);
  const gradientId = useId().replace(/:/g, "");
  const running = visible && reduced === false && !paused;
  const current = example.inputs[active];
  const Icon = icons[active % icons.length];

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => setActive((index) => (index + 1) % example.inputs.length), 3600);
    return () => window.clearInterval(timer);
  }, [running, example.inputs.length]);

  return (
    <section ref={sectionRef} className="document-intake px-6 lg:px-10 py-20 md:py-28" aria-labelledby="document-intake-heading">
      <div className="document-intake-shell">
        <div className="document-intake-copy">
          <p className="document-intake-eyebrow">From incoming to in progress</p>
          <h2 id="document-intake-heading">{example.headline}</h2>
          <p className="document-intake-description">{example.description}</p>
          <ul className="document-intake-inputs" aria-label="Explore example inputs">
            {example.inputs.map((input, index) => {
              const InputIcon = icons[index % icons.length];
              return <li key={input.title}>
                <button type="button" aria-pressed={active === index} onClick={() => { setActive(index); setPaused(true); }}>
                  <InputIcon size={18} strokeWidth={1.5} aria-hidden="true" />
                  <span><strong>{input.title}</strong><small>{input.action}</small></span>
                  <ArrowRight size={15} aria-hidden="true" />
                </button>
                <p>{input.detail}</p>
              </li>;
            })}
          </ul>
        </div>

        <div className="document-intake-visual">
          <div className="document-intake-toolbar">
            <span>Example / document intake</span>
            {!reduced && <button type="button" aria-pressed={paused} onClick={() => setPaused((value) => !value)}>
              {paused ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}
              {paused ? "Play" : "Pause"}<span className="sr-only"> intake animation</span>
            </button>}
          </div>
          <div className="document-intake-stage" aria-hidden="true" data-running={running}>
            <svg className="document-intake-tray document-intake-tray-back" viewBox="0 0 655 352" fill="none">
              <path d="M110 106 180 55H475L545 106 510 244H145Z" fill="#e7e8ed" stroke="#c5c7d0" />
              <path d="M180 55V168H475V55" fill="#f6f6f8" stroke="#d5d6dd" />
              <path d="M110 106 180 55 128 26 57 73Z" fill="#fafafc" stroke="#d9dae1" />
              <path d="M545 106 475 55 527 26 598 73Z" fill="#fafafc" stroke="#d9dae1" />
              <path d="M110 106H545" stroke="#b9bcc7" />
            </svg>
            <div className="document-intake-arrival">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={current.title} className="document-intake-chip"
                  initial={reduced ? false : { opacity: 0, y: -12, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: reduced ? 1 : 0 }} transition={{ duration: reduced ? 0 : 0.25 }}>
                  <div className="document-intake-drop">
                    <span className="document-intake-chip-icon"><Icon size={24} strokeWidth={1.3} /></span>
                    <span><strong>{current.title}</strong><small>{current.action}</small></span>
                    <ArrowDown size={16} />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            <svg className="document-intake-tray document-intake-tray-front" viewBox="0 0 655 352" fill="none">
              <defs><linearGradient id={gradientId} x1="327" y1="107" x2="327" y2="275" gradientUnits="userSpaceOnUse"><stop stopColor="#fcfcfd" /><stop offset="1" stopColor="#e5e6eb" /></linearGradient></defs>
              <path d="M110 107H545L513 253Q510 270 492 270H163Q145 270 142 253Z" fill={`url(#${gradientId})`} stroke="#c8cad3" />
              <path d="M111 109H544" stroke="white" strokeWidth="3" />
              <rect x="278" y="154" width="99" height="36" rx="8" fill="#292b32" />
              <text x="327.5" y="176" textAnchor="middle" fill="#f6f6f8" fontFamily="monospace" fontSize="11" letterSpacing="1">INTAKE</text>
              <path d="M245 220H410" stroke="#c5c7d0" strokeLinecap="round" />
            </svg>
          </div>
          <ol className="document-intake-process" aria-label="Example processing stages">
            {["Read details", "Review", "Route"].map((label) => <li key={label}>{label}</li>)}
          </ol>
          <p className="document-intake-note">{example.note}</p>
        </div>
      </div>
    </section>
  );
}
