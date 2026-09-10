import { motion, useReducedMotion } from "framer-motion";

/**
 * Animated hub-and-spoke diagram of the tools we wire into.
 *
 * Labels rather than brand logos: it matches the typographic look of the rest
 * of the site, stays legible small, and avoids reproducing eight trademarks.
 *
 * Geometry is authored against a 600x360 viewBox and the nodes are positioned
 * in percentages of the same box, so lines and labels stay aligned at any
 * width. Nodes are anchored by the edge the line arrives at, never by their
 * centre, so a long label like "Google Calendar" connects as cleanly as a
 * short one like "Stripe".
 */

const VIEW_W = 600;
const VIEW_H = 360;

/** Where the spokes terminate, in viewBox units. */
const LEFT_X = 150;
const RIGHT_X = 450;
const TOP_Y = 62;
const BOTTOM_Y = 298;

type Anchor = "left" | "right" | "top" | "bottom";

interface Node {
  id: string;
  name: string;
  anchor: Anchor;
  /** Position of the connection point, in viewBox units. */
  x: number;
  y: number;
  path: string;
}

const nodes: Node[] = [
  { id: "shopify", name: "Shopify", anchor: "left", x: LEFT_X, y: 70,
    path: `M 255 180 H 210 Q 190 180 190 160 V 90 Q 190 70 170 70 H ${LEFT_X}` },
  { id: "hubspot", name: "HubSpot", anchor: "left", x: LEFT_X, y: 180,
    path: `M 255 180 H ${LEFT_X}` },
  { id: "salesforce", name: "Salesforce", anchor: "left", x: LEFT_X, y: 290,
    path: `M 255 180 H 210 Q 190 180 190 200 V 270 Q 190 290 170 290 H ${LEFT_X}` },

  { id: "gcal", name: "Google Calendar", anchor: "right", x: RIGHT_X, y: 70,
    path: `M 345 180 H 390 Q 410 180 410 160 V 90 Q 410 70 430 70 H ${RIGHT_X}` },
  { id: "stripe", name: "Stripe", anchor: "right", x: RIGHT_X, y: 180,
    path: `M 345 180 H ${RIGHT_X}` },
  { id: "quickbooks", name: "QuickBooks", anchor: "right", x: RIGHT_X, y: 290,
    path: `M 345 180 H 390 Q 410 180 410 200 V 270 Q 410 290 430 290 H ${RIGHT_X}` },

  { id: "slack", name: "Slack", anchor: "top", x: 300, y: TOP_Y,
    path: `M 300 148 V ${TOP_Y}` },
  { id: "twilio", name: "Twilio", anchor: "bottom", x: 300, y: BOTTOM_Y,
    path: `M 300 212 V ${BOTTOM_Y}` },
];

/** Translate so the anchored edge sits exactly on the connection point. */
const anchorTransform: Record<Anchor, string> = {
  left: "translate(-100%, -50%)",
  right: "translate(0, -50%)",
  top: "translate(-50%, -100%)",
  bottom: "translate(-50%, 0)",
};

function Spoke({ node, index, still }: { node: Node; index: number; still: boolean }) {
  return (
    <g>
      <path
        d={node.path}
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="text-foreground/25"
      />
      {!still && (
        <motion.path
          d={node.path}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          className="text-foreground"
          strokeDasharray="24 260"
          initial={{ strokeDashoffset: 284 }}
          animate={{ strokeDashoffset: -260 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: index * 0.55 }}
        />
      )}
    </g>
  );
}

export function IntegrationsDiagram() {
  const still = Boolean(useReducedMotion());

  return (
    <>
      {/* Diagram: needs room to be legible, so desktop only */}
      <div
        className="relative hidden md:block w-full"
        style={{ aspectRatio: `${VIEW_W} / ${VIEW_H}` }}
      >
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          {nodes.map((node, i) => (
            <Spoke key={node.id} node={node} index={i} still={still} />
          ))}
        </svg>

        {/* Hub */}
        <div
          className="absolute z-20 flex items-center justify-center rounded-xl border border-border bg-white shadow-sm"
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: `${(90 / VIEW_W) * 100}%`,
            height: `${(64 / VIEW_H) * 100}%`,
          }}
        >
          <img
            src="/new_logo.png"
            alt="Unkommon"
            className="w-8 h-8 object-contain invert"
            width={32}
            height={32}
          />
        </div>

        {nodes.map((node) => (
          <div
            key={node.id}
            className="absolute z-10 whitespace-nowrap rounded-lg border border-border bg-white px-3.5 py-2 text-[13px] text-secondary-foreground shadow-sm"
            style={{
              left: `${(node.x / VIEW_W) * 100}%`,
              top: `${(node.y / VIEW_H) * 100}%`,
              transform: anchorTransform[node.anchor],
            }}
          >
            {node.name}
          </div>
        ))}
      </div>

      {/* Mobile: the diagram would be unreadable, so list the same tools */}
      <ul className="flex md:hidden flex-wrap gap-2">
        {nodes.map((node) => (
          <li
            key={node.id}
            className="rounded-lg border border-border bg-white px-3 py-1.5 text-[13px] text-secondary-foreground"
          >
            {node.name}
          </li>
        ))}
      </ul>
    </>
  );
}

export default IntegrationsDiagram;
