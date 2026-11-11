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
  "Thanks for picking up. I know answering an unknown caller is a leap of faith.",
  "I'm an <b>AI voice agent</b>. My day job is making real qualification calls for <b>Callin.io</b>, a voice AI platform serving <b>500+ businesses</b>.",
  "This call is different. I'm qualifying a hiring lead for <span class='hl'>Hemendra Tripathi</span>, the engineer who built me. That lead is you.",
  "Who am I speaking with?",
];

export const PERSONA_OPENERS: Record<Persona, string> = {
  recruiter:
    "A recruiter. High intent, strong conversion profile. Logged as <b>hot lead</b>.",
  founder:
    "Good. Hemendra owns everything from architecture to infrastructure cost on a production voice platform. You two will speak the same language.",
  browsing:
    "Noted. My CRM has no field for that, so I've logged you as <b>“future employer”</b>.",
};

export const BRIEF: string[] = [
  "The ten-second version: <b>Hemendra Tripathi</b>. AI Voice Engineer and Technical Lead. He runs engineering for a voice AI platform from design to production: real-time voice agents, multi-LLM routing, and post-call analytics.",
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
      "He leads engineering on <b>Callin.io</b>: AI voice agents that make real phone calls, multilingual, and wired into Google Calendar so they book meetings <i>mid-conversation</i>.",
      "He owns the architecture, the infrastructure bill and the roadmap.",
      "Same engine, two more products: <span class='hl'>CondoMail</span> (AI email management, live with early adopters) and <span class='hl'>Realead</span> (AI qualification calls for real-estate leads). Which is, incidentally, my day job.",
    ],
  },
  numbers: {
    label: "Show me the numbers",
    crm: "metrics",
    lines: [
      "Pulling the file. Here's what I'd flag to any hiring committee:",
      "<b>500+ businesses</b> served by a platform he helped build from the first commit, across healthcare and real estate.",
      "<b>Roughly 20% lower LLM inference cost</b> by routing each turn to the right-sized model: large models for hard reasoning, light models for routine turns.",
      "<b>Roughly 40% fewer cancellations</b> after the platform work he led.",
    ],
  },
  stack: {
    label: "AI & tech stack",
    crm: "stack",
    lines: [
      "Voice and AI: <b>multi-LLM routing</b> with semantic caching and concurrent prompts, real-time telephony over SIP and WebRTC, speech-to-text and text-to-speech selection, and self-hosted models for post-call analytics.",
      "That's what keeps my time-to-first-token low enough that humans don't hang up on me. In voice AI, <b>latency is the product</b>.",
      "Full-stack: React, Next.js, React Native, Node, NestJS, Python. Infra: Docker, AWS, Redis, Supabase/Postgres. Plus the unglamorous superpower: <b>Stripe usage-based billing done right</b>.",
    ],
  },
  projects: {
    label: "Shipped products",
    crm: "projects",
    lines: [
      "<b>Callin.io</b>: the platform itself. Real-time voice agents with the multi-LLM orchestration layer he helped design.",
      "<b>CondoMail</b>: AI agents that sort, draft and auto-reply to email across providers. In production today.",
      "<b>Realead</b>: AI qualification and follow-up calls for property leads, in final beta. You're inside a live demo of the concept right now.",
      "Before Callin.io he taught <b>150+ students</b> Python, Django, MERN and Flutter, and built web apps across several stacks.",
    ],
  },
  why: {
    label: "Why hire him over anyone else?",
    crm: "note",
    lines: [
      "Honest answer: most engineers write code. <b>Hemendra ships systems that hold up on real calls.</b>",
      "The same person designs the architecture, watches the infrastructure bill and builds the billing path. That intersection (<span class='hl'>deep AI engineering × product ownership × cost discipline</span>) is rare.",
      "He is remote from India, working with APAC time zones.",
      "And the meta-argument: <b>this portfolio is a working replica of his product.</b> Everyone else told you what they can do. He showed you.",
    ],
  },
};

export const OUTRO: string[] = [
  "Marking this lead <b>Qualified: Strong Hire</b> and generating your call summary.",
  "One professional opinion before I hang up: twenty minutes with him is a cheap experiment. The booking link is right below.",
];

export const DECLINE_LINES: string[] = [
  "Screening your calls? Reasonable. Hemendra builds spam-resistant calling flows for a living. This one is worth answering.",
  "Persistence is a feature. I'm trained on real sales calls. I can do this all day.",
  "Final offer: I don't have a voicemail budget. The green button, please.",
];

export const MARQUEE_ITEMS: string[] = [
  "REAL-TIME VOICE AI",
  "500+ BUSINESSES",
  "~20% LOWER LLM COST",
  "MULTI-LLM ORCHESTRATION",
  "SIP · WEBRTC · STT/TTS",
  "TECHNICAL LEAD",
  "STRIPE USAGE-BASED BILLING",
  "POST-CALL ANALYTICS",
];
