import { services } from "./services";

export const ORIGIN = "https://www.unkommon.ai";

export interface RouteMeta {
  path: string;
  title: string;
  description: string;
  priority: string;
  changefreq: string;
}

/** Routes that aren't generated from service data. */
const staticRoutes: RouteMeta[] = [
  {
    path: "/",
    title: "Unkommon | Web Development, SEO & AI Automation",
    description:
      "We build websites that get found by Google and by AI, answer every call and enquiry 24/7, and automate the work behind them. Web development, SEO, AI search optimization, and business automation.",
    priority: "1.0",
    changefreq: "weekly",
  },
  {
    path: "/solutions",
    title: "Services | Web Development, SEO & AI Automation | Unkommon",
    description:
      "Get found, get answered, get it running. Websites, SEO and AI search visibility, 24/7 call answering and lead response, and automation for the work behind it.",
    priority: "0.9",
    changefreq: "weekly",
  },
  {
    path: "/how-it-works",
    title: "How We Work | Process, Timelines & Pricing | Unkommon",
    description:
      "Audit, plan, build, launch, report. Fixed scope and fixed price before work starts, with monthly reporting on rankings, AI citations, response times, and conversions.",
    priority: "0.8",
    changefreq: "monthly",
  },
  {
    path: "/about",
    title: "About Unkommon | Marketing And Engineering In One Team",
    description:
      "Most SEO agencies cannot make code changes and most development shops do not know what to change. We do both halves, so the recommendation and the implementation never get lost between vendors.",
    priority: "0.7",
    changefreq: "monthly",
  },
  {
    path: "/book-a-call",
    title: "Book A Free 30-Minute Call | Unkommon",
    description:
      "Book a free 30-minute call. We look at how you show up in search and AI, how fast enquiries get answered, and where manual work is going. No pitch, no obligation.",
    priority: "0.9",
    changefreq: "monthly",
  },
  {
    path: "/sources",
    title: "Sources & Citations | Unkommon",
    description: "References and citations for the statistics used across the Unkommon website.",
    priority: "0.4",
    changefreq: "monthly",
  },
  {
    path: "/privacy",
    title: "Privacy Policy | Unkommon",
    description: "How Unkommon collects, uses, and protects your information.",
    priority: "0.3",
    changefreq: "yearly",
  },
  {
    path: "/terms",
    title: "Terms of Service | Unkommon",
    description: "Terms governing the use of Unkommon's website and services.",
    priority: "0.3",
    changefreq: "yearly",
  },
];

/** Every indexable route: static pages plus one per service. */
export const routes: RouteMeta[] = [
  ...staticRoutes.slice(0, 2),
  ...services.map((s) => ({
    path: `/solutions/${s.slug}`,
    title: s.metaTitle,
    description: s.metaDescription,
    priority: "0.85",
    changefreq: "monthly",
  })),
  ...staticRoutes.slice(2),
];

export function getRouteMeta(pathname: string): RouteMeta | undefined {
  const clean = pathname !== "/" && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  return routes.find((r) => r.path === clean);
}
