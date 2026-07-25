export const LINKS = {
  email: "hemendratripathi880@gmail.com",
  resume: "/Hemendra_Tripathi_Resume.pdf",
  github: "https://github.com/hemendratripathi",
  linkedin: "https://www.linkedin.com/in/hemendratripathi",
  callin: "https://callin.io",
};

export const NAV = [
  ["Work", "#work"],
  ["Case study", "#case"],
  ["Agent", "#agent"],
  ["Thinking", "#thinking"],
  ["Contact", "#contact"],
] as const;

export const STATS = [
  { to: 1500, suffix: "+", label: "Paying customers on a platform he architected" },
  { to: 20, prefix: "−", suffix: "%", label: "LLM inference cost via model routing" },
  { to: 420, suffix: "ms", label: "Typical voice TTFT after orchestration work" },
  { to: 30, suffix: "+", label: "Prospects personally closed into paying accounts" },
];

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

export const WORK: WorkItem[] = [
  {
    idx: "01",
    name: "Callin.io",
    role: "Technical Lead — architecture, billing, voice pipeline",
    desc: "AI voice-calling SaaS scaled to 1,500+ paying customers and enterprise accounts. Low-latency telephony, multi-LLM orchestration, and minute-based billing with negligible disputes since launch.",
    stack: "React / Node.js / Supabase / Twilio / Telnyx / Stripe",
    status: "IN PRODUCTION",
    img: "/images/work-callin.png",
    visual: "callin",
    href: "#case",
  },
  {
    idx: "02",
    name: "CondoMail",
    role: "Product architecture — multi-provider email sync",
    desc: "AI agents that sort, draft, and auto-reply across providers. Live with early adopters — including high-volume Amazon sellers running inbox workflows on it.",
    stack: "React / Node.js / Supabase / Stripe / Firebase",
    status: "LIVE",
    img: "/images/work-condomail.png",
    visual: "condo",
  },
  {
    idx: "03",
    name: "Realead",
    role: "Full-stack · mobile · AI calling flows",
    desc: "Connects lead sources, builds a business profile, and places AI qualification + follow-up calls for property leads. Final beta ahead of release — the conversational model behind the demo below.",
    stack: "React Native / NestJS / Supabase / Stripe",
    status: "BETA",
    img: "/images/work-realead.png",
    visual: "realead",
  },
  {
    idx: "04",
    name: "Sunria & FinTech Accounts",
    role: "Freelance — end-to-end delivery",
    desc: "Pan-India farm management with field-to-warehouse sync, plus a financial dashboard with automated reconciliation — 30% fewer accounting errors, 15+ staff-hours saved weekly.",
    stack: "Laravel / Flutter / MERN / CI-CD",
    status: "SHIPPED",
    img: "/images/work-sunria.png",
    visual: "sunria",
  },
];

export const CASE = {
  product: "Callin.io",
  eyebrow: "Featured case study",
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

export const SIGNALS = [
  {
    text: "We evaluated three voice vendors. Callin's agents were the only ones our clinic staff didn't hang up on — and the only ones whose invoices we didn't audit line by line.",
    name: "Priya Nair",
    org: "Director of Operations, Meridian Family Clinics",
  },
  {
    text: "He hired half my eng team, set the roadmap, and still jumped on customer calls. That's not a contractor. That's an owner.",
    name: "Rohit Malhotra",
    org: "Founder, Appspundit Infotech",
  },
  {
    text: "Curriculum he redesigned moved our placement rate up over 40%. Students left knowing how to ship, not just pass exams.",
    name: "Ananya Sharma",
    org: "Program Head, Aimers Institute",
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
