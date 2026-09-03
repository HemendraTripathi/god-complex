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
  ["About", "/hemendra-tripathi"],
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
  "TWILIO / TELNYX / SIP",
  "RAG · PINECONE · SUPABASE VECTOR",
  "US / EU STAKEHOLDERS",
  "ENTERPRISE HEALTHCARE · REAL ESTATE",
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
  {
    idx: "03",
    name: "Sunria & FinTech Accounts",
    role: "Freelance, end-to-end delivery",
    desc: "Pan-India farm management with field-to-warehouse sync, plus a financial dashboard with automated reconciliation: 30% fewer accounting errors, 15+ staff-hours saved weekly.",
    stack: "Laravel / Flutter / MERN / CI-CD",
    status: "Shipped",
    img: "/images/work-sunria.png",
    visual: "sunria",
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
    { to: 1500, suffix: "+", separator: ",", label: "Paying customers" },
    { to: 20, prefix: "−", suffix: "%", label: "LLM inference cost" },
    { to: 420, prefix: "~", suffix: "ms", label: "Voice TTFT (typical)" },
    { to: 0, prefix: "~", label: "Billing disputes since launch" },
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
    { id: "tel", label: "Telephony", detail: "Twilio · Telnyx · SIP" },
    { id: "orch", label: "Orchestrator", detail: "Cache · parallel prompts" },
    { id: "route", label: "Model router", detail: "Complexity-aware LLM" },
    { id: "voice", label: "Voice out", detail: "ElevenLabs · Cartesia" },
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
    body: "Architecture without vendor spend ownership is theater. I hire, I ship, and I know what the infra bill was last Tuesday.",
  },
];

/** Attribution optional — leave name/org empty until you have written approval. */
export const SIGNALS = [
  {
    text: "We evaluated three voice vendors. Callin's agents were the only ones our clinic staff didn't hang up on, and the only ones whose invoices we didn't audit line by line.",
    name: "",
    org: "",
  },
  {
    text: "He hired half my eng team, set the roadmap, and still jumped on customer calls. That's not a contractor. That's an owner.",
    name: "",
    org: "",
  },
  {
    text: "Curriculum he redesigned moved our placement rate up over 40%. Students left knowing how to ship, not just pass exams.",
    name: "",
    org: "",
  },
];

export const EXPERIENCE = [
  {
    period: "OCT 2024 to PRESENT",
    title: "Technical Lead / AI Engineer / Full-Stack",
    org: "Appspundit Infotech · Callin.io",
    points: [
      "Technical Lead: architecture, vendor and infrastructure spend, hiring, product roadmaps, reporting directly to the founder.",
      "Scaled the platform to 1,500+ paying customers; expanded into CondoMail and Realead on a shared multi-LLM architecture.",
      "Cut LLM inference costs 20%; personally converted 30+ prospects into long-term paying accounts across healthcare and real estate.",
    ],
  },
  {
    period: "2022 to 2024",
    title: "Freelance Full-Stack Developer",
    org: "Remote · fintech, retail, logistics",
    points: [
      "Delivered 10+ end-to-end applications across MERN, Django, Flask, and Laravel.",
      "Built a fintech accounts system for an MCA-registered firm, with automated reconciliation saving 15+ staff-hours per week.",
      "Improved API performance 25% and implemented zero-downtime CI/CD pipelines.",
    ],
  },
  {
    period: "2021 to 2023",
    title: "Technical Instructor",
    org: "Aimers Institute & VT College",
    points: [
      "Mentored 150+ students in Python, Django, MERN, and Flutter through project-based learning.",
      "Redesigned the curriculum to industry needs. Student placements rose 42%.",
      "Supervised 30+ capstone projects: version control, API design, UI craft.",
    ],
  },
];

