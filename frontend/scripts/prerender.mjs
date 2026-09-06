// Post-build prerender.
//
// Vite emits a single dist/index.html for an SPA, so every route serves identical
// HTML: same <title>, same canonical (pointing at the homepage), and the same
// crawler fallback. Googlebot renders JS and recovers; GPTBot, ClaudeBot and
// PerplexityBot do not, so to them every URL looks like the homepage.
//
// This writes one real HTML file per route with correct head tags and
// route-specific fallback content, then regenerates sitemap.xml and llms.txt.
// Route metadata comes from src/data/seo.ts and page content from
// src/data/services.ts, the same modules the React app uses, so nothing drifts.

import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import esbuild from "esbuild";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
// ORIGIN is loaded from src/data/seo.ts below so there is only one definition.
let ORIGIN;

/** Load a TS module by transpiling it to a temp file (no new dependencies). */
async function loadTs(relPath, name) {
  const tmp = path.join(dist, `.${name}.prerender.mjs`);
  await esbuild.build({
    entryPoints: [path.join(root, relPath)],
    outfile: tmp,
    format: "esm",
    bundle: true,
    platform: "node",
    logLevel: "silent",
  });
  const mod = await import(`file://${tmp}?t=${Date.now()}`);
  await rm(tmp, { force: true });
  return mod;
}

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const ul = (items) => `<ul>${items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;

const moreNav = (extra = []) => `<nav><h2>More</h2><ul>
          ${["<li><a href=\"/services\">All services</a></li>", ...extra].join("\n          ")}
          <li><a href="/how-it-works">How it works</a></li>
          <li><a href="/book-a-call">Book a free 30-minute call</a></li>
        </ul></nav>`;

/** Fallback markup for one service page, from the same data React renders. */
function serviceFallback(s) {
  return `
      <header>
        <h1>${esc(s.heroHeadline)}</h1>
        <p>${esc(s.heroSubhead)}</p>
      </header>
      <main>
        <section><h2>${esc(s.problemLabel)}</h2><p>${esc(s.problem)}</p></section>
        <section><h2>What we do about it</h2><p>${esc(s.solution)}</p></section>
        <section><h2>Capabilities</h2>${ul(s.capabilities)}</section>
        <section><h2>What you get</h2>${ul(s.deliverables)}</section>
        <section><h2>Stack</h2>${ul(s.techStack)}</section>
        <section><h2>Who this is for</h2>${ul(s.industries)}</section>
        <section><h2>Outcome</h2><p>${esc(s.outcome)}</p></section>
        <section><h2>Questions</h2>
          ${s.faqs.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join("\n          ")}
        </section>
        ${moreNav()}
      </main>`;
}

/** Service, BreadcrumbList and FAQPage JSON-LD for each service page. */
function serviceSchema(s) {
  const blocks = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: s.subtitle,
      alternateName: s.title,
      url: `${ORIGIN}/services/${s.slug}`,
      description: s.shortDescription,
      provider: { "@type": "Organization", name: "Unkommon", url: ORIGIN },
      areaServed: "Worldwide",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: ORIGIN },
        { "@type": "ListItem", position: 2, name: "Services", item: `${ORIGIN}/services` },
        { "@type": "ListItem", position: 3, name: s.subtitle, item: `${ORIGIN}/services/${s.slug}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: s.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];
  return blocks
    .map((b) => `<script type="application/ld+json">\n${JSON.stringify(b, null, 2)}\n    </script>`)
    .join("\n    ");
}

