import BlurText from "@/components/BlurText";
import CountUp from "@/components/CountUp";
import AgentCall from "@/components/AgentCall";
import ImagePlaceholder from "@/components/ImagePlaceholder";

/* ---------------- data ---------------- */
const NAV = [
  ["Work", "#work"],
  ["Agent", "#agent"],
  ["Experience", "#experience"],
  ["Contact", "#contact"],
] as const;

const STATS = [
  { to: 1500, suffix: "+", label: "Paying customers on a platform he architected" },
  { to: 20, prefix: "−", suffix: "%", label: "LLM inference cost via model routing" },
  { to: 5, suffix: "", label: "Engineers hired, led & mentored daily" },
  { to: 10, suffix: "+", label: "Products shipped end-to-end since 2021" },
];

const TICKER = [
  "REAL-TIME VOICE AI",
  "MULTI-LLM ORCHESTRATION",
  "USAGE-BASED BILLING",
  "TWILIO / TELNYX / SIP",
  "RAG · PINECONE · SUPABASE VECTOR",
  "TEAM OF 5 — HIRED & LED",
  "US / EU STAKEHOLDERS",
];

const WORK = [
  {
    idx: "01",
    name: "Callin.io",
    role: "Technical Lead — architecture, billing, voice pipeline",
    desc: "AI voice-calling SaaS scaled to 1,500+ paying customers and enterprise accounts. Low-latency telephony over WebSockets + SIP, multi-LLM orchestration with semantic caching, and a minute-based billing system precise enough that disputes are negligible.",
    stack: "React / Node.js / Supabase / Twilio / Telnyx / Stripe",
    status: "IN PRODUCTION",
    img: "/images/work-callin.png",
  },
  {
    idx: "02",
    name: "CondoMail",
    role: "Product architecture — multi-provider email sync",
    desc: "AI agents that sort, categorize, draft, and auto-reply to email across providers. Live in production with early adopters — including multiple high-volume Amazon sellers running their inbox on it.",
    stack: "React / Node.js / Supabase / Stripe / Firebase",
    status: "LIVE",
    img: "/images/work-condomail.png",
  },
  {
    idx: "03",
    name: "Realead",
    role: "Full-stack · mobile · AI calling flows",
    desc: "Connects to lead sources across platforms, builds an automated business profile, and places AI-driven qualification and follow-up calls to new property leads. In final beta ahead of release.",
    stack: "React Native / NestJS / Supabase / Stripe",
    status: "BETA",
    img: "/images/work-realead.png",
  },
  {
    idx: "04",
    name: "Sunria & FinTech Accounts",
    role: "Freelance — end-to-end delivery",
    desc: "A pan-India farm management system with real-time field-to-warehouse communication, and a financial dashboard with automated reconciliation — 30% fewer accounting errors, 15+ staff-hours saved weekly.",
    stack: "Laravel / Flutter / MERN / CI-CD",
    status: "SHIPPED",
    img: "/images/work-sunria.png",
  },
];

const EXPERIENCE = [
  {
    period: "OCT 2024 — PRESENT",
    title: "Technical Lead / Full-Stack Developer",
    org: "Appspundit Infotech · Callin.io",
    points: [
      "De facto Technical Lead for a 5-engineer team — architecture, vendor & infrastructure spend, hiring, product roadmaps, reporting directly to the founder.",
      "Scaled the platform to 1,500+ paying customers; expanded it into a multi-product suite (CondoMail, Realead) on a shared multi-LLM architecture.",
      "Cut LLM inference costs 20% with complexity-based model routing; owned customer acquisition, converting 30+ prospects into long-term accounts.",
    ],
  },
  {
    period: "2022 — 2024",
    title: "Freelance Full-Stack Developer",
    org: "Remote · fintech, retail, logistics",
    points: [
      "Delivered 10+ end-to-end applications across MERN, Django, Flask, and Laravel.",
      "Built a fintech accounts system for an MCA-registered firm — automated reconciliation saving 15+ staff-hours per week.",
      "Improved API performance 25% and implemented zero-downtime CI/CD pipelines.",
    ],
  },
  {
    period: "2021 — 2023",
    title: "Technical Instructor",
    org: "Aimers Institute & VT College",
    points: [
      "Mentored 150+ students in Python, Django, MERN, and Flutter through project-based learning.",
      "Redesigned the curriculum to industry needs — student placements rose 42%.",
      "Supervised 30+ capstone projects: version control, API design, UI craft.",
    ],
  },
];

