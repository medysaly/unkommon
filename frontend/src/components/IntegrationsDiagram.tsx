import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CalendarDays, Cloud, CreditCard, Hash, MessageCircle, ReceiptText, ShoppingBag, Users, type LucideIcon } from "lucide-react";
import "./integrations-diagram.css";

interface Integration {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: LucideIcon;
  x: number;
  y: number;
  path: string;
}

const integrations: Integration[] = [
  { id: "shopify", name: "Shopify", category: "Commerce", description: "Connect your storefront to the operations behind every order.", icon: ShoppingBag, x: 17, y: 20, path: "M 450 240 H 300 Q 270 240 270 210 V 126 Q 270 96 240 96 H 153" },
  { id: "hubspot", name: "HubSpot", category: "CRM", description: "Put new enquiries and follow-ups in the same place as your customer relationships.", icon: Users, x: 17, y: 50, path: "M 450 240 H 153" },
  { id: "salesforce", name: "Salesforce", category: "Sales", description: "Keep lead capture and your sales pipeline connected.", icon: Cloud, x: 17, y: 80, path: "M 450 240 H 300 Q 270 240 270 270 V 354 Q 270 384 240 384 H 153" },
  { id: "calendar", name: "Google Calendar", category: "Scheduling", description: "Turn an enquiry into an appointment on the calendar your team already uses.", icon: CalendarDays, x: 83, y: 20, path: "M 450 240 H 600 Q 630 240 630 210 V 126 Q 630 96 660 96 H 747" },
  { id: "stripe", name: "Stripe", category: "Payments", description: "Connect payment events to the next step in your customer workflow.", icon: CreditCard, x: 83, y: 50, path: "M 450 240 H 747" },
  { id: "quickbooks", name: "QuickBooks", category: "Accounting", description: "Connect invoicing and accounting to your day-to-day operations.", icon: ReceiptText, x: 83, y: 80, path: "M 450 240 H 600 Q 630 240 630 270 V 354 Q 630 384 660 384 H 747" },
  { id: "slack", name: "Slack", category: "Team updates", description: "Send useful workflow updates to the channels where your team works.", icon: Hash, x: 50, y: 15, path: "M 450 240 V 72" },
  { id: "twilio", name: "Twilio", category: "Messaging", description: "Connect calls and messages to your lead-response workflows.", icon: MessageCircle, x: 50, y: 85, path: "M 450 240 V 408" },
];

export function IntegrationsDiagram() {
  const reducedMotion = Boolean(useReducedMotion());
  const [selected, setSelected] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const activeId = preview ?? selected;
  const active = integrations.find((item) => item.id === activeId);

  return (
    <div className="integration-scene" onMouseLeave={() => setPreview(null)}>
      <div className="integration-scene-caption" aria-hidden="true">
        <span>YOUR TOOLS. ONE CONNECTED SYSTEM.</span>
        <span>BUILT AROUND YOU ↗</span>
      </div>
      <div className="integration-stage">
        <div className="integration-board">
          <div className="integration-grid" aria-hidden="true" />
          <svg className="integration-wires" viewBox="0 0 900 480" fill="none" aria-hidden="true">
            {integrations.map((item, index) => (
              <g key={item.id} className={activeId === item.id ? "is-active" : ""}>
                <path d={item.path} className="integration-wire" />
                {!reducedMotion && <motion.path d={item.path} className="integration-signal" pathLength={1}
                  strokeDasharray="0.075 0.925"
                  initial={{ strokeDashoffset: 1 }} animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 3.8, repeat: Infinity, ease: "linear", delay: index * 0.4 }} />}
              </g>
            ))}
          </svg>
          <div className="integration-hub">
            <div className="integration-hub-base" />
            <div className="integration-hub-face">
              <img src="/new_logo.png" alt="Unkommon" width={52} height={52} />
              <span>UNKOMMON</span>
              <div className="integration-hub-ports" aria-hidden="true"><i /><i /><i /></div>
            </div>
          </div>
          <ul className="integration-nodes" aria-label="Explore integrations">
            {integrations.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id} className="integration-node" style={{ left: `${item.x}%`, top: `${item.y}%` }}>
                  <button type="button" className={`integration-tile ${activeId === item.id ? "is-active" : ""}`}
                    aria-pressed={selected === item.id} aria-describedby="integration-description"
                    onMouseEnter={() => setPreview(item.id)} onMouseLeave={() => setPreview(null)}
                    onFocus={() => setPreview(item.id)} onBlur={() => setPreview(null)}
                    onClick={() => { setSelected(selected === item.id ? null : item.id); setPreview(null); }}>
                    <span className="integration-icon"><Icon size={23} strokeWidth={1.6} aria-hidden="true" /></span>
                    <span className="integration-tile-copy"><strong>{item.name}</strong><small>{item.category}</small></span>
                    <span className="integration-node-dot" aria-hidden="true" />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="integration-detail" id="integration-description" role="status" aria-live="polite" aria-atomic="true">
        <span className="integration-detail-label">{active ? active.name : "Connected by design"}</span>
        <p>{active ? active.description : "Explore a tool to see how it fits into your workflow."}</p>
        <span className="integration-detail-hint" aria-hidden="true">SELECT TO EXPLORE ↗</span>
      </div>
    </div>
  );
}

export default IntegrationsDiagram;
