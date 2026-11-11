/** Long-form copy for /work/callin-io only. Keep the homepage CASE teaser separate. */

export const CASE_STUDY_STACK = [
  "React",
  "Node.js",
  "Supabase",
  "Stripe",
  "Redis",
] as const;

export const CALLIN_CASE = {
  lede: "Callin.io is a voice AI platform. I started as a Software Engineer building it from the ground up and now lead its engineering as Technical Lead. This page covers the problem, how I approached it, and what changed.",

  demoKicker: "One live turn, with the intent, model and cost for that turn.",

  context:
    "Role: Software Engineer, then Technical Lead, at Appspundit Infotech. Timeline: October 2024 to present. Callin.io is used by businesses in healthcare and real estate, among others. On a voice call, a slow answer is a hangup, and the cost of every turn adds up.",

  product: [
    "Callin is a multi-tenant voice-agent platform. Customers build agents, launch campaigns, attach phone numbers and manage everything from one dashboard. Healthcare and real estate show up as customers and templates, not as certifications.",
  ],

  architecture: [
    "The production path has five parts: the caller, telephony, an orchestrator, the models, and post-call analytics. That is the ownership map, not a runbook.",
    "The orchestrator decides which model handles each turn and enforces the latency budget. Simple turns go to small models. Hard reasoning goes to large ones. Cost and speed are visible on every turn.",
    "After the call, self-hosted models analyze goals, sentiment and key moments, so customers can see what to fix without sending call data to extra vendors.",
  ],

  storiesIntro: "Three decisions that mattered. Problem, decision, outcome.",

  stories: [
    {
      idx: "A",
      title: "Routing by complexity",
      body: [
        "I used one large model for every turn. Greetings and confirmations burned margin.",
        "I classify each turn and route it to the smallest model that can finish it.",
        "Inference cost is roughly 20% lower.",
      ],
    },
    {
      idx: "B",
      title: "Choosing providers on evidence",
      body: [
        "Voice quality and latency varied between speech and voice providers. Opinions were not enough.",
        "I compared providers side by side on the same calls and recommended the best fit.",
        "The CEO approved the switch.",
      ],
    },
    {
      idx: "C",
      title: "Letting AI agents fix tickets, with limits",
      body: [
        "Engineering time was going into small, repetitive support tickets.",
        "I let AI agents handle fixes, gated by how much damage a bad change could do. Low-risk fixes go through. Risky ones wait for a human.",
        "Engineers spend their time on harder problems. No change ships without matching its risk level.",
      ],
    },
  ],

  results: [
    "Three numbers, because this page is supposed to earn them.",
    "1,000+ businesses served, roughly 20% lower inference cost, and roughly 40% fewer cancellations.",
  ],

  next: "Next I want tighter per-turn latency visibility, so a slow path cannot hide behind a good average.",

  close:
    "If you are hiring a technical lead who has owned a voice platform's architecture and cost, this is the work.",
} as const;
