import type { MetadataRoute } from "next";
import { FIRST_NAME_URL, PORTRAIT_URL, PROFILE_URL } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { getPostsForSitemap } from "@/sanity/lib/fetch";

const LAST_MODIFIED = "2026-08-20";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let posts: MetadataRoute.Sitemap = [];

  try {
    const writing = await getPostsForSitemap();
    posts = writing.map((post) => ({
      url: `${SITE_URL}/writing/${post.slug}`,
      lastModified: post._updatedAt || post.publishedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch {
    // Build should succeed even if Sanity is unreachable.
  }

  return [
    {
      url: SITE_URL,
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1,
      images: [PORTRAIT_URL],
    },
    {
      url: PROFILE_URL,
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.9,
      images: [PORTRAIT_URL],
    },
    {
      url: FIRST_NAME_URL,
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.85,
      images: [PORTRAIT_URL],
    },
    {
      url: `${SITE_URL}/writing`,
      lastModified: new Date().toISOString().slice(0, 10),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...posts,
  ];
}
