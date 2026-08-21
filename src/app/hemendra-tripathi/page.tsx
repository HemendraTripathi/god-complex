import type { Metadata } from "next";
import Link from "next/link";
import BharatMark from "@/components/BharatMark";
import JsonLd from "@/components/JsonLd";
import MockVisual from "@/components/MockVisual";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import SocialLink from "@/components/SocialLink";
import { EXPERIENCE, LINKS, PROFILE } from "@/lib/content";
import {
  PORTRAIT_PATH,
  PROFILE_PATH,
  breadcrumbJsonLd,
  jsonLdGraph,
  profilePageJsonLd,
} from "@/lib/seo";
import { SITE, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: SITE.profileTitle,
  },
  description: SITE.profileDescription,
  alternates: {
    canonical: PROFILE_PATH,
  },
  openGraph: {
    type: "profile",
    title: SITE.profileTitle,
    description: SITE.profileDescription,
    url: `${SITE_URL}${PROFILE_PATH}`,
    firstName: "Hemendra",
    lastName: "Tripathi",
    username: "hemendratripathi",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.profileTitle,
    description: SITE.profileDescription,
    creator: "@hemendra_tr",
  },
};

export default function HemendraTripathiPage() {
  return (
    <div>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SiteNav />
      <JsonLd
        data={jsonLdGraph([
          profilePageJsonLd(
            `${SITE_URL}${PROFILE_PATH}`,
            `${SITE_URL}${PROFILE_PATH}#profile`,
          ),
          breadcrumbJsonLd(),
        ])}
      />

      <main id="main">
        <header className="mx-auto max-w-7xl px-5 pt-28 sm:px-8 sm:pt-36">
          <p className="eyebrow mb-6 flex items-center gap-[0.4em]">
            Official profile · Udaipur, IN <BharatMark />
          </p>
          <h1 className="display text-[clamp(40px,8vw,96px)]">
            Hemendra
            <span className="mt-1 block text-org">Tripathi</span>
          </h1>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-wider text-org">
            {SITE.jobTitle} · Callin.io
          </p>
          <p
            id="who-is-hemendra-tripathi"
            className="mt-8 max-w-2xl text-[clamp(18px,2.4vw,24px)] font-medium leading-snug tracking-tight"
          >
            {PROFILE.definition}
          </p>
        </header>

        <section className="mx-auto max-w-7xl px-5 pt-16 sm:px-8">
          <div className="grid items-stretch gap-10 border-t-2 border-ink py-10 md:grid-cols-[240px_1fr]">
            <div className="relative aspect-square md:aspect-auto">
              <MockVisual
                kind="portrait"
                src={PORTRAIT_PATH}
                alt="Hemendra Tripathi, technical lead and AI engineer in Udaipur"
                aspect=""
                className="absolute inset-0 h-full w-full"
                width={960}
                height={960}
                ready
              />
            </div>
            <dl className="grid h-full sm:grid-cols-2 sm:grid-rows-3 border-2 border-ink">
              {PROFILE.facts.map((fact, i) => (
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
            Who is Hemendra Tripathi?
          </h2>
          <div className="max-w-2xl space-y-5 py-8 text-[15px] leading-relaxed text-ink/80">
            {PROFILE.paragraphs.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 className="display border-b-2 border-ink pb-3 text-[clamp(26px,4vw,44px)]">
            Work history
          </h2>
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
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-4 pt-8 sm:px-8">
          <h2 className="display border-b-2 border-ink pb-3 text-[clamp(26px,4vw,44px)]">
            How to reach Hemendra Tripathi
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
            . Timezone is converted for you. Replies within 24 hours. Open to
            technical-lead, AI engineer, and senior full-stack roles, plus
            select freelance.
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
            <Link href="/#case" prefetch={false} className="text-ink hover:text-org">
              Voice AI case study →
            </Link>
            <SocialLink network="github" className="text-[16px] text-ink hover:text-org" />
            <SocialLink network="linkedin" className="text-[16px] text-ink hover:text-org" />
            <SocialLink network="twitter" className="text-[16px] text-ink hover:text-org" />
            <a href={LINKS.resume} download className="text-ink hover:text-org">
              Résumé ↓
            </a>
          </div>
        </section>

        <section className="mt-16 border-t-2 border-ink">
          <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
            <p className="max-w-2xl text-[13px] leading-relaxed text-steel">
              Looking for Hemendra Tripathi the technical lead and AI engineer in
              Udaipur? You are on his official profile. First-name page:{" "}
              <Link
                href="/hemendra"
                className="text-ink underline-offset-2 hover:underline"
              >
                Hemendra
              </Link>
              . Portfolio and case study at{" "}
              <Link
                href="/"
                prefetch={false}
                className="text-ink underline-offset-2 hover:underline"
              >
                me.readwith.io
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
