export const LINKS = {
  email: "hemendratripathi880@gmail.com",
  resume: "/Hemendra_Tripathi_Resume.pdf",
  github: "https://github.com/hemendratripathi",
  linkedin: "https://www.linkedin.com/in/hemendratripathi",
  twitter: "https://x.com/hemendra_tr",
  reddit: "https://www.reddit.com/u/hemendra_tripathi",
  callin: "https://callin.io",
  /** 20-minute hiring conversation. */
  calendar: "https://cal.com/hemendratripathi/hiring",
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
  title: "Callin.io: building a voice AI platform that holds up on real calls",
  summary:
    "How I helped take Callin.io from first commit to a platform serving 1,000+ businesses across healthcare and real estate, with lower cost per call and fewer cancellations.",
  problem: [
    "Every turn of a voice call is a race. If the agent takes too long to answer, the caller hangs up.",
    "Using one large model for everything burned margin on simple turns like greetings and confirmations.",
    "Customers were leaving, and the causes were spread across latency, voice quality, language support and how hard agents were to manage.",
  ],
  approach: [
    {
      title: "Route by complexity",
      body: "Classify each turn and send it to the smallest model that can handle it, keeping large models for hard reasoning. This is what cut inference cost by roughly 20%.",
    },
    {
      title: "Treat latency as a budget",
      body: "Each part of the call path gets a time allowance, and anything that blows it gets fixed first.",
    },
    {
      title: "Choose providers on evidence",
      body: "I compared speech and voice providers side by side and recommended a switch, which the CEO approved.",
    },
    {
      title: "Learn from every call",
      body: "Post-call analytics (goal analysis, sentiment, key moments, recommendations) show customers what to fix in their agents.",
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
    { id: "call", label: "Caller", detail: "Phone or web" },
    { id: "tel", label: "Telephony", detail: "SIP · WebRTC" },
    { id: "orch", label: "Orchestrator", detail: "Routing · cache · latency budget" },
    { id: "runtime", label: "Models", detail: "STT · LLM · TTS" },
    { id: "voice", label: "Post-call analytics", detail: "Insights back to the customer" },
  ],
  stack: ["React", "Node.js", "Supabase", "Stripe", "Redis"],
  quote: "",
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
  eyebrow: "Open to fully remote roles · APAC, US and EU overlap",
  lede:
    "I take real-time voice agents from architecture to production: telephony, model routing, latency and cost. Open to fully remote Applied AI, voice-agent and forward-deployed engineering roles.",
  fits: [
    {
      title: "Voice agents in production",
      body: "SIP/VoIP and WebRTC orchestration, STT/LLM/TTS selection, latency budgets and failover.",
    },
    {
      title: "LLM cost and quality",
      body: "Multi-LLM routing by complexity, self-hosted models and post-call analytics.",
    },
    {
      title: "Technical leadership",
      body: "Architecture decisions, mentoring, and ownership of the roadmap and the infrastructure bill.",
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
      "Hemendra is Hemendra Tripathi, an AI Voice Engineer and Technical Lead based in Udaipur, India. He leads engineering on Callin.io, a voice AI platform serving 1,000+ businesses, and works fully remotely.",
  },
  {
    question: "Who is Hemendra Tripathi?",
    answer:
      "Hemendra Tripathi is an AI Voice Engineer and Technical Lead who builds real-time voice agents. At Appspundit Infotech he joined Callin.io as a Software Engineer in October 2024 and became Technical Lead in February 2026. He holds a BCA from Mohanlal Sukhadia University.",
  },
  {
    question: "What is an AI Voice Engineer?",
    answer:
      "An AI Voice Engineer designs and ships real-time voice agents: telephony, speech-to-text and text-to-speech, language-model routing, latency and cost. Hemendra Tripathi does this in production at Callin.io.",
  },
  {
    question: "Which Hemendra Tripathi is the Callin.io technical lead?",
    answer:
      "The one who leads engineering at Callin.io is an AI Voice Engineer based in Udaipur, India, and the author of this site. He is not the journalist or the academics who share the name. His LinkedIn and GitHub are linked from this page.",
  },
  {
    question: "How do I hire an AI Voice Engineer like Hemendra?",
    answer:
      "Book a 20-minute call from the hire page. Hemendra is open to fully remote Applied AI, voice-agent and forward-deployed engineering roles, and replies within 24 hours.",
  },
  {
    question: "What is complexity-aware multi-LLM orchestration?",
    answer:
      "Each turn of a call is classified and sent to the smallest model that can handle it, with large models reserved for hard reasoning. At Callin.io this cut LLM inference cost by roughly 20%.",
  },
  {
    question: "What does Hemendra work on?",
    answer:
      "Real-time voice systems (SIP/VoIP and WebRTC, speech-to-text and text-to-speech, latency budgets), multi-LLM routing and post-call analytics, plus the React, Node.js, Supabase and Stripe platform around them.",
  },
  {
    question: "What results did the Callin.io voice AI platform achieve?",
    answer:
      "Callin.io serves 1,000+ businesses across healthcare and real estate. Complexity-aware routing cut LLM inference cost by roughly 20%, and cancellations fell by roughly 40%. The case study explains how.",
  },
  {
    question: "What roles is Hemendra open to?",
    answer:
      "Fully remote Applied AI, voice-agent and forward-deployed engineering roles, and technical-lead roles. He works across APAC, US and EU time zones.",
  },
] as const;
