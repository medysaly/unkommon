import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowRight, CalendarDays, Check, Code2, CreditCard, FileText,
  LayoutDashboard, Mail, Pause, Play, Sparkles, Users,
} from "lucide-react";
import "./ink-orbit-features.css";

const products = [
  { name: "Modern website", icon: Code2, heading: "Your modern website, doing more.", description: "Answer questions, take bookings, accept payments, and connect the next step to your business tools.", href: "/services/web-development" },
  { name: "AI application", icon: Sparkles, heading: "The next step, in their hands.", description: "Give customers booking, account access, and updates. Give your team AI that can find useful answers.", href: "/services/ai-powered-applications" },
  { name: "Customer portal", icon: LayoutDashboard, heading: "One place for the next step.", description: "Give customers a secure place for documents, requests, and updates.", href: "/services/internal-tools-customer-portals" },
];

const steps = [
  { name: "Receive", icon: Mail, title: "Start with an incoming request", detail: "A form, document, or email starts the workflow." },
  { name: "Read", icon: Sparkles, title: "Pick out the useful information", detail: "AI can extract details and categorize the request." },
  { name: "Review", icon: Users, title: "Keep a person in the loop", detail: "Anything uncertain or consequential goes to your team for review." },
  { name: "Route", icon: ArrowRight, title: "Give the work a next step", detail: "Send approved information to the right person or business system." },
];

const tools = [
  { name: "CRM", icon: Users, x: 19, y: 25, path: "M 250 115 H 160 V 55 H 95", detail: "Keep customer details and the work around them connected." },
  { name: "Calendar", icon: CalendarDays, x: 81, y: 25, path: "M 250 115 H 340 V 55 H 405", detail: "Connect booking and scheduling to the way your team works." },
  { name: "Payments", icon: CreditCard, x: 19, y: 79, path: "M 250 115 H 160 V 174 H 95", detail: "Use a payment event to start the next step in a workflow." },
  { name: "Email", icon: Mail, x: 81, y: 79, path: "M 250 115 H 340 V 174 H 405", detail: "Move useful information between your inbox and your other tools." },
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
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [product, setProduct] = useState(0);
  const [step, setStep] = useState(0);
  const [tool, setTool] = useState(0);
  const running = visible && reduced === false && !paused && !hovered && !focused;
  const currentProduct = products[product];

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
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

        <div className="ink-bento" data-running={running}
          onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)}
          onFocusCapture={() => setFocused(true)}
          onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
          <article className="ink-frame ink-product-card">
            <Brackets />
            <div className="ink-product-copy">
              <p className="ink-eyebrow">01 / Software that fits</p>
              <h3>Built for the work you do.</h3>
              <p>Modern websites, AI applications, and customer portals. Built around what people need to get done.</p>
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
                        product === 1 ? <><div className="ink-mini-search"><Sparkles size={13} />Ask your information</div><div className="ink-mini-answer"><span>ANSWER WITH CONTEXT</span><i /><i /><i /><small><FileText size={10} /> View source document</small></div></> :
                        <><div className="ink-mini-portal"><LayoutDashboard size={14} /><span>Your workspace</span></div>{["Documents", "Requests", "Updates"].map((label) => <div className="ink-mini-row" key={label}><FileText size={11} />{label}<ArrowRight size={10} /></div>)}</>}
                    </div>
                  </div>
                </div>
              </div>
              <div className="ink-product-caption" aria-live="polite" aria-atomic="true"><strong>{currentProduct.heading}</strong><p>{currentProduct.description}</p></div>
            </div>
          </article>

          <article className="ink-frame ink-small-card">
            <Brackets />
            <div className="ink-card-visual ink-workflow-visual">
              <span className="ink-scene-note">Example / incoming request</span>
              <div className="ink-workflow-paper" aria-hidden="true">
                <div className="ink-paper-icon"><FileText size={22} strokeWidth={1.3} /></div>
                <div><small>REQUEST DETAILS</small><i /><i /><i /></div>
                <span className="ink-paper-review"><Check size={11} /> Review before routing</span>
              </div>
              <div className="ink-workflow-steps" aria-label="Explore a sample workflow">
                {steps.map((item, index) => {
                  const Icon = item.icon;
                  return <button type="button" key={item.name} aria-pressed={step === index} onClick={() => { setStep(index); setPaused(true); }}>
                    <span><Icon size={19} strokeWidth={1.5} aria-hidden="true" /></span><small>{item.name}</small>
                  </button>;
                })}
              </div>
              <div className="ink-step-detail"><strong>{steps[step].title}</strong><p>{steps[step].detail}</p></div>
            </div>
            <div className="ink-card-copy">
              <p className="ink-eyebrow">02 / Less manual work</p>
              <h3>Give the routine a route.</h3>
              <p>Turn incoming documents and emails into useful information, with a clear path for review and the next step.</p>
              <Link href="/services/document-email-automation" className="ink-service-link">Document &amp; email automation <ArrowRight size={14} aria-hidden="true" /></Link>
            </div>
          </article>

          <article className="ink-frame ink-small-card">
            <Brackets />
            <div className="ink-card-visual ink-systems-visual">
              <span className="ink-scene-note">Your tools / connected by design</span>
              <div className="ink-network" aria-label="Explore business system connections">
                <svg viewBox="0 0 500 220" preserveAspectRatio="none" fill="none" aria-hidden="true">
                  {tools.map((item, index) => <g key={item.name}>
                    <path d={item.path} className={tool === index ? "ink-wire ink-wire-active" : "ink-wire"} />
                    {running && tool === index && <circle r="3" fill="#1b1b1d"><animateMotion dur="2s" repeatCount="indefinite" path={item.path} /></circle>}
                  </g>)}
                </svg>
                <div className="ink-network-hub" aria-hidden="true"><img src="/new_logo.png" alt="" width={32} height={32} /><span>UNKOMMON</span></div>
                {tools.map((item, index) => {
                  const Icon = item.icon;
                  return <button type="button" key={item.name} className="ink-network-tool" style={{ left: `${item.x}%`, top: `${item.y}%` }} aria-pressed={tool === index} onClick={() => { setTool(index); setPaused(true); }}>
                    <Icon size={20} strokeWidth={1.4} aria-hidden="true" /><span>{item.name}</span>
                  </button>;
                })}
              </div>
              <div className="ink-step-detail"><strong>{tools[tool].name}</strong><p>{tools[tool].detail}</p></div>
            </div>
            <div className="ink-card-copy">
              <p className="ink-eyebrow">03 / Connected operations</p>
              <h3>Your tools, on speaking terms.</h3>
              <p>Connect the systems you already use, so information reaches the right place without another copy and paste.</p>
              <Link href="/services/crm-system-integrations" className="ink-service-link">CRM &amp; business integrations <ArrowRight size={14} aria-hidden="true" /></Link>
            </div>
          </article>
        </div>
        <p className="ink-footnote">Illustrative workflows. Each system is scoped around your tools, access, and business requirements.</p>
      </div>
    </section>
  );
}
