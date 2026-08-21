import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import PostBody from "@/components/PostBody";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import {
  blogPostingJsonLd,
  breadcrumbJsonLd,
  jsonLdGraph,
} from "@/lib/seo";
import { SITE, SITE_URL } from "@/lib/site";
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
        <article className="mx-auto max-w-7xl px-5 pt-28 pb-24 sm:px-8 sm:pt-36 sm:pb-32">
          <Link
            href="/writing"
            className="inline-flex items-center gap-2 font-mono text-[10.5px] font-bold uppercase tracking-[0.18em] text-steel transition-colors hover:text-org"
          >
            <span aria-hidden="true">←</span> Writing
          </Link>

          <header className="mt-10 max-w-3xl">
            <p className="eyebrow mb-6">
              {formatDate(post.publishedAt)}
              {post.tags?.length ? ` · ${post.tags.slice(0, 3).join(" · ")}` : ""}
            </p>
            <h1 className="display text-[clamp(32px,6vw,64px)]">{post.title}</h1>
            {post.excerpt ? (
              <p className="mt-6 max-w-2xl text-[clamp(18px,2.2vw,22px)] font-medium leading-snug tracking-tight text-steel">
                {post.excerpt}
              </p>
            ) : null}
          </header>

          {coverSrc ? (
            <figure className="mt-12 border-2 border-ink">
              <Image
                src={coverSrc}
                alt={post.coverImage?.alt || post.title}
                width={1600}
                height={900}
                className="h-auto w-full"
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
            </figure>
          ) : null}

          <div className="mt-14">
            <PostBody value={post.body} />
          </div>

          <footer className="mt-16 max-w-[65ch] border-t-2 border-ink pt-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-steel">
              Written by {SITE.name}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/writing"
                className="inline-flex h-9 items-center border-2 border-ink px-4 font-mono text-[10px] font-bold uppercase tracking-[0.18em] transition-colors hover:bg-ink hover:text-paper"
              >
                All writing
              </Link>
              <Link
                href="/#contact"
                className="inline-flex h-9 items-center border-2 border-ink bg-ink px-4 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-paper transition-colors hover:border-org hover:bg-org"
              >
                Get in touch
              </Link>
            </div>
          </footer>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
