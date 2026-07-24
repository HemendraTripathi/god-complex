import CountUp from "@/components/CountUp";
import AgentCall from "@/components/AgentCall";
import MockVisual from "@/components/MockVisual";
import {
  ContactMagnet,
  ContactTitle,
  FadeIn,
  HeroCtas,
  HeroEyebrow,
  HeroFocus,
  HeroName,
} from "@/components/WowBits";
import {
  CAPABILITIES,
  CASE,
  EXPERIENCE,
  LINKS,
  NAV,
  PRINCIPLES,
  SIGNALS,
  STATS,
  TICKER,
  WORK,
} from "@/lib/content";

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
      {right && <span className="eyebrow hidden sm:block">{right}</span>}
    </div>
  );
}

export default function Home() {
  return (
    <div>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      {/* nav */}
      <nav
        aria-label="Primary"
        className="fixed inset-x-0 top-0 z-40 border-b-2 border-ink bg-paper/95 backdrop-blur-sm"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8">
          <a
            href="/"
            className="font-mono text-[12px] font-bold uppercase tracking-[0.18em]"
          >
            Hemendra Tripathi
          </a>
          <div className="hidden items-center gap-6 lg:flex">
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
          <div className="flex items-center gap-3">
            <a
              href={LINKS.github}
              target="_blank"
              rel="noreferrer"
              className="hidden font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-steel transition-colors hover:text-org sm:block"
            >
              GitHub
            </a>
            <a
              href={LINKS.resume}
              download
              className="border-2 border-ink bg-ink px-4 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-paper transition-colors hover:border-org hover:bg-org"
            >
              Résumé ↓
            </a>
          </div>
        </div>
      </nav>

      {/* hero */}
      <main id="main">
      <header className="mx-auto max-w-7xl px-5 pt-32 sm:px-8 sm:pt-40">
        <HeroEyebrow />
        <HeroName />
        <HeroFocus />

        <div className="mt-10 grid gap-8 border-t-2 border-ink pt-8 md:grid-cols-[1fr_300px] md:gap-16">
          <p className="max-w-2xl text-[clamp(18px,2.4vw,26px)] font-medium leading-snug tracking-tight">
            Hemendra Tripathi is a technical lead for AI voice systems who takes
            products from first commit to paying customers —{" "}
            <span className="text-org">
              architecture, billing, teams, and the revenue they produce.
            </span>
          </p>
          <div className="space-y-2 font-mono text-[11px] uppercase tracking-wider text-steel">
            {[
              ["Base", "Udaipur, IN"],
              ["Serving", "US / EU teams"],
              ["Current", "Callin.io · Tech Lead"],
              ["Proof", "1,500+ paying customers"],
            ].map(([k, v]) => (
              <div
                key={k}
                className="flex justify-between gap-4 border-b border-hair pb-2"
              >
                <span>{k}</span>
                <span className="text-right text-ink">{v}</span>
              </div>
            ))}
          </div>
        </div>

        <HeroCtas />
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

      {/* CASE STUDY — the 10/10 proof */}
      <FadeIn>
      <section
        id="case"
        className="mx-auto max-w-7xl scroll-mt-20 px-5 pt-24 sm:px-8"
      >
        <SectionHead
          idx="01"
          title="Case Study"
          right={`${CASE.product} · production`}
        />

        <div className="grid gap-10 border-b-2 border-ink py-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="eyebrow mb-3">{CASE.eyebrow}</div>
            <h3 className="max-w-xl text-[clamp(22px,3vw,34px)] font-bold leading-[1.15] tracking-tight">
              {CASE.title}
            </h3>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink/80">
              {CASE.summary}
            </p>
            <a
              href={LINKS.callin}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-block font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-org underline-offset-4 hover:underline"
            >
              callin.io ↗
            </a>
          </div>
          <MockVisual
            kind="callin"
            src="/images/work-callin.png"
            alt="Callin.io product mock"
          />
        </div>

        <div className="grid gap-0 border-b-2 border-ink lg:grid-cols-2">
          <div className="border-hair p-6 sm:p-8 lg:border-r">
            <div className="eyebrow mb-4">The problem</div>
            <ul className="space-y-3">
              {CASE.problem.map((p) => (
                <li
                  key={p}
                  className="flex gap-3 text-[13.5px] leading-relaxed text-ink/80"
                >
                  <span className="mt-[9px] h-px w-4 shrink-0 bg-org" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2">
            {CASE.metrics.map((m, i) => (
              <div
                key={m.label}
                className={`border-hair p-5 ${i % 2 === 1 ? "border-l" : ""} ${i < 2 ? "border-b" : ""}`}
              >
                <div className="font-mono text-[clamp(22px,3vw,32px)] font-bold tracking-tight">
                  {m.value}
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-steel">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="py-10">
          <div className="eyebrow mb-6">What I built</div>
          <div className="grid gap-4 sm:grid-cols-2">
            {CASE.approach.map((a) => (
              <div
                key={a.title}
                className="border-2 border-ink bg-paper p-5 shadow-brutal-sm"
              >
                <h4 className="text-[15px] font-bold tracking-tight">{a.title}</h4>
                <p className="mt-2 text-[13px] leading-relaxed text-ink/75">
                  {a.body}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {CASE.stack.map((s) => (
              <span
                key={s}
                className="border border-ink px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <blockquote className="mb-4 border-2 border-ink bg-ink px-6 py-8 text-paper sm:px-10">
          <p className="max-w-3xl text-[clamp(16px,2vw,22px)] font-medium leading-snug tracking-tight">
            “{CASE.quote}”
          </p>
        </blockquote>
      </section>
      </FadeIn>

      {/* work */}
      <section
        id="work"
        className="mx-auto max-w-7xl scroll-mt-20 px-5 pt-24 sm:px-8"
      >
        <SectionHead
          idx="02"
          title="Selected Work"
          right="Suite + shipped systems"
        />
        <div>
          {WORK.map((w) => (
            <article
              key={w.name}
              className="grid gap-6 border-b border-hair py-10 last:border-none md:grid-cols-[56px_1fr_340px] md:gap-10"
            >
              <div className="font-mono text-[12px] font-bold text-org">
                {w.idx}
              </div>
              <div>
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h3 className="display text-[clamp(24px,3vw,36px)]">
                    {w.name}
                  </h3>
                  <span className="font-mono text-[9.5px] font-bold uppercase tracking-[0.2em] text-org">
                    {w.status}
                  </span>
                </div>
                <div className="eyebrow mt-2">{w.role}</div>
                <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-ink/80">
                  {w.desc}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-4">
                  <span className="font-mono text-[10.5px] uppercase tracking-wider text-steel">
                    {w.stack}
                  </span>
                  {w.href && (
                    <a
                      href={w.href}
                      className="font-mono text-[10px] font-bold uppercase tracking-widest text-org hover:underline"
                    >
                      Full case study →
                    </a>
                  )}
                </div>
              </div>
              <MockVisual
                kind={w.visual}
                src={w.img}
                alt={`${w.name} screenshot`}
              />
            </article>
          ))}
        </div>
      </section>

      {/* agent */}
      <section
        id="agent"
        className="mx-auto max-w-7xl scroll-mt-20 px-5 pt-24 sm:px-8"
      >
        <SectionHead
          idx="03"
          title="The Demo Is the Résumé"
          right="Live — interactive"
        />
        <div className="grid gap-8 pt-10 lg:grid-cols-[minmax(0,360px)_1fr] lg:gap-14">
          <div>
            <p className="text-[15px] leading-relaxed text-ink/80">
              I build AI agents that make real phone calls for a living. This
              one runs on the same conversational patterns as production
              voice agents — except its lead-qualification target is{" "}
              <span className="font-bold text-org">you</span>.
            </p>
            <p className="mt-4 text-[13px] leading-relaxed text-steel">
              Answer the call. Ask about numbers, stack, or why hire him. The
              lead file builds the way Realead qualifies property leads in the
              field.
            </p>
            <ul className="mt-6 space-y-2 font-mono text-[10px] uppercase tracking-wider text-steel">
              <li className="flex gap-2">
                <span className="text-org">→</span> Prefer skimming? Read the
                case study first.
              </li>
              <li className="flex gap-2">
                <span className="text-org">→</span> Prefer proof? Finish the
                call. Get the summary.
              </li>
            </ul>
          </div>
          <AgentCall />
        </div>
      </section>

      {/* thinking */}
      <FadeIn blur>
      <section
        id="thinking"
        className="mx-auto max-w-7xl scroll-mt-20 px-5 pt-24 sm:px-8"
      >
        <SectionHead
          idx="04"
          title="How I Think"
          right="Operating principles"
        />
        <div className="grid gap-0 border-2 border-t-0 border-ink sm:grid-cols-2">
          {PRINCIPLES.map((p, i) => (
            <div
              key={p.n}
              className={`border-hair p-6 sm:p-8 ${i % 2 === 1 ? "sm:border-l" : ""} ${i >= 2 ? "border-t" : ""}`}
            >
              <div className="font-mono text-[11px] font-bold text-org">
                {p.n}
              </div>
              <h3 className="mt-2 text-[18px] font-bold tracking-tight">
                {p.title}
              </h3>
              <p className="mt-3 text-[13.5px] leading-relaxed text-ink/75">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </section>
      </FadeIn>

      {/* signals */}
      <FadeIn>
      <section className="mx-auto max-w-7xl px-5 pt-24 sm:px-8">
        <SectionHead idx="05" title="Signal" right="What people say" />
        <div className="grid gap-0 border-2 border-t-0 border-ink md:grid-cols-3">
          {SIGNALS.map((s, i) => (
            <figure
              key={s.name}
              className={`border-hair p-6 sm:p-7 ${i > 0 ? "md:border-l max-md:border-t" : ""}`}
            >
              <blockquote className="text-[14px] leading-relaxed text-ink/85">
                “{s.text}”
              </blockquote>
              <figcaption className="mt-5 font-mono text-[10px] uppercase tracking-[0.16em]">
                <span className="font-bold">{s.name}</span>
                <span className="mt-1 block text-steel">{s.org}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
      </FadeIn>

      {/* experience */}
      <section
        id="experience"
        className="mx-auto max-w-7xl scroll-mt-20 px-5 pt-24 sm:px-8"
      >
        <SectionHead idx="06" title="Experience" right="2021 — Present" />
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
                    <li
                      key={p}
                      className="flex gap-3 text-[13.5px] leading-relaxed text-ink/80"
                    >
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
        <SectionHead
          idx="07"
          title="Capabilities"
          right="Full surface area — one person"
        />
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
                  <li
                    key={item}
                    className="flex gap-2.5 text-[12.5px] leading-relaxed text-ink/75"
                  >
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
        <SectionHead idx="08" title="Off the Record" />
        <div className="grid gap-10 py-10 md:grid-cols-[240px_1fr] md:items-center">
          <MockVisual
            kind="portrait"
            src="/images/portrait.png"
            alt="Portrait of Hemendra Tripathi"
            aspect="aspect-square"
          />
          <div>
            <p className="max-w-2xl text-[clamp(17px,2vw,22px)] font-medium leading-normal tracking-tight">
              Based in Udaipur, shipping for the US and Europe. I got here by
              teaching <span className="text-org">150+ students</span> to
              code, freelancing across four frameworks, and rebuilding a
              voice-AI platform until{" "}
              <span className="text-org">1,500 companies</span> paid for it. I
              like systems that are boring, fast, and profitable — and teams
              that own what they build.
            </p>
            <div className="mt-6 flex flex-wrap gap-6 font-mono text-[11px] font-bold uppercase tracking-[0.18em]">
              <a
                href={LINKS.github}
                target="_blank"
                rel="noreferrer"
                className="text-ink hover:text-org"
              >
                GitHub ↗
              </a>
              <a
                href={LINKS.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-ink hover:text-org"
              >
                LinkedIn ↗
              </a>
              <a href={LINKS.resume} download className="text-ink hover:text-org">
                Résumé ↓
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* contact */}
      <section id="contact" className="mt-24 scroll-mt-20 border-t-2 border-ink">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <div className="eyebrow mb-6">(09) — Contact</div>
          <ContactTitle />
          <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-ink/75">
            Looking for a technical lead who has already shipped AI products
            into revenue — not someone who will learn voice AI on your dime.
            Open to technical-lead / senior full-stack roles and select
            freelance. Replies within 24 hours.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <ContactMagnet>
              <a
                href={`mailto:${LINKS.email}?subject=Let%27s%20talk%20%E2%80%94%20hiring`}
                className="inline-block border-2 border-ink bg-ink px-7 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-paper shadow-brutal transition-colors hover:border-org hover:bg-org"
              >
                {LINKS.email}
              </a>
            </ContactMagnet>
            <ContactMagnet>
              <a
                href={`tel:${LINKS.phone}`}
                className="inline-block border-2 border-ink px-7 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] transition-colors hover:bg-ink hover:text-paper"
              >
                {LINKS.phoneDisplay}
              </a>
            </ContactMagnet>
          </div>
          <div className="mt-10 flex flex-wrap gap-8 font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-steel">
            <a
              href={LINKS.github}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-org"
            >
              GitHub ↗
            </a>
            <a
              href={LINKS.linkedin}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-org"
            >
              LinkedIn ↗
            </a>
            <a
              href={LINKS.resume}
              download
              className="transition-colors hover:text-org"
            >
              Résumé ↓
            </a>
            <a href="#case" className="transition-colors hover:text-org">
              Case study ↑
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
      </main>
    </div>
  );
}
