import { services } from "./services";

export const ORIGIN = "https://www.unkommon.ai";

export interface RouteMeta {
  path: string;
  title: string;
  description: string;
  priority: string;
  changefreq: string;
  /** Placeholder pages are served with robots noindex and kept out of the sitemap. */
  noindex?: boolean;
}

/** Routes that aren't generated from service data. */
const staticRoutes: RouteMeta[] = [
  {
    path: "/",
    title: "Unkommon | Websites, Apps & Automation",
    description:
      "We build AI agents, digital products, and connected systems that automate the work, improve how customers are served, and keep your business moving.",
    priority: "1.0",
    changefreq: "weekly",
  },
  {
    path: "/services",
    title: "Services | Digital Products & Automation | Unkommon",
    description:
      "Websites, apps, digital tools, and automation built around the way your business actually works.",
    priority: "0.9",
    changefreq: "weekly",
  },
  {
    path: "/about",
    title: "About Unkommon | Systems And Automation",
    description:
      "Unkommon builds websites, apps, and digital tools, then connects and automates the work behind them.",
    priority: "0.7",
    changefreq: "monthly",
  },
  {
    path: "/book-a-call",
    title: "Book A Free 30-Minute Call | Unkommon",
    description:
      "Book a free 30-minute call to talk through the bottleneck, handoff, or system your business needs next.",
    priority: "0.9",
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
    path: `/services/${s.slug}`,
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
