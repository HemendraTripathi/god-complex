import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const PORTRAIT =
  `${SITE_URL}/images/hemendra-tripathi-technical-lead.png` as const;
const CALLIN_DASHBOARD =
  `${SITE_URL}/images/work-callin.png` as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      images: [PORTRAIT, CALLIN_DASHBOARD],
    },
  ];
}
 