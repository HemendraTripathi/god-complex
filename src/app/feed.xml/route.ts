import { getPosts } from "@/sanity/lib/fetch";
import { SITE, SITE_URL } from "@/lib/site";

function xmlEscape(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export async function GET() {
  let items = "";
  try {
    const posts = await getPosts();
    items = posts
      .map((post) => {
        const url = `${SITE_URL}/writing/${post.slug}`;
        const updated = post._updatedAt || post.publishedAt;
        const description = post.excerpt || SITE.shortDescription;
        return `    <item>
      <title>${xmlEscape(post.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      ${updated ? `<lastBuildDate>${new Date(updated).toUTCString()}</lastBuildDate>` : ""}
      <description>${xmlEscape(description)}</description>
    </item>`;
      })
      .join("\n");
  } catch {
    items = "";
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${xmlEscape(SITE.name)} — Writing</title>
    <link>${SITE_URL}/writing</link>
    <description>${xmlEscape("Essays on technical leadership, shipping products, and engineering judgment.")}</description>
    <language>en</language>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=600, stale-while-revalidate=86400",
    },
  });
}
