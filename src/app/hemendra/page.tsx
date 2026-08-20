import type { Metadata } from "next";
import Link from "next/link";
import BharatMark from "@/components/BharatMark";
import JsonLd from "@/components/JsonLd";
import MockVisual from "@/components/MockVisual";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import SocialLink from "@/components/SocialLink";
import { FIRST_NAME, LINKS } from "@/lib/content";
import {
  FIRST_NAME_PATH,
  PORTRAIT_PATH,
  PROFILE_PATH,
  breadcrumbJsonLd,
  faqJsonLd,
  jsonLdGraph,
  profilePageJsonLd,
} from "@/lib/seo";
import { SITE, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: SITE.firstNameTitle,
  },
  description: SITE.firstNameDescription,
  keywords: ["Hemendra", "Hemendra Udaipur", "Hemendra Callin.io", SITE.name],
  alternates: {
    canonical: FIRST_NAME_PATH,
  },
  openGraph: {
    type: "profile",
    title: SITE.firstNameTitle,
    description: SITE.firstNameDescription,
    url: `${SITE_URL}${FIRST_NAME_PATH}`,
    firstName: "Hemendra",
    lastName: "Tripathi",
    username: "hemendratripathi",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.firstNameTitle,
    description: SITE.firstNameDescription,
  },
};

export default function HemendraPage() {
  return (
    <div>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SiteNav />
      <JsonLd
        data={jsonLdGraph([
          profilePageJsonLd(
            `${SITE_URL}${FIRST_NAME_PATH}`,
            `${SITE_URL}${FIRST_NAME_PATH}#profile`,
          ),
          breadcrumbJsonLd([
            { name: "Home", item: SITE_URL },
            { name: "Hemendra", item: `${SITE_URL}${FIRST_NAME_PATH}` },
          ]),
          faqJsonLd(FIRST_NAME.faqs),
        ])}
      />

      <main id="main">
        <header className="mx-auto max-w-7xl px-5 pt-28 sm:px-8 sm:pt-36">
          <p className="eyebrow mb-6 flex items-center gap-[0.4em]">
            First name · Udaipur, IN <BharatMark />
          </p>
          <h1 className="display text-[clamp(40px,8vw,96px)]">Hemendra</h1>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-wider text-org">
            {SITE.name} · {SITE.jobTitle}
          </p>
          <p className="mt-8 max-w-2xl text-[clamp(18px,2.4vw,24px)] font-medium leading-snug tracking-tight">
            {FIRST_NAME.definition}
          </p>
        </header>

        <section className="mx-auto max-w-7xl px-5 pt-16 sm:px-8">
          <div className="grid items-stretch gap-10 border-t-2 border-ink py-10 md:grid-cols-[240px_1fr]">
            <div className="relative aspect-square md:aspect-auto">
              <MockVisual
                kind="portrait"
                src={PORTRAIT_PATH}
                alt="Hemendra, technical lead and AI engineer in Udaipur"
                aspect=""
                className="absolute inset-0 h-full w-full"
                width={960}
                height={960}
                ready
              />
            </div>
            <dl className="grid h-full sm:grid-cols-2 sm:grid-rows-3 border-2 border-ink">
              {FIRST_NAME.facts.map((fact, i) => (
                <div
                  key={fact.label}
                  className={`flex flex-col justify-center border-hair p-5 ${i % 2 === 1 ? "sm:border-l" : ""} ${i >= 2 ? "border-t" : ""}`}
                >
                  <dt className="font-mono text-[10px] uppercase tracking-wider text-steel">
                    {fact.label}
                  </dt>
                  <dd className="mt-1.5 text-[14px] font-bold tracking-tight">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 className="display border-b-2 border-ink pb-3 text-[clamp(26px,4vw,44px)]">
            Who is Hemendra?
          </h2>
          <div className="max-w-2xl space-y-5 py-8 text-[15px] leading-relaxed text-ink/80">
            {FIRST_NAME.paragraphs.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 className="display border-b-2 border-ink pb-3 text-[clamp(26px,4vw,44px)]">
            Hemendra, in brief
          </h2>
          <dl className="max-w-2xl divide-y divide-hair py-2">
            {FIRST_NAME.faqs.map((item) => (
              <div key={item.question} className="py-6">
                <dt>
                  <h3 className="text-[16px] font-bold tracking-tight">
                    {item.question}
                  </h3>
                </dt>
                <dd className="mt-2 text-[15px] leading-relaxed text-ink/80">
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-4 pt-8 sm:px-8">
          <h2 className="display border-b-2 border-ink pb-3 text-[clamp(26px,4vw,44px)]">
            How to reach Hemendra
          </h2>
          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-ink/80">
            <a
              href={LINKS.calendar}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-ink underline-offset-2 hover:underline"
            >
              Book a 20-minute call
            </a>
            , or email{" "}
            <a
              href={`mailto:${LINKS.email}?subject=Hiring%20conversation`}
              className="font-semibold text-ink underline-offset-2 hover:underline"
            >
              {LINKS.email}
            </a>
            . Timezone is converted for you. Replies within 24 hours. Full bio,
            work history, and case study are one click away.
          </p>
          <div className="mt-8 flex flex-wrap gap-6 font-mono text-[11px] font-bold uppercase tracking-[0.18em]">
            <a
              href={LINKS.calendar}
              target="_blank"
              rel="noopener noreferrer"
              className="text-org hover:underline"
            >
              Book 20 min ↗
            </a>
            <Link href={PROFILE_PATH} className="text-ink hover:text-org">
              Full profile →
            </Link>
            <Link href="/#case" className="text-ink hover:text-org">
              Voice AI case study →
            </Link>
            <SocialLink
              network="github"
              className="text-ink hover:text-org"
            >
              GitHub ↗
            </SocialLink>
            <SocialLink
              network="linkedin"
              className="text-ink hover:text-org"
            >
              LinkedIn ↗
            </SocialLink>
          </div>
        </section>

        <section className="mt-16 border-t-2 border-ink">
          <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
            <p className="max-w-2xl text-[13px] leading-relaxed text-steel">
              Looking for Hemendra the technical lead and AI engineer in Udaipur? This
              is his first-name page. Canonical profile:{" "}
              <Link
                href={PROFILE_PATH}
                className="text-ink underline-offset-2 hover:underline"
              >
                Hemendra Tripathi
              </Link>
              .
            </p>
          </div>
          <SiteFooter />
        </section>
      </main>
    </div>
  );
}
