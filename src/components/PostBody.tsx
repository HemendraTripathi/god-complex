import {
  PortableText,
  type PortableTextComponents,
  type PortableTextBlock,
} from "next-sanity";
import ZoomableImage from "@/components/ZoomableImage";
import type { WritingTocItem } from "@/lib/writing";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImage } from "@/sanity/lib/types";

function buildComponents(tocByKey: Map<string, WritingTocItem>): PortableTextComponents {
  return {
    block: {
      h2: ({ children, value }) => {
        const item = value?._key ? tocByKey.get(value._key) : undefined;
        const idx = String(item?.index ?? 0).padStart(2, "0");
        return (
          <h2
            id={item?.id}
            className="writing-h2 mt-14 scroll-mt-28 first:mt-0"
          >
            <span className="writing-h2-idx" aria-hidden="true">
              ({idx})
            </span>
            <span className="writing-h2-title">{children}</span>
          </h2>
        );
      },
      h3: ({ children }) => (
        <h3 className="mt-10 border-l-2 border-org pl-4 text-[clamp(18px,2.2vw,22px)] font-bold tracking-tight text-ink">
          {children}
        </h3>
      ),
      h4: ({ children }) => (
        <h4 className="mt-8 font-mono text-[12px] font-bold uppercase tracking-[0.18em] text-org">
          {children}
        </h4>
      ),
      normal: ({ children }) => (
        <p className="writing-p mt-5 text-[17px] leading-[1.75] text-ink/90 first:mt-0">
          {children}
        </p>
      ),
      blockquote: ({ children }) => (
        <blockquote className="writing-quote mt-10">{children}</blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="writing-list writing-list-bullet mt-6 space-y-3 text-[17px] leading-[1.7]">
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className="writing-list writing-list-ordered mt-6 space-y-3 text-[17px] leading-[1.7]">
          {children}
        </ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => (
        <li className="writing-li-bullet pl-7">{children}</li>
      ),
      number: ({ children }) => (
        <li className="writing-li-ordered pl-9">{children}</li>
      ),
    },
    marks: {
      strong: ({ children }) => (
        <strong className="font-bold text-ink">{children}</strong>
      ),
      em: ({ children }) => <em className="italic text-ink/80">{children}</em>,
      code: ({ children }) => (
        <code className="rounded-sm border border-hair bg-ink/[0.04] px-1.5 py-0.5 font-mono text-[0.88em] text-ink">
          {children}
        </code>
      ),
      link: ({ children, value }) => {
        const href = value?.href as string | undefined;
        const external = href?.startsWith("http");
        return (
          <a
            href={href}
            className="font-medium text-org underline decoration-org/35 underline-offset-[3px] transition-colors hover:decoration-org"
            {...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {children}
          </a>
        );
      },
    },
    types: {
      image: ({ value }: { value: SanityImage & { alt?: string } }) => {
        if (!value?.asset) return null;
        const src = urlFor(value).width(1400).fit("max").url();
        const fullSrc = urlFor(value).width(2400).fit("max").url();
        const alt = value.alt || "";
        return (
          <figure className="writing-figure mt-10">
            <ZoomableImage
              src={src}
              fullSrc={fullSrc}
              alt={alt}
              width={1400}
              height={788}
              sizes="(max-width: 768px) 100vw, 720px"
            />
          </figure>
        );
      },
    },
  };
}

export default function PostBody({
  value,
  toc,
}: {
  value: PortableTextBlock[];
  toc: WritingTocItem[];
}) {
  const tocByKey = new Map(toc.map((item) => [item.key, item]));
  const components = buildComponents(tocByKey);

  return (
    <div className="writing-body">
      <PortableText value={value} components={components} />
    </div>
  );
}
