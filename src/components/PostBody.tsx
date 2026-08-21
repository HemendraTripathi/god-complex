import Image from "next/image";
import {
  PortableText,
  type PortableTextComponents,
  type PortableTextBlock,
} from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImage } from "@/sanity/lib/types";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="display mt-12 text-[clamp(22px,3.2vw,32px)] first:mt-0">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 text-[clamp(18px,2.4vw,24px)] font-bold tracking-tight">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-6 text-lg font-bold tracking-tight">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="mt-5 text-[17px] leading-[1.7] text-ink/90 first:mt-0">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-2 border-org pl-5 text-[17px] leading-[1.7] text-steel italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-5 list-disc space-y-2 pl-5 text-[17px] leading-[1.7] marker:text-org">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mt-5 list-decimal space-y-2 pl-5 text-[17px] leading-[1.7] marker:font-mono marker:text-org">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="pl-1">{children}</li>,
    number: ({ children }) => <li className="pl-1">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-ink">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="rounded-sm bg-ink/5 px-1.5 py-0.5 font-mono text-[0.9em]">
        {children}
      </code>
    ),
    link: ({ children, value }) => {
      const href = value?.href as string | undefined;
      const external = href?.startsWith("http");
      return (
        <a
          href={href}
          className="font-medium text-org underline decoration-org/40 underline-offset-4 transition-colors hover:decoration-org"
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
      const alt = value.alt || "";
      return (
        <figure className="mt-8 border-2 border-ink bg-ink/[0.03]">
          <Image
            src={src}
            alt={alt}
            width={1400}
            height={788}
            className="h-auto w-full"
            sizes="(max-width: 768px) 100vw, 720px"
          />
          {alt ? (
            <figcaption className="border-t border-hair px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-steel">
              {alt}
            </figcaption>
          ) : null}
        </figure>
      );
    },
  },
};

export default function PostBody({ value }: { value: PortableTextBlock[] }) {
  return (
    <div className="writing-body max-w-[65ch]">
      <PortableText value={value} components={components} />
    </div>
  );
}
