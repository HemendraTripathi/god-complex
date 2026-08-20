import type { Metadata } from "next";
import AgentCall from "@/components/AgentCall";
import BharatMark from "@/components/BharatMark";
import ArchitectureFlow from "@/components/ArchitectureFlow";
import JsonLd from "@/components/JsonLd";
import MockVisual from "@/components/MockVisual";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import SocialLink from "@/components/SocialLink";
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
  FAQS,
  LINKS,
  PRINCIPLES,
  SIGNALS,
  TICKER,
  WORK,
} from "@/lib/content";
import { faqJsonLd, jsonLdGraph, PORTRAIT_PATH, PROFILE_PATH, profilePageJsonLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

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

      <SiteNav />
      <JsonLd
        data={jsonLdGraph([
          faqJsonLd(),
          profilePageJsonLd(SITE_URL, `${SITE_URL}/#profile`),
        ])}
      />

      {/* hero */}
      <main id="main">
      <header className="mx-auto max-w-7xl px-5 pt-28 sm:px-8 sm:pt-36">
        <HeroEyebrow />
        <HeroName />
        <HeroFocus />

        <div className="mt-10 grid gap-8 border-t-2 border-ink pt-8 md:grid-cols-[1.15fr_0.85fr] md:gap-12 lg:gap-16">
          <div>
            <p className="max-w-2xl text-[clamp(18px,2.4vw,26px)] font-medium leading-snug tracking-tight">
              Hemendra is a technical lead and AI engineer. He ships as an
              AI Voice Engineer, plus broader AI product work. He takes products from
              first commit to paying customers:{" "}
              <span className="text-org">
                architecture, billing, teams, and the revenue they produce.
              </span>
            </p>
            <p className="mt-4 flex flex-wrap items-center gap-x-[0.4em] font-mono text-[11px] uppercase tracking-wider text-steel">
              Udaipur, IN <BharatMark /> · US / EU teams · Callin.io Tech Lead
            </p>
          </div>
          <dl
            aria-label="Verified impact"
            className="grid grid-cols-2 border-2 border-ink"
          >
            {CASE.metrics.map((m, i) => (
              <div
                key={m.label}
                className={`border-hair p-4 sm:p-5 ${i % 2 === 1 ? "border-l" : ""} ${i < 2 ? "border-b" : ""}`}
              >
                <dt className="font-mono text-[9.5px] uppercase tracking-wider text-steel">
                  {m.label}
                </dt>
                <dd className="mt-1.5 font-mono text-[clamp(22px,3.2vw,30px)] font-bold tracking-tight">
                  {m.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <HeroCtas />
      </header>

      {/* ticker */}
      <div
        aria-hidden="true"
        className="overflow-hidden border-y-2 border-ink bg-ink py-2.5"
      >
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-paper">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="flex items-center gap-10">
              {t} <span className="text-org">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* CASE STUDY — the 10/10 proof */}
      <FadeIn>
      <section
        id="case"
        className="mx-auto max-w-7xl scroll-mt-20 px-5 pt-24 sm:px-8"
      >
        <SectionHead
          idx="01"
          title="Voice AI Case Study"
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
              rel="noopener noreferrer"
              className="mt-6 inline-block font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-org underline-offset-4 hover:underline"
            >
              callin.io ↗
            </a>
          </div>
          <MockVisual
            kind="callin"
            src="/images/work-callin.png"
            alt="Callin.io voice AI agent, live medical intake call with multi-LLM routing"
          />
        </div>

        <div className="border-b-2 border-ink p-6 sm:p-8">
          <div className="eyebrow mb-4">The problem</div>
          <ul className="grid gap-3 sm:grid-cols-3 sm:gap-6">
            {CASE.problem.map((p) => (
              <li
                key={p}
                className="flex gap-3 text-[13.5px] leading-relaxed text-ink/80"
              >
                <span className="mt-[9px] h-px w-4 shrink-0 bg-org" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="border-b-2 border-ink py-10">
          <div className="eyebrow mb-6">Architecture</div>
          <ArchitectureFlow />
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
          {(CASE.quoteName || CASE.quoteOrg) && (
            <footer className="mt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-paper/55">
              {CASE.quoteName && <>– {CASE.quoteName}</>}
              {CASE.quoteOrg && (
                <span className="text-paper/35">
                  {CASE.quoteName ? " · " : "– "}
                  {CASE.quoteOrg}
                </span>
              )}
            </footer>
          )}
        </blockquote>
      </section>
      </FadeIn>

      {/* supporting work */}
      <section
        id="work"
        className="mx-auto max-w-7xl scroll-mt-20 px-5 pt-24 sm:px-8"
      >
        <SectionHead
          idx="02"
          title="More AI Product Work"
          right="Supporting systems, not full case studies"
        />
        <p className="mt-4 max-w-2xl text-[14px] leading-relaxed text-ink/70">
          Callin.io is the deep dive above. These are related suite products and
          earlier shipped work. Shorter notes, same bar for outcomes.
        </p>
        <div>
          {WORK.map((w) => (
            <article
              key={w.name}
              className="grid gap-6 border-b border-hair py-10 last:border-none md:grid-cols-[56px_1fr_280px] md:gap-10"
            >
              <div className="font-mono text-[12px] font-bold text-org">
                {w.idx}
              </div>
              <div>
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h3 className="display text-[clamp(22px,2.8vw,30px)]">
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
                      {w.href === "#agent" ? "See the demo →" : "Learn more →"}
                    </a>
                  )}
                </div>
              </div>
              <MockVisual
                kind={w.visual}
                src={w.img}
                alt={`${w.name}: ${w.role}`}
              />
            </article>
          ))}
        </div>
      </section>

      {/* experience — early for recruiter scan */}
      <section
        id="experience"
        className="mx-auto max-w-7xl scroll-mt-20 px-5 pt-24 sm:px-8"
      >
        <SectionHead idx="03" title="Experience" right="2021 to Present" />
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
          <span>MCA, Rajasthan Vidyapeeth (exp. 2026)</span>
          <span>BCA, Mohanlal Sukhadia University (2022)</span>
          <span>English: fluent · Hindi: native</span>
        </div>
      </section>

      {/* agent */}
      <section
        id="agent"
        className="mx-auto max-w-7xl scroll-mt-20 px-5 pt-24 sm:px-8"
      >
        <SectionHead
          idx="04"
          title="The Demo Is the Résumé"
          right="Live, interactive"
        />
        <div className="grid gap-8 pt-10 lg:grid-cols-[minmax(0,360px)_1fr] lg:gap-14">
          <div>
            <p className="text-[15px] leading-relaxed text-ink/80">
              I build AI voice agents that make real phone calls for a living. This
              one runs on the same conversational patterns as production
              voice agents, except its lead-qualification target is{" "}
              <span className="font-bold text-org">you</span>.
            </p>
            <p className="mt-4 text-[13px] leading-relaxed text-steel">
              Prefer the short path?{" "}
              <a href="#case" className="font-semibold text-ink underline-offset-2 hover:underline">
                Read the case study
              </a>
              . Prefer proof? Answer the call. The lead file builds as you ask.
            </p>
            <ul className="mt-6 space-y-2 font-mono text-[10px] uppercase tracking-wider text-steel">
              <li className="flex gap-2">
                <span className="text-org">→</span> Same patterns as production
                qualification agents
              </li>
              <li className="flex gap-2">
                <span className="text-org">→</span> Finish the call. Get the
                summary. Email if it lands.
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
          idx="05"
          title="How I Think About Voice AI"
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
      <section
        id="signal"
        className="mx-auto max-w-7xl scroll-mt-20 px-5 pt-24 sm:px-8"
      >
        <SectionHead idx="06" title="Signal" right="What people say" />
        <div className="grid gap-0 border-2 border-t-0 border-ink md:grid-cols-3">
          {SIGNALS.map((s, i) => (
            <figure
              key={s.text.slice(0, 32)}
              className={`border-hair p-6 sm:p-7 ${i > 0 ? "md:border-l max-md:border-t" : ""}`}
            >
              <blockquote className="text-[14px] leading-relaxed text-ink/85">
                “{s.text}”
              </blockquote>
              {(s.name || s.org) && (
                <figcaption className="mt-5 border-t border-hair pt-4">
                  {s.name && (
                    <div className="text-[13px] font-bold tracking-tight">
                      {s.name}
                    </div>
                  )}
                  {s.org && (
                    <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-steel">
                      {s.org}
                    </div>
                  )}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </section>
      </FadeIn>

      {/* capabilities */}
      <section className="mx-auto max-w-7xl px-5 pt-24 sm:px-8">
        <SectionHead
          idx="07"
          title="AI & Engineering Capabilities"
          right="Full surface area, one person"
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
            src={PORTRAIT_PATH}
            alt="Hemendra Tripathi, technical lead and AI engineer"
            aspect="aspect-square"
            width={960}
            height={960}
            ready
          />
          <div>
            <p className="max-w-2xl text-[clamp(17px,2vw,22px)] font-medium leading-normal tracking-tight">
              Based in Udaipur, shipping for the US and Europe. I got here by
              teaching <span className="text-org">150+ students</span> to
              code, freelancing across four frameworks, and rebuilding a
              voice-AI platform until{" "}
              <span className="text-org">1,500 companies</span> paid for it. I
              like systems that are boring, fast, and profitable, and teams
              that own what they build.
            </p>
            <div className="mt-6 flex flex-wrap gap-6 font-mono text-[11px] font-bold uppercase tracking-[0.18em]">
              <SocialLink network="github" className="text-ink hover:text-org">
                GitHub ↗
              </SocialLink>
              <SocialLink network="linkedin" className="text-ink hover:text-org">
                LinkedIn ↗
              </SocialLink>
              <a
                href={PROFILE_PATH}
                className="text-ink hover:text-org"
              >
                Full profile →
              </a>
              <a href={LINKS.resume} download className="text-ink hover:text-org">
                Résumé ↓
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ — hire-intent + expertise answers */}
      <FadeIn>
      <section
        id="faq"
        className="mx-auto max-w-7xl scroll-mt-20 px-5 pt-24 sm:px-8"
      >
        <SectionHead
          idx="09"
          title="FAQ"
          right="Hire a technical lead · AI engineer"
        />
        <div className="divide-y-2 divide-ink border-2 border-t-0 border-ink">
          {FAQS.map((item) => (
            <details
              key={item.question}
              className="group border-hair px-5 py-5 open:bg-paper sm:px-7"
            >
              <summary className="cursor-pointer list-none font-bold tracking-tight text-[clamp(15px,1.8vw,18px)] marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-start justify-between gap-4">
                  <h3 className="pr-2 text-[clamp(15px,1.8vw,18px)] font-bold tracking-tight">
                    {item.question}
                  </h3>
                  <span
                    aria-hidden
                    className="mt-1 shrink-0 font-mono text-[12px] font-bold text-org transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 max-w-3xl text-[14px] leading-relaxed text-ink/80">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </section>
      </FadeIn>

      {/* contact */}
      <section id="contact" className="mt-24 scroll-mt-20 border-t-2 border-ink">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <div className="eyebrow mb-6">(10) Contact</div>
          <ContactTitle />
          <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-ink/75">
            Looking for a technical lead and AI engineer who has already shipped
            voice AI into revenue, and can stretch into other AI product work.
            Open to technical-lead / AI engineer / senior full-stack roles and
            select freelance. Pick a 20-minute slot (timezone is converted for
            you), or email if you prefer. Replies within 24 hours.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <ContactMagnet>
              <a
                href={LINKS.calendar}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border-2 border-ink bg-ink px-7 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-paper shadow-brutal transition-colors hover:border-org hover:bg-org"
              >
                Book 20 minutes
              </a>
            </ContactMagnet>
            <a
              href={`mailto:${LINKS.email}?subject=Let%27s%20talk%20hiring`}
              className="inline-block border-2 border-ink px-7 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] transition-colors hover:bg-ink hover:text-paper"
            >
              {LINKS.email}
            </a>
          </div>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-wider text-steel">
            US / EU-friendly hours · timezone handled
          </p>
          <div className="mt-10 flex flex-wrap gap-8 font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-steel">
            <SocialLink network="github" className="transition-colors hover:text-org">
              GitHub ↗
            </SocialLink>
            <SocialLink network="linkedin" className="transition-colors hover:text-org">
              LinkedIn ↗
            </SocialLink>
            <a
              href={PROFILE_PATH}
              className="transition-colors hover:text-org"
            >
              Full profile →
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
        <SiteFooter />
      </section>
      </main>
    </div>
  );
}
