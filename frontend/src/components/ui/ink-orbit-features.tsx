import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowRight, CalendarDays, Check, Code2, CreditCard, FileText,
  LayoutDashboard, Mail, Pause, Play, Search, Server, ShieldCheck, Sparkles, Users,
} from "lucide-react";
import "./ink-orbit-features.css";

const products = [
  { name: "Modern website", icon: Code2, heading: "Your modern website, doing more.", description: "Answer questions, take bookings, accept payments, and connect the next step to your business tools.", href: "/services/web-development" },
  { name: "Application", icon: Sparkles, heading: "The next step, in their hands.", description: "Give customers booking, account access, and updates in an application built around the task.", href: "/services/ai-powered-applications" },
  { name: "Customer portal", icon: LayoutDashboard, heading: "One place for the next step.", description: "Give customers a secure place for documents, requests, and updates.", href: "/services/internal-tools-customer-portals" },
];

const steps = [
  { name: "Find", icon: Search, title: "Find information you can check", detail: "Retrieve relevant business knowledge, with links to approved sources.", label: "SOURCE FOUND", status: "Check the source", visual: "Source document", iconVisual: FileText },
  { name: "Prepare", icon: Sparkles, title: "Prepare the next action", detail: "Use the request and relevant information to propose an allowed action.", label: "PROPOSED ACTION", status: "Not submitted", visual: "Change appointment", iconVisual: CalendarDays },
  { name: "Review", icon: Users, title: "Keep the right checks in place", detail: "Check permissions and request customer confirmation or staff approval where needed.", label: "REVIEW CHECKPOINT", status: "Approval required", visual: "Review proposed change", iconVisual: ShieldCheck },
  { name: "Complete", icon: Check, title: "Confirm what actually happened", detail: "Report completion only after the connected system confirms it. Otherwise, flag it for help.", label: "SYSTEM CONFIRMED", status: "Action recorded", visual: "Appointment updated", iconVisual: Check },
];

const tools = [
  { name: "CRM", icon: Users, x: 18, y: 25, path: "M 250 146 H 160 V 70 H 90", detail: "Keep customer details and the work around them connected." },
  { name: "Calendar", icon: CalendarDays, x: 82, y: 25, path: "M 250 146 H 340 V 70 H 410", detail: "Connect booking and scheduling to the way your team works." },
  { name: "Payments", icon: CreditCard, x: 18, y: 75, path: "M 250 146 H 160 V 210 H 90", detail: "Use a payment event to start the next step in a workflow." },
  { name: "Email", icon: Mail, x: 82, y: 75, path: "M 250 146 H 340 V 210 H 410", detail: "Move useful information between your inbox and your other tools." },
  { name: "Backend", icon: Server, x: 50, y: 12, path: "M 250 146 V 34", detail: "APIs, databases, access controls, and monitoring support the software people use." },
  { name: "Private AI", icon: ShieldCheck, x: 50, y: 88, path: "M 250 146 V 246", detail: "Deploy suitable models in a controlled environment, with agreed access and operating procedures." },
];

function Brackets() {
  return <span className="ink-brackets" aria-hidden="true"><i /><i /><i /><i /></span>;
}

