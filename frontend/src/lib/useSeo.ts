import { useEffect } from "react";
import { useLocation } from "wouter";
import { getRouteMeta, ORIGIN } from "@/data/seo";

function setAttr(selector: string, attr: string, value: string) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

/**
 * Keeps head tags correct during client-side navigation.
 *
 * Each route is prerendered with the right tags already, so crawlers and social
 * scrapers get correct markup without this. This only covers in-session
 * navigation, where the document is never refetched.
 */
export function useSeo() {
  const [location] = useLocation();

  useEffect(() => {
    const meta = getRouteMeta(location);
    if (!meta) return;

    const url = `${ORIGIN}${meta.path}`;
    document.title = meta.title;
    setAttr('meta[name="description"]', "content", meta.description);
    setAttr('link[rel="canonical"]', "href", url);
    setAttr('meta[property="og:url"]', "content", url);
    setAttr('meta[property="og:title"]', "content", meta.title);
    setAttr('meta[property="og:description"]', "content", meta.description);
    setAttr('meta[name="twitter:title"]', "content", meta.title);
    setAttr('meta[name="twitter:description"]', "content", meta.description);
  }, [location]);
}
