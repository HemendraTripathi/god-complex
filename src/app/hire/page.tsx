import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import {
  CASE_PATH,
  HIRE_PATH,
  HIRE_URL,
  SHARE_IMAGE,
  breadcrumbJsonLd,
  faqJsonLd,
  jsonLdGraph,
  webPageJsonLd,
} from "@/lib/seo";
import { CASE, FAQS, HIRE, LINKS, formatMetricValue } from "@/lib/content";
import { SITE, SITE_URL } from "@/lib/site";

const HIRE_FAQS = FAQS.filter((item) =>
  /hire|available|AI Voice Engineer/i.test(item.question),
);

export const metadata: Metadata = {
  title: {
    absolute: `${SITE.hireTitle} | ${SITE.name}`,
  },
  description: SITE.hireDescription,
  alternates: {
    canonical: HIRE_PATH,
  },
  openGraph: {
    type: "website",
    title: SITE.hireTitle,
    description: SITE.hireDescription,
    url: HIRE_URL,
    images: [SHARE_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.hireTitle,
    description: SITE.hireDescription,
    creator: "@hemendra_tr",
    images: [SHARE_IMAGE.url],
  },
};

export default function HirePage() {
  return (
    <div>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SiteNav />
      <JsonLd
        data={jsonLdGraph([
          webPageJsonLd({
            url: HIRE_URL,
            pageId: `${HIRE_URL}#webpage`,
            name: SITE.hireTitle,
            description: SITE.hireDescription,
          }),
          breadcrumbJsonLd([
            { name: "Home", item: SITE_URL },
            { name: "Hire", item: HIRE_URL },
          ]),
          faqJsonLd(HIRE_FAQS),
        ])}
      />

      <main id="main">
        <header className="mx-auto max-w-7xl px-5 pt-28 sm:px-8 sm:pt-36">
          <p className="eyebrow mb-6">{HIRE.eyebrow}</p>
          <h1 className="display text-[clamp(40px,7vw,84px)] leading-[0.95]">
            Hire an
            <span className="mt-1 block text-org">AI Voice Engineer</span>
          </h1>
          <p className="mt-8 max-w-2xl text-[clamp(18px,2.4vw,24px)] font-medium leading-snug tracking-tight">
            {HIRE.lede}
          </p>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-wider text-steel">
            {SITE.name} · {SITE.jobTitle} · Udaipur, IN · US / EU teams
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={LINKS.calendar}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border-2 border-ink bg-ink px-7 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-paper shadow-brutal transition-colors hover:border-org hover:bg-org"
            >
              Book 20 minutes
            </a>
            <a
              href={`mailto:${LINKS.email}?subject=Hiring%20an%20AI%20Voice%20Engineer`}
              className="inline-block border-2 border-ink px-7 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] transition-colors hover:bg-ink hover:text-paper"
            >
              {LINKS.email}
            </a>
          </div>
        </header>

        <section className="mx-auto max-w-7xl px-5 pt-16 sm:px-8">
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

        <section className="mx-auto max-w-7xl px-5 pt-24 sm:px-8">
          <h2 className="display border-b-2 border-ink pb-3 text-[clamp(26px,4vw,44px)]">
            What this hire is for
          </h2>
          <div className="grid border-2 border-t-0 border-ink sm:grid-cols-3">
            {HIRE.fits.map((item, i) => (
              <div
                key={item.title}
                className={`border-hair p-6 ${i > 0 ? "sm:border-l max-sm:border-t" : ""}`}
              >
                <h3 className="text-[16px] font-bold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-ink/75">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pt-24 sm:px-8">
          <h2 className="display border-b-2 border-ink pb-3 text-[clamp(26px,4vw,44px)]">
            Proof, not a deck
          </h2>
          <p className="mt-8 max-w-2xl text-[15px] leading-relaxed text-ink/80">
            The Callin.io case study is the résumé: 1,500+ paying customers,
            ~20% lower LLM inference cost, typical voice TTFT near 420ms, and
            billing disputes near zero after launch. Read it before we talk.
          </p>
          <Link
            href={CASE_PATH}
            className="mt-6 inline-block font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-org underline-offset-4 hover:underline"
          >
            Callin.io voice AI case study →
          </Link>
        </section>

        <section className="mx-auto max-w-7xl px-5 pt-24 sm:px-8">
          <h2 className="display border-b-2 border-ink pb-3 text-[clamp(26px,4vw,44px)]">
            Not a fit
          </h2>
          <ul className="max-w-2xl divide-y divide-hair">
            {HIRE.notFor.map((item) => (
              <li
                key={item}
                className="flex gap-3 py-4 text-[14px] leading-relaxed text-ink/80"
              >
                <span className="mt-[9px] h-px w-4 shrink-0 bg-org" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mx-auto max-w-7xl px-5 pt-24 sm:px-8">
          <h2 className="display border-b-2 border-ink pb-3 text-[clamp(26px,4vw,44px)]">
            FAQ
          </h2>
          <div className="divide-y-2 divide-ink border-2 border-t-0 border-ink">
            {HIRE_FAQS.map((item) => (
              <div key={item.question} className="px-5 py-5 sm:px-7">
                <h3 className="text-[clamp(15px,1.8vw,18px)] font-bold tracking-tight">
                  {item.question}
                </h3>
                <p className="mt-3 max-w-3xl text-[14px] leading-relaxed text-ink/80">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-24 border-t-2 border-ink">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
            <p className="eyebrow mb-6">Next step</p>
            <h2 className="display text-[clamp(32px,6vw,64px)]">Book 20 minutes.</h2>
            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-ink/75">
              Timezone is converted for you. Replies within 24 hours. Bring the
              problem, not a spec. The case study and résumé are ready if you
              want them first.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={LINKS.calendar}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border-2 border-ink bg-ink px-7 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-paper shadow-brutal transition-colors hover:border-org hover:bg-org"
              >
                Book 20 minutes
              </a>
              <Link
                href={CASE_PATH}
                className="inline-block border-2 border-ink px-7 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] transition-colors hover:bg-ink hover:text-paper"
              >
                Read the case study
              </Link>
            </div>
          </div>
          <SiteFooter />
        </section>
      </main>
    </div>
  );
}
