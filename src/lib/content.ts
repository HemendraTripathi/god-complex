import { SITE_URL } from "@/lib/site";

export const LINKS = {
  email: "hemendratripathi880@gmail.com",
  resume: "/Hemendra_Tripathi_Resume.pdf",
  github: "https://github.com/hemendratripathi",
  linkedin: "https://www.linkedin.com/in/hemendratripathi",
  twitter: "https://x.com/hemendra_tr",
  reddit: "https://www.reddit.com/u/hemendra_tripathi",
  callin: "https://callin.io",
  /** Claim this Cal.com username and add a 20-min intro with US/EU-friendly hours. */
  calendar: "https://cal.com/hemendratripathi/hiring-freelance",
};

export const NAV = [
  ["About", "/"],
  ["Writing", "/writing"],
  ["Case", "/work/callin-io"],
  ["Work", "/#work"],
  ["Experience", "/#experience"],
  ["Hire", "/hire"],
  ["Contact", "/#contact"],
] as const;

export const TICKER = [
  "AI VOICE ENGINEER",
  "REAL-TIME VOICE AI",
  "MULTI-LLM ORCHESTRATION",
  "USAGE-BASED BILLING",
  "SIP · WEBRTC · STT/TTS",
  "SELF-HOSTED LLM ANALYTICS",
  "HEALTHCARE · REAL ESTATE",
  "FULLY REMOTE FROM INDIA",
];

export type WorkItem = {
  idx: string;
  name: string;
  role: string;
  desc: string;
  stack: string;
  status: string;
  img: string;
  visual: "callin" | "condo" | "realead" | "sunria";
  href?: string;
};

/** Supporting work only — Callin.io lives in the featured CASE object. */
export const WORK: WorkItem[] = [
  {
    idx: "01",
    name: "CondoMail",
    role: "Product architecture: multi-provider email sync",
    desc: "AI agents that sort, draft, and auto-reply across providers. Live with early adopters, including high-volume Amazon sellers running inbox workflows on it.",
    stack: "React / Node.js / Supabase / Stripe / Firebase",
    status: "Production",
    img: "/images/work-condomail.png",
    visual: "condo",
  },
  {
    idx: "02",
    name: "Realead",
    role: "Full-stack · mobile · AI calling flows",
    desc: "Connects lead sources, builds a business profile, and places AI qualification + follow-up calls for property leads. Final beta ahead of release, and the conversational model behind the agent demo.",
    stack: "React Native / NestJS / Supabase / Stripe",
    status: "Beta",
    img: "/images/work-realead.png",
    visual: "realead",
    href: "#agent",
  },
];

export const CASE = {
  product: "Callin.io",
  eyebrow: "Featured voice AI case study",
  title: "How we made voice agents cheap enough to scale, and fast enough that humans stayed on the line.",
  summary:
    "As Technical Lead I owned the architecture, vendor spend, and billing system for an AI voice platform that grew past 1,500 paying customers, including medical and real-estate enterprise accounts, while cutting LLM cost 20% and keeping billing disputes near zero.",
  problem: [
    "Every turn of a voice agent is a race: if the model thinks too long, the caller hangs up.",
    "Using one large model for every utterance burned margin on greetings and confirmations.",
    "Minute-based billing with rollovers was creating support tickets, and eroding trust with the accounts that mattered most.",
  ],
  approach: [
    {
      title: "Complexity-aware model routing",
      body: "Classify each turn (greeting, FAQ, scheduling, objection) and route to the smallest model that can finish the job. Large models only for hard reasoning.",
    },
    {
      title: "Semantic cache + concurrent prompts",
      body: "Cache high-frequency intents; fire retrieval and response scaffolds in parallel so time-to-first-token drops before the caller notices silence.",
    },
    {
      title: "Dual-carrier telephony",
      body: "Twilio + Telnyx with SIP fallback. Fail over without dropping the call; keep audio streaming over WebSockets under load.",
    },
    {
      title: "Billing as a product surface",
      body: "Minute tracking with rollover ledgers precise enough that disputes became rare. Stripe subscriptions wired to actual usage, not estimates.",
    },
  ],
  metrics: [
    { to: 1000, suffix: "+", separator: ",", label: "businesses served" },
    { to: 20, prefix: "~", suffix: "%", label: "lower LLM inference cost" },
    { to: 40, prefix: "~", suffix: "%", label: "fewer cancellations" },
  ] satisfies {
    to: number;
    label: string;
    prefix?: string;
    suffix?: string;
    separator?: string;
  }[],
  /** Pipeline shown in the case study — one hop per ownership surface. */
  architecture: [
    { id: "call", label: "Caller", detail: "PSTN / WebRTC" },
    { id: "tel", label: "Telephony", detail: "Dual-carrier + SIP" },
    { id: "orch", label: "Callin orchestrator", detail: "Cache · parallel prompts · turn clock" },
    { id: "runtime", label: "Runtime", detail: "Ultra-low latency · Premium Voice · Custom Stack" },
    { id: "voice", label: "Voice out", detail: "Callin TTS path" },
  ],
  stack: [
    "React",
    "Node.js",
    "Supabase",
    "Twilio",
    "Telnyx",
    "Stripe",
    "ElevenLabs",
    "Cartesia",
    "Redis",
  ],
  quote:
    "Hemendra is the rare engineer who can rewrite the voice pipeline before lunch and close an enterprise prospect after dinner. He treats infrastructure cost like product debt, and it shows in the margins.",
  /** Add after approval — omit until then so the quote stays anonymous. */
  quoteName: "",
  quoteOrg: "",
};

