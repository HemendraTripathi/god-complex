export type Persona = "recruiter" | "founder" | "browsing";
export type TopicId = "now" | "numbers" | "stack" | "projects" | "why";
export type CrmSection =
  | "profile"
  | "role"
  | "metrics"
  | "stack"
  | "projects"
  | "note";

export const INTRO: string[] = [
  "Thanks for picking up — I know answering an unknown caller is a leap of faith.",
  "I'm an <b>AI voice agent</b>. My day job is making real qualification calls for <b>Callin.io</b>, a voice-AI platform with <b>1,500+ paying customers</b>.",
  "This call is different. I'm qualifying a hiring lead for <span class='hl'>Hemendra Tripathi</span> — the engineer who built me. That lead is you.",
  "Who am I speaking with?",
];

export const PERSONA_OPENERS: Record<Persona, string> = {
  recruiter:
    "A recruiter — high intent, strong conversion profile. Logged as <b>hot lead</b>.",
  founder:
    "Good. Hemendra reports directly to a founder today and owns everything from architecture to vendor spend. You two will speak the same language.",
  browsing:
    "Noted. My CRM has no field for that, so I've logged you as <b>“future employer”</b>.",
};

export const BRIEF: string[] = [
  "The ten-second version: <b>Hemendra Tripathi</b>. Technical Lead and AI engineer, <b>4+ years</b>. Runs engineering for an AI voice SaaS from design to production — real-time voice agents, multi-LLM orchestration, billing systems that make money.",
  "His full file is loaded. What do you want to know?",
];

export const TOPICS: Record<
  TopicId,
  { label: string; crm: CrmSection; lines: string[] }
> = {
  now: {
    label: "What's he building right now?",
    crm: "role",
    lines: [
      "He leads engineering on <b>Callin.io</b> — AI voice agents that make real phone calls: multilingual, voice-cloned, and wired into Google Calendar so they book meetings <i>mid-conversation</i>.",
      "He leads the engineering team he helped hire, and owns the architecture, the infrastructure bill, vendor decisions, and the roadmap — reporting directly to the founder.",
      "Same engine, two more products: <span class='hl'>CondoMail</span> — AI email management, live with high-volume Amazon sellers — and <span class='hl'>Realead</span> — AI qualification calls for real-estate leads. Which is, incidentally, my day job.",
    ],
  },
  numbers: {
    label: "Show me the numbers",
    crm: "metrics",
    lines: [
      "Pulling the file. Here's what I'd flag to any hiring committee:",
      "<b>1,500+ paying customers</b> on a platform he architected and scaled — including enterprise accounts in healthcare and real estate.",
      "<b>20% cut in LLM inference cost</b> by routing each task to the right-sized model — large models for hard reasoning, light models for routine turns.",
      "A <b>minute-based billing system</b> with rollover tracking precise enough that billing disputes have been negligible since launch.",
      "And <b>30+ prospects personally converted</b> into long-term paying customers. An engineer who closes.",
    ],
  },
  stack: {
    label: "AI & tech stack",
    crm: "stack",
    lines: [
      "Voice and AI: <b>multi-LLM orchestration</b> with semantic caching and concurrent prompt execution, <b>RAG pipelines</b> on Pinecone and Supabase Vector, voice cloning with ElevenLabs and Cartesia, real-time telephony over Twilio, Telnyx and raw SIP.",
      "That's the stack keeping my time-to-first-token low enough that humans don't hang up on me. In voice AI, <b>latency is the product</b>.",
      "Full-stack: React, Next.js, React Native, Node, NestJS, Laravel, Python. Infra: Docker, AWS, Redis, Supabase/Postgres, zero-downtime CI/CD. Plus the unglamorous superpower — <b>Stripe usage-based billing done right</b>.",
    ],
  },
  projects: {
    label: "Shipped products",
    crm: "projects",
    lines: [
      "<b>Callin.io</b> — the platform itself. Low-latency audio over WebSockets and SIP, with the custom LLM orchestration layer he designed.",
      "<b>CondoMail</b> — AI agents that sort, draft, and auto-reply to email across providers. In production today.",
      "<b>Realead</b> — AI qualification and follow-up calls for property leads, in final beta. You're inside a live demo of the concept right now.",
      "Before that: <b>10+ freelance builds</b> across fintech, retail and logistics — including an accounts platform that saved 15+ staff-hours a week and cut errors 30%. He also trained <b>150+ students</b> as an instructor; placements rose 42% after he rebuilt the curriculum.",
    ],
  },
  why: {
    label: "Why hire him over anyone else?",
    crm: "note",
    lines: [
      "Honest answer: most engineers write code. <b>Hemendra ships businesses.</b>",
      "The same person designs the architecture, negotiates the vendor bill, builds the billing system, hires the team, and gets on calls to close customers. That intersection — <span class='hl'>deep AI engineering × product ownership × revenue instinct</span> — is rare.",
      "Proven across timezones, too: three major releases coordinated with US and European stakeholders, while running the team from India.",
      "And the meta-argument: <b>this portfolio is a working replica of his product.</b> Everyone else told you what they can do. He showed you.",
    ],
  },
};

export const OUTRO: string[] = [
  "Marking this lead <b>Qualified — Strong Hire</b> and generating your call summary.",
  "One professional opinion before I hang up: candidates like this don't stay on the market. <b>Move fast.</b>",
];

export const DECLINE_LINES: string[] = [
  "Screening your calls? Reasonable. Hemendra builds spam-resistant calling flows for a living. This one is worth answering.",
  "Persistence is a feature. I'm trained on his sales calls — he converted 30+ customers. I can do this all day.",
  "Final offer: I don't have a voicemail budget. The green button, please.",
];

export const MARQUEE_ITEMS: string[] = [
  "REAL-TIME VOICE AI",
  "1,500+ PAYING CUSTOMERS",
  "−20% LLM INFERENCE COST",
  "MULTI-LLM ORCHESTRATION",
  "TWILIO / TELNYX / SIP",
  "ENGINEERING TEAM LEAD",
  "STRIPE USAGE-BASED BILLING",
  "RAG · PINECONE · SUPABASE VECTOR",
];
