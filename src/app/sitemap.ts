import type { MetadataRoute } from "next";
import { PORTRAIT_URL, PROFILE_URL } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

const LAST_MODIFIED = "2026-08-14";

export default function sitemap(): MetadataRoute.Sitemap {
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
  ];
}
