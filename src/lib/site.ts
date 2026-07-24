/** Canonical production origin — override with NEXT_PUBLIC_SITE_URL if needed. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://me.readwith.io";

export const SITE = {
  url: SITE_URL,
  name: "Hemendra Tripathi",
  title: "Hemendra Tripathi — Technical Lead · AI Voice Systems",
  description:
    "Technical Lead who scaled Callin.io to 1,500+ paying customers. Multi-LLM voice AI, usage-based billing, and teams that ship — case study + live agent demo.",
  shortDescription:
    "From first commit to paying customers. Architecture, billing, teams, revenue.",
  locale: "en_US",
  email: "hemendratripathi880@gmail.com",
  phone: "+916378745958",
  location: "Udaipur, IN",
  jobTitle: "Technical Lead",
  keywords: [
    "Hemendra Tripathi",
    "Technical Lead",
    "AI voice systems",
    "voice AI engineer",
    "Callin.io",
    "full-stack developer",
    "multi-LLM orchestration",
    "usage-based billing",
    "Twilio",
    "hire technical lead",
  ],
} as const;
