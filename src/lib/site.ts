/** Canonical production origin — override with NEXT_PUBLIC_SITE_URL if needed. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://me.readwith.io";

export const SITE = {
  url: SITE_URL,
  name: "Hemendra Tripathi",
  title: "Hemendra Tripathi | Technical Lead · Voice AI Engineer",
  description:
    "Hemendra Tripathi is a technical lead and voice AI engineer in Udaipur. He scaled Callin.io to 1,500+ customers. Open to hire.",
  shortDescription:
    "Hemendra Tripathi, voice AI technical lead in Udaipur. Callin.io: 1,500+ customers. Open to hire.",
  profileTitle: "Hemendra Tripathi | Official Profile",
  profileDescription:
    "Hemendra Tripathi is the Udaipur-based technical lead behind Callin.io voice AI. Official bio, work, and how to hire him.",
  locale: "en_US",
  email: "hemendratripathi880@gmail.com",
  location: "Udaipur, IN",
  jobTitle: "Technical Lead · AI Engineer",
  keywords: [
    "Hemendra Tripathi",
    "Hemendra Tripathi Udaipur",
    "Hemendra Tripathi Callin.io",
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
