"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  BRIEF,
  DECLINE_LINES,
  INTRO,
  OUTRO,
  PERSONA_OPENERS,
  TOPICS,
  type CrmSection,
  type Persona,
  type TopicId,
} from "@/lib/script";
import CountUp from "./CountUp";

type Msg = { id: number; role: "agent" | "user"; html: string };
type Choice = { label: string; onPick: () => void; done?: boolean; end?: boolean };

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const fmt = (s: number) =>
  `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

/* ---------------- lead file (right column) ---------------- */
const METRICS = [
  { to: 1500, suffix: "+", label: "paying customers" },
  { to: 20, prefix: "−", suffix: "%", label: "LLM inference cost" },
  { to: 30, suffix: "+", label: "prospects closed" },
  { to: 150, suffix: "+", label: "students mentored" },
];

const FILE_PROJECTS = [
  { n: "Callin.io", t: "PROD", d: "Voice pipeline — WebSockets + SIP, multi-LLM orchestration" },
  { n: "CondoMail", t: "LIVE", d: "AI email agents for high-volume Amazon sellers" },
  { n: "Realead", t: "BETA", d: "AI qualification calls — the tech behind this demo" },
  { n: "Sunria · FinTech", t: "SHIPPED", d: "Farm management · accounts automation, −30% errors" },
];

function FileSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      data-file-section
      className="border-b border-hair px-5 py-4 last:border-none"
    >
      <div className="eyebrow mb-3 !text-[9.5px]">{title}</div>
      {children}
    </motion.div>
  );
}

function LeadFile({
  revealed,
  qualified,
}: {
  revealed: CrmSection[];
  qualified: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const nodes = el.querySelectorAll("[data-file-section]");
    nodes[nodes.length - 1]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [revealed]);

  const has = (s: CrmSection) => revealed.includes(s);

  return (
    <div className="flex min-h-0 flex-col">
      <div className="flex shrink-0 items-center justify-between border-b border-ink px-5 py-3">
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
          Lead file — #0001
        </span>
        <span
          className={`px-2 py-0.5 font-mono text-[9.5px] font-bold uppercase tracking-widest ${
            qualified ? "bg-org text-paper" : "text-org"
          }`}
        >
          {qualified ? "Qualified ✓" : "● Qualifying"}
        </span>
      </div>

      <div ref={ref} className="thin-scroll min-h-0 flex-1 overflow-y-auto">
        {has("profile") && (
          <FileSection title="Candidate">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center bg-ink font-mono text-[13px] font-bold text-paper">
                HT
              </div>
              <div>
                <div className="text-[14px] font-bold">Hemendra Tripathi</div>
                <div className="text-[11.5px] text-steel">
                  Technical Lead · Full-Stack · AI Systems
                </div>
                <div className="font-mono text-[9.5px] uppercase tracking-wide text-steel">
                  Udaipur, IN · US/EU timezones
                </div>
              </div>
            </div>
          </FileSection>
        )}

        {has("role") && (
          <FileSection title="Current engagement">
            {[
              ["Product", "Callin.io — AI voice SaaS"],
              ["Role", "Technical Lead, reports to founder"],
              ["Team", "5 engineers — hired & led"],
              ["Owns", "Architecture · spend · roadmap"],
              ["Suite", "+ CondoMail · + Realead"],
            ].map(([k, v]) => (
              <div
                key={k}
                className="flex justify-between gap-4 border-b border-hair py-1.5 text-[12px] last:border-none"
              >
                <span className="text-steel">{k}</span>
                <span className="text-right font-semibold">{v}</span>
              </div>
            ))}
          </FileSection>
        )}

        {has("metrics") && (
          <FileSection title="Verified impact">
            <div className="grid grid-cols-2 gap-2">
              {METRICS.map((m) => (
                <div key={m.label} className="border border-ink/25 p-3">
                  <div className="font-mono text-[19px] font-semibold">
                    {m.prefix}
                    <CountUp to={m.to} duration={1} separator="," className="" />
                    {m.suffix}
                  </div>
                  <div className="mt-0.5 text-[10.5px] leading-snug text-steel">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </FileSection>
        )}

        {has("stack") && (
          <FileSection title="Arsenal">
            <div className="flex flex-wrap gap-1.5">
              {[
                "Multi-LLM orchestration",
                "RAG · Pinecone",
                "ElevenLabs · Cartesia",
                "Twilio · Telnyx · SIP",
                "React / Next.js",
                "Node / NestJS",
                "Stripe billing",
                "AWS · Docker · Redis",
              ].map((c) => (
                <span
                  key={c}
                  className="border border-ink/30 px-2 py-1 font-mono text-[9.5px] uppercase tracking-wide text-ink/80"
                >
                  {c}
                </span>
              ))}
            </div>
          </FileSection>
        )}

        {has("projects") && (
          <FileSection title="Shipped">
            {FILE_PROJECTS.map((p) => (
              <div
                key={p.n}
                className="border-b border-hair py-2 first:pt-0 last:border-none last:pb-0"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[12.5px] font-bold">{p.n}</span>
                  <span className="font-mono text-[8.5px] font-bold uppercase tracking-widest text-org">
                    {p.t}
                  </span>
                </div>
                <div className="text-[11px] leading-relaxed text-steel">{p.d}</div>
              </div>
            ))}
          </FileSection>
        )}

        {has("note") && (
          <FileSection title="Agent's note">
            <p className="border-l-2 border-org pl-3 text-[11.5px] leading-relaxed">
              Rare profile — a technical lead who also owns billing, vendor
              costs, hiring, and customers. Ships revenue, not just code.
              Recommend contact before competitors.
            </p>
          </FileSection>
        )}
      </div>
    </div>
  );
}

/* ---------------- main component ---------------- */
export default function AgentCall() {
  const [stage, setStage] = useState<"ring" | "call">("ring");
  const [declineIdx, setDeclineIdx] = useState(-1);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [choices, setChoices] = useState<Choice[]>([]);
  const [revealed, setRevealed] = useState<CrmSection[]>([]);
  const [qualified, setQualified] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [visitedCount, setVisitedCount] = useState(0);

  const visitedRef = useRef<Set<TopicId>>(new Set());
  const msgId = useRef(0);
  const secondsRef = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (stage !== "call" || qualified) return;
    const t = setInterval(() => {
      secondsRef.current += 1;
      setSeconds(secondsRef.current);
    }, 1000);
    return () => clearInterval(t);
  }, [stage, qualified]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing, choices]);

  const push = (role: Msg["role"], html: string) =>
    setMessages((m) => [...m, { id: ++msgId.current, role, html }]);

  async function say(lines: string[]) {
    setChoices([]);
    for (const html of lines) {
      setTyping(true);
      await sleep(Math.min(500 + html.length * 5, 1500));
      setTyping(false);
      push("agent", html);
      await sleep(200);
    }
  }

  const reveal = (s: CrmSection) =>
    setRevealed((r) => (r.includes(s) ? r : [...r, s]));

  function hub() {
    const visited = visitedRef.current;
    const list: Choice[] = (
      Object.entries(TOPICS) as [TopicId, (typeof TOPICS)[TopicId]][]
    ).map(([id, t]) => ({
      label: (visited.has(id) ? "✓ " : "") + t.label,
      done: visited.has(id),
      onPick: async () => {
        visited.add(id);
        setVisitedCount(visited.size);
        push("user", t.label);
        reveal(t.crm);
        await say(t.lines);
        hub();
      },
    }));
    list.push({
      label: "End call — summarize",
      end: true,
      onPick: async () => {
        push("user", "End call — summarize");
        await say(OUTRO);
        setQualified(true);
        await sleep(600);
        setShowSummary(true);
      },
    });
    setChoices(list);
  }

  async function afterWho(persona: Persona, label: string) {
    push("user", label);
    await say([PERSONA_OPENERS[persona], ...BRIEF]);
    hub();
  }

  async function answer() {
    setStage("call");
    await sleep(400);
    reveal("profile");
    await say(INTRO);
    setChoices([
      { label: "I'm a recruiter", onPick: () => afterWho("recruiter", "I'm a recruiter") },
      { label: "Founder / hiring manager", onPick: () => afterWho("founder", "Founder / hiring manager") },
      { label: "Just browsing", onPick: () => afterWho("browsing", "Just browsing") },
    ]);
  }

  return (
    <div className="relative border-2 border-ink bg-paper">
      {/* header */}
      <div className="flex items-center justify-between border-b-2 border-ink bg-ink px-5 py-3 text-paper">
        <div className="flex items-center gap-3">
          <span className="blink h-2 w-2 bg-org" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em]">
            Live demo — Recruiting-qualification line
          </span>
        </div>
        {stage === "call" && (
          <div className="flex items-center gap-4">
            <div className={`flex h-4 items-end gap-[3px] ${typing ? "eq-on" : ""}`}>
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className="eq-bar h-full w-[3px] bg-org" />
              ))}
            </div>
            <span className="font-mono text-[12px] font-bold">{fmt(seconds)}</span>
          </div>
        )}
      </div>

      {/* ring */}
      {stage === "ring" && (
        <div className="flex flex-col items-center px-6 py-16 text-center sm:py-20">
          <div className="relative mb-8 h-20 w-20">
            <span className="callpulse absolute inset-0 border border-ink" />
            <span className="callpulse absolute inset-0 border border-ink [animation-delay:0.7s]" />
            <div className="absolute inset-0 flex items-center justify-center bg-ink font-mono text-lg font-bold text-paper">
              HT
            </div>
          </div>
          <div className="eyebrow blink mb-3">● Incoming call</div>
          <h3 className="display text-3xl">Hemendra&rsquo;s AI Agent</h3>
          <p className="mt-3 max-w-sm text-[13.5px] leading-relaxed text-steel">
            Built on the same stack as his production voice agents. Its only
            job: qualify you as a hiring lead.
          </p>
          <div className="mt-9 flex items-center gap-3">
            <button
              onClick={() => setDeclineIdx((i) => Math.min(i + 1, DECLINE_LINES.length - 1))}
              className="border-2 border-ink px-6 py-3 font-mono text-[11px] font-bold uppercase tracking-widest transition-colors hover:border-org hover:text-org"
            >
              ✕ Decline
            </button>
            <button
              onClick={answer}
              className="border-2 border-ink bg-ink px-6 py-3 font-mono text-[11px] font-bold uppercase tracking-widest text-paper shadow-brutal transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:bg-org hover:shadow-none"
            >
              ▶ Answer call
            </button>
          </div>
          <AnimatePresence>
            {declineIdx >= 0 && (
              <motion.p
                key={declineIdx}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-7 max-w-sm border-l-2 border-org pl-3 text-left font-mono text-[10.5px] leading-relaxed text-org"
              >
                {DECLINE_LINES[declineIdx]}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* call */}
      {stage === "call" && (
        <div className="grid h-[600px] grid-cols-1 xl:grid-cols-[1fr_340px]">
          <div className="flex min-h-0 flex-col xl:border-r-2 xl:border-ink">
            <div ref={scrollRef} className="thin-scroll min-h-0 flex-1 space-y-5 overflow-y-auto p-5 sm:p-6">
              {messages.map((m) =>
                m.role === "agent" ? (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="max-w-[88%] border-l-2 border-ink pl-4 sm:max-w-[75%]"
                  >
                    <div className="mb-1 font-mono text-[9px] font-bold uppercase tracking-[0.24em] text-steel">
                      Agent
                    </div>
                    <div
                      className="msg-html select-text text-[13.5px] leading-relaxed text-ink/85"
                      dangerouslySetInnerHTML={{ __html: m.html }}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="ml-auto w-max max-w-[88%] bg-ink px-4 py-2.5 text-[13px] font-semibold text-paper sm:max-w-[75%]"
                  >
                    {m.html}
                  </motion.div>
                ),
              )}
              {typing && (
                <div className="flex w-max items-center gap-1.5 border-l-2 border-ink py-1 pl-4">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="tsq h-1.5 w-1.5 bg-ink" />
                  ))}
                </div>
              )}
            </div>

            <div className="shrink-0 border-t-2 border-ink p-4">
              {visitedCount > 0 && choices.length > 0 && (
                <div className="eyebrow mb-2.5 !text-[9px]">
                  {visitedCount}/5 topics — the summary improves as you ask
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {choices.map((c) => (
                  <button
                    key={c.label}
                    onClick={c.onPick}
                    className={`border px-3.5 py-2 font-mono text-[10.5px] font-bold uppercase tracking-wider transition-colors ${
                      c.end
                        ? "border-org text-org hover:bg-org hover:text-paper"
                        : c.done
                          ? "border-ink/25 text-steel hover:border-ink/50"
                          : "border-ink hover:bg-ink hover:text-paper"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
                {choices.length === 0 && !typing && (
                  <span className="font-mono text-[10px] uppercase tracking-widest text-steel">
                    Agent is speaking…
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="hidden min-h-0 xl:block">
            <LeadFile revealed={revealed} qualified={qualified} />
          </div>
        </div>
      )}

      {/* summary overlay */}
      <AnimatePresence>
        {showSummary && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-10 flex items-center justify-center overflow-y-auto bg-ink/40 p-5 backdrop-blur-[2px]"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
              className="relative m-auto w-full max-w-md border-2 border-ink bg-paper shadow-brutal"
            >
              <div className="pointer-events-none absolute -right-3 -top-4 rotate-[7deg] border-[3px] border-org bg-paper px-3 py-1 font-mono text-[13px] font-bold uppercase tracking-[0.14em] text-org">
                Strong hire ✓
              </div>
              <div className="border-b-2 border-ink bg-ink px-6 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-paper">
                Call summary — auto-generated
              </div>
              <div className="p-6">
                <h3 className="display text-[30px]">Lead qualified.</h3>
                <div className="mt-4 space-y-0 border-t border-hair text-[12.5px]">
                  {[
                    ["Candidate", "Hemendra Tripathi"],
                    ["Role fit", "Technical Lead · AI & Full-Stack"],
                    ["Duration", `${fmt(seconds)} — worth every second`],
                    ["Sentiment", "Extremely interested"],
                    ["Risk of waiting", "He joins your competitor"],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="flex justify-between gap-4 border-b border-hair py-2"
                    >
                      <span className="font-mono text-[10px] uppercase tracking-wider text-steel">
                        {k}
                      </span>
                      <span className="text-right font-semibold">{v}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                  <a
                    href="mailto:hemendratripathi880@gmail.com?subject=Let%27s%20talk"
                    className="flex-1 border-2 border-ink bg-ink px-5 py-3 text-center font-mono text-[10.5px] font-bold uppercase tracking-widest text-paper transition-colors hover:bg-org hover:border-org"
                  >
                    Email Hemendra
                  </a>
                  <a
                    href="/Hemendra_Tripathi_Resume.pdf"
                    download
                    className="flex-1 border-2 border-ink px-5 py-3 text-center font-mono text-[10.5px] font-bold uppercase tracking-widest transition-colors hover:bg-ink hover:text-paper"
                  >
                    Résumé (PDF)
                  </a>
                </div>
                <button
                  onClick={() => location.reload()}
                  className="mt-4 w-full text-center font-mono text-[9.5px] uppercase tracking-widest text-steel underline-offset-2 hover:text-ink hover:underline"
                >
                  ↺ Replay call
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
