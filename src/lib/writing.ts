import { toPlainText, type PortableTextBlock } from "next-sanity";

export type WritingTocItem = {
  id: string;
  key: string;
  index: number;
  title: string;
};

function slugify(text: string) {
  const base = text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return base || "section";
}

export function getReadingMinutes(blocks: PortableTextBlock[]): number {
  if (!blocks?.length) return 1;
  const text = blocks
    .filter((block) => block && typeof block === "object" && block._type === "block")
    .map((block) => toPlainText(block).trim())
    .filter(Boolean)
    .join(" ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export type AdjacentPost = {
  slug: string;
  title: string;
};

export function getAdjacentPosts(
  posts: AdjacentPost[],
  slug: string,
): { newer: AdjacentPost | null; older: AdjacentPost | null } {
  const i = posts.findIndex((post) => post.slug === slug);
  if (i < 0) return { newer: null, older: null };
  return {
    newer: posts[i - 1] ?? null,
    older: posts[i + 1] ?? null,
  };
}

export function getWritingToc(blocks: PortableTextBlock[]): WritingTocItem[] {
  const used = new Map<string, number>();
  const items: WritingTocItem[] = [];

  for (const block of blocks) {
    if (
      !block ||
      typeof block !== "object" ||
      block._type !== "block" ||
      !("style" in block) ||
      block.style !== "h2" ||
      !("_key" in block) ||
      typeof block._key !== "string"
    ) {
      continue;
    }

    const title = toPlainText(block).trim();
    if (!title) continue;

    const base = slugify(title);
    const count = used.get(base) ?? 0;
    used.set(base, count + 1);
    const id = count === 0 ? base : `${base}-${count + 1}`;

    items.push({
      id,
      key: block._key,
      index: items.length + 1,
      title,
    });
  }

  return items;
}
