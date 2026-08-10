const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  Header,
  Footer,
  AlignmentType,
  HeadingLevel,
  BorderStyle,
  WidthType,
  ShadingType,
  VerticalAlign,
  PageNumber,
  PageBreak,
} = require("docx");
const fs = require("fs");
const path = require("path");

const NAVY = "1B2A4A";
const BLUE = "2563EB";
const GREEN = "16A34A";
const AMBER = "D97706";
const RED = "DC2626";
const ORANGE = "EA580C";
const LIGHT = "F8F9FA";
const BORDER = "E2E8F0";
const DARK = "1E293B";
const SECTION_BG = "EFF6FF";
const GREEN_BG = "F0FDF4";
const LIGHT_BLUE = "93C5FD";
const GRAY = "94A3B8";

const CONTENT_WIDTH = 9360;
const DOMAIN = "me.readwith.io";
const DATE = "2026-08-10";
const OUT = path.join(__dirname, `seo-audit-me-readwith-io-${DATE}.docx`);

const noBorder = {
  top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
};

const thinBorder = {
  top: { style: BorderStyle.SINGLE, size: 4, color: BORDER },
  bottom: { style: BorderStyle.SINGLE, size: 4, color: BORDER },
  left: { style: BorderStyle.SINGLE, size: 4, color: BORDER },
  right: { style: BorderStyle.SINGLE, size: 4, color: BORDER },
};

function scoreColor(score) {
  if (score >= 8) return GREEN;
  if (score >= 5) return AMBER;
  return RED;
}

function scoreStatus(score) {
  if (score >= 8) return "Strong";
  if (score >= 5) return "On Track";
  return "Needs Work";
}

function p(text, opts = {}) {
  return new Paragraph({
    spacing: { after: opts.after ?? 120, before: opts.before ?? 0 },
    alignment: opts.align,
    children: [
      new TextRun({
        text,
        font: "Arial",
        size: opts.size ?? 22,
        bold: opts.bold,
        italics: opts.italics,
        color: opts.color ?? DARK,
      }),
    ],
  });
}

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 240, after: 160 },
    children: [
      new TextRun({ text, font: "Arial", size: 48, bold: true, color: NAVY }),
    ],
  });
}

function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 200, after: 120 },
    children: [
      new TextRun({ text, font: "Arial", size: 36, bold: true, color: NAVY }),
    ],
  });
}

function cell(text, opts = {}) {
  const width = opts.width ?? 3120;
  return new TableCell({
    width: { size: width, type: WidthType.DXA },
    borders: opts.borders ?? thinBorder,
    shading: opts.fill ? { type: ShadingType.CLEAR, fill: opts.fill } : undefined,
    verticalAlign: VerticalAlign.CENTER,
    margins: {
      top: opts.padY ?? 80,
      bottom: opts.padY ?? 80,
      left: 100,
      right: 100,
    },
    columnSpan: opts.colSpan,
    children: (Array.isArray(text) ? text : [text]).map((t) =>
      typeof t === "string"
        ? new Paragraph({
            alignment: opts.align ?? AlignmentType.LEFT,
            children: [
              new TextRun({
                text: t,
                font: "Arial",
                size: opts.size ?? 20,
                bold: opts.bold,
                italics: opts.italics,
                color: opts.color ?? DARK,
              }),
            ],
          })
        : t
    ),
  });
}

function statusCell(status) {
  const fill =
    status === "Good" ? GREEN : status === "Needs Attention" ? AMBER : RED;
  return cell(status, {
    width: 1800,
    fill,
    color: "FFFFFF",
    bold: true,
    align: AlignmentType.CENTER,
    size: 18,
  });
}