const CAPABILITIES = [
  {
    title: "AI & Voice Systems",
    items: [
      "Multi-LLM orchestration — routing by complexity & cost",
      "RAG pipelines — Pinecone, Supabase Vector",
      "Voice cloning — ElevenLabs, Cartesia",
      "Real-time telephony — Twilio, Telnyx, SIP",
    ],
  },
  {
    title: "Product & Revenue",
    items: [
      "Usage-based billing architecture",
      "Stripe subscriptions & invoicing",
      "Pricing design & infra cost optimization",
      "Client acquisition & retention",
    ],
  },
  {
    title: "Full-Stack Engineering",
    items: [
      "React, Next.js, React Native",
      "Node.js, Express, NestJS, Laravel, Python",
      "PostgreSQL (Supabase), Redis",
      "Event-driven systems, REST, microservices",
    ],
  },
  {
    title: "Cloud & Leadership",
    items: [
      "Docker, AWS, CI/CD pipelines",
      "System design & architecture decisions",
      "Team leadership — hiring & mentorship",
      "US/EU stakeholder coordination",
    ],
  },
];

/* ---------------- helpers ---------------- */
function SectionHead({
  idx,
  title,
  right,
}: {
  idx: string;
  title: string;
  right?: string;
}) {
  return (
    <div className="flex items-baseline justify-between border-b-2 border-ink pb-3">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-[11px] font-bold text-org">({idx})</span>
        <h2 className="display text-[clamp(26px,4vw,44px)]">{title}</h2>
      </div>
      {right && (
        <span className="eyebrow hidden sm:block">{right}</span>
      )}
    </div>
  );
}

