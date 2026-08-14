export const LINKS = {
  email: "hemendratripathi880@gmail.com",
  resume: "/Hemendra_Tripathi_Resume.pdf",
  github: "https://github.com/hemendratripathi",
  linkedin: "https://www.linkedin.com/in/hemendratripathi",
  callin: "https://callin.io",
};

export const NAV = [
  ["Case", "#case"],
  ["Work", "#work"],
  ["Experience", "#experience"],
  ["Agent", "#agent"],
  ["FAQ", "#faq"],
  ["Contact", "#contact"],
] as const;

export const TICKER = [
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
    role: "Product architecture — multi-provider email sync",
    desc: "AI agents that sort, draft, and auto-reply across providers. Live with early adopters — including high-volume Amazon sellers running inbox workflows on it.",
    stack: "React / Node.js / Supabase / Stripe / Firebase",
    status: "Production",
    img: "/images/work-condomail.png",
    visual: "condo",
  },
  {
    idx: "02",
    name: "Realead",
    role: "Full-stack · mobile · AI calling flows",
    desc: "Connects lead sources, builds a business profile, and places AI qualification + follow-up calls for property leads. Final beta ahead of release — the conversational model behind the agent demo.",
    stack: "React Native / NestJS / Supabase / Stripe",
    status: "Beta",
    img: "/images/work-realead.png",
    visual: "realead",
    href: "#agent",
  },
  {
    idx: "03",
    name: "Sunria & FinTech Accounts",
    role: "Freelance — end-to-end delivery",
    desc: "Pan-India farm management with field-to-warehouse sync, plus a financial dashboard with automated reconciliation — 30% fewer accounting errors, 15+ staff-hours saved weekly.",
    stack: "Laravel / Flutter / MERN / CI-CD",
    status: "Shipped",
    img: "/images/work-sunria.png",
    visual: "sunria",
  },
];

export const CASE = {
  product: "Callin.io",
  eyebrow: "Featured voice AI case study",
  title: "How we made voice agents cheap enough to scale — and fast enough that humans stayed on the line.",
  summary:
    "As Technical Lead I owned the architecture, vendor spend, and billing system for an AI voice platform that grew past 1,500 paying customers — including medical and real-estate enterprise accounts — while cutting LLM cost 20% and keeping billing disputes near zero.",
  problem: [
    "Every turn of a voice agent is a race: if the model thinks too long, the caller hangs up.",
    "Using one large model for every utterance burned margin on greetings and confirmations.",
    "Minute-based billing with rollovers was creating support tickets — and eroding trust with the accounts that mattered most.",
  ],
  approach: [
    {
      title: "Complexity-aware model routing",
      body: "Classify each turn — greeting, FAQ, scheduling, objection — and route to the smallest model that can finish the job. Large models only for hard reasoning.",
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
    { value: "1,500+", label: "Paying customers" },
    { value: "−20%", label: "LLM inference cost" },
    { value: "~420ms", label: "Voice TTFT (typical)" },
    { value: "~0", label: "Billing disputes since launch" },
  ],
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
    "Hemendra is the rare engineer who can rewrite the voice pipeline before lunch and close an enterprise prospect after dinner. He treats infrastructure cost like product debt — and it shows in the margins.",
  /** Add after approval — omit until then so the quote stays anonymous. */
  quoteName: "",
  quoteOrg: "",
};

export const PRINCIPLES = [
  {
    n: "01",
    title: "Latency is the product",
    body: "In voice AI, silence is a bug. Every architectural choice — caching, routing, carrier failover — exists to keep the human from hanging up.",
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
    text: "We evaluated three voice vendors. Callin's agents were the only ones our clinic staff didn't hang up on — and the only ones whose invoices we didn't audit line by line.",
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
    period: "OCT 2024 — PRESENT",
    title: "Technical Lead / AI Engineer / Full-Stack",
    org: "Appspundit Infotech · Callin.io",
    points: [
      "Technical Lead — architecture, vendor & infrastructure spend, hiring, product roadmaps, reporting directly to the founder.",
      "Scaled the platform to 1,500+ paying customers; expanded into CondoMail and Realead on a shared multi-LLM architecture.",
      "Cut LLM inference costs 20%; personally converted 30+ prospects into long-term paying accounts across healthcare and real estate.",
    ],
  },
  {
    period: "2022 — 2024",
    title: "Freelance Full-Stack Developer",
    org: "Remote · fintech, retail, logistics",
    points: [
      "Delivered 10+ end-to-end applications across MERN, Django, Flask, and Laravel.",
      "Built a fintech accounts system for an MCA-registered firm — automated reconciliation saving 15+ staff-hours per week.",
      "Improved API performance 25% and implemented zero-downtime CI/CD pipelines.",
    ],
  },
  {
    period: "2021 — 2023",
    title: "Technical Instructor",
    org: "Aimers Institute & VT College",
    points: [
      "Mentored 150+ students in Python, Django, MERN, and Flutter through project-based learning.",
      "Redesigned the curriculum to industry needs — student placements rose 42%.",
      "Supervised 30+ capstone projects: version control, API design, UI craft.",
    ],
  },
];

export const CAPABILITIES = [
  {
    title: "AI & Voice Systems",
    items: [
      "Multi-LLM orchestration — routing by complexity & cost",
      "RAG pipelines — Pinecone, Supabase Vector",
      "Voice cloning — ElevenLabs, Cartesia",
      "Real-time telephony — Twilio, Telnyx, SIP",
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
      "Team leadership — hiring & mentorship",
      "US/EU stakeholder coordination",
    ],
  },
];

/** Hire-intent + expertise FAQs — keep answers ~40–60 words for snippet eligibility. */
export const FAQS = [
  {
    question: "Who is Hemendra Tripathi?",
    answer:
      "Hemendra Tripathi is a technical lead and voice AI engineer based in Udaipur, shipping for US and EU teams. As Technical Lead on Callin.io he scaled multi-LLM voice agents past 1,500 paying customers, cut inference cost about 20%, and owns architecture, billing, and hiring.",
  },
  {
    question: "How do I hire a voice AI technical lead like Hemendra?",
    answer:
      "Email hemendratripathi880@gmail.com or use the live agent demo on this site. He is open to technical-lead, AI engineer, and senior full-stack roles, plus select freelance. Expect a reply within 24 hours — and a case study covering latency, cost, and revenue outcomes.",
  },
  {
    question: "What is complexity-aware multi-LLM orchestration?",
    answer:
      "It classifies each voice-agent turn — greeting, FAQ, scheduling, objection — and routes to the smallest model that can finish the job. Large models handle hard reasoning only. Paired with semantic cache and concurrent prompts, this cuts LLM spend while keeping time-to-first-token low enough callers stay on the line.",
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
      "Yes — he is open to technical-lead, AI engineer, and senior full-stack roles, and select freelance engagements focused on voice AI, multi-LLM products, or usage-based billing. Reach out by email; he typically replies within 24 hours and can share the Callin.io case study and résumé.",
  },
] as const;
