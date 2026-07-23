"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import type { CrmSection } from "@/lib/script";
import Counter from "./Counter";

function Section({
  index,
  title,
  children,
  accent = false,
}: {
  index: string;
  title: string;
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="mx-4 mt-4"
      data-crm-section
    >
      <div className="mb-1.5 font-mono text-[10px] font-bold tracking-[0.18em] text-steel">
        {index} / {title}
      </div>
      <div
        className={`border-2 border-ink p-4 shadow-brutal-sm ${
          accent ? "bg-acid" : "bg-white"
        }`}
      >
        {children}
      </div>
    </motion.section>
  );
}

function Row({ k, v, strong }: { k: string; v: string; strong?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-dashed border-ink/25 py-1.5 text-[13px] last:border-none">
      <span className="shrink-0 font-mono text-[11px] uppercase tracking-wide text-steel">
        {k}
      </span>
      <span className={`text-right ${strong ? "font-bold" : "font-medium"}`}>
        {v}
      </span>
    </div>
  );
}

function Chip({ children, dark }: { children: string; dark?: boolean }) {
  return (
    <span
      className={`border-2 border-ink px-2 py-0.5 font-mono text-[10.5px] font-bold ${
        dark ? "bg-ink text-paper" : "bg-white"
      }`}
    >
      {children}
    </span>
  );
}

const METRICS = [
  { target: 1500, suffix: "+", label: "Paying customers scaled on Callin.io" },
  { target: 20, prefix: "−", suffix: "%", label: "LLM cost via model routing" },
  { target: 30, suffix: "+", label: "Prospects personally closed" },
  { target: 150, suffix: "+", label: "Students mentored · +42% placements" },
];

const PROJECTS = [
  {
    name: "Callin.io",
    tag: "PROD",
    desc: "Low-latency voice pipeline (WebSockets + SIP), multi-LLM orchestration with semantic caching.",
  },
  {
    name: "CondoMail",
    tag: "LIVE",
    desc: "AI email agents — sort, draft, auto-reply across providers. Used by high-volume Amazon sellers.",
  },
  {
    name: "Realead",
    tag: "BETA",
    desc: "AI qualification & follow-up calls for real-estate leads. The tech behind this very call.",
  },
  {
    name: "Sunria · FinTech Accounts",
    tag: "SHIPPED",
    desc: "Pan-India farm management · financial dashboard: −30% accounting errors, 15+ staff-hours saved weekly.",
  },
];

export default function Crm({
  revealed,
  qualified,
}: {
  revealed: CrmSection[];
  qualified: boolean;
}) {
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    const sections = el.querySelectorAll("[data-crm-section]");
    sections[sections.length - 1]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [revealed]);

  const has = (s: CrmSection) => revealed.includes(s);

  return (
    <aside className="flex min-h-0 flex-col border-l-2 border-ink bg-paper">
      <div className="flex shrink-0 items-center justify-between border-b-2 border-ink bg-ink px-4 py-2.5 text-paper">
        <span className="font-mono text-[11px] font-bold tracking-[0.16em]">
          LEAD FILE — #0001
        </span>
        <span
          className={`border-2 px-2 py-0.5 font-mono text-[10px] font-bold tracking-widest ${
            qualified
              ? "border-acid bg-acid text-ink"
              : "border-paper/60 text-paper/90"
          }`}
        >
          {qualified ? "QUALIFIED ✓" : "● QUALIFYING…"}
        </span>
      </div>

      <div ref={bodyRef} className="min-h-0 flex-1 overflow-y-auto pb-6">
        {has("profile") && (
          <Section index="01" title="CANDIDATE PROFILE">
            <div className="flex items-center gap-3.5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center border-2 border-ink bg-ink font-mono text-lg font-bold text-acid">
                HT
              </div>
              <div>
                <div className="text-[17px] font-bold leading-tight">
                  Hemendra Tripathi
                </div>
                <div className="text-[12px] font-medium">
                  Technical Lead · Full-Stack · AI Voice
                </div>
                <div className="font-mono text-[10.5px] text-steel">
                  UDAIPUR, IN · WORKS WITH US/EU TEAMS
                </div>
              </div>
            </div>
          </Section>
        )}

        {has("role") && (
          <Section index="02" title="CURRENT ENGAGEMENT">
            <Row k="Product" v="Callin.io — AI voice-calling SaaS" strong />
            <Row k="Role" v="Technical Lead (reports to founder)" />
            <Row k="Team" v="5 engineers — hired & led by him" />
            <Row k="Owns" v="Architecture · vendor spend · roadmap" />
            <Row k="Suite" v="+ CondoMail · + Realead" />
          </Section>
        )}

        {has("metrics") && (
          <Section index="03" title="VERIFIED IMPACT">
            <div className="grid grid-cols-2 gap-2.5">
              {METRICS.map((m) => (
                <div key={m.label} className="border-2 border-ink bg-paper p-3">
                  <div className="font-mono text-[22px] font-bold leading-none">
                    <Counter
                      target={m.target}
                      prefix={m.prefix}
                      suffix={m.suffix}
                    />
                  </div>
                  <div className="mt-1.5 text-[10.5px] leading-snug text-steel">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {has("stack") && (
          <Section index="04" title="TECHNICAL ARSENAL">
            <div className="mb-1.5 font-mono text-[10px] tracking-widest text-steel">
              AI &amp; VOICE
            </div>
            <div className="mb-3 flex flex-wrap gap-1.5">
              {[
                "MULTI-LLM ORCHESTRATION",
                "RAG · PINECONE",
                "SUPABASE VECTOR",
                "ELEVENLABS",
                "CARTESIA",
                "TWILIO",
                "TELNYX · SIP",
              ].map((c) => (
                <Chip key={c} dark>
                  {c}
                </Chip>
              ))}
            </div>
            <div className="mb-1.5 font-mono text-[10px] tracking-widest text-steel">
              FULL-STACK &amp; INFRA
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[
                "REACT / NEXT.JS",
                "REACT NATIVE",
                "NODE / NESTJS",
                "LARAVEL",
                "PYTHON",
                "STRIPE BILLING",
                "DOCKER · AWS",
                "REDIS",
                "POSTGRESQL",
              ].map((c) => (
                <Chip key={c}>{c}</Chip>
              ))}
            </div>
          </Section>
        )}

        {has("projects") && (
          <Section index="05" title="SHIPPED PRODUCTS">
            {PROJECTS.map((p) => (
              <div
                key={p.name}
                className="border-b border-dashed border-ink/25 py-2.5 first:pt-0 last:border-none last:pb-0"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[13.5px] font-bold">{p.name}</span>
                  <span className="border border-ink bg-acid px-1.5 font-mono text-[9px] font-bold tracking-widest">
                    {p.tag}
                  </span>
                </div>
                <p className="mt-0.5 text-[11.5px] leading-relaxed text-steel">
                  {p.desc}
                </p>
              </div>
            ))}
          </Section>
        )}

        {has("note") && (
          <Section index="06" title="AGENT'S NOTE" accent>
            <p className="text-[12.5px] font-medium leading-relaxed">
              Rare profile: a technical lead who also owns billing, vendor
              costs, hiring, and customer relationships. Ships revenue, not
              just code. Recommend immediate contact before competitors do.
            </p>
          </Section>
        )}
      </div>
    </aside>
  );
}