/* ---------------- page ---------------- */
export default function Home() {
  return (
    <div>
      {/* nav */}
      <nav className="fixed inset-x-0 top-0 z-40 border-b-2 border-ink bg-paper/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8">
          <a href="#" className="font-mono text-[12px] font-bold uppercase tracking-[0.18em]">
            Hemendra Tripathi
          </a>
          <div className="hidden items-center gap-7 sm:flex">
            {NAV.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="font-mono text-[10.5px] font-bold uppercase tracking-[0.18em] text-steel transition-colors hover:text-org"
              >
                {label}
              </a>
            ))}
          </div>
          <a
            href="/Hemendra_Tripathi_Resume.pdf"
            download
            className="border-2 border-ink bg-ink px-4 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-paper transition-colors hover:bg-org hover:border-org"
          >
            Résumé ↓
          </a>
        </div>
      </nav>

      {/* hero */}
      <header className="mx-auto max-w-7xl px-5 pt-32 sm:px-8 sm:pt-40">
        <div className="eyebrow mb-6 flex items-center justify-between">
          <span>Technical Lead — AI Systems / Full-Stack</span>
          <span className="hidden items-center gap-2 sm:flex">
            <span className="blink h-1.5 w-1.5 bg-org" />
            Open to select roles
          </span>
        </div>

        <h1 className="display text-[clamp(52px,11.5vw,168px)]">
          Hemendra
          <br />
          <span className="text-org">Tripathi</span>
          <span className="align-top font-mono text-[clamp(14px,2vw,26px)] font-normal tracking-normal text-steel">
            {" "}
            ©2026
          </span>
        </h1>

        <div className="mt-10 grid gap-8 border-t-2 border-ink pt-8 md:grid-cols-[1fr_320px] md:gap-16">
          <div className="max-w-2xl text-[clamp(18px,2.4vw,26px)] font-medium leading-snug tracking-tight">
            <BlurText
              text="I take AI products from first commit to paying customers —"
              delay={60}
              animateBy="words"
              className="inline"
            />{" "}
            <span className="text-org">
              architecture, billing, teams, and the revenue they produce.
            </span>
          </div>
          <div className="space-y-2 font-mono text-[11px] uppercase tracking-wider text-steel">
            {[
              ["Base", "Udaipur, IN — UTC+05:30"],
              ["Serving", "US / EU product teams"],
              ["Current", "Callin.io — 1,500+ customers"],
              ["Experience", "4+ years, 10+ products"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 border-b border-hair pb-2">
                <span>{k}</span>
                <span className="text-right text-ink">{v}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-4 pb-16">
          <a
            href="#agent"
            className="border-2 border-ink bg-ink px-7 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-paper shadow-brutal transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:bg-org hover:border-org hover:shadow-none"
          >
            Talk to my AI agent →
          </a>
          <a
            href="#work"
            className="border-2 border-ink px-7 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] transition-colors hover:bg-ink hover:text-paper"
          >
            See the work
          </a>
        </div>
      </header>

      {/* ticker */}
      <div className="overflow-hidden border-y-2 border-ink bg-ink py-2.5">
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-paper">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="flex items-center gap-10">
              {t} <span className="text-org">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* stats */}
      <section className="border-b-2 border-ink">
        <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`border-hair px-5 py-8 sm:px-8 ${i > 0 ? "border-l" : ""} ${i >= 2 ? "max-lg:border-t" : ""}`}
            >
              <div className="font-mono text-[clamp(28px,3.5vw,44px)] font-semibold tracking-tight">
                {s.prefix}
                <CountUp to={s.to} duration={1.4} separator="," className="" />
                {s.suffix}
              </div>
              <div className="eyebrow mt-2 !normal-case !tracking-normal">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* work */}
      <section id="work" className="mx-auto max-w-7xl scroll-mt-20 px-5 pt-24 sm:px-8">
        <SectionHead idx="01" title="Selected Work" right="Real users — real revenue" />
        <div>
          {WORK.map((w) => (
            <article
              key={w.name}
              className="grid gap-6 border-b border-hair py-10 last:border-none md:grid-cols-[56px_1fr_340px] md:gap-10"
            >
              <div className="font-mono text-[12px] font-bold text-org">{w.idx}</div>
              <div>
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h3 className="display text-[clamp(24px,3vw,36px)]">{w.name}</h3>
                  <span className="font-mono text-[9.5px] font-bold uppercase tracking-[0.2em] text-org">
                    {w.status}
                  </span>
                </div>
                <div className="eyebrow mt-2">{w.role}</div>
                <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-ink/80">
                  {w.desc}
                </p>
                <div className="mt-4 font-mono text-[10.5px] uppercase tracking-wider text-steel">
                  {w.stack}
                </div>
              </div>
              <ImagePlaceholder src={w.img} alt={`${w.name} screenshot`} />
            </article>
          ))}
        </div>
      </section>

      {/* agent */}
      <section id="agent" className="mx-auto max-w-7xl scroll-mt-20 px-5 pt-24 sm:px-8">
        <SectionHead idx="02" title="The Demo Is the Résumé" right="Live — interactive" />
        <div className="grid gap-8 pt-10 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-14">
          <div>
            <p className="text-[15px] leading-relaxed text-ink/80">
              I build AI agents that make real phone calls for a living. This
              one runs on the same conversational patterns as my production
              voice agents — except its lead-qualification target is{" "}
              <span className="font-bold text-org">you</span>.
            </p>
            <p className="mt-4 text-[13px] leading-relaxed text-steel">
              Answer the call, pick your questions, and watch the lead file
              build itself — the way my Realead agents qualify property leads
              in the field.
            </p>
          </div>
          <AgentCall />
        </div>
      </section>

      {/* experience */}
      <section id="experience" className="mx-auto max-w-7xl scroll-mt-20 px-5 pt-24 sm:px-8">
        <SectionHead idx="03" title="Experience" right="2021 — Present" />
        <div>
          {EXPERIENCE.map((e) => (
            <div
              key={e.title}
              className="grid gap-4 border-b border-hair py-9 last:border-none md:grid-cols-[220px_1fr] md:gap-10"
            >
              <div className="font-mono text-[11px] font-bold tracking-wider text-org">
                {e.period}
              </div>
              <div>
                <h3 className="text-[19px] font-bold tracking-tight">
                  {e.title}
                  <span className="ml-3 font-mono text-[11px] font-normal uppercase tracking-wider text-steel">
                    {e.org}
                  </span>
                </h3>
                <ul className="mt-4 max-w-2xl space-y-2.5">
                  {e.points.map((p) => (
                    <li key={p} className="flex gap-3 text-[13.5px] leading-relaxed text-ink/80">
                      <span className="mt-[9px] h-px w-4 shrink-0 bg-org" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-x-10 gap-y-2 border-t-2 border-ink pt-5 font-mono text-[10px] uppercase tracking-wider text-steel">
          <span>MCA — Rajasthan Vidyapeeth (exp. 2026)</span>
          <span>BCA — Mohanlal Sukhadia University (2022)</span>
          <span>English — fluent · Hindi — native</span>
        </div>
      </section>

      {/* capabilities */}
      <section className="mx-auto max-w-7xl px-5 pt-24 sm:px-8">
        <SectionHead idx="04" title="Capabilities" right="Full surface area — one person" />
        <div className="grid border-2 border-t-0 border-ink sm:grid-cols-2 lg:grid-cols-4">
          {CAPABILITIES.map((c, i) => (
            <div
              key={c.title}
              className={`border-hair p-6 ${i > 0 ? "sm:border-l" : ""} ${i >= 2 ? "max-lg:border-t" : ""} max-sm:border-t max-sm:first:border-t-0`}
            >
              <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.18em]">
                {c.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {c.items.map((item) => (
                  <li key={item} className="flex gap-2.5 text-[12.5px] leading-relaxed text-ink/75">
                    <span className="mt-[8px] h-px w-3 shrink-0 bg-org" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* about */}
      <section className="mx-auto max-w-7xl px-5 pt-24 sm:px-8">
        <SectionHead idx="05" title="Off the Record" />
        <div className="grid gap-10 py-10 md:grid-cols-[260px_1fr] md:items-center">
          <ImagePlaceholder
            src="/images/portrait.png"
            alt="Portrait of Hemendra Tripathi"
            aspect="aspect-square"
            label="add portrait → public/images/portrait.png"
          />
          <p className="max-w-2xl text-[clamp(17px,2vw,22px)] font-medium leading-normal tracking-tight">
            Based in Udaipur, shipping for the US and Europe. I got here by
            teaching <span className="text-org">150+ students</span> to code,
            freelancing across four frameworks, and rebuilding a voice-AI
            platform until <span className="text-org">1,500 companies</span>{" "}
            paid for it. I like systems that are boring, fast, and profitable —
            and teams that own what they build.
          </p>
        </div>
      </section>

      {/* contact */}
      <section id="contact" className="mt-24 scroll-mt-20 border-t-2 border-ink">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <div className="eyebrow mb-6">(06) — Contact</div>
          <h2 className="display text-[clamp(44px,9vw,128px)]">
            Let&rsquo;s build<span className="text-org">.</span>
          </h2>
          <p className="mt-6 max-w-md text-[14px] leading-relaxed text-steel">
            Open to technical-lead and senior full-stack roles, plus select
            freelance engagements. Replies within 24 hours — human or agent.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="mailto:hemendratripathi880@gmail.com"
              className="border-2 border-ink bg-ink px-7 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-paper shadow-brutal transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:bg-org hover:border-org hover:shadow-none"
            >
              hemendratripathi880@gmail.com
            </a>
            <a
              href="tel:+916378745958"
              className="border-2 border-ink px-7 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] transition-colors hover:bg-ink hover:text-paper"
            >
              +91 63787 45958
            </a>
          </div>
          <div className="mt-10 flex gap-8 font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-steel">
            <a href="#" className="transition-colors hover:text-org">GitHub ↗</a>
            <a href="#" className="transition-colors hover:text-org">LinkedIn ↗</a>
            <a
              href="/Hemendra_Tripathi_Resume.pdf"
              download
              className="transition-colors hover:text-org"
            >
              Résumé ↓
            </a>
          </div>
        </div>
        <footer className="border-t-2 border-ink">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 px-5 py-6 font-mono text-[9.5px] uppercase tracking-[0.18em] text-steel sm:flex-row sm:px-8">
            <span>© 2026 Hemendra Tripathi — Udaipur, IN</span>
            <span>Designed & built by him — and one persuasive agent</span>
          </div>
        </footer>
      </section>
    </div>
  );
}
