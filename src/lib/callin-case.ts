/** Long-form copy for /work/callin-io only. Keep the homepage CASE teaser separate. */

export const CASE_STUDY_STACK = [
  "React",
  "Node.js",
  "Supabase",
  "Stripe",
  "Redis",
  "Twilio",
  "Telnyx",
] as const;

export const CALLIN_CASE = {
  lede: "Callin.io is a voice-agent platform I lead as Technical Lead: our own orchestrator, three internal runtimes, dual-carrier telephony, and minute billing on the same clock as the turn. The rest of this page is the constraints, the architecture, and three production failures we designed around.",

  demoKicker:
    "One production turn. Intent, model, TTFT, carrier, cost. This is the clock the rest of the page is about.",

  context:
    "I lead Callin as Technical Lead at Appspundit Infotech. Architecture, vendor spend, and billing sit with me. We sell to US and EU customers: white-label resellers who ship the product under their brand, and direct accounts who run agents on Callin themselves. I will not invent a team size for this page. The constraints were never theoretical. A slow greeting is a hangup. A wrong invoice is a churn ticket. A transfer that dies when the agent leaves is a lost patient or a lost listing.",

  product: [
    "Callin is a multi-tenant voice-agent SaaS. Customers build agents, launch campaigns, attach numbers, and white-label the whole surface when they resell. Healthcare and real estate show up as customers and templates. They are not a vertical certification. We did not ship a certified medical product. We shipped a platform those teams paid for.",
  ],

  architecture: [
    "Five boxes. That is the production path I will draw in public.",
    "A caller reaches us over PSTN or WebRTC. Telephony is dual-carrier plus SIP. Twilio and Telnyx are carriers. Pipes. They move audio. They are not the product. The Callin orchestrator sits in the middle: cache, parallel prompts, a turn clock. We warm greetings so the first words are not a cold start. We run retrieval concurrently so the reply is not waiting on a round trip we already knew we needed. Those are the levers. Silence is still the bug.",
    "From the orchestrator the turn lands on an internal runtime: Ultra-low latency, Premium Voice, or Custom Stack. Voice returns on Callin's TTS path. I will not name the vendors behind that path. Customers never see them. A hiring page is not a vendor map.",
    "Spend routing and billing sit on the same clock as latency. That is the point of owning the orchestrator. If a turn is expensive, we see it on the turn. If a minute is billable, we see it on the turn. The live-turn demo above is the public version of that instrument: intent, model, TTFT, carrier, cost this turn. I will not draw workers, flags, or how a customer lands on a runtime. The diagram is the ownership map. It is not a runbook.",
  ],

  storiesIntro:
    "Three failures we designed around. Problem, decision, outcome. No extra feature grid. If a competitor could copy a mechanism from a paragraph, I deleted the paragraph.",

  stories: [
    {
      idx: "A",
      title: "Three runtimes, one platform",
      body: [
        "The first production failure was one runtime for every customer.",
        "Customers do not want the same call. Some need the agent talking before the caller decides the line is dead. Some will trade a little wait for a voice that sounds like a person they would hire. Some arrive with their own constraints and need a stack we can shape. Latency, quality, and cost do not peak in the same place. Ship one runtime and you ship a compromise. Ship three products and you ship a support nightmare: why does this reseller's agent feel different, and why did the invoice change when we upgraded the voice.",
        "The decision was one product, three internal runtimes. Ultra-low latency. Premium Voice. Custom Stack. Same builder. Same campaigns. Same numbers. Same transfer to a human. Same minute billing. The dashboard never exposes plumbing. A white-label reseller does not pick a vendor. They pick how the call should feel. Direct accounts get the same rule. Routing between runtimes is our problem. I will not put that mapping here.",
        "Outcome: we did not fork Callin into three apps. Paying customers went past 1,500 on one platform. LLM inference cost dropped 20% because we stopped paying the expensive path for greetings and confirmations. Typical voice TTFT sat near 420ms on the path that has to be fast. Tools, transfer, and invoices behaved the same on every runtime. That is the only way a reseller can sell this without hiring a voice engineer of their own.",
      ],
    },
    {
      idx: "B",
      title: "Transfer to a human",
      body: [
        "The second production failure was a transfer that looked done in the UI and was not done on the call.",
        "“Connect me to a person” is the moment the product either becomes real or becomes a toy. Healthcare intake and real estate qualification both need it. The agent does the first minutes. A human takes the rest. If the caller and that human cannot hear each other after the agent leaves, you did not transfer anyone. You ended a call with extra steps, and you trained the account to stop using agents.",
        "Handoff is harder than it looks. The caller has already spoken. They will not repeat the story for a new voice if the line glitches. The human is joining a conversation in motion, not starting one. We own the path, so we can keep both people hearing each other after the agent steps out. That was the decision. Do not rent a black box and hope the last ten seconds are included. Own the call until the human and the caller are actually talking.",
        "Outcome: transfer is a product promise, not a workaround. It works on Ultra-low latency, Premium Voice, and Custom Stack. Same tools around it. I will not describe how the audio stays up. No protocols. There is no next paragraph.",
      ],
    },
    {
      idx: "C",
      title: "Billing as a product",
      body: [
        "The third production failure was an invoice that was almost right.",
        "We sell minutes, including rollovers. That is a trust product wearing a billing costume. A customer who likes the agent will still churn if the bill feels like an estimate. Tickets about minutes are not a support queue. They are the product saying it cannot count. White-label resellers feel this twice: they bill their customers, and they get billed by us. If those two numbers disagree, we did not build a platform. We built an argument.",
        "The decision was to treat billing as a product surface. Invoices have to match usage, including rollovers. Stripe is how money moves. The clock that times the turn times the minute. I will not describe how minutes are counted behind that sentence. The public bar is simpler: a customer should open an invoice and not reach for a spreadsheet.",
        "Outcome: billing disputes since launch are about zero. Not because we argued better. Because the ledger is boringly correct. I personally converted 30+ accounts across healthcare and real estate. Closing those was easier when I could say the invoice would match the call. The ~0 on the board is the number I would keep if I could only keep one.",
      ],
    },
  ],

  results: [
    "Same four numbers, because this page is supposed to earn them.",
    "Healthcare and real estate are where a lot of those accounts and templates live. Not a stamp. A typical TTFT near 420ms, a cost line that moved, and invoices people stopped fighting. Scale is 1,500+ paying customers on one product with three runtimes they cannot see.",
  ],

  next: "I want tighter per-turn latency visibility across every runtime, so a slow path cannot hide behind a good average. I want billing to stay boring.",

  close:
    "If you are hiring a technical lead who has already owned a voice product's architecture, spend, and billing, this is the work.",
} as const;
