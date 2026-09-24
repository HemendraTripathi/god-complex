import type { Metadata } from "next";
import Link from "next/link";
import CaseChapters from "@/components/CaseChapters";
import JsonLd from "@/components/JsonLd";
import MetricTiles from "@/components/MetricTiles";
import MockVisual from "@/components/MockVisual";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import { CALLIN_CASE } from "@/lib/callin-case";
import { CASE, LINKS } from "@/lib/content";
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
            {CASE.product}
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
          <MetricTiles />
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

        <CaseChapters />

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
