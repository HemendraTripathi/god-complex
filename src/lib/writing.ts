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
