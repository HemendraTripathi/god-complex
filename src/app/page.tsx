"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  BRIEF,
  DECLINE_LINES,
  INTRO,
  MARQUEE_ITEMS,
  OUTRO,
  PERSONA_OPENERS,
  TOPICS,
  type CrmSection,
  type Persona,
  type TopicId,
} from "@/lib/script";
import Crm from "@/components/Crm";
import Summary from "@/components/Summary";

/* ---------- types ---------- */
type Msg = { id: number; role: "agent" | "user"; html: string };
type Choice = { label: string; onPick: () => void; done?: boolean; end?: boolean };

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const fmt = (s: number) =>
  `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

/* ---------- small pieces ---------- */
function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="overflow-hidden border-t-2 border-ink bg-ink py-2">
      <div className="marquee-track flex w-max gap-8 whitespace-nowrap font-mono text-[11px] font-bold tracking-[0.18em] text-paper">
        {items.map((t, i) => (
          <span key={i} className="flex items-center gap-8">
            {t} <span className="text-acid">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Eq({ on }: { on: boolean }) {
  return (
    <div className={`flex h-5 items-end gap-[3px] ${on ? "eq-on" : ""}`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <span key={i} className="eq-bar h-full w-[4px] bg-ink" />
      ))}
    </div>
  );
}

function Typing() {
  return (
    <div className="flex w-max items-center gap-1.5 border-2 border-ink bg-white px-4 py-3 shadow-brutal-sm">
      {[0, 1, 2].map((i) => (
        <span key={i} className="tsq h-2 w-2 bg-ink" />
      ))}
    </div>
  );
}

/* ---------- page ---------- */
export default function Home() {
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
  const transcriptRef = useRef<HTMLDivElement>(null);

  /* timer */
  useEffect(() => {
    if (stage !== "call" || qualified) return;
    const t = setInterval(() => {
      secondsRef.current += 1;
      setSeconds(secondsRef.current);
    }, 1000);
    return () => clearInterval(t);
  }, [stage, qualified]);

  /* autoscroll */
  useEffect(() => {
    const el = transcriptRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing, choices]);

  const push = (role: Msg["role"], html: string) =>
    setMessages((m) => [...m, { id: ++msgId.current, role, html }]);

  async function say(lines: string[]) {
    setChoices([]);
    for (const html of lines) {
      setTyping(true);
      await sleep(Math.min(500 + html.length * 5, 1600));
      setTyping(false);
      push("agent", html);
      await sleep(220);
    }
  }

  const reveal = (s: CrmSection) =>
    setRevealed((r) => (r.includes(s) ? r : [...r, s]));

  /* ---------- flow ---------- */
  function hub() {
    const visited = visitedRef.current;
    const topicChoices: Choice[] = (
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
    topicChoices.push({
      label: "End call — give me the summary",
      end: true,
      onPick: async () => {
        push("user", "End call — give me the summary");
        await say(OUTRO);
        setQualified(true);
        await sleep(700);
        setShowSummary(true);
      },
    });
    setChoices(topicChoices);
  }

  async function afterWho(persona: Persona, label: string) {
    push("user", label);
    await say([PERSONA_OPENERS[persona], ...BRIEF]);
    hub();
  }

  async function answer() {
    setStage("call");
    await sleep(500);
    reveal("profile");
    await say(INTRO);
    setChoices([
      { label: "I'm a recruiter", onPick: () => afterWho("recruiter", "I'm a recruiter") },
      { label: "Founder / hiring manager", onPick: () => afterWho("founder", "Founder / hiring manager") },
      { label: "Just browsing", onPick: () => afterWho("browsing", "Just browsing") },
    ]);
  }

  /* ================= RING ================= */
  if (stage === "ring") {
    return (
      <main className="flex h-dvh flex-col">
        <header className="flex items-center justify-between border-b-2 border-ink bg-ink px-5 py-2.5 font-mono text-[11px] font-bold tracking-[0.16em] text-paper">
          <span>HT—01 / PORTFOLIO.SYS</span>
          <span className="hidden sm:block">UDAIPUR, IN — UTC+05:30</span>
        </header>

        <div className="flex min-h-0 flex-1 items-center justify-center p-5">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-[640px] max-w-full border-2 border-ink bg-white shadow-brutal-lg"
          >
            <div className="flex items-center gap-2.5 border-b-2 border-ink bg-acid px-5 py-2.5 font-mono text-[11px] font-bold tracking-[0.18em]">
              <span className="blink inline-block h-2.5 w-2.5 bg-ink" />
              INCOMING CALL — VOICE AGENT
            </div>

            <div className="p-7 sm:p-9">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h1 className="text-[clamp(30px,6vw,52px)] font-bold uppercase leading-[0.95] tracking-tight">
                    Hemendra&rsquo;s
                    <br />
                    AI Agent
                  </h1>
                  <p className="mt-4 text-[14px] font-medium leading-snug">
                    Calling on behalf of{" "}
                    <span className="bg-acid px-1 font-bold">
                      Hemendra Tripathi
                    </span>
                    <br />
                    Technical Lead — AI Voice Systems
                  </p>
                </div>
                <div className="relative mt-1 hidden h-20 w-20 shrink-0 sm:block">
                  <span className="ringpulse absolute inset-0 border-2 border-ink" />
                  <div className="absolute inset-0 flex items-center justify-center border-2 border-ink bg-ink font-mono text-xl font-bold text-acid">
                    HT
                  </div>
                </div>
              </div>

              <p className="mt-6 border-l-4 border-ink pl-4 font-mono text-[11.5px] leading-relaxed text-steel">
                HE BUILDS AI AGENTS THAT MAKE REAL PHONE CALLS FOR 1,500+
                PAYING CUSTOMERS. THIS ONE&rsquo;S JOB IS TO GET HIM HIRED.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <button
                  onClick={() =>
                    setDeclineIdx((i) => Math.min(i + 1, DECLINE_LINES.length - 1))
                  }
                  className="border-2 border-ink bg-white px-5 py-4 text-[14px] font-bold uppercase tracking-wide shadow-brutal transition-transform hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
                >
                  ✕ Decline
                </button>
                <button
                  onClick={answer}
                  className="border-2 border-ink bg-acid px-5 py-4 text-[14px] font-bold uppercase tracking-wide shadow-brutal transition-transform hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
                >
                  ▶ Answer call
                </button>
              </div>

              <AnimatePresence>
                {declineIdx >= 0 && (
                  <motion.div
                    key={declineIdx}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 border-2 border-alert bg-white px-4 py-3 font-mono text-[11.5px] leading-relaxed text-alert"
                  >
                    {DECLINE_LINES[declineIdx]}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        <Marquee />
      </main>
    );
  }

  /* ================= CALL ================= */
  return (
    <main className="flex h-dvh flex-col">
      <header className="flex shrink-0 items-center justify-between border-b-2 border-ink bg-ink px-5 py-2.5 font-mono text-[11px] font-bold tracking-[0.16em] text-paper">
        <span>HT—01 / LIVE CALL</span>
        <span className="hidden sm:block">RECRUITING-QUALIFICATION LINE</span>
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[1fr_420px]">
        {/* left: call */}
        <section className="flex min-h-0 flex-col">
          <div className="flex shrink-0 items-center gap-4 border-b-2 border-ink bg-white px-5 py-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-ink bg-ink font-mono text-sm font-bold text-acid">
              HT
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[14px] font-bold uppercase tracking-wide">
                Hemendra&rsquo;s AI Agent
              </div>
              <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-steel">
                <span className="blink inline-block h-1.5 w-1.5 bg-alert" />
                LIVE — VOICE CHANNEL OPEN
              </div>
            </div>
            <Eq on={typing} />
            <span className="border-2 border-ink bg-paper px-2.5 py-1 font-mono text-[12px] font-bold">
              {fmt(seconds)}
            </span>
          </div>

          <div
            ref={transcriptRef}
            className="min-h-0 flex-1 space-y-4 overflow-y-auto p-5 sm:p-6"
          >
            {messages.map((m) =>
              m.role === "agent" ? (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="max-w-[82%] border-2 border-ink bg-white shadow-brutal-sm sm:max-w-[70%]"
                >
                  <div className="border-b border-ink/15 px-4 pt-2 font-mono text-[9px] font-bold tracking-[0.2em] text-steel">
                    AGENT
                  </div>
                  <div
                    className="msg-html select-text px-4 py-2.5 text-[14px] leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: m.html }}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="ml-auto w-max max-w-[82%] border-2 border-ink bg-acid px-4 py-2.5 text-[14px] font-bold shadow-brutal-sm sm:max-w-[70%]"
                >
                  {m.html}
                </motion.div>
              ),
            )}
            {typing && <Typing />}
          </div>

          <div className="shrink-0 border-t-2 border-ink bg-white/70 px-5 py-4 backdrop-blur-sm">
            {visitedCount > 0 && choices.length > 0 && (
              <div className="mb-2.5 font-mono text-[10px] tracking-[0.16em] text-steel">
                {visitedCount}/5 TOPICS COVERED — THE SUMMARY GETS BETTER THE
                MORE YOU ASK
              </div>
            )}
            <div className="flex flex-wrap gap-2.5">
              {choices.map((c) => (
                <button
                  key={c.label}
                  onClick={c.onPick}
                  className={`border-2 border-ink px-4 py-2 font-mono text-[12px] font-bold shadow-brutal-sm transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none ${
                    c.end
                      ? "bg-ink text-paper hover:bg-alert"
                      : c.done
                        ? "bg-paper text-steel"
                        : "bg-white hover:bg-acid"
                  }`}
                >
                  {c.label}
                </button>
              ))}
              {choices.length === 0 && !typing && (
                <span className="font-mono text-[11px] text-steel">
                  AGENT IS SPEAKING…
                </span>
              )}
            </div>
          </div>
        </section>

        {/* right: CRM */}
        <div className="hidden min-h-0 lg:flex lg:flex-col">
          <Crm revealed={revealed} qualified={qualified} />
        </div>
      </div>

      {showSummary && <Summary duration={`${fmt(seconds)} — worth every second`} />}
    </main>
  );
}
