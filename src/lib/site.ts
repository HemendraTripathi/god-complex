/** Canonical production origin — override with NEXT_PUBLIC_SITE_URL if needed. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://hemendra.readwith.io";

/** Hostname only, for visible copy and robots Host. */
export const SITE_HOST = SITE_URL.replace(/^https?:\/\//, "");

export const SITE = {
  url: SITE_URL,
  name: "Hemendra Tripathi",
  title: "Hemendra Tripathi | AI Voice Engineer & Tech Lead",
  description:
    "AI Voice Engineer and Technical Lead at Callin.io, a voice platform serving 1,000+ businesses. Remote from India. Open to hire.",
  shortDescription:
    "Hemendra Tripathi, AI Voice Engineer and Technical Lead. Building Callin.io, a voice platform serving 1,000+ businesses. Open to hire.",
  profileDescription:
    "Hemendra Tripathi is an AI Voice Engineer and Technical Lead building Callin.io, a voice AI platform. Remote from India.",
  caseTitle: "Callin.io Voice AI Case Study",
  caseDescription:
    "How Callin.io scaled voice agents serving 1,000+ businesses, cut LLM cost roughly 20%, and designed telephony and billing around latency.",
  hireTitle: "Hire an AI Voice Engineer",
  hireDescription:
    "Hire Hemendra Tripathi, AI Voice Engineer and Technical Lead at Callin.io. Production voice agents, multi-LLM routing, fully remote from India.",
  locale: "en_US",
  email: "hemendratripathi880@gmail.com",
  location: "Udaipur, IN",
  jobTitle: "AI Voice Engineer and Technical Lead",
} as const;
