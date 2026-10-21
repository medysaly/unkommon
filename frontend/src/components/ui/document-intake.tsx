import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, Check, FileCheck2, FileText, Mail, Pause, Play, ReceiptText, ShieldCheck } from "lucide-react";
import type { Service } from "@/data/services";
import "./document-intake.css";

const icons = [ReceiptText, Mail, FileCheck2, FileText];
const previews = [
  { file: "supplier-invoice.pdf", type: "Invoice details", fields: ["Supplier", "Line items", "Total amount"], destination: "Accounts review" },
  { file: "customer-enquiry.eml", type: "Request summary", fields: ["Customer", "Request type", "Relevant details"], destination: "Customer support" },
  { file: "service-agreement.pdf", type: "Review handoff", fields: ["Document type", "Relevant details", "Assigned reviewer"], destination: "Document review" },
  { file: "project-request.json", type: "Structured request", fields: ["Contact details", "Project scope", "Validation checks"], destination: "Connected business tool" },
];

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
  const preview = previews[active % previews.length];

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => setActive((index) => (index + 1) % example.inputs.length), 5000);
    return () => window.clearInterval(timer);
  }, [running, example.inputs.length]);

  return (
    <section ref={sectionRef} className="document-intake px-6 lg:px-10 py-20 md:py-28" aria-labelledby="document-intake-heading" data-running={running}>
      <div className="document-intake-shell">
        <div className="document-intake-copy">
          <p className="document-intake-eyebrow">From incoming to in progress</p>
          <h2 id="document-intake-heading">{example.headline}</h2>
          <p className="document-intake-description">{example.description}</p>
          <ul className="document-intake-inputs" aria-label="Explore example inputs">
            {example.inputs.map((input, index) => {
              const InputIcon = icons[index % icons.length];
              return <li key={input.title} data-active={active === index}>
                <button type="button" aria-pressed={active === index} onClick={() => { setActive(index); setPaused(true); }}>
                  <span className="document-intake-number" aria-hidden="true">0{index + 1}</span>
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
            <span><i aria-hidden="true" />Illustrative system / 0{active + 1}</span>
            {!reduced && <button type="button" aria-pressed={paused} onClick={() => setPaused((value) => !value)}>
              {paused ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}
              {paused ? "Play" : "Pause"}<span className="sr-only"> intake animation</span>
            </button>}
          </div>
          <div className="document-intake-stage" aria-hidden="true" data-running={running}>
            <div className="document-intake-orbit document-intake-orbit-one" />
            <div className="document-intake-orbit document-intake-orbit-two" />
            <span className="document-intake-source document-intake-source-email"><Mail size={12} />Shared inbox</span>
            <span className="document-intake-source document-intake-source-files"><FileText size={12} />Documents</span>
            <svg className="document-intake-tray document-intake-tray-back" viewBox="0 0 655 352" fill="none">
              <path d="M110 106 180 55H475L545 106 510 244H145Z" fill="#15171c" stroke="#565b67" />
              <path d="M180 55V168H475V55" fill="#272b33" stroke="#676d7a" />
              <path d="M110 106 180 55 140 34 65 78Z" fill="#404550" stroke="#858b98" />
              <path d="M545 106 475 55 515 34 590 78Z" fill="#30353f" stroke="#747c8b" />
              <path d="M110 106H545" stroke="#d9dce5" />
            </svg>
            <div className="document-intake-ghost document-intake-ghost-one" />
            <div className="document-intake-ghost document-intake-ghost-two" />
            <div className="document-intake-arrival">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={current.title} className="document-intake-chip"
                  initial={reduced ? false : { opacity: 0, y: -12, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: reduced ? 1 : 0 }} transition={{ duration: reduced ? 0 : 0.25 }}>
                  <div className="document-intake-drop">
                    <div className="document-intake-document-header"><span className="document-intake-chip-icon"><Icon size={18} strokeWidth={1.3} /></span><span><strong>{current.title}</strong><small>{preview.file}</small></span><ArrowDown size={14} /></div>
                    <div className="document-intake-document-lines"><i /><i /><i /></div>
                    <div className="document-intake-document-footer"><span>INCOMING DOCUMENT</span><span>0{active + 1}</span></div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            <svg className="document-intake-tray document-intake-tray-front" viewBox="0 0 655 352" fill="none">
              <defs><linearGradient id={gradientId} x1="150" y1="107" x2="470" y2="275" gradientUnits="userSpaceOnUse"><stop stopColor="#555c6b" /><stop offset=".45" stopColor="#2b303a" /><stop offset="1" stopColor="#15181f" /></linearGradient></defs>
              <path d="M110 115H545L513 261Q510 278 492 278H163Q145 278 142 261Z" fill="#0d1015" stroke="#080b10" />
              <path d="M110 107H545L513 253Q510 270 492 270H163Q145 270 142 253Z" fill={`url(#${gradientId})`} stroke="#737b8d" />
              <path d="M114 111H541" stroke="#dbe0eb" strokeOpacity=".7" strokeWidth="2" />
              <path d="M130 124H525L500 241Q498 253 484 253H171Q158 253 156 241Z" stroke="#c5ccdc" strokeOpacity=".13" />
              <rect x="258" y="151" width="139" height="52" rx="9" fill="#11141a" stroke="#767f92" strokeOpacity=".7" />
              <circle cx="279" cy="177" r="3" fill="#e5eaf4" />
              <text x="339" y="174" textAnchor="middle" fill="#f6f6f8" fontFamily="monospace" fontSize="10" letterSpacing="2">UNKOMMON</text>
              <text x="339" y="189" textAnchor="middle" fill="#929cad" fontFamily="monospace" fontSize="7" letterSpacing="1.2">INTAKE ENGINE</text>
              {[182, 194, 206, 218, 437, 449, 461, 473].map((x) => <path key={x} d={`M${x} 222v9`} stroke="#0e1117" strokeWidth="3" strokeLinecap="round" />)}
            </svg>
            <div className="document-intake-scan" />
          </div>
          <div className="document-intake-output">
            <div className="document-intake-output-heading"><span>Example output</span><span><ShieldCheck size={12} aria-hidden="true" />Review checkpoint</span></div>
            <div className="document-intake-output-title"><FileCheck2 size={19} aria-hidden="true" /><strong>{preview.type}</strong></div>
            <div className="document-intake-output-fields">{preview.fields.map((field) => <span key={field}><Check size={11} aria-hidden="true" />{field}</span>)}</div>
            <div className="document-intake-destination"><span>Next destination</span><strong>{preview.destination}</strong><ArrowRight size={14} aria-hidden="true" /></div>
          </div>
          <p className="document-intake-note">{example.note}</p>
        </div>
      </div>
    </section>
  );
}
