import type { MetadataRoute } from "next";
import { CASE_URL, FIRST_NAME_URL, HIRE_URL, PORTRAIT_URL, PROFILE_URL } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { getPostsForSitemap } from "@/sanity/lib/fetch";

const LAST_MODIFIED = "2026-09-02";

// Metadata routes are cached at build time unless a route config is set.
// Match the writing index so new Sanity posts appear without a redeploy.
export const revalidate = 60;

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
      url: CASE_URL,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: HIRE_URL,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.9,
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