export function formatMetricValue(m: (typeof CASE.metrics)[number]) {
  const n = new Intl.NumberFormat("en-US", {
    useGrouping: Boolean(m.separator),
  }).format(m.to);
  const grouped = m.separator ? n.replace(/,/g, m.separator) : n;
  return `${m.prefix ?? ""}${grouped}${m.suffix ?? ""}`;
}

export const HIRE = {
  eyebrow: "Open to select roles · US / EU teams",
  lede:
    "Hire an AI Voice Engineer who has already taken agents from first commit to paying customers: architecture, model routing, telephony, and the billing those calls produce.",
  fits: [
    {
      title: "Technical lead",
      body: "Own architecture, hiring, vendor spend, and the roadmap. Reporting line to founder or CTO. You want someone who has already done this on a voice product in production.",
    },
    {
      title: "AI Voice Engineer",
      body: "Real-time agents on Twilio, Telnyx, or SIP. Latency budgets, failover, STT/TTS vendor choices, and complexity-aware LLM routing — not a chatbot wrapped in a phone number.",
    },
    {
      title: "Select freelance",
      body: "Bounded work: voice pipeline, usage-based billing, or a multi-LLM product. US and EU-friendly hours. Typical reply within 24 hours.",
    },
  ],
  notFor: [
    "Prompt-only chatbot wrappers with no telephony",
    "Staff-aug that needs a body in a seat tomorrow",
    "Unpaid test projects or speculative equity-only gigs",
  ],
};

export const PRINCIPLES = [
  {
    n: "01",
    title: "Latency is the product",
    body: "In voice AI, silence is a bug. Every architectural choice (caching, routing, carrier failover) exists to keep the human from hanging up.",
  },
  {
    n: "02",
    title: "Pay for intelligence only when you need it",
    body: "A confirmation doesn't deserve a frontier model. Route by complexity. Your CFO will notice. So will your p95.",
  },
  {
    n: "03",
    title: "Billing that doesn't create tickets",
    body: "If customers argue about invoices, the product is unfinished. Usage ledgers should be boringly correct.",
  },
  {
    n: "04",
    title: "Own the stack's P&L",
    body: "Architecture without vendor spend ownership is theater. I ship the system, and I know what the infra bill was last Tuesday.",
  },
];

export const EXPERIENCE = [
  {
    period: "FEB 2026 to PRESENT",
    title: "Technical Lead, AI Voice Platform",
    org: "Appspundit Infotech · Callin.io",
    points: [
      "Own the call path, multi-LLM routing, self-hosted Qwen for post-call analytics, and the AI-agent ticket pipeline.",
      "Own architecture decisions and infrastructure spend for a platform serving 1,000+ businesses across healthcare and real estate.",
      "Cut LLM inference cost roughly 20% by routing each request by complexity.",
    ],
  },
  {
    period: "OCT 2024 to JAN 2026",
    title: "Software Engineer, AI Voice Platform",
    org: "Appspundit Infotech · Callin.io",
    points: [
      "Built Callin.io from the ground up: voice agents, carrier integrations, multi-tenant architecture and Stripe usage-based billing.",
      "Extended the shared multi-LLM architecture into CondoMail and Realead.",
    ],
  },
  {
    period: "2021 to 2024",
    title: "Earlier: engineering and teaching",
    org: "Freelance and Aimers Institute",
    points: [
      "Built 10+ web applications across MERN, Django, Flask and Laravel.",
      "Taught 150+ students Python, Django, MERN and Flutter through project-based learning.",
    ],
  },
];

