import Link from "next/link";
import WritingCover from "@/components/WritingCover";
import { urlFor } from "@/sanity/lib/image";
import type { PostCard } from "@/sanity/lib/types";

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}

function coverSrc(image: PostCard["coverImage"], width: number) {
  if (!image?.asset) return null;
  return urlFor(image).width(width).fit("max").url();
}

function indexLabel(i: number) {
  return String(i + 1).padStart(2, "0");
}

function PostTags({ tags }: { tags?: string[] }) {
  if (!tags?.length) return null;
  return (
    <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[10.5px] font-bold uppercase tracking-[0.18em] text-steel">
      {tags.slice(0, 3).map((tag) => (
        <span key={tag}>{tag}</span>
      ))}
    </p>
  );
}

function FeaturedPost({ post }: { post: PostCard }) {
  const index = indexLabel(0);
  const src = coverSrc(post.coverImage, 1280);

  return (
    <Link
      href={`/writing/${post.slug}`}
      className="group grid gap-8 py-10 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-10 lg:gap-14"
    >
      <div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="font-mono text-[11px] font-bold text-org">
            {index}
          </span>
          <span className="eyebrow">Latest</span>
        </div>
        <time
          dateTime={post.publishedAt}
          className="mt-6 block font-mono text-[11px] uppercase tracking-[0.18em] text-steel"
        >
          {formatDate(post.publishedAt)}
        </time>
        <h3 className="mt-3 max-w-xl text-[clamp(26px,4vw,42px)] font-bold leading-[1.12] tracking-tight transition-colors group-hover:text-org">
          {post.title}
        </h3>
        {post.excerpt ? (
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink/80">
            {post.excerpt}
          </p>
        ) : null}
        <PostTags tags={post.tags} />
        <span className="mt-6 inline-block font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-org motion-safe:transition-transform motion-safe:group-hover:translate-x-1">
          Read essay →
        </span>
      </div>
      <WritingCover
        src={src}
        index={index}
        preload
        sizes="(min-width: 1024px) 42vw, 100vw"
      />
    </Link>
  );
}

function PostRow({ post, i }: { post: PostCard; i: number }) {
  const index = indexLabel(i);
  const src = coverSrc(post.coverImage, 640);

  return (
    <Link
      href={`/writing/${post.slug}`}
      className="group grid gap-6 py-10 md:grid-cols-[56px_1fr_280px] md:items-start md:gap-10"
    >
      <span className="font-mono text-[12px] font-bold text-org">{index}</span>
      <div className="min-w-0">
        <time
          dateTime={post.publishedAt}
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-steel"
        >
          {formatDate(post.publishedAt)}
        </time>
        <h3 className="mt-2 text-[clamp(20px,2.6vw,28px)] font-bold tracking-tight transition-colors group-hover:text-org">
          {post.title}
        </h3>
        {post.excerpt ? (
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-steel">
            {post.excerpt}
          </p>
        ) : null}
        <PostTags tags={post.tags} />
      </div>
      <WritingCover
        src={src}
        index={index}
        className="md:self-start"
        sizes="(min-width: 768px) 280px, 100vw"
      />
    </Link>
  );
}

export default function WritingIndex({ posts }: { posts: PostCard[] }) {
  return (
    <ul>
      {posts.map((post, i) => (
        <li
          key={post._id}
          className={
            i === 0
              ? posts.length > 1
                ? "border-b-2 border-ink"
                : undefined
              : "border-b border-hair last:border-none"
          }
        >
          {i === 0 ? <FeaturedPost post={post} /> : <PostRow post={post} i={i} />}
        </li>
      ))}
    </ul>
  );
}