function signalTable(rows) {
  return new Table({
    width: { size: CONTENT_WIDTH, type: WidthType.DXA },
    columnWidths: [2400, 5160, 1800],
    rows: [
      new TableRow({
        children: [
          cell("Signal", { width: 2400, fill: NAVY, color: "FFFFFF", bold: true, size: 18 }),
          cell("Finding", { width: 5160, fill: NAVY, color: "FFFFFF", bold: true, size: 18 }),
          cell("Status", { width: 1800, fill: NAVY, color: "FFFFFF", bold: true, size: 18, align: AlignmentType.CENTER }),
        ],
      }),
      ...rows.map(
        ([signal, finding, status], i) =>
          new TableRow({
            children: [
              cell(signal, { width: 2400, fill: i % 2 ? LIGHT : "FFFFFF", bold: true, size: 18 }),
              cell(finding, { width: 5160, fill: i % 2 ? LIGHT : "FFFFFF", size: 18 }),
              statusCell(status),
            ],
          })
      ),
    ],
  });
}

function coverScoreCell(label, score) {
  const fill = scoreColor(score);
  return new TableCell({
    width: { size: 3120, type: WidthType.DXA },
    borders: noBorder,
    shading: { type: ShadingType.CLEAR, fill },
    margins: { top: 200, bottom: 200, left: 120, right: 120 },
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({ text: label, font: "Arial", size: 20, bold: true, color: "FFFFFF" }),
        ],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 80, after: 80 },
        children: [
          new TextRun({ text: String(score), font: "Arial", size: 72, bold: true, color: "FFFFFF" }),
        ],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: scoreStatus(score),
            font: "Arial",
            size: 18,
            italics: true,
            color: "FFFFFF",
          }),
        ],
      }),
    ],
  });
}

const SEO = 7;
const GEO = 7;
const AEO = 4;