export const CAPABILITIES = [
  {
    title: "Voice AI Systems",
    items: [
      "Real-time telephony: SIP/VoIP and WebRTC",
      "STT/TTS selection, streaming and latency budgets",
      "Multi-LLM routing by complexity and cost",
      "Self-hosted Qwen for post-call analytics",
    ],
  },
  {
    title: "Product & Revenue",
    items: [
      "Usage-based billing architecture",
      "Stripe subscriptions & invoicing",
      "Pricing design & infra cost optimization",
      "Client acquisition & retention",
    ],
  },
  {
    title: "Engineering",
    items: [
      "React, Next.js, React Native",
      "Node.js, NestJS, Python",
      "PostgreSQL (Supabase), Redis",
      "Event-driven systems and REST APIs",
    ],
  },
  {
    title: "Cloud & Leadership",
    items: [
      "Docker, AWS, CI/CD pipelines",
      "System design and architecture decisions",
      "Technical leadership and mentorship",
      "Remote, cross-timezone collaboration",
    ],
  },
];

/** Hire-intent + expertise FAQs — keep answers ~40–60 words for snippet eligibility. */
export const FAQS = [
  {
    question: "Who is Hemendra?",
    answer:
      `Hemendra is Hemendra Tripathi, a technical lead and AI engineer in Udaipur, Rajasthan. He leads Callin.io at Appspundit Infotech as an AI Voice Engineer: multi-LLM voice agents used by 1,500+ paying customers. His official site is ${SITE_URL}.`,
  },
  {
    question: "Who is Hemendra Tripathi?",
    answer:
      "Hemendra Tripathi is a technical lead and AI engineer based in Udaipur, shipping for US and EU teams. As an AI Voice Engineer and Technical Lead on Callin.io he scaled multi-LLM voice agents past 1,500 paying customers, cut inference cost about 20%, and owns architecture, billing, and hiring.",
  },
  {
    question: "What is an AI Voice Engineer?",
    answer:
      "An AI Voice Engineer designs and ships real-time voice agents: telephony, model routing, latency, and billing. Hemendra Tripathi is an AI Voice Engineer and technical lead in Udaipur. At Callin.io he scaled multi-LLM voice agents past 1,500 paying customers and cut inference cost about 20%.",
  },
  {
    question: "Which Hemendra Tripathi is the Callin.io technical lead?",
    answer:
      `Hemendra Tripathi of Udaipur, Rajasthan is the technical lead and AI engineer at Appspundit Infotech behind Callin.io. His official site is ${SITE_URL}. He is not the Newstrack journalist or other professionals who share the same name.`,
  },
  {
    question: "How do I hire an AI Voice Engineer like Hemendra?",
    answer:
      "Book a 20-minute call at cal.com/hemendratripathi/hiring-freelance. Timezone is converted for you. Or email hemendratripathi880@gmail.com. He is open to technical-lead, AI engineer, and senior full-stack roles, plus select freelance. Expect a reply within 24 hours, plus the Callin.io case study.",
  },
  {
    question: "What is complexity-aware multi-LLM orchestration?",
    answer:
      "It classifies each voice-agent turn (greeting, FAQ, scheduling, objection) and routes to the smallest model that can finish the job. Large models handle hard reasoning only. Paired with semantic cache and concurrent prompts, this cuts LLM spend while keeping time-to-first-token low enough callers stay on the line.",
  },
  {
    question: "What voice AI stack does Hemendra ship with?",
    answer:
      "Production systems use React and Node.js with Twilio, Telnyx, and SIP failover, plus ElevenLabs or Cartesia for voice, Supabase or Redis for state and cache, and Stripe for usage-based billing. RAG paths use Pinecone or Supabase Vector when retrieval is required.",
  },
  {
    question: "What results did the Callin.io voice AI platform achieve?",
    answer:
      "Under Hemendra’s technical leadership the platform grew past 1,500 paying customers, including healthcare and real-estate accounts. Model routing cut LLM inference cost about 20%, typical voice TTFT landed near 420ms, and precise minute ledgers kept billing disputes near zero after launch.",
  },
  {
    question: "Is Hemendra available for freelance or full-time AI engineering roles?",
    answer:
      "Yes. He is open to technical-lead, AI engineer, and senior full-stack roles, and select freelance focused on voice AI, multi-LLM products, or usage-based billing. Book 20 minutes at cal.com/hemendratripathi/hiring-freelance or email; he typically replies within 24 hours and can share the Callin.io case study and résumé.",
  },
] as const;
