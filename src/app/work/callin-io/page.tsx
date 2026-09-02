import type { Metadata } from "next";
import Link from "next/link";
import CaseStudy from "@/components/CaseStudy";
import JsonLd from "@/components/JsonLd";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import {
  CASE_PATH,
  CASE_URL,
  HIRE_PATH,
  SHARE_IMAGE,
  breadcrumbJsonLd,
  caseStudyJsonLd,
  jsonLdGraph,
} from "@/lib/seo";
import { CASE, LINKS, formatMetricValue } from "@/lib/content";
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
        </section>

        <CaseStudy heading={false} />

        <section className="mx-auto max-w-7xl px-5 pb-24 pt-8 sm:px-8">
          <div className="flex flex-wrap items-center gap-4 border-t-2 border-ink pt-10">
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
        </section>

        <SiteFooter />
      </main>
    </div>
  );
}