const doc = new Document({
  styles: {
    default: {
      document: {
        styles: [{ id: "Normal", run: { font: "Arial", size: 22, color: DARK } }],
      },
    },
  },
  sections: [
    {
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 },
        },
      },
      children: [
        new Paragraph({
          spacing: { before: 1800 },
          children: [new TextRun({ text: "", font: "Arial", size: 2 })],
          shading: { type: ShadingType.CLEAR, fill: NAVY },
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          shading: { type: ShadingType.CLEAR, fill: NAVY },
          spacing: { after: 200 },
          children: [
            new TextRun({ text: DOMAIN, font: "Arial", size: 72, bold: true, color: "FFFFFF" }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          shading: { type: ShadingType.CLEAR, fill: NAVY },
          spacing: { after: 200 },
          children: [
            new TextRun({
              text: "SEO / GEO / AEO Audit Report",
              font: "Arial",
              size: 36,
              color: LIGHT_BLUE,
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          shading: { type: ShadingType.CLEAR, fill: NAVY },
          spacing: { after: 400 },
          children: [
            new TextRun({ text: "QUICK AUDIT", font: "Arial", size: 22, color: "FFFFFF" }),
          ],
        }),
        new Table({
          width: { size: CONTENT_WIDTH, type: WidthType.DXA },
          columnWidths: [3120, 3120, 3120],
          rows: [
            new TableRow({
              children: [
                coverScoreCell("SEO", SEO),
                coverScoreCell("GEO", GEO),
                coverScoreCell("AEO", AEO),
              ],
            }),
          ],
        }),
        new Paragraph({
          spacing: { before: 1800 },
          shading: { type: ShadingType.CLEAR, fill: NAVY },
          children: [],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          shading: { type: ShadingType.CLEAR, fill: NAVY },
          children: [
            new TextRun({ text: DATE, font: "Arial", size: 18, color: GRAY }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          shading: { type: ShadingType.CLEAR, fill: NAVY },
          children: [
            new TextRun({
              text: "Claude Skill and Plugin by Alex Labat",
              font: "Arial",
              size: 18,
              color: GRAY,
            }),
          ],
        }),
        new Paragraph({ children: [new PageBreak()] }),
      ],
    },
    {
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 },
        },
      },
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              border: {
                bottom: { style: BorderStyle.SINGLE, size: 8, color: NAVY, space: 8 },
              },
              spacing: { after: 120 },
              children: [
                new TextRun({ text: DOMAIN, font: "Arial", size: 18, color: DARK }),
                new TextRun({ text: "\t", font: "Arial", size: 18 }),
                new TextRun({
                  text: "SEO / GEO / AEO Audit Report",
                  font: "Arial",
                  size: 18,
                  color: DARK,
                }),
              ],
            }),
          ],
        }),
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              border: {
                top: { style: BorderStyle.SINGLE, size: 6, color: BORDER, space: 8 },
              },
              spacing: { before: 80 },
              children: [
                new TextRun({
                  text: "Claude Skill and Plugin by Alex Labat",
                  font: "Arial",
                  size: 16,
                  color: GRAY,
                }),
                new TextRun({ text: "\t", font: "Arial", size: 16 }),
                new TextRun({
                  children: [PageNumber.CURRENT],
                  font: "Arial",
                  size: 16,
                  color: GRAY,
                }),
              ],
            }),
          ],
        }),
      },
      children: [
        h1("Executive Summary"),
        new Table({
          width: { size: CONTENT_WIDTH, type: WidthType.DXA },
          columnWidths: [CONTENT_WIDTH],
          rows: [
            new TableRow({
              children: [
                cell(
                  "me.readwith.io is a strong personal-brand portfolio for Hemendra Tripathi (Technical Lead / AI Engineer). Technical on-page basics are largely in place: solid title, Person + WebSite JSON-LD, Open Graph, canonical, robots, and dense outcome-driven case-study copy (~1,400 words). The urgent keyword-boost gap is Answer Engine readiness — almost no question-shaped headings, no FAQ schema, and hire-intent long-tails are under-targeted. Meta description is slightly long (172 chars), OG description is keyword-thin versus the main description, and product visuals ship as CSS mocks (ready=false) so image search/alt equity is weak. Biggest opportunity: add a hire-intent FAQ + tighten title/description/H2 keyword targeting around “voice AI technical lead” and “hire AI engineer.”",
                  { width: CONTENT_WIDTH, fill: SECTION_BG, size: 20 }
                ),
              ],
            }),
          ],
        }),
        new Paragraph({ spacing: { before: 200 }, children: [] }),
        new Table({
          width: { size: CONTENT_WIDTH, type: WidthType.DXA },
          columnWidths: [1800, 1400, 1800, 4360],
          rows: [
            new TableRow({
              children: [
                cell("Dimension", { width: 1800, fill: NAVY, color: "FFFFFF", bold: true, size: 18 }),
                cell("Score", { width: 1400, fill: NAVY, color: "FFFFFF", bold: true, size: 18, align: AlignmentType.CENTER }),
                cell("Status", { width: 1800, fill: NAVY, color: "FFFFFF", bold: true, size: 18, align: AlignmentType.CENTER }),
                cell("Key Takeaway", { width: 4360, fill: NAVY, color: "FFFFFF", bold: true, size: 18 }),
              ],
            }),
            new TableRow({
              children: [
                cell("SEO", { width: 1800, bold: true, size: 18 }),
                cell(String(SEO), { width: 1400, fill: scoreColor(SEO), color: "FFFFFF", bold: true, align: AlignmentType.CENTER, size: 22 }),
                cell(scoreStatus(SEO), { width: 1800, size: scoreColor(SEO), color: "FFFFFF", align: AlignmentType.CENTER, size: 18 }),
                cell("Solid foundation; keyword placement & image SEO are the levers.", { width: 4360, size: 18 }),
              ],
            }),
            new TableRow({
              children: [
                cell("GEO", { width: 1800, bold: true, size: 18, fill: LIGHT }),
                cell(String(GEO), { width: 1400, fill: scoreColor(GEO), color: "FFFFFF", bold: true, align: AlignmentType.CENTER, size: 22 }),
                cell(scoreStatus(GEO), { width: 1800, fill: scoreColor(GEO), color: "FFFFFF", align: AlignmentType.CENTER, size: 18 }),
                cell("High factual density + Person schema; anonymous quotes weaken trust.", { width: 4360, size: 18, fill: LIGHT }),
              ],
            }),
            new TableRow({
              children: [
                cell("AEO", { width: 1800, bold: true, size: 18 }),
                cell(String(AEO), { width: 1400, fill: scoreColor(AEO), color: "FFFFFF", bold: true, align: AlignmentType.CENTER, size: 22 }),
                cell(scoreStatus(AEO), { width: 1800, fill: scoreColor(AEO), color: "FFFFFF", align: AlignmentType.CENTER, size: 18 }),
                cell("No FAQ/HowTo schema; headings are not question-shaped.", { width: 4360, size: 18 }),
              ],
            }),
            new TableRow({
              children: [
                cell("Combined", { width: 1800, bold: true, size: 18, fill: SECTION_BG }),
                cell("18", { width: 1400, fill: NAVY, color: "FFFFFF", bold: true, align: AlignmentType.CENTER, size: 22 }),
                cell("/30", { width: 1800, fill: NAVY, color: "FFFFFF", align: AlignmentType.CENTER, size: 18 }),
                cell("Keyword boost = SEO polish + AEO FAQ layer.", { width: 4360, size: 18, fill: SECTION_BG, bold: true }),
              ],
            }),
          ],
        }),

        h1("Pages Audited"),
        new Table({
          width: { size: CONTENT_WIDTH, type: WidthType.DXA },
          columnWidths: [3600, 2200, 3560],
          rows: [
            new TableRow({
              children: [
                cell("URL", { width: 3600, fill: NAVY, color: "FFFFFF", bold: true, size: 18 }),
                cell("Page Type", { width: 2200, fill: NAVY, color: "FFFFFF", bold: true, size: 18 }),
                cell("Notes", { width: 3560, fill: NAVY, color: "FFFFFF", bold: true, size: 18 }),
              ],
            }),
            ...[
              ["https://me.readwith.io", "Homepage (SPA)", "Single-page portfolio; all sections audited"],
              ["https://me.readwith.io/robots.txt", "Robots", "Allow:/; Disallow:/legacy/; sitemap pointed"],
              ["https://me.readwith.io/sitemap.xml", "Sitemap", "Valid; single homepage URL; 200 via browser UA"],
              ["https://me.readwith.io/manifest.webmanifest", "PWA manifest", "Present; uses SITE description"],
              ["https://me.readwith.io/opengraph-image.jpg", "OG image", "200; 1200×630 JPEG"],
              ["https://me.readwith.io/twitter-image.jpg", "Twitter image", "200; mirrors OG asset"],
              ["https://me.readwith.io/Hemendra_Tripathi_Resume.pdf", "Resume PDF", "200; linked from nav/CTAs"],
            ].map(
              ([url, type, notes], i) =>
                new TableRow({
                  children: [
                    cell(url, { width: 3600, fill: i % 2 ? LIGHT : "FFFFFF", size: 16 }),
                    cell(type, { width: 2200, fill: i % 2 ? LIGHT : "FFFFFF", size: 18 }),
                    cell(notes, { width: 3560, fill: i % 2 ? LIGHT : "FFFFFF", size: 18 }),
                  ],
                })
            ),
          ],
        }),

        h1("SEO Analysis"),
        p(`Score: ${SEO}/10 — On Track`, { bold: true, color: AMBER, size: 22 }),
        h2("Technical On-Page"),
        signalTable([
          [
            "Title tag",
            "“Hemendra Tripathi — Technical Lead · AI Engineer” (48 chars). Clean, brand-first, within 50–60. Missing stronger hire/voice modifiers for keyword boost.",
            "Good",
          ],
          [
            "Meta description",
            "172 chars — strong proof points (1,500+ customers, Multi-LLM voice AI) but over ideal 150–160; risk of SERP truncation.",
            "Needs Attention",
          ],
          [
            "Heading hierarchy",
            "Single H1 = name only (“HEMENDRA TRIPATHI”). H2s: Case Study, More Work, Experience, Capabilities, HIRE ME. Role keywords live in body/eyebrow more than headings.",
            "Needs Attention",
          ],
          [
            "URL / canonical",
            "Clean, HTTPS, self-canonical https://me.readwith.io. Single-page architecture (hash sections only).",
            "Good",
          ],
          [
            "Robots / indexability",
            "index, follow + googlebot max-image-preview:large. /legacy/ disallowed. Sitemap listed.",
            "Good",
          ],
          [
            "Viewport / mobile",
            "viewport meta present. Responsive layout observed in content structure.",
            "Good",
          ],
          [
            "Image alt text",
            "Only portrait path is a real <img> when ready; work mocks default ready=false (CSS frames with aria-label). Weak image SEO / Google Images surface.",
            "Needs Attention",
          ],
          [
            "Open Graph / Twitter",
            "og:title, og:image (1200×630), twitter:summary_large_image present. og:description is short/generic vs main meta description — keyword dilution on shares.",
            "Needs Attention",
          ],
          [
            "Keywords meta",
            "Includes Hemendra Tripathi, voice AI engineer, hire technical lead, hire AI engineer, Callin.io, Twilio. Low ranking weight today; still useful as intent map.",
            "Good",
          ],
        ]),

        h2("Content Quality"),
        signalTable([
          [
            "Word count / depth",
            "~1,400 words of substantive copy: case study, metrics, experience, capabilities, principles — well above thin-page threshold.",
            "Good",
          ],
          [
            "Primary keyword clarity",
            "Entity “Hemendra Tripathi” + role “Technical Lead / AI Engineer” clear. Secondary targets (voice AI, multi-LLM, hire AI engineer) appear but are not systematically reinforced in title/H2/FAQ.",
            "Needs Attention",
          ],
          [
            "Semantic coverage",
            "Strong stack/entity terms: Twilio, Telnyx, SIP, RAG, Pinecone, Supabase, Stripe, ElevenLabs, healthcare/real estate.",
            "Good",
          ],
          [
            "Freshness signals",
            "Experience dates present (OCT 2024 — PRESENT). No visible last-updated stamp for the page itself.",
            "Needs Attention",
          ],
          [
            "Scannability",
            "Clear sectioning, metrics strip, bullet lists, numbered principles — highly scannable.",
            "Good",
          ],
        ]),

        h2("Structured Data"),
        signalTable([
          [
            "Person schema",
            "Present: name, jobTitle, email, Udaipur address, sameAs (GitHub, LinkedIn, Callin.io), knowsAbout, alumniOf, worksFor.",
            "Good",
          ],
          [
            "WebSite schema",
            "Present with name/url/description/publisher Person.",
            "Good",
          ],
          [
            "Schema gaps",
            "No image/logo on Person; no FAQPage; no ProfilePage; no BreadcrumbList (less critical on single page).",
            "Needs Attention",
          ],
        ]),

        h1("GEO Analysis"),
        p(`Score: ${GEO}/10 — On Track`, { bold: true, color: AMBER, size: 22 }),
        h2("E-E-A-T Assessment"),
        signalTable([
          [
            "Author / entity",
            "Named person throughout; job title; location (Udaipur); education; current role at Appspundit Infotech · Callin.io.",
            "Good",
          ],
          [
            "About / bio",
            "“Off the Record” section narrates trajectory (taught 150+ students → freelanced → scaled voice AI to 1,500 companies).",
            "Good",
          ],
          [
            "Contact",
            "Email CTA + GitHub/LinkedIn/resume. No phone (acceptable for portfolio).",
            "Good",
          ],
          [
            "Trust / testimonials",
            "Three strong quotes under Signal, but name/org fields empty in content model — anonymous social proof is weaker for AI citation confidence.",
            "Needs Attention",
          ],
          [
            "Organization schema",
            "worksFor Organization present; brand entity reinforced via sameAs.",
            "Good",
          ],
        ]),

        h2("Content for AI Synthesis"),
        signalTable([
          [
            "Factual density",
            "Citable stats: 1,500+ paying customers; −20% LLM cost; ~420ms TTFT; 30+ prospects closed; 42% placement lift; 15+ staff-hours saved.",
            "Good",
          ],
          [
            "Clear claims",
            "Hero states: technical lead and AI engineer — primarily voice systems — first commit to paying customers.",
            "Good",
          ],
          [
            "Comprehensiveness",
            "Covers architecture, billing, telephony, leadership, demo — answers “who is he / what did he ship?” well. Leaves “how to hire / what engagements?” unanswered in FAQ form.",
            "Needs Attention",
          ],
          [
            "Entity clarity",
            "Consistent naming: Hemendra Tripathi, Callin.io, CondoMail, Realead across page + schema.",
            "Good",
          ],
        ]),

        h2("Technical GEO"),
        signalTable([
          [
            "HTTPS / crawlability",
            "HTTPS via Vercel. robots allow all except /legacy/. Content is largely in initial HTML (not JS-only body copy).",
            "Good",
          ],
          [
            "sameAs / entity graph",
            "GitHub + LinkedIn + Callin.io linked in schema and UI.",
            "Good",
          ],
          [
            "Rich schema depth",
            "Person/WebSite only — no Speakable, ClaimReview, or FAQ types AI answer engines prefer for extraction.",
            "Needs Attention",
          ],
        ]),

        h1("AEO Analysis"),
        p(`Score: ${AEO}/10 — Needs Work`, { bold: true, color: RED, size: 22 }),
        h2("Featured Snippet Eligibility"),
        signalTable([
          [
            "Direct answer blocks",
            "Hero paragraph is definitional but not under a question H2. Case-study H3 is narrative, not Q&A.",
            "Needs Attention",
          ],
          [
            "Definition patterns",
            "Partial: “Hemendra Tripathi is a technical lead and AI engineer…” — good seed for a Person snippet.",
            "Good",
          ],
          [
            "List / table snippets",
            "Capability bullets and metric grids could become list snippets if paired with question headings.",
            "Needs Attention",
          ],
        ]),

        h2("Structured Answer Formats"),
        signalTable([
          ["FAQ schema", "Not present anywhere on the site.", "Missing"],
          ["HowTo schema", "Not present (principles are philosophical, not step procedures).", "Missing"],
          [
            "Question headings",
            "H2/H3 are labels (“Case Study”, “Capabilities”, “How I Think”) — not natural-language questions.",
            "Missing",
          ],
          ["Speakable schema", "Not present.", "Missing"],
        ]),

        h2("Voice Search Readiness"),
        signalTable([
          [
            "Conversational language",
            "Strong in demo/case-study copy; principles are punchy and quotable.",
            "Good",
          ],
          [
            "Long-tail questions",
            "No coverage for queries like “Who is Hemendra Tripathi?”, “How does complexity-aware model routing work?”, “Hire a voice AI technical lead.”",
            "Missing",
          ],
          [
            "Local signals",
            "Udaipur + US/EU serving mentioned; PostalAddress in schema. Not a local-business play.",
            "Good",
          ],
        ]),

        h1("Priority Recommendations"),
        new Table({
          width: { size: CONTENT_WIDTH, type: WidthType.DXA },
          columnWidths: [1400, 3200, 1200, 1400, 2160],
          rows: [
            new TableRow({
              children: [
                cell("Priority", { width: 1400, fill: NAVY, color: "FFFFFF", bold: true, size: 16 }),
                cell("Issue", { width: 3200, fill: NAVY, color: "FFFFFF", bold: true, size: 16 }),
                cell("Dimension", { width: 1200, fill: NAVY, color: "FFFFFF", bold: true, size: 16 }),
                cell("Effort", { width: 1400, fill: NAVY, color: "FFFFFF", bold: true, size: 16 }),
                cell("Impact", { width: 2160, fill: NAVY, color: "FFFFFF", bold: true, size: 16 }),
              ],
            }),
            new TableRow({
              children: [
                cell("Critical", { width: 1400, fill: RED, color: "FFFFFF", bold: true, size: 16, align: AlignmentType.CENTER }),
                cell("Add FAQ section + FAQPage JSON-LD targeting hire/voice-AI questions with 40–60 word answers.", { width: 3200, size: 16 }),
                cell("AEO", { width: 1200, size: 16 }),
                cell("Medium", { width: 1400, size: 16 }),
                cell("Unlocks snippets + AI answer citations.", { width: 2160, size: 16 }),
              ],
            }),
            new TableRow({
              children: [
                cell("High", { width: 1400, fill: ORANGE, color: "FFFFFF", bold: true, size: 16, align: AlignmentType.CENTER }),
                cell("Tighten meta description to ≤160 chars; enrich og:description with “voice AI / hire technical lead” proof language.", { width: 3200, size: 16 }),
                cell("SEO", { width: 1200, size: 16 }),
                cell("Low", { width: 1400, size: 16 }),
                cell("Immediate SERP/share keyword lift.", { width: 2160, size: 16 }),
              ],
            }),
            new TableRow({
              children: [
                cell("High", { width: 1400, fill: ORANGE, color: "FFFFFF", bold: true, size: 16, align: AlignmentType.CENTER }),
                cell("Reinforce primary keywords in H2/eyebrow (e.g. “Voice AI Case Study”) without diluting brand H1.", { width: 3200, size: 16 }),
                cell("SEO", { width: 1200, size: 16 }),
                cell("Low", { width: 1400, size: 16 }),
                cell("Stronger topical relevance for role queries.", { width: 2160, size: 16 }),
              ],
            }),
            new TableRow({
              children: [
                cell("Medium", { width: 1400, fill: AMBER, color: "FFFFFF", bold: true, size: 16, align: AlignmentType.CENTER }),
                cell("Attribute Signal quotes (name/org) once approved; add Person.image (portrait URL) to JSON-LD.", { width: 3200, size: 16 }),
                cell("GEO", { width: 1200, size: 16 }),
                cell("Low–Med", { width: 1400, size: 16 }),
                cell("Higher E-E-A-T / AI citation trust.", { width: 2160, size: 16 }),
              ],
            }),
            new TableRow({
              children: [
                cell("Quick Win", { width: 1400, fill: GREEN, color: "FFFFFF", bold: true, size: 16, align: AlignmentType.CENTER }),
                cell("Set MockVisual ready=true for real PNGs (or ship keyword-rich alts on real images) for Callin/CondoMail/Realead.", { width: 3200, size: 16 }),
                cell("SEO", { width: 1200, size: 16 }),
                cell("Low", { width: 1400, size: 16 }),
                cell("Image + alt equity for product terms.", { width: 2160, size: 16 }),
              ],
            }),
            new TableRow({
              children: [
                cell("Medium", { width: 1400, fill: AMBER, color: "FFFFFF", bold: true, size: 16, align: AlignmentType.CENTER }),
                cell("Optional: short /blog or /notes pillar on “multi-LLM voice routing” to expand keyword surface beyond one URL.", { width: 3200, size: 16 }),
                cell("SEO/AEO", { width: 1200, size: 16 }),
                cell("High", { width: 1400, size: 16 }),
                cell("Ranks long-tail; feeds AI overviews.", { width: 2160, size: 16 }),
              ],
            }),
          ],
        }),

        h1("What's Working Well"),
        new Table({
          width: { size: CONTENT_WIDTH, type: WidthType.DXA },
          columnWidths: [CONTENT_WIDTH],
          rows: [
            new TableRow({
              children: [
                cell(
                  [
                    "Person + WebSite JSON-LD with sameAs, knowsAbout, education, and worksFor — unusual quality for a personal site.",
                    "Outcome-dense Callin.io case study (1,500+ customers, −20% LLM cost, ~420ms TTFT) is highly citable for GEO.",
                    "Title, canonical, robots, sitemap, OG/Twitter large image, and HTTPS are correctly wired.",
                    "Clear entity + hire CTA (“HIRE ME.”) with live agent demo as differentiator.",
                    "Semantic keyword coverage across voice AI, billing, telephony carriers, and enterprise verticals is already rich in body copy.",
                  ].join("\n\n"),
                  { width: CONTENT_WIDTH, fill: GREEN_BG, size: 20 }
                ),
              ],
            }),
          ],
        }),

        new Paragraph({ spacing: { before: 320 }, children: [] }),
        p("Keyword boost focus targets (recommended):", { bold: true, size: 22 }),
        p("1. Primary: Hemendra Tripathi — Technical Lead AI Engineer", { size: 20 }),
        p("2. Commercial: hire AI engineer / hire technical lead / voice AI technical lead", { size: 20 }),
        p("3. Product/expertise: multi-LLM orchestration, voice AI engineer, usage-based billing, Twilio Telnyx SIP", { size: 20 }),
        p("4. Brand/product: Callin.io case study, AI voice agents", { size: 20 }),
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync(OUT, buffer);
  console.log("DOCX written:", OUT);
});
