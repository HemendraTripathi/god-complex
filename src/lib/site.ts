/** Canonical production origin — override with NEXT_PUBLIC_SITE_URL if needed. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://me.readwith.io";

export const SITE = {
  url: SITE_URL,
  name: "Hemendra Tripathi",
  title: "Hemendra Tripathi | Technical Lead · AI Engineer",
  description:
    "Hemendra Tripathi is a technical lead and AI engineer in Udaipur. As an AI Voice Engineer he scaled Callin.io to 1,500+ customers. Open to hire.",
  shortDescription:
    "Hemendra Tripathi, technical lead and AI engineer in Udaipur. Callin.io: 1,500+ customers. Open to hire.",
  profileTitle: "Hemendra Tripathi | Technical Lead · AI Engineer",
  profileDescription:
    "Hemendra Tripathi is a technical lead and AI engineer in Udaipur, and the AI Voice Engineer behind Callin.io. Official bio, work, and how to hire him.",
  firstNameTitle: "Hemendra | Technical Lead · AI Engineer in Udaipur",
  firstNameDescription:
    "Hemendra is Hemendra Tripathi, a technical lead and AI engineer in Udaipur. He scaled Callin.io to 1,500+ customers. Official site.",
  locale: "en_US",
  email: "hemendratripathi880@gmail.com",
  location: "Udaipur, IN",
  jobTitle: "Technical Lead · AI Engineer",
  keywords: [
    "Hemendra",
    "Hemendra Tripathi",
    "AI Voice Engineer",
    "Hemendra Udaipur",
    "Hemendra Callin.io",
    "Hemendra voice AI",
    "Hemendra Tripathi Udaipur",
    "Hemendra Tripathi Callin.io",
    "Technical Lead",
    "AI Engineer",
    "voice AI technical lead",
    "AI voice systems",
    "voice AI engineer",
    "hire AI Voice Engineer",
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
