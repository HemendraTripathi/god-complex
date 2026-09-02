import type { Metadata } from "next";
import Link from "next/link";
import CatMeowButton from "@/components/CatMeowButton";
import JsonLd from "@/components/JsonLd";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import { breadcrumbJsonLd, jsonLdGraph, SHARE_IMAGE } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

const CAT_PATH = "/cat";
const CAT_URL = `${SITE_URL}${CAT_PATH}`;

export const metadata: Metadata = {
  title: "The Arcade Cat",
  description:
    "Once upon a pixel: the tiny black cat that wanders the bottom of this website, meows when you say hi, and has opinions about naps.",
  alternates: { canonical: CAT_PATH },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "The Arcade Cat",
    description:
      "A tiny black cat lives at the bottom of this site. This is its story.",
    url: CAT_URL,
    type: "article",
    images: [SHARE_IMAGE],
  },
  twitter: {
    card: "summary",
    title: "The Arcade Cat",
    description:
      "A tiny black cat lives at the bottom of this site. This is its story.",
    images: [SHARE_IMAGE.url],
  },
};

const SCENES = [
  {
    n: "I",
    title: "How it arrived",
    meow: "mrrp?",
    body: "One night a little black cat slipped out of an old arcade cabinet, shook the dust off its ears, and decided the bottom of this website looked like a perfectly good windowsill. It never asked permission. Cats rarely do.",
  },
  {
    n: "II",
    title: "A day in the life",
    meow: "nyaa",
    body: "Morning is for walking. Midday is for sitting like a loaf and judging strangers. Afternoons are for sudden zooms left to right for no reason. Evenings are for the long stretch, a washed paw, and a nap so serious it needs a tiny Z.",
  },
  {
    n: "III",
    title: "The meow treaty",
    meow: "…",
    body: "It will not talk unprompted. That would be needy. But if you hover, or give it a gentle tap, it meows once — like a secret handshake. Orange eyes. Soft protest. Then back to the important business of existing.",
  },
  {
    n: "IV",
    title: "Favorite things",
    meow: "purr",
    body: "Warm paper-colored floors. The feeling of almost catching a cursor. Being noticed, then pretending it doesn’t care. Being ignored, then walking past you again just to check. And Udaipur sun, somehow, even through a screen.",
  },
  {
    n: "V",
    title: "Why it stays",
    meow: "!!",
    body: "Because every serious place needs one silly guardian. This cat doesn’t sell anything. It doesn’t explain a résumé. It just keeps you company while you scroll — a little black shadow with a big opinion about naps. If you made it here, it already likes you.",
  },
] as const;

export default function CatPage() {
  return (
    <div className="cat-page">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SiteNav />
      <JsonLd
        data={jsonLdGraph([
          breadcrumbJsonLd([
            { name: "Home", item: SITE_URL },
            { name: "The Arcade Cat", item: CAT_URL },
          ]),
          {
            "@type": "WebPage",
            "@id": `${CAT_URL}#webpage`,
            url: CAT_URL,
            name: "The Arcade Cat",
            description:
              "A short, silly story about the black arcade cat on this website.",
            isPartOf: { "@id": `${SITE_URL}/#website` },
          },
        ])}
      />

      <main id="main">
        {/* Hero — one composition: brand cat + floor world */}
        <header className="cat-hero relative overflow-hidden border-b-2 border-ink">
          <div className="cat-hero-grid absolute inset-0" aria-hidden="true" />
          <div className="relative mx-auto max-w-7xl px-5 pb-12 pt-28 sm:px-8 sm:pb-14 sm:pt-32">
            <p className="eyebrow mb-5 inline-flex items-center gap-2">
              <span className="blink h-1.5 w-1.5 bg-org" aria-hidden="true" />
              A tiny story · Extremely canon
            </p>

            <div>
              <h1 className="display leading-[0.88] text-[clamp(52px,12vw,140px)]">
                THE
                <br />
                <span className="text-org">ARCADE</span>
                <br />
                CAT
              </h1>
              <p className="mt-6 max-w-md text-[clamp(16px,2vw,20px)] font-medium leading-snug tracking-tight text-ink/85">
                It doesn’t work here. It just lives here — black pixels,
                orange eyes, professional napper.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <CatMeowButton label="Pet me → meow" />
                <a
                  href="#story"
                  className="inline-flex h-11 items-center border-2 border-ink px-5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] transition-colors hover:bg-ink hover:text-paper"
                >
                  Read the story
                </a>
              </div>
            </div>
          </div>

          <div className="cat-marquee border-t-2 border-ink bg-ink" aria-hidden="true">
            <div className="cat-marquee-track">
              {Array.from({ length: 12 }).map((_, i) => (
                <span key={i}>
                  MRRP <span className="text-org">✦</span> NYA{" "}
                  <span className="text-org">✦</span> PURR{" "}
                  <span className="text-org">✦</span>
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* Cat monologue bubble */}
        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
          <figure className="cat-bubble-block mx-auto max-w-2xl">
            <blockquote className="cat-bubble">
              <p>
                “I came for the windowsill. I stayed because the floor is warm
                and someone keeps almost giving me the cursor.”
              </p>
            </blockquote>
            <figcaption className="mt-4 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-steel">
              — the cat, probably
            </figcaption>
          </figure>
        </section>

        {/* Story as zigzag comic scenes */}
        <section id="story" className="border-t-2 border-ink">
          <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
              <h2 className="display text-[clamp(32px,6vw,64px)]">
                Once upon
                <br />
                <span className="text-org">a pixel</span>
              </h2>
              <p className="max-w-xs font-mono text-[11px] uppercase tracking-[0.16em] text-steel">
                Five soft scenes. No résumé. Only vibes.
              </p>
            </div>

            <div className="cat-scenes">
              {SCENES.map((scene, i) => {
                const flip = i % 2 === 1;
                return (
                  <article
                    key={scene.n}
                    className={`cat-scene ${flip ? "cat-scene--flip" : ""}`}
                  >
                    <div className="cat-scene-rail" aria-hidden="true">
                      <span className="cat-paw" />
                      {i < SCENES.length - 1 ? (
                        <span className="cat-rail-line" />
                      ) : null}
                    </div>

                    <div className="cat-scene-panel">
                      <div className="flex flex-wrap items-baseline justify-between gap-3 border-b-2 border-ink pb-3">
                        <span className="font-mono text-[12px] font-bold text-org">
                          Scene {scene.n}
                        </span>
                        <span className="cat-chip">{scene.meow}</span>
                      </div>
                      <h3 className="display mt-5 text-[clamp(26px,4vw,40px)]">
                        {scene.title}
                      </h3>
                      <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-ink/80 sm:text-[17px]">
                        {scene.body}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* House rules — playful list */}
        <section className="border-t-2 border-ink bg-ink text-paper">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-org">
                House rules
              </p>
              <h2 className="display mt-4 text-[clamp(28px,5vw,48px)] text-paper">
                How to be
                <br />
                a good guest
              </h2>
            </div>
            <ul className="cat-rules">
              <li>
                <span>01</span> Look down. That’s not a bug — that’s staff.
              </li>
              <li>
                <span>02</span> Hover softly. Tap once. Celebrate the meow.
              </li>
              <li>
                <span>03</span> Double-click the cat to return to this page.
              </li>
              <li>
                <span>04</span> Do not offer it pineapple on pizza. It has
                standards.
              </li>
            </ul>
          </div>
        </section>

        {/* Closing */}
        <section className="relative overflow-hidden border-t-2 border-ink">
          <div className="cat-hero-grid absolute inset-0 opacity-60" aria-hidden="true" />
          <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-org">
              The end?
            </p>
            <h2 className="display mt-4 max-w-3xl text-[clamp(32px,6vw,72px)] leading-[0.95]">
              Not really.
              <br />
              It’s still
              <span className="text-org"> down there.</span>
            </h2>
            <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-ink/80">
              Go say hi. Then wander home whenever the nap energy runs out.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <CatMeowButton label="One more meow" />
              <Link
                href="/"
                className="inline-flex h-11 items-center border-2 border-ink bg-ink px-5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-paper transition-colors hover:border-org hover:bg-org"
              >
                Back home
              </Link>
              <Link
                href="/hemendra-tripathi"
                className="inline-flex h-11 items-center border-2 border-ink px-5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] transition-colors hover:bg-ink hover:text-paper"
              >
                Meet the human
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