export const CAPABILITIES = [
  {
    title: "AI & Voice Systems",
    items: [
      "Multi-LLM orchestration: routing by complexity and cost",
      "RAG pipelines: Pinecone, Supabase Vector",
      "Voice cloning: ElevenLabs, Cartesia",
      "Real-time telephony: Twilio, Telnyx, SIP",
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
    title: "Full-Stack Engineering",
    items: [
      "React, Next.js, React Native",
      "Node.js, Express, NestJS, Laravel, Python",
      "PostgreSQL (Supabase), Redis",
      "Event-driven systems, REST, microservices",
    ],
  },
  {
    title: "Cloud & Leadership",
    items: [
      "Docker, AWS, CI/CD pipelines",
      "System design & architecture decisions",
      "Team leadership: hiring and mentorship",
      "US/EU stakeholder coordination",
    ],
  },
];

/** Hire-intent + expertise FAQs — keep answers ~40–60 words for snippet eligibility. */
export const FAQS = [
  {
    question: "Who is Hemendra?",
    answer:
      "Hemendra is Hemendra Tripathi, a technical lead and AI engineer in Udaipur, Rajasthan. He leads Callin.io at Appspundit Infotech as an AI Voice Engineer: multi-LLM voice agents used by 1,500+ paying customers. His official site is https://me.readwith.io.",
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
      "Hemendra Tripathi of Udaipur, Rajasthan is the technical lead and AI engineer at Appspundit Infotech behind Callin.io. His official site is https://me.readwith.io. He is not the Newstrack journalist or other professionals who share the same name.",
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

/** Unique copy for /hemendra — first-name identity, not a duplicate of /hemendra-tripathi. */
export const FIRST_NAME = {
  definition:
    "Hemendra is a technical lead and AI engineer in Udaipur. His full name is Hemendra Tripathi. He leads engineering on Callin.io at Appspundit Infotech as an AI Voice Engineer, where multi-LLM voice agents serve 1,500+ paying customers.",
  paragraphs: [
    "People search “Hemendra” and land on many different professionals. This Hemendra is the technical lead and AI engineer in Udaipur, Rajasthan. He is not the journalist, not the Lok Sabha politicians, and not other engineers who share only the first name.",
    "Confirm you have the right person: Hemendra Tripathi at Appspundit Infotech / Callin.io. LinkedIn is linkedin.com/in/hemendratripathi. GitHub is github.com/hemendratripathi. X is x.com/hemendra_tr. This site, me.readwith.io, is the official portfolio.",
    "If you are hiring a technical lead, AI engineer, or AI Voice Engineer, the case study, live agent demo, and work history live on the homepage. The full legal-name profile is me.readwith.io/hemendra-tripathi.",
  ],
  facts: [
    { label: "First name", value: "Hemendra" },
    { label: "Full name", value: "Hemendra Tripathi" },
    { label: "Based", value: "Udaipur, Rajasthan, India" },
    { label: "Role", value: "Technical Lead · AI Engineer" },
    { label: "Known for", value: "Callin.io voice AI · 1,500+ customers" },
    { label: "Official site", value: "me.readwith.io" },
  ],
  faqs: [
    {
      question: "Who is Hemendra?",
      answer:
        "Hemendra is Hemendra Tripathi, a technical lead and AI engineer based in Udaipur. He leads Callin.io at Appspundit Infotech. Official site: https://me.readwith.io.",
    },
    {
      question: "Which Hemendra works on Callin.io?",
      answer:
        "Hemendra Tripathi of Udaipur is the technical lead and AI engineer behind Callin.io voice agents. He is the Hemendra at Appspundit Infotech, not other people who share the first name.",
    },
    {
      question: "Where is Hemendra based?",
      answer:
        "Hemendra is based in Udaipur, Rajasthan, India, and ships for US and EU teams. Book 20 minutes at cal.com/hemendratripathi/hiring-freelance or email hemendratripathi880@gmail.com; he typically replies within 24 hours.",
    },
  ],
} as const;

/** Unique copy for /hemendra-tripathi — do not paste the homepage verbatim. */
export const PROFILE = {
  definition:
    "Hemendra is a technical lead and AI engineer based in Udaipur, Rajasthan. Full name: Hemendra Tripathi. He leads engineering on Callin.io at Appspundit Infotech as an AI Voice Engineer: multi-LLM voice agents used by 1,500+ paying customers across US and EU teams.",
  paragraphs: [
    "Hemendra Tripathi builds systems that talk, bill, and stay up. As Technical Lead and AI engineer he owns architecture, vendor spend, hiring, and product roadmaps, reporting directly to the founder. The work that defines him is Callin.io: complexity-aware model routing, dual-carrier telephony, and usage ledgers precise enough that billing disputes stayed near zero after launch.",
    "Before leading the voice platform he shipped 10+ freelance products across MERN, Django, Flask, and Laravel, including a fintech accounts system that saved 15+ staff-hours a week, and taught 150+ students at Aimers Institute and VT College. That mix of shipping, teaching, and P&L ownership is why teams hire him as a technical lead, not only as a specialist.",
    "This page is the canonical profile for Hemendra Tripathi of Udaipur, the Callin.io / Appspundit Infotech technical lead and AI engineer. Other people share the name. If you are looking for the AI Voice Engineer behind Callin.io, this is the official site: me.readwith.io.",
  ],
  facts: [
    { label: "Based", value: "Udaipur, Rajasthan, India" },
    { label: "Role", value: "Technical Lead · AI Engineer" },
    { label: "Company", value: "Appspundit Infotech · Callin.io" },
    { label: "Focus", value: "AI Voice Engineer, multi-LLM routing, usage billing" },
    { label: "Languages", value: "English (fluent) · Hindi (native)" },
    { label: "Education", value: "MCA, Rajasthan Vidyapeeth · BCA, MLSU" },
  ],
} as const;
