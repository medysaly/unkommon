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
        ${s.intakeExample ? `<section><h2>${esc(s.intakeExample.headline)}</h2>
          <p>${esc(s.intakeExample.description)}</p>
          <ul>${s.intakeExample.inputs.map((input) => `<li><h3>${esc(input.title)}: ${esc(input.action)}</h3><p>${esc(input.detail)}</p></li>`).join("")}</ul>
          <p>${esc(s.intakeExample.note)}</p></section>` : ""}
        ${s.featuredUseCase ? `<section aria-labelledby="featured-use-case">
          <p>Featured use case</p>
          <h2 id="featured-use-case">${esc(s.featuredUseCase.title)}</h2>
          <p>${esc(s.featuredUseCase.headline)}</p>
          <p>${esc(s.featuredUseCase.description)}</p>
          <ol>${s.featuredUseCase.steps.map((step) => `<li><h3>${esc(step.title)}</h3><p>${esc(step.description)}</p></li>`).join("")}</ol>
          <p>${esc(s.featuredUseCase.note)}</p>
        </section>` : ""}
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
        <h1>The systems your business needs. The operations that keep it moving.</h1>
        <p>We build AI agents, digital products, and connected systems that automate the work, improve how customers are served, and keep your business moving.</p>
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
          <li><a href="/about">About</a></li>
          <li><a href="/book-a-call">Book a free 30-minute call</a></li>
        </ul></nav>
      </main>`,
  };

  for (const s of services) {
    extras[`/services/${s.slug}`] = { fallback: serviceFallback(s), schema: serviceSchema(s) };
  }

  extras["/about"] = {
    fallback: `
      <header>
        <h1>About Unkommon</h1>
        <p>Unkommon is a technology studio founded by Mehdi Salhi, a computer science graduate and AWS-certified AI engineer based in Stamford, Connecticut.</p>
        <p>We design and develop digital products, custom software and AI-powered systems. Our work spans modern websites and applications, internal business tools, systems integration and workflow automation. Each engagement is shaped around the client’s business requirements and existing technology.</p>
      </header>
      <main>
        <section><h2>Founder-led delivery</h2>
          <figure><img src="/mehdi-salhi.jpg" alt="Mehdi Salhi, founder of Unkommon" width="1264" height="1568" loading="lazy"><figcaption><a href="https://www.linkedin.com/in/mehdi-salhi-work/" target="_blank" rel="noopener noreferrer" aria-label="Mehdi Salhi on LinkedIn (opens in a new tab)">Mehdi Salhi</a> · Founder, Unkommon</figcaption></figure>
          <p>Mehdi leads each project, bringing together software development, cloud architecture and AI engineering. Clients work directly with him to define requirements, make technical decisions and carry the project through implementation and handover.</p>
          <p>His qualifications include a degree in Computer Science and AWS certifications in Solutions Architecture and Cloud Practitioner.</p>
        </section>
        <section><h2>Based in Stamford, CT.</h2><p>Serving clients locally and remotely.</p><address>Unkommon<br>Stamford, CT, USA<br><a href="mailto:contact@unkommon.ai">contact@unkommon.ai</a><br><a href="tel:+12036809629">+1 (203) 680-9629</a></address></section>
        ${moreNav()}
      </main>`,
  };

  extras["/book-a-call"] = {
    fallback: `
      <header>
        <h1>Book a free 30-minute call.</h1>
        <p>Tell us what you want to build or improve. We’ll talk through what you need and agree on a useful next step.</p>
        <p>Your confirmation will include a Cal Video link to join the call.</p>
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

> Unkommon builds AI agents, digital products, and connected systems that automate the work, improve how customers are served, and keep businesses moving.

We build the systems modern businesses run on: customer-facing digital products, the connections behind them, and practical automation for day-to-day operations.

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

## Process

1. **Talk**: Bring us the bottleneck, messy handoff, or system you wish you had.
2. **Plan**: Fixed scope and fixed price before anything starts. No hourly billing.
3. **Build**: We design and build the product, integrations, or automation around how your business works.
4. **Launch**: We test the important paths and hand over a system your team can use.

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
