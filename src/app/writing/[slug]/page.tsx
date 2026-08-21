import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import PostBody from "@/components/PostBody";
import PostShare from "@/components/PostShare";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import WritingToc from "@/components/WritingToc";
import {
  blogPostingJsonLd,
  breadcrumbJsonLd,
  jsonLdGraph,
} from "@/lib/seo";
import { SITE, SITE_URL } from "@/lib/site";
import { getWritingToc } from "@/lib/writing";
import { getPost, getPostSlugs } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getPostSlugs();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  const title = post.seoTitle || post.title;
  const description =
    post.seoDescription || post.excerpt || SITE.shortDescription;
  const url = `${SITE_URL}/writing/${post.slug}`;
  const ogImage = post.coverImage?.asset
    ? urlFor(post.coverImage).width(1200).height(630).fit("crop").url()
    : undefined;

  return {
    title,
    description,
    alternates: {
      canonical: `/writing/${post.slug}`,
    },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      publishedTime: post.publishedAt,
      authors: [SITE.name],
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@hemendra_tr",
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}

export default async function WritingPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const coverSrc = post.coverImage?.asset
    ? urlFor(post.coverImage).width(1600).fit("max").url()
    : null;
  const toc = getWritingToc(post.body);
  const postUrl = `${SITE_URL}/writing/${post.slug}`;
  const shareTitle = post.seoTitle || post.title;

  return (
    <div>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SiteNav />
      <JsonLd
        data={jsonLdGraph([
          blogPostingJsonLd({
            title: post.seoTitle || post.title,
            description:
              post.seoDescription || post.excerpt || SITE.shortDescription,
            url: `${SITE_URL}/writing/${post.slug}`,
            publishedAt: post.publishedAt,
            imageUrl: coverSrc ?? undefined,
            tags: post.tags,
          }),
          breadcrumbJsonLd([
            { name: "Home", item: SITE_URL },
            { name: "Writing", item: `${SITE_URL}/writing` },
            {
              name: post.title,
              item: `${SITE_URL}/writing/${post.slug}`,
            },
          ]),
        ])}
      />

      <main id="main">
        <article>
          <header className="border-b-2 border-ink">
            <div className="mx-auto max-w-7xl px-5 pt-28 pb-12 sm:px-8 sm:pt-36 sm:pb-16">
              <Link
                href="/writing"
                className="inline-flex items-center gap-2 font-mono text-[10.5px] font-bold uppercase tracking-[0.18em] text-steel transition-colors hover:text-org"
              >
                <span aria-hidden="true">←</span> Writing
              </Link>

              <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[10.5px] font-bold uppercase tracking-[0.18em]">
                <time dateTime={post.publishedAt} className="text-org">
                  {formatDate(post.publishedAt)}
                </time>
                {post.tags?.length ? (
                  <>
                    <span className="text-hair" aria-hidden="true">
                      /
                    </span>
                    <ul className="flex flex-wrap gap-x-3 gap-y-1 text-steel">
                      {post.tags.slice(0, 4).map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                  </>
                ) : null}
              </div>

              <h1 className="display mt-6 max-w-4xl text-[clamp(32px,6.5vw,68px)]">
                {post.title}
              </h1>

              {post.excerpt ? (
                <p className="mt-8 max-w-2xl border-l-2 border-org pl-5 text-[clamp(18px,2.2vw,22px)] font-medium leading-snug tracking-tight text-steel">
                  {post.excerpt}
                </p>
              ) : null}

              <div className="mt-10 lg:hidden">
                <PostShare url={postUrl} title={shareTitle} />
              </div>
            </div>
          </header>

          {coverSrc ? (
            <div className="border-b-2 border-ink">
              <figure className="mx-auto max-w-7xl">
                <Image
                  src={coverSrc}
                  alt={post.coverImage?.alt || post.title}
                  width={1600}
                  height={900}
                  className="h-auto w-full"
                  priority
                  sizes="100vw"
                />
              </figure>
            </div>
          ) : null}

          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,11rem)_minmax(0,42rem)_minmax(0,14rem)] lg:justify-between lg:gap-10 xl:grid-cols-[minmax(0,12rem)_minmax(0,42rem)_minmax(0,16rem)]">
            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-8">
                <div className="space-y-6">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-steel">
                    Essay
                  </p>
                  <div className="h-16 w-0.5 bg-org" aria-hidden="true" />
                  <p className="max-w-[11rem] font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-steel">
                    {SITE.jobTitle}
                  </p>
                </div>
                <PostShare
                  url={postUrl}
                  title={shareTitle}
                  variant="icons"
                />
              </div>
            </aside>

            <div className="min-w-0">
              <div className="mb-10 lg:hidden">
                <WritingToc items={toc} />
              </div>

              <PostBody value={post.body} toc={toc} />

              <footer className="mt-16 border-t-2 border-ink pt-8">
                <PostShare url={postUrl} title={shareTitle} />

                <div className="mt-10 flex flex-col gap-6 border-t border-hair pt-8 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-org">
                      Author
                    </p>
                    <p className="mt-2 text-lg font-bold tracking-tight">
                      {SITE.name}
                    </p>
                    <p className="mt-1 max-w-sm text-[14px] leading-relaxed text-steel">
                      Technical lead and AI engineer. Builds voice systems that
                      stay up in production.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/writing"
                      className="inline-flex h-10 items-center border-2 border-ink px-4 font-mono text-[10px] font-bold uppercase tracking-[0.18em] transition-colors hover:bg-ink hover:text-paper"
                    >
                      All writing
                    </Link>
                    <Link
                      href="/#contact"
                      className="inline-flex h-10 items-center border-2 border-ink bg-ink px-4 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-paper transition-colors hover:border-org hover:bg-org"
                    >
                      Get in touch
                    </Link>
                  </div>
                </div>
              </footer>
            </div>

            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <WritingToc items={toc} />
              </div>
            </aside>
          </div>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