function buildHtml(template, route, extras) {
  let html = template;
  // Guard on whether the pattern matched, not on whether the string changed:
  // a route whose value already equals the template's is a valid no-op.
  const rep = (re, val) => {
    if (!re.test(html)) throw new Error(`${route.path}: no match for ${re}`);
    html = html.replace(re, val);
  };

  rep(/<title>[\s\S]*?<\/title>/, `<title>${esc(route.title)}</title>`);
  rep(
    /<meta name="description" content="[\s\S]*?" \/>/,
    `<meta name="description" content="${esc(route.description)}" />`
  );
  rep(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${ORIGIN}${route.path}" />`);
  rep(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${ORIGIN}${route.path}" />`);
  rep(/<meta property="og:title" content="[\s\S]*?" \/>/, `<meta property="og:title" content="${esc(route.title)}" />`);
  rep(
    /<meta property="og:description" content="[\s\S]*?" \/>/,
    `<meta property="og:description" content="${esc(route.description)}" />`
  );
  rep(/<meta name="twitter:title" content="[\s\S]*?" \/>/, `<meta name="twitter:title" content="${esc(route.title)}" />`);
  rep(
    /<meta name="twitter:description" content="[\s\S]*?" \/>/,
    `<meta name="twitter:description" content="${esc(route.description)}" />`
  );

  if (route.noindex) {
    html = html.replace("</head>", '  <meta name="robots" content="noindex, follow">\n  </head>');
  }
  if (extras?.schema) {
    const before = html;
    html = html.replace("</head>", `  ${extras.schema}\n  </head>`);
    if (html === before) throw new Error(`${route.path}: failed to inject JSON-LD`);
  }
  if (extras?.fallback) {
    html = replaceFallback(html, extras.fallback, route.path);
  }
  return html;
}

/**
 * Swap the contents of <div id="seo-fallback"> by finding its matching close
 * tag. Vite hoists the module script into <head>, so there is no reliable
 * sibling to anchor a regex against, and nested divs would break a lazy match.
 */
function replaceFallback(html, inner, routePath) {
  const OPEN = '<div id="seo-fallback">';
  const start = html.indexOf(OPEN);
  if (start === -1) throw new Error(`${routePath}: #seo-fallback container not found`);

  const contentStart = start + OPEN.length;
  const tag = /<div\b|<\/div>/g;
  tag.lastIndex = contentStart;

  let depth = 1;
  let m;
  while ((m = tag.exec(html)) !== null) {
    depth += m[0] === "</div>" ? -1 : 1;
    if (depth === 0) {
      return html.slice(0, contentStart) + inner + "\n      " + html.slice(m.index);
    }
  }
  throw new Error(`${routePath}: unbalanced #seo-fallback container`);
}

async function main() {
  const templatePath = path.join(dist, "index.html");
  if (!existsSync(templatePath)) {
    console.error("prerender: dist/index.html not found. Run `vite build` first.");
    process.exit(1);
  }
  const template = await readFile(templatePath, "utf8");
  const { services, pillars } = await loadTs("src/data/services.ts", "services");
  const seo = await loadTs("src/data/seo.ts", "seo");
  const { routes } = seo;
  ORIGIN = seo.ORIGIN;

  // Per-route fallback markup and schema. Homepage keeps what index.html ships.
  const extras = {};

  extras["/services"] = {
    fallback: `
      <header>
        <h1>Get found. Get answered. Get it running.</h1>
        <p>We build the website, win the search and AI visibility, answer every enquiry that comes in, and automate the work behind it. One team instead of three vendors.</p>
      </header>
      <main>
        ${pillars
          .map((p) => {
            const items = services.filter((s) => s.pillar === p.id);
            if (!items.length) return "";
            return `<section><h2>${esc(p.number)} ${esc(p.name)}</h2><p>${esc(p.promise)}</p><ul>${items
              .map(
                (s) =>
                  `<li><a href="/services/${s.slug}"><strong>${esc(s.subtitle)}</strong></a>: ${esc(s.shortDescription)}</li>`
              )
              .join("")}</ul></section>`;
          })
          .filter(Boolean)
          .join("\n        ")}
        <nav><h2>More</h2><ul>
          <li><a href="/how-it-works">How it works</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/book-a-call">Book a free 30-minute call</a></li>
        </ul></nav>
      </main>`,
  };

  for (const s of services) {
    extras[`/services/${s.slug}`] = { fallback: serviceFallback(s), schema: serviceSchema(s) };
  }

  extras["/how-it-works"] = {
    fallback: `
      <header>
        <h1>How we work</h1>
        <p>Audit, plan, build, launch, report. Fixed scope and fixed price agreed before anything starts, with no hourly billing.</p>
      </header>
      <main>
        <section><h2>Process</h2><ol>
          <li><strong>Audit.</strong> A free 30-minute review of how you show up in Google and in AI assistants, how fast enquiries get answered, and where manual work is going.</li>
          <li><strong>Plan.</strong> Written scope, price, and timeline before anything starts.</li>
          <li><strong>Build.</strong> Copy and code built by the same team, so recommendations get implemented rather than handed over.</li>
          <li><strong>Launch.</strong> Tracking instrumented before launch, so the first month of data is usable.</li>
          <li><strong>Report.</strong> Monthly reporting on rankings, AI citation rate, response times, and conversions.</li>
        </ol></section>
        <section><h2>Timelines</h2><ul>
          <li>Website build: typically 4 to 8 weeks</li>
          <li>AI receptionist or speed to lead: typically 2 to 4 weeks</li>
          <li>SEO and AI visibility: technical fixes in weeks, content compounding over three to six months</li>
        </ul></section>
        <section><h2>Pricing</h2><p>Every engagement is scoped individually. After the free 30-minute call you get a fixed scope and a fixed price before any work begins. No hourly billing and no surprise invoices.</p></section>
        ${moreNav()}
      </main>`,
  };

  extras["/about"] = {
    fallback: `
      <header>
        <h1>About Unkommon</h1>
        <p>We build the website, win the search and AI visibility, answer every enquiry, and automate the work behind it. Marketing and engineering in one team, so what gets recommended is what gets shipped.</p>
      </header>
      <main>
        <section><h2>Why we exist</h2><p>Most SEO agencies cannot implement the technical fixes they recommend, and most development shops do not know what to change. Each blames the other, and the work sits still for months. We do both halves.</p></section>
        <section><h2>Where we are</h2><address>Unkommon<br>Stamford, CT, USA<br><a href="mailto:contact@unkommon.ai">contact@unkommon.ai</a><br><a href="tel:+12036809629">+1 (203) 680-9629</a></address></section>
        ${moreNav()}
      </main>`,
  };

  extras["/our-work"] = {
    fallback: `
      <header>
        <h1>Our work is coming soon.</h1>
        <p>We're putting together the case studies: what we built, what it changed, and the numbers behind it. In the meantime, we're happy to walk you through recent projects on a call.</p>
      </header>
      <main>
        ${moreNav()}
      </main>`,
  };

  extras["/book-a-call"] = {
    fallback: `
      <header>
        <h1>Book a free 30-minute call</h1>
        <p>We look at how you show up in search and in AI assistants, how fast inbound enquiries actually get answered, and where manual work is eating hours. No pitch and no obligation.</p>
      </header>
      <main>
        <section><h2>Contact</h2><address>Unkommon<br>Stamford, CT, USA<br><a href="mailto:contact@unkommon.ai">contact@unkommon.ai</a><br><a href="tel:+12036809629">+1 (203) 680-9629</a></address></section>
        ${moreNav()}
      </main>`,
  };

  for (const route of routes) {
    const html = buildHtml(template, route, extras[route.path]);
    const outDir = route.path === "/" ? dist : path.join(dist, route.path);
    await mkdir(outDir, { recursive: true });
    await writeFile(path.join(outDir, "index.html"), html, "utf8");
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .filter((r) => !r.noindex)
  .map(
    (r) => `  <url>
    <loc>${ORIGIN}${r.path}</loc>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;
  await writeFile(path.join(dist, "sitemap.xml"), sitemap, "utf8");

  const llms = `# Unkommon

> Unkommon is a growth studio combining web development, SEO, and AI automation. We build websites that get found by search engines and AI assistants, answer every call and enquiry 24/7, and automate the operations behind them.

Marketing and engineering in one team. Most SEO agencies cannot implement the technical fixes they recommend, and most development shops do not know what to change. We do both halves, so a recommendation becomes a deployment instead of a ticket.

## Services

${pillars
  .map((p) => {
    const items = services.filter((s) => s.pillar === p.id);
    if (!items.length) return "";
    return `### ${p.number} ${p.name}\n\n${p.promise}\n\n${items
      .map((s) => `- [${s.subtitle}](${ORIGIN}/services/${s.slug}): ${s.shortDescription}`)
      .join("\n")}`;
  })
  .filter(Boolean)
  .join("\n\n")}

## Industries

- Ecommerce and retail: catalog SEO, product schema, AI product discovery, customer support automation
- Home services and trades: missed-call recovery, speed to lead, local SEO across a service radius
- Dental, medical, and veterinary practices: intake, scheduling, no-show recovery, local visibility
- Legal firms: client intake, document and records processing, city-level search visibility
- B2B and professional services: AI search visibility, content built on buying intent, lead follow-up

## Process

1. **Audit**: Free 30-minute review of search and AI visibility, response times, and manual work.
2. **Plan**: Fixed scope and fixed price before anything starts. No hourly billing.
3. **Build**: Copy and code delivered by the same team.
4. **Launch**: Tracking instrumented before launch, not after.
5. **Report**: Monthly reporting on rankings, AI citation rate, response times, and conversions.

## Contact

- Website: ${ORIGIN}
- Email: contact@unkommon.ai
- Phone: +1 (203) 680-9629
- Location: Stamford, CT, USA
- Book a call: ${ORIGIN}/book-a-call
`;
  await writeFile(path.join(dist, "llms.txt"), llms, "utf8");

  console.log(`prerender: ${routes.length} routes + sitemap.xml + llms.txt`);
  for (const r of routes) console.log(`  ${r.path}`);
}

main().catch((err) => {
  console.error("prerender failed:", err);
  process.exit(1);
});
