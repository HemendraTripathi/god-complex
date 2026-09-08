import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import WritingIndex from "@/components/WritingIndex";
import {
  OPEN_GRAPH_SITE,
  SHARE_IMAGE,
  breadcrumbJsonLd,
  jsonLdGraph,
  writingCollectionJsonLd,
} from "@/lib/seo";
import { SITE, SITE_URL } from "@/lib/site";
import { getPosts } from "@/sanity/lib/fetch";

const TITLE = "Writing on Leadership & Shipping";
const DESCRIPTION =
  "Essays on technical leadership, choosing the right problem, and how Hemendra Tripathi thinks about engineering.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/writing",
    types: {
      "application/rss+xml": `${SITE_URL}/feed.xml`,
    },
  },
  openGraph: {
    ...OPEN_GRAPH_SITE,
    type: "website",
    title: `${TITLE} · ${SITE.name}`,
    description: DESCRIPTION,
    url: `${SITE_URL}/writing`,
    images: [SHARE_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} · ${SITE.name}`,
    description: DESCRIPTION,
    creator: "@hemendra_tr",
    images: [SHARE_IMAGE.url],
  },
};

export default async function WritingIndexPage() {
  const posts = await getPosts();

  return (
    <div>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SiteNav />
      <JsonLd
        data={jsonLdGraph([
          writingCollectionJsonLd(posts.length),
          breadcrumbJsonLd([
            { name: "Home", item: SITE_URL },
            { name: "Writing", item: `${SITE_URL}/writing` },
          ]),
        ])}
      />

      <main id="main">
        <header className="mx-auto max-w-7xl px-5 pt-28 sm:px-8 sm:pt-36">
          <p className="eyebrow mb-6">Essays & notes</p>
          <h1 className="display text-[clamp(40px,8vw,96px)]">
            Writing
            <span className="mt-1 block text-org">.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-[clamp(18px,2.4vw,24px)] font-medium leading-snug tracking-tight text-steel">
            {DESCRIPTION}
          </p>
        </header>

        <section className="mx-auto mt-16 max-w-7xl px-5 pb-24 sm:px-8 sm:pb-32">
          <div className="flex items-baseline justify-between border-b-2 border-ink pb-3">
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-[11px] font-bold text-org">
                (01)
              </span>
              <h2 className="display text-[clamp(26px,4vw,44px)]">Index</h2>
            </div>
            <span className="eyebrow hidden sm:block">
              {posts.length === 0
                ? "Coming soon"
                : `${String(posts.length).padStart(2, "0")} posts`}
            </span>
          </div>

          {posts.length === 0 ? (
            <p className="mt-10 max-w-xl text-[17px] leading-relaxed text-steel">
              First piece is on the way. Meanwhile,{" "}
              <Link
                href="/#contact"
                prefetch={false}
                className="font-medium text-org underline decoration-org/40 underline-offset-4 hover:decoration-org"
              >
                say hello
              </Link>
              .
            </p>
          ) : (
            <WritingIndex posts={posts} />
          )}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
