/** Canonical production origin — override with NEXT_PUBLIC_SITE_URL if needed. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://me.readwith.io";

export const SITE = {
  url: SITE_URL,
  name: "Hemendra Tripathi",
  title: "Hemendra Tripathi — Technical Lead · Voice AI Engineer",
  description:
    "Technical lead & AI engineer who scaled Callin.io voice AI to 1,500+ customers. Multi-LLM routing, usage billing — open to hire for tech lead roles.",
  shortDescription:
    "Hire a voice AI technical lead — 1,500+ customers, multi-LLM orchestration, usage-based billing.",
  locale: "en_US",
  email: "hemendratripathi880@gmail.com",
  location: "Udaipur, IN",
  jobTitle: "Technical Lead · AI Engineer",
  keywords: [
    "Hemendra Tripathi",
    "Technical Lead",
    "AI Engineer",
    "voice AI technical lead",
    "AI voice systems",
    "voice AI engineer",
    "Callin.io",
    "full-stack developer",
    "multi-LLM orchestration",
    "usage-based billing",
    "Twilio",
    "Telnyx",
    "hire technical lead",
    "hire AI engineer",
  ],
} as const;
