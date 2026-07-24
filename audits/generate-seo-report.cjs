const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType,
  ShadingType, VerticalAlign, PageNumber, PageBreak,
} = require('docx');
const fs = require('fs');
const path = require('path');

const COLORS = {
  navy: '1B2A4A',
  accent: '2563EB',
  green: '16A34A',
  amber: 'D97706',
  red: 'DC2626',
  orange: 'EA580C',
  lightGray: 'F8F9FA',
  border: 'E2E8F0',
  dark: '1E293B',
  lightBlue: 'EFF6FF',
  greenBg: 'F0FDF4',
  white: 'FFFFFF',
  lightBlueText: '93C5FD',
  grayText: '94A3B8',
};

const DOMAIN = 'me.readwith.io';
const DATE = '2026-07-24';
const OUT = path.join(__dirname, `seo-audit-me-readwith-io-${DATE}.docx`);

const noBorder = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };
const thinBorder = { style: BorderStyle.SINGLE, size: 4, color: COLORS.border };
const thinBorders = { top: thinBorder, bottom: thinBorder, left: thinBorder, right: thinBorder };
const navyBottom = { style: BorderStyle.SINGLE, size: 8, color: COLORS.navy };
const grayTop = { style: BorderStyle.SINGLE, size: 4, color: COLORS.border };

function scoreColor(n) {
  if (n >= 8) return COLORS.green;
  if (n >= 5) return COLORS.amber;
  return COLORS.red;
}
function statusWord(n) {
  if (n >= 8) return 'Strong';
  if (n >= 5) return 'On Track';
  return 'Needs Work';
}
function statusLabel(s) {
  if (s === 'Good') return { fill: COLORS.green, text: 'Good' };
  if (s === 'Needs Attention') return { fill: COLORS.amber, text: 'Needs Attention' };
  return { fill: COLORS.red, text: 'Missing' };
}

function p(text, opts = {}) {
  return new Paragraph({
    spacing: { after: opts.after ?? 120, before: opts.before ?? 0 },
    alignment: opts.align,
    children: [
      new TextRun({
        text,
        font: 'Arial',
        size: opts.size ?? 22,
        bold: opts.bold,
        italics: opts.italics,
        color: opts.color ?? COLORS.dark,
      }),
    ],
  });
}

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 280, after: 200 },
    children: [new TextRun({ text, font: 'Arial', size: 48, bold: true, color: COLORS.navy })],
  });
}
function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 140 },
    children: [new TextRun({ text, font: 'Arial', size: 36, bold: true, color: COLORS.dark })],
  });
}
function h3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 180, after: 100 },
    children: [new TextRun({ text, font: 'Arial', size: 28, bold: true, color: COLORS.dark })],
  });
}

function cell(text, opts = {}) {
  const fill = opts.fill;
  return new TableCell({
    borders: opts.noBorder ? noBorders : thinBorders,
    width: { size: opts.width ?? 3120, type: WidthType.DXA },
    shading: fill ? { type: ShadingType.CLEAR, fill } : undefined,
    verticalAlign: VerticalAlign.CENTER,
    margins: { top: opts.padY ?? 80, bottom: opts.padY ?? 80, left: 120, right: 120 },
    children: Array.isArray(text)
      ? text
      : [
          new Paragraph({
            alignment: opts.align ?? AlignmentType.LEFT,
            children: [
              new TextRun({
                text: String(text),
                font: 'Arial',
                size: opts.size ?? 20,
                bold: opts.bold,
                italics: opts.italics,
                color: opts.color ?? (fill && opts.whiteText ? COLORS.white : COLORS.dark),
              }),
            ],
          }),
        ],
  });
}

function signalTable(rows) {
  const header = new TableRow({
    children: ['Signal', 'Finding', 'Status'].map((t, i) =>
      cell(t, {
        width: i === 1 ? 4680 : 2340,
        bold: true,
        fill: COLORS.navy,
        color: COLORS.white,
        whiteText: true,
        size: 18,
      }),
    ),
  });
  const body = rows.map((r, idx) => {
    const st = statusLabel(r.status);
    return new TableRow({
      children: [
        cell(r.signal, { width: 2340, bold: true, fill: idx % 2 ? COLORS.lightGray : undefined, size: 18 }),
        cell(r.finding, { width: 4680, fill: idx % 2 ? COLORS.lightGray : undefined, size: 18 }),
        cell(st.text, {
          width: 2340,
          fill: st.fill,
          color: COLORS.white,
          whiteText: true,
          bold: true,
          align: AlignmentType.CENTER,
          size: 18,
        }),
      ],
    });
  });
  return new Table({ width: { size: 9360, type: WidthType.DXA }, columnWidths: [2340, 4680, 2340], rows: [header, ...body] });
}

const SEO = 7;
const GEO = 7;
const AEO = 5;

const coverScoreCell = (label, score) =>
  cell(
    [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 60 },
        children: [new TextRun({ text: label, font: 'Arial', size: 20, bold: true, color: COLORS.white })],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 40 },
        children: [new TextRun({ text: String(score), font: 'Arial', size: 72, bold: true, color: COLORS.white })],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: statusWord(score), font: 'Arial', size: 18, italics: true, color: COLORS.white })],
      }),
    ],
    { width: 3120, fill: scoreColor(score), padY: 200, noBorder: true },
  );

const doc = new Document({
  styles: {
    default: { document: { styles: [{ id: 'Normal', run: { font: 'Arial', size: 22, color: COLORS.dark } }] } },
  },
  sections: [
    // COVER
    {
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
        },
      },
      children: [
        new Paragraph({
          shading: { type: ShadingType.CLEAR, fill: COLORS.navy },
          spacing: { before: 0, after: 0 },
          children: [],
        }),
        // Use a full-width navy table as cover background simulation
        new Table({
          width: { size: 9360, type: WidthType.DXA },
          columnWidths: [9360],
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  borders: noBorders,
                  width: { size: 9360, type: WidthType.DXA },
                  shading: { type: ShadingType.CLEAR, fill: COLORS.navy },
                  children: [
                    new Paragraph({ spacing: { before: 1800, after: 200 }, children: [] }),
                    new Paragraph({
                      alignment: AlignmentType.CENTER,
                      spacing: { after: 200 },
                      children: [new TextRun({ text: DOMAIN, font: 'Arial', size: 72, bold: true, color: COLORS.white })],
                    }),
                    new Paragraph({
                      alignment: AlignmentType.CENTER,
                      spacing: { after: 200 },
                      children: [new TextRun({ text: 'SEO / GEO / AEO Audit Report', font: 'Arial', size: 36, color: COLORS.lightBlueText })],
                    }),
                    new Paragraph({
                      alignment: AlignmentType.CENTER,
                      spacing: { after: 400 },
                      children: [new TextRun({ text: 'QUICK AUDIT', font: 'Arial', size: 22, color: COLORS.white })],
                    }),
                    new Table({
                      width: { size: 8600, type: WidthType.DXA },
                      columnWidths: [2866, 2867, 2867],
                      rows: [
                        new TableRow({
                          children: [
                            coverScoreCell('SEO', SEO),
                            coverScoreCell('GEO', GEO),
                            coverScoreCell('AEO', AEO),
                          ],
                        }),
                      ],
                    }),
                    new Paragraph({ spacing: { before: 1800 }, children: [] }),
                    new Paragraph({
                      alignment: AlignmentType.CENTER,
                      children: [new TextRun({ text: DATE, font: 'Arial', size: 18, color: COLORS.grayText })],
                    }),
                    new Paragraph({
                      alignment: AlignmentType.CENTER,
                      spacing: { after: 400 },
                      children: [new TextRun({ text: 'Claude Skill and Plugin by Alex Labat', font: 'Arial', size: 18, color: COLORS.grayText })],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        new Paragraph({ children: [new PageBreak()] }),
      ],
    },
    // BODY
    {
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
        },
      },
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              border: { bottom: navyBottom },
              spacing: { after: 200 },
              children: [
                new TextRun({ text: DOMAIN, font: 'Arial', size: 18, color: COLORS.dark }),
                new TextRun({ text: '\t', font: 'Arial', size: 18 }),
                new TextRun({ text: 'SEO / GEO / AEO Audit Report', font: 'Arial', size: 18, color: COLORS.dark }),
              ],
              tabStops: [{ type: 'right', position: 9360 }],
            }),
          ],
        }),
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              border: { top: grayTop },
              spacing: { before: 120 },
              children: [
                new TextRun({ text: 'Claude Skill and Plugin by Alex Labat', font: 'Arial', size: 18, color: COLORS.grayText }),
                new TextRun({ text: '\t', font: 'Arial', size: 18 }),
                new TextRun({ children: [PageNumber.CURRENT], font: 'Arial', size: 18, color: COLORS.grayText }),
              ],
              tabStops: [{ type: 'right', position: 9360 }],
            }),
          ],
        }),
      },
      children: [
        h1('Executive Summary'),
        new Table({
          width: { size: 9360, type: WidthType.DXA },
          columnWidths: [9360],
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  borders: thinBorders,
                  width: { size: 9360, type: WidthType.DXA },
                  shading: { type: ShadingType.CLEAR, fill: COLORS.lightBlue },
                  margins: { top: 160, bottom: 160, left: 200, right: 200 },
                  children: [
                    p(
                      'Hemendra Tripathi’s portfolio (target: me.readwith.io) is a single-page, content-rich personal brand site with strong proof points — Callin.io case study, metrics, experience, and a live agent demo. Before this sprint it had a title and partial Open Graph tags but no sitemap, robots.txt, canonical URL, OG image, Twitter card, or structured data. Those launch blockers are now implemented in the codebase. Remaining gaps for AI/answer engines are FAQ/HowTo markup, question-style headings, and real product/portrait imagery (still mock visuals). Domain DNS was not live at audit time (HTTP 500), so post-deploy Search Console verification is still required.',
                      { size: 22, after: 0 },
                    ),
                  ],
                }),
              ],
            }),
          ],
        }),
        new Paragraph({ spacing: { before: 240 }, children: [] }),
        new Table({
          width: { size: 9360, type: WidthType.DXA },
          columnWidths: [1800, 1200, 1800, 4560],
          rows: [
            new TableRow({
              children: ['Dimension', 'Score', 'Status', 'Key Takeaway'].map((t, i) =>
                cell(t, {
                  width: [1800, 1200, 1800, 4560][i],
                  bold: true,
                  fill: COLORS.navy,
                  color: COLORS.white,
                  whiteText: true,
                  size: 18,
                }),
              ),
            }),
            ...[
              ['SEO', SEO, 'Solid technical foundation after this sprint; verify live tags post-deploy'],
              ['GEO', GEO, 'Strong E-E-A-T narrative + Person schema; add citations & FAQ depth'],
              ['AEO', AEO, 'Few question headings / no FAQ schema — weak snippet eligibility'],
              ['Combined', `${SEO + GEO + AEO}/30`, 'Ship DNS → Search Console → iterate content for AEO'],
            ].map((row, idx) => {
              const scoreNum = typeof row[1] === 'number' ? row[1] : null;
              return new TableRow({
                children: [
                  cell(row[0], { width: 1800, bold: true, fill: idx % 2 ? COLORS.lightGray : undefined, size: 18 }),
                  cell(String(row[1]), {
                    width: 1200,
                    fill: scoreNum != null ? scoreColor(scoreNum) : COLORS.navy,
                    color: COLORS.white,
                    whiteText: true,
                    bold: true,
                    align: AlignmentType.CENTER,
                    size: 18,
                  }),
                  cell(scoreNum != null ? statusWord(scoreNum) : '—', {
                    width: 1800,
                    fill: idx % 2 ? COLORS.lightGray : undefined,
                    size: 18,
                  }),
                  cell(row[2], { width: 4560, fill: idx % 2 ? COLORS.lightGray : undefined, size: 18 }),
                ],
              });
            }),
          ],
        }),

        h1('Pages Audited'),
        p('Codebase-first Quick Audit (domain not publicly serving at audit time). Reviewed homepage composition and static routes generated by Next.js.', { after: 160 }),
        new Table({
          width: { size: 9360, type: WidthType.DXA },
          columnWidths: [3600, 2160, 3600],
          rows: [
            new TableRow({
              children: ['URL / Route', 'Page Type', 'Notes'].map((t, i) =>
                cell(t, {
                  width: [3600, 2160, 3600][i],
                  bold: true,
                  fill: COLORS.navy,
                  color: COLORS.white,
                  whiteText: true,
                  size: 18,
                }),
              ),
            }),
            ...[
              ['https://me.readwith.io/', 'Homepage', 'All sections on one scroll; H1 fixed to full name'],
              ['/sitemap.xml', 'Sitemap', 'Implemented — single homepage URL'],
              ['/robots.txt', 'Robots', 'Allow /; disallow /legacy/; sitemap pointer'],
              ['/opengraph-image', 'OG Image', 'Generated 1200×630 brand card'],
              ['/icon · /apple-icon', 'Favicons', 'HT mark generated via ImageResponse'],
              ['/manifest.webmanifest', 'Manifest', 'Name, theme colors, start_url'],
              ['/legacy/*', 'Legacy', 'Disallowed from crawl; not primary content'],
            ].map((r, idx) =>
              new TableRow({
                children: r.map((t, i) =>
                  cell(t, {
                    width: [3600, 2160, 3600][i],
                    fill: idx % 2 ? COLORS.lightGray : undefined,
                    size: 18,
                  }),
                ),
              }),
            ),
          ],
        }),

        h1('SEO Analysis'),
        p(`Score: ${SEO}/10 — On Track`, { bold: true, color: scoreColor(SEO) }),
        h2('Technical On-Page'),
        signalTable([
          { signal: 'Title tag', finding: '“Hemendra Tripathi — Technical Lead · AI Voice Systems” (~58 chars). Keyword-rich and brand-led.', status: 'Good' },
          { signal: 'Meta description', finding: 'Present (~170 chars). Mentions Callin.io proof + demo CTA. Slightly long vs 150–160 ideal.', status: 'Needs Attention' },
          { signal: 'Heading hierarchy', finding: 'Single H1 now wraps HEMENDRA + TRIPATHI. Section H2s present. Case study uses H3 under H2.', status: 'Good' },
          { signal: 'Canonical', finding: 'metadataBase + alternates.canonical “/” for https://me.readwith.io', status: 'Good' },
          { signal: 'Robots / Sitemap', finding: 'robots.ts + sitemap.ts shipped; /legacy/ blocked', status: 'Good' },
          { signal: 'Open Graph / Twitter', finding: 'og:title/description/url/type + twitter:summary_large_image + generated OG image', status: 'Good' },
          { signal: 'Favicon / Icons', finding: 'Dynamic icon.tsx + apple-icon.tsx (HT). Default Next favicon removed.', status: 'Good' },
          { signal: 'Image alt text', finding: 'MockVisual uses alt/aria-label. Real PNGs not yet in public/images/.', status: 'Needs Attention' },
          { signal: 'Internal links', finding: 'Anchor nav (#case, #work, etc.) + GitHub/LinkedIn/resume. Clean.', status: 'Good' },
        ]),
        h2('Content Quality'),
        signalTable([
          { signal: 'Word count / depth', finding: 'Substantial single-page content: case study, work, principles, experience, capabilities, contact.', status: 'Good' },
          { signal: 'Keyword signals', finding: 'Voice AI, multi-LLM, billing, Technical Lead, Callin.io clearly established; entity name in hero lede.', status: 'Good' },
          { signal: 'Freshness', finding: '©2026 and role dates present; no explicit “last updated” for crawlers.', status: 'Needs Attention' },
          { signal: 'Scannability', finding: 'Strong: eyebrows, lists, metrics grid, short paragraphs.', status: 'Good' },
        ]),
        h2('Structured Data'),
        signalTable([
          { signal: 'JSON-LD Person', finding: 'Person + WebSite schema in layout (name, jobTitle, sameAs, knowsAbout, worksFor).', status: 'Good' },
          { signal: 'FAQ / HowTo', finding: 'Not present — limits rich results / AEO.', status: 'Missing' },
          { signal: 'BreadcrumbList', finding: 'N/A for single-page site.', status: 'Good' },
        ]),

        h1('GEO Analysis'),
        p(`Score: ${GEO}/10 — On Track`, { bold: true, color: scoreColor(GEO) }),
        h2('E-E-A-T Assessment'),
        signalTable([
          { signal: 'Author / entity', finding: 'Named throughout; Person schema + sameAs (GitHub, LinkedIn, Callin).', status: 'Good' },
          { signal: 'About / credentials', finding: 'Off the Record + Experience + education lines; MCA/BCA noted.', status: 'Good' },
          { signal: 'Contact / NAP', finding: 'Email, phone, Udaipur IN visible in contact + schema.', status: 'Good' },
          { signal: 'Trust signals', finding: 'Metrics, testimonials (named), case study quote. Verify names are attributable if challenged.', status: 'Needs Attention' },
        ]),
        h2('Content for AI Synthesis'),
        signalTable([
          { signal: 'Factual density', finding: '1,500+ customers, −20% LLM cost, ~420ms TTFT, 30+ closed — highly citable.', status: 'Good' },
          { signal: 'Clear claim', finding: 'Hero states ownership of architecture → revenue path plainly.', status: 'Good' },
          { signal: 'External citations', finding: 'No third-party press/docs linked as sources.', status: 'Missing' },
          { signal: 'Entity clarity', finding: 'Consistent “Hemendra Tripathi”; domain me.readwith.io ties to readwith brand.', status: 'Good' },
        ]),
        h2('Technical GEO'),
        signalTable([
          { signal: 'HTTPS / crawl', finding: 'Vercel HTTPS expected; robots allow indexing; avoid blocking AI bots.', status: 'Good' },
          { signal: 'JS rendering', finding: 'Hero SplitText/DecryptedText animate client-side; H1 text still in DOM. Prefer SSR-visible copy (done for lede).', status: 'Needs Attention' },
          { signal: 'sameAs graph', finding: 'GitHub + LinkedIn + Callin in schema.', status: 'Good' },
        ]),

        h1('AEO Analysis'),
        p(`Score: ${AEO}/10 — Needs Work`, { bold: true, color: scoreColor(AEO) }),
        h2('Featured Snippet Eligibility'),
        signalTable([
          { signal: 'Direct answer paras', finding: 'Strong narrative, but few 40–60 word answers under question H2s.', status: 'Needs Attention' },
          { signal: 'Definition pattern', finding: 'No “X is…” definition block for “AI voice technical lead”.', status: 'Missing' },
          { signal: 'Lists', finding: 'Principles, capabilities, problem/approach lists — good list-snippet fuel.', status: 'Good' },
          { signal: 'Tables', finding: 'No comparison tables.', status: 'Missing' },
        ]),
        h2('Structured Answer Formats'),
        signalTable([
          { signal: 'FAQ schema', finding: 'Absent.', status: 'Missing' },
          { signal: 'HowTo schema', finding: 'Absent (case study could become HowTo).', status: 'Missing' },
          { signal: 'Question headings', finding: 'H2s are label-style (“Case Study”, “How I Think”), not questions.', status: 'Needs Attention' },
          { signal: 'Speakable', finding: 'No SpeakableSpecification.', status: 'Missing' },
        ]),
        h2('Voice Search Readiness'),
        signalTable([
          { signal: 'Conversational tone', finding: 'Direct, spoken English — good for assistants.', status: 'Good' },
          { signal: 'Long-tail Qs', finding: 'Demo answers hiring questions interactively; page HTML doesn’t encode Q&A pairs.', status: 'Needs Attention' },
          { signal: 'Local signals', finding: 'Udaipur + US/EU serving stated; no LocalBusiness schema (correct for person portfolio).', status: 'Good' },
        ]),

        h1('Priority Recommendations'),
        new Table({
          width: { size: 9360, type: WidthType.DXA },
          columnWidths: [1440, 3360, 1200, 1440, 1920],
          rows: [
            new TableRow({
              children: ['Priority', 'Issue', 'Dimension', 'Effort', 'Impact'].map((t, i) =>
                cell(t, {
                  width: [1440, 3360, 1200, 1440, 1920][i],
                  bold: true,
                  fill: COLORS.navy,
                  color: COLORS.white,
                  whiteText: true,
                  size: 16,
                }),
              ),
            }),
            ...[
              ['Critical', COLORS.red, 'Point DNS → Vercel; set NEXT_PUBLIC_SITE_URL; verify /robots.txt & /sitemap.xml live', 'SEO', 'Low', 'High'],
              ['Critical', COLORS.red, 'Google Search Console: property me.readwith.io + submit sitemap', 'SEO', 'Low', 'High'],
              ['High', COLORS.orange, 'Add FAQ block + FAQPage schema (hiring / voice AI / Callin results)', 'AEO', 'Med', 'High'],
              ['High', COLORS.orange, 'Drop real images in public/images/ and set MockVisual ready={true}', 'SEO', 'Med', 'Med'],
              ['Medium', COLORS.amber, 'Trim meta description to ~155 chars; add “Updated 2026” freshness cue', 'SEO', 'Low', 'Med'],
              ['Quick Win', COLORS.green, 'Add 2–3 question H2s (e.g. “What did you ship at Callin.io?”)', 'AEO', 'Low', 'Med'],
              ['Quick Win', COLORS.green, 'Confirm LinkedIn/GitHub URLs in LINKS match live profiles', 'GEO', 'Low', 'Med'],
            ].map((r, idx) =>
              new TableRow({
                children: [
                  cell(r[0], { width: 1440, fill: r[1], color: COLORS.white, whiteText: true, bold: true, size: 16, align: AlignmentType.CENTER }),
                  cell(r[2], { width: 3360, fill: idx % 2 ? COLORS.lightGray : undefined, size: 16 }),
                  cell(r[3], { width: 1200, fill: idx % 2 ? COLORS.lightGray : undefined, size: 16 }),
                  cell(r[4], { width: 1440, fill: idx % 2 ? COLORS.lightGray : undefined, size: 16 }),
                  cell(r[5], { width: 1920, fill: idx % 2 ? COLORS.lightGray : undefined, size: 16 }),
                ],
              }),
            ),
          ],
        }),

        h1("What's Working Well"),
        new Table({
          width: { size: 9360, type: WidthType.DXA },
          columnWidths: [9360],
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  borders: thinBorders,
                  width: { size: 9360, type: WidthType.DXA },
                  shading: { type: ShadingType.CLEAR, fill: COLORS.greenBg },
                  margins: { top: 140, bottom: 140, left: 200, right: 200 },
                  children: [
                    p('• Proof-first content: concrete metrics (1,500+ customers, −20% cost, ~420ms TTFT) AI engines can cite.', { after: 80 }),
                    p('• Clear entity & role positioning — Technical Lead / AI voice / full-stack — repeated consistently.', { after: 80 }),
                    p('• Strong E-E-A-T surface: experience timeline, education, contact, social sameAs, testimonials.', { after: 80 }),
                    p('• After this sprint: canonical metadataBase, OG/Twitter cards, favicon, sitemap, robots, Person JSON-LD.', { after: 80 }),
                    p('• Distinctive brutalist visual system (paper/ink/orange) — memorable brand vs generic portfolio templates.', { after: 0 }),
                  ],
                }),
              ],
            }),
          ],
        }),

        h1('Implemented This Sprint'),
        p('Code changes already in the repo (build verified):', { after: 80 }),
        p('1. Full Metadata API: metadataBase, canonical, OG, Twitter, robots, keywords, authors', { after: 60 }),
        p('2. /sitemap.xml and /robots.txt (blocks /legacy/)', { after: 60 }),
        p('3. Dynamic opengraph-image, icon, apple-icon', { after: 60 }),
        p('4. Web app manifest', { after: 60 }),
        p('5. Person + WebSite JSON-LD', { after: 60 }),
        p('6. A11y: skip link, single H1 with full name, reduced-motion, dialog/live regions on agent demo', { after: 60 }),
        p('7. GEO lede: entity name in hero paragraph for crawlers/AI synthesis', { after: 200 }),

        h1('Post-Deploy Checklist'),
        p('1. DNS: me.readwith.io → Vercel project (HTTPS automatic)', { after: 60 }),
        p('2. Vercel env: NEXT_PUBLIC_SITE_URL=https://me.readwith.io', { after: 60 }),
        p('3. Curl-check: /robots.txt, /sitemap.xml, /opengraph-image, view-source for ld+json', { after: 60 }),
        p('4. Google Search Console → Add domain/URL property → Submit sitemap', { after: 60 }),
        p('5. Share link in Slack/iMessage to verify OG preview', { after: 60 }),
        p('6. Optional: Bing Webmaster Tools + IndexNow', { after: 60 }),
        p('7. PageSpeed Insights for Core Web Vitals (not measured in this HTML audit)', { after: 200 }),

        h1('Accessibility / UX / Design Notes'),
        h2('Accessibility (WCAG 2.1 AA — spot check)'),
        p('Critical→addressed: skip link, H1 name completeness, agent typing status, summary dialog labelling, prefers-reduced-motion for marquees/pulses. Remaining: summary modal focus trap/Escape, mobile nav (desktop-only links), contrast of steel (#6e6a60) on paper (#ece9e2) — verify ≥4.5:1 for small mono labels.', { after: 120 }),
        h2('UX Copy'),
        p('Recommended keep: “Read the case study →”, “Talk to my AI agent”, “Email me”. Contact CTA using the raw email as the button label is distinctive and clear. Consider renaming “Off the Record” eyebrow for SEO to “About Hemendra” while keeping the display title if desired. Agent “Decline” humor works; ensure DECLINE_LINES stay professional for hiring audiences.', { after: 120 }),
        h2('Design Critique'),
        p('First impression correctly lands on the oversized name brand. Hero budget is tight and on-brief. Watch: fixed nav + dense sections can feel long on mobile — consider a compact mobile nav. Orange accent (#ff4d00) is the right hierarchy signal. Avoid adding card clutter; the brutalist rules already carry structure.', { after: 120 }),
        h2('Design System'),
        p('Tokens in globals.css (@theme): paper, ink, org, steel, hair + brutal shadows. Typography: Archivo + JetBrains Mono. Gaps: document button/link states, focus ring token (org outline used on skip-link), and spacing scale beyond ad-hoc Tailwind values.', { after: 120 }),

        p('Cannot assess without live tools: Core Web Vitals, mobile render of GSAP splits, backlink profile, domain authority. Use pagespeed.web.dev after deploy.', { italics: true, size: 20, color: COLORS.grayText }),
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync(OUT, buffer);
  console.log('DOCX written:', OUT);
});
