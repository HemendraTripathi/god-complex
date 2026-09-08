import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import ArchitectureFlow from "@/components/ArchitectureFlow";
import { SectionHead } from "@/components/CaseStudy";
import JsonLd from "@/components/JsonLd";
import MockVisual from "@/components/MockVisual";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import { CALLIN_CASE, CASE_STUDY_STACK } from "@/lib/callin-case";
import { CASE, LINKS, formatMetricValue } from "@/lib/content";
import {
  CASE_PATH,
  CASE_URL,
  HIRE_PATH,
  OPEN_GRAPH_SITE,
  SHARE_IMAGE,
  breadcrumbJsonLd,
  caseStudyJsonLd,
  jsonLdGraph,
} from "@/lib/seo";
import { SITE, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: `${SITE.caseTitle} · ${SITE.name}`,
  },
  description: SITE.caseDescription,
  alternates: {
    canonical: CASE_PATH,
  },
  openGraph: {
    ...OPEN_GRAPH_SITE,
    type: "article",
    title: SITE.caseTitle,
    description: SITE.caseDescription,
    url: CASE_URL,
    images: [SHARE_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.caseTitle,
    description: SITE.caseDescription,
    creator: "@hemendra_tr",
    images: [SHARE_IMAGE.url],
  },
};

function MetricsBoard() {
  return (
    <dl className="grid grid-cols-2 border-2 border-ink sm:grid-cols-4">
      {CASE.metrics.map((m, i) => (
        <div
          key={m.label}
          className={`border-hair p-4 sm:p-5 ${i > 0 ? "border-l" : ""} ${i >= 2 ? "max-sm:border-t" : ""}`}
        >
          <dt className="font-mono text-[9.5px] uppercase tracking-wider text-steel">
            {m.label}
          </dt>
          <dd className="mt-1.5 font-mono text-[clamp(22px,3.2vw,30px)] font-bold tracking-tight">
            {formatMetricValue(m)}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function Prose({ children }: { children: ReactNode }) {
  return (
    <p className="mt-5 max-w-3xl text-[16px] leading-[1.7] text-ink/85 first:mt-0">
      {children}
    </p>
  );
}

function HireCtas() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Link
        href={HIRE_PATH}
        className="inline-block border-2 border-ink bg-ink px-7 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-paper shadow-brutal transition-colors hover:border-org hover:bg-org"
      >
        Hire this lead →
      </Link>
      <a
        href={LINKS.calendar}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block border-2 border-ink px-7 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] transition-colors hover:bg-ink hover:text-paper"
      >
        Book 20 minutes
      </a>
    </div>
  );
}

export default function CallinCaseStudyPage() {
  return (
    <div>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SiteNav />
      <JsonLd
        data={jsonLdGraph([
          caseStudyJsonLd(),
          breadcrumbJsonLd([
            { name: "Home", item: SITE_URL },
            { name: "Callin.io case study", item: CASE_URL },
          ]),
        ])}
      />

      <main id="main">
        <header className="mx-auto max-w-7xl px-5 pt-28 sm:px-8 sm:pt-36">
          <p className="eyebrow mb-6">{CASE.product} · production voice AI</p>
          <h1 className="display text-[clamp(40px,7vw,84px)] leading-[0.95]">
            Callin.io
            <span className="mt-1 block text-org">voice AI case study</span>
          </h1>
          <p className="mt-8 max-w-2xl text-[clamp(18px,2.4vw,24px)] font-medium leading-snug tracking-tight">
            {SITE.caseDescription}
          </p>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-ink/75">
            This is the canonical write-up of the work: complexity-aware
            multi-LLM routing, dual-carrier telephony, and usage ledgers precise
            enough that billing disputes stayed near zero. If you are hiring an
            AI Voice Engineer or technical lead, start here, then{" "}
            <Link
              href={HIRE_PATH}
              className="font-semibold text-ink underline-offset-2 hover:underline"
            >
              book 20 minutes
            </Link>
            .
          </p>
        </header>

        <section className="mx-auto max-w-7xl px-5 pt-12 sm:px-8">
          <MetricsBoard />
        </section>

        <section className="mx-auto max-w-7xl px-5 pt-10 sm:px-8">
          <div className="grid gap-10 border-b-2 border-ink py-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="flex flex-col justify-center">
              <div className="eyebrow mb-3">Live turn</div>
              <p className="max-w-xl text-[clamp(22px,3vw,34px)] font-bold leading-[1.15] tracking-tight">
                {CALLIN_CASE.demoKicker}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
                <a
                  href={LINKS.callin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-org underline-offset-4 hover:underline"
                >
                  callin.io ↗
                </a>
                <Link
                  href={HIRE_PATH}
                  className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-ink underline-offset-4 hover:text-org hover:underline"
                >
                  Hire / Book 20 min →
                </Link>
              </div>
            </div>
            <MockVisual
              kind="callin"
              src="/images/work-callin.png"
              alt="Callin.io voice AI agent, live medical intake call with multi-LLM routing"
            />
          </div>
        </section>

        <article className="mx-auto max-w-7xl px-5 pt-20 sm:px-8">
          <Prose>{CALLIN_CASE.lede}</Prose>

          <section className="pt-16">
            <SectionHead idx="01" title="Context" right="Appspundit · US / EU" />
            <div className="pt-8">
              <Prose>{CALLIN_CASE.context}</Prose>
            </div>
          </section>

          <section className="pt-16">
            <SectionHead idx="02" title="The product" right="Multi-tenant SaaS" />
            <div className="pt-8">
              <Prose>{CALLIN_CASE.product[0]}</Prose>
              <Prose>
                The builder, the campaign tools, and the numbers are the product
                they click. Under that, every call still hits the same owned
                path: telephony in, orchestrator, one of three runtimes, voice
                out, minutes on the clock. I am not dropping a fake screenshot of
                the builder. You can see the product at{" "}
                <a
                  href={LINKS.callin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-ink underline-offset-2 hover:underline"
                >
                  callin.io
                </a>
                . This page is the system under it.
              </Prose>
              <div className="mt-8 flex flex-wrap gap-2">
                {CASE_STUDY_STACK.map((s) => (
                  <span
                    key={s}
                    className="border border-ink px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section className="pt-16">
            <SectionHead idx="03" title="Architecture" right="Five hops we own" />
            <div className="pt-8">
              <Prose>{CALLIN_CASE.architecture[0]}</Prose>
              <div className="mt-8">
                <ArchitectureFlow />
              </div>
              {CALLIN_CASE.architecture.slice(1).map((p) => (
                <Prose key={p}>{p}</Prose>
              ))}
            </div>
          </section>

          <section className="pt-16">
            <SectionHead
              idx="04"
              title="Three production failures"
              right="Problem → decision → outcome"
            />
            <div className="pt-8">
              <Prose>{CALLIN_CASE.storiesIntro}</Prose>
              {CALLIN_CASE.stories.map((story) => (
                <section
                  key={story.idx}
                  className="mt-12 border-t-2 border-ink pt-10 first:mt-8"
                >
                  <h3 className="flex flex-wrap items-baseline gap-x-4 gap-y-2 text-[clamp(20px,2.6vw,28px)] font-bold tracking-tight">
                    <span className="font-mono text-[12px] font-bold text-org">
                      {story.idx}.
                    </span>
                    {story.title}
                  </h3>
                  {story.body.map((p) => (
                    <Prose key={p}>{p}</Prose>
                  ))}
                </section>
              ))}
            </div>
          </section>

          <section className="pt-16">
            <SectionHead idx="05" title="Results" right="Same four numbers" />
            <div className="pt-8">
              <Prose>{CALLIN_CASE.results[0]}</Prose>
              <div className="mt-8">
                <MetricsBoard />
              </div>
              {CALLIN_CASE.results.slice(1).map((p) => (
                <Prose key={p}>{p}</Prose>
              ))}
            </div>
          </section>

          <section className="pt-16">
            <SectionHead idx="06" title="What I’d do next" right="Non-sensitive" />
            <div className="pt-8">
              <Prose>{CALLIN_CASE.next}</Prose>
            </div>
          </section>
        </article>

        <section className="mx-auto max-w-7xl px-5 pb-24 pt-16 sm:px-8">
          <div className="border-t-2 border-ink pt-10">
            <p className="mb-8 max-w-3xl text-[16px] leading-[1.7] text-ink/85">
              {CALLIN_CASE.close}
            </p>
            <HireCtas />
          </div>
        </section>

        <SiteFooter />
      </main>
    </div>
  );
}