/** Illustrative service diagrams adapted from the supplied Ink Orbit reference. */
export default function InkOrbitFeatures() {
  const sectionRef = useRef<HTMLElement>(null);
  const visible = useInView(sectionRef, { amount: 0.15 });
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [product, setProduct] = useState(0);
  const [step, setStep] = useState(0);
  const [tool, setTool] = useState(0);
  const running = visible && reduced === false && !paused;
  const currentProduct = products[product];
  const currentStep = steps[step];
  const StepVisualIcon = currentStep.iconVisual;

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      setProduct((current) => (current + 1) % products.length);
      setStep((current) => (current + 1) % steps.length);
      setTool((current) => (current + 1) % tools.length);
    }, 3200);
    return () => window.clearInterval(timer);
  }, [running]);

  return (
    <section id="integrations" ref={sectionRef} className="ink-services px-6 lg:px-10 py-20 md:py-28 scroll-mt-20" aria-labelledby="ink-services-heading">
      <div className="ink-shell">
        <header className="ink-heading">
          <div>
            <p className="ink-eyebrow">Built to work together</p>
            <h2 id="ink-services-heading">From a useful idea<br /><span>to a working system.</span></h2>
          </div>
          <div className="ink-heading-side">
            <p>The product people use. The work behind it. The connections that bring it together.</p>
            {!reduced && (
              <button type="button" className="ink-motion-toggle" onClick={() => setPaused(!paused)} aria-pressed={paused}>
                {paused ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}
                {paused ? "Play diagrams" : "Pause diagrams"}
              </button>
            )}
          </div>
        </header>

        <div className="ink-bento" data-running={running}>
          <article className="ink-frame ink-product-card">
            <Brackets />
            <div className="ink-product-copy">
              <p className="ink-eyebrow">01 / Software that fits</p>
              <h3>Software built around your business.</h3>
              <p>Modern websites, applications, and customer portals that help people book, buy, manage their account, and get things done.</p>
              <div className="ink-product-options" aria-label="Explore software examples">
                {products.map((item, index) => {
                  const Icon = item.icon;
                  return <button key={item.name} type="button" aria-pressed={product === index} onClick={() => setProduct(index)}>
                    <Icon size={15} aria-hidden="true" />{item.name}<ArrowRight size={13} className="ink-option-arrow" aria-hidden="true" />
                  </button>;
                })}
              </div>
              <Link href={currentProduct.href} className="ink-service-link">Explore this service <ArrowRight size={14} aria-hidden="true" /></Link>
            </div>
            <div className="ink-product-visual">
              <span className="ink-scene-note">An example of what we can build</span>
              <div className="ink-stack-stage" aria-hidden="true">
                <div className="ink-stack">
                  <div className="ink-stack-sheet ink-sheet-data"><span>YOUR DATA</span><div className="ink-data-lines"><i /><i /><i /><i /></div></div>
                  <div className="ink-stack-sheet ink-sheet-api"><span>CONNECTED SYSTEMS</span><div className="ink-api-chips"><i>API</i><i>AUTH</i><i>CLOUD</i></div></div>
                  <div className="ink-stack-sheet ink-sheet-product">
                    <div className="ink-window-bar"><span><i /><i /><i /></span><small>{currentProduct.name}</small><img src="/new_logo.png" alt="" width={14} height={14} /></div>
                    <div className={`ink-window-content ink-window-${product}`}>
                      {product === 0 ? <><div className="ink-mini-eyebrow">YOUR BUSINESS</div><strong>A better way<br />to get started.</strong><div className="ink-mini-line" /><span className="ink-mini-button">Book a time <ArrowRight size={9} /></span><div className="ink-mini-blocks"><i /><i /><i /></div></> :
                        product === 1 ? <><div className="ink-mini-portal"><CalendarDays size={14} /><span>Your account</span></div>{["Bookings", "Payments", "Updates"].map((label) => <div className="ink-mini-row" key={label}><LayoutDashboard size={11} />{label}<ArrowRight size={10} /></div>)}</> :
                        <><div className="ink-mini-portal"><LayoutDashboard size={14} /><span>Your workspace</span></div>{["Documents", "Requests", "Updates"].map((label) => <div className="ink-mini-row" key={label}><FileText size={11} />{label}<ArrowRight size={10} /></div>)}</>}
                    </div>
                  </div>
                </div>
              </div>
              <div className="ink-product-caption"><strong>{currentProduct.heading}</strong><p>{currentProduct.description}</p></div>
            </div>
          </article>

          <article className="ink-frame ink-small-card">
            <Brackets />
            <div className="ink-card-visual ink-workflow-visual">
              <span className="ink-scene-note">Example / find, review, act</span>
              <div className="ink-workflow-paper" aria-hidden="true">
                <div className="ink-paper-icon"><StepVisualIcon size={22} strokeWidth={1.3} /></div>
                <div><small>{currentStep.label}</small><strong className="ink-paper-title">{currentStep.visual}</strong><i /><i /></div>
                <span className="ink-paper-review"><ShieldCheck size={11} />{currentStep.status}</span>
              </div>
              <div className="ink-workflow-steps" aria-label="Explore a sample workflow">
                {steps.map((item, index) => {
                  const Icon = item.icon;
                  return <button type="button" key={item.name} aria-pressed={step === index} onClick={() => setStep(index)}>
                    <span><Icon size={19} strokeWidth={1.5} aria-hidden="true" /></span><small>{item.name}</small>
                  </button>;
                })}
              </div>
              <div className="ink-step-detail"><strong>{steps[step].title}</strong><p>{steps[step].detail}</p></div>
            </div>
            <div className="ink-card-copy">
              <p className="ink-eyebrow">02 / Knowledge into action</p>
              <h3>AI that finds answers and takes action.</h3>
              <p>Search your business knowledge, handle customer requests, and move work forward through connected tools, with clear permissions and human review.</p>
              <div className="ink-service-links">
                <Link href="/services/rag-systems" className="ink-service-link">Knowledge search &amp; RAG <ArrowRight size={14} aria-hidden="true" /></Link>
                <Link href="/services/workflow-automation" className="ink-service-link">AI agents &amp; workflows <ArrowRight size={14} aria-hidden="true" /></Link>
                <Link href="/services/ai-receptionist" className="ink-service-link">Assistants &amp; voice agents <ArrowRight size={14} aria-hidden="true" /></Link>
              </div>
            </div>
          </article>

          <article className="ink-frame ink-small-card">
            <Brackets />
            <div className="ink-card-visual ink-systems-visual">
              <span className="ink-scene-note">Your tools / connected by design</span>
              <div className="ink-network" aria-label="Explore business system connections">
                <svg viewBox="0 0 500 280" preserveAspectRatio="none" fill="none" aria-hidden="true">
                  {tools.map((item, index) => <g key={item.name}>
                    <path d={item.path} className={tool === index ? "ink-wire ink-wire-active" : "ink-wire"} />
                    {running && tool === index && <circle r="3" fill="#1b1b1d"><animateMotion dur="2s" repeatCount="indefinite" path={item.path} /></circle>}
                  </g>)}
                </svg>
                <div className="ink-network-hub" aria-hidden="true"><img src="/new_logo.png" alt="" width={32} height={32} /><span>UNKOMMON</span></div>
                {tools.map((item, index) => {
                  const Icon = item.icon;
                  return <button type="button" key={item.name} className="ink-network-tool" style={{ left: `${item.x}%`, top: `${item.y}%` }} aria-pressed={tool === index} onClick={() => setTool(index)}>
                    <Icon size={20} strokeWidth={1.4} aria-hidden="true" /><span>{item.name}</span>
                  </button>;
                })}
              </div>
              <div className="ink-step-detail"><strong>{tools[tool].name}</strong><p>{tools[tool].detail}</p></div>
            </div>
            <div className="ink-card-copy">
              <p className="ink-eyebrow">03 / Connected operations</p>
              <h3>Connected systems. A dependable foundation.</h3>
              <p>Bring your tools together and build the infrastructure behind them, including private AI deployment where you need more control.</p>
              <div className="ink-service-links">
                <Link href="/services/crm-system-integrations" className="ink-service-link">CRM &amp; business integrations <ArrowRight size={14} aria-hidden="true" /></Link>
                <Link href="/services/technical-architecture" className="ink-service-link">Cloud infrastructure &amp; private AI <ArrowRight size={14} aria-hidden="true" /></Link>
              </div>
            </div>
          </article>
        </div>
        <p className="ink-footnote">Illustrative workflows. Each system is scoped around your tools, access, and business requirements.</p>
      </div>
    </section>
  );
}
