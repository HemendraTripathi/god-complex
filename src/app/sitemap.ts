import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const PORTRAIT =
  `${SITE_URL}/images/hemendra-tripathi-technical-lead.png` as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      images: [PORTRAIT],
    },
  ];
}
 