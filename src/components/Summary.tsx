"use client";

import { motion } from "motion/react";

function Row({
  k,
  v,
  tone,
}: {
  k: string;
  v: string;
  tone?: "good" | "bad";
}) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-b-2 border-ink/10 py-2.5 text-[13.5px] last:border-none">
      <span className="shrink-0 font-mono text-[11px] uppercase tracking-wider text-steel">
        {k}
      </span>
      <span
        className={`text-right font-bold ${
          tone === "good" ? "" : tone === "bad" ? "text-alert" : ""
        }`}
      >
        {tone === "good" ? <span className="bg-acid px-1">{v}</span> : v}
      </span>
    </div>
  );
}

export default function Summary({ duration }: { duration: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-ink/70 p-4 backdrop-blur-[2px]">
      <motion.div
        initial={{ opacity: 0, y: 40, rotate: -1 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        className="relative m-auto w-[600px] max-w-full border-2 border-ink bg-paper shadow-brutal-lg"
      >
        {/* stamp */}
        <motion.div
          initial={{ opacity: 0, scale: 1.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.18 }}
          className="pointer-events-none absolute -right-4 -top-5 rotate-[8deg] border-4 border-alert px-3 py-1.5 font-mono text-[15px] font-bold tracking-[0.14em] text-alert"
          style={{ boxShadow: "3px 3px 0 0 rgba(20,20,20,0.9)", background: "#f2efe6" }}
        >
          STRONG HIRE ✓
        </motion.div>

        <div className="border-b-2 border-ink bg-ink px-6 py-3 font-mono text-[11px] font-bold tracking-[0.18em] text-paper">
          CALL SUMMARY — AUTO-GENERATED
        </div>

        <div className="p-7">
          <h2 className="text-[34px] font-bold uppercase leading-none tracking-tight">
            Lead qualified.
          </h2>
          <p className="mt-2 font-mono text-[11.5px] text-steel">
            VERDICT: PROCEED IMMEDIATELY — BEFORE A COMPETITOR DOES
          </p>

          <div className="mt-6 border-2 border-ink bg-white p-4 shadow-brutal-sm">
            <Row k="Candidate" v="Hemendra Tripathi" />
            <Row
              k="Role fit"
              v="Technical Lead / Sr. Full-Stack · AI Voice & LLM"
            />
            <Row k="Call duration" v={duration} />
            <Row k="Caller sentiment" v="Extremely interested" tone="good" />
            <Row k="Risk of not hiring" v="He joins your competitor" tone="bad" />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <a
              href="mailto:hemendratripathi880@gmail.com?subject=Let%27s%20talk%20%E2%80%94%20we%20want%20to%20hire%20you"
              className="border-2 border-ink bg-acid px-4 py-3 text-center text-[13px] font-bold uppercase tracking-wide shadow-brutal transition-transform hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
            >
              Email him
            </a>
            <a
              href="tel:+916378745958"
              className="border-2 border-ink bg-white px-4 py-3 text-center text-[13px] font-bold uppercase tracking-wide shadow-brutal transition-transform hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
            >
              Call the human
            </a>
            <a
              href="/Hemendra_Tripathi_Resume.pdf"
              download
              className="border-2 border-ink bg-white px-4 py-3 text-center text-[13px] font-bold uppercase tracking-wide shadow-brutal transition-transform hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
            >
              Résumé (PDF)
            </a>
          </div>

          <div className="mt-6 text-center font-mono text-[10.5px] leading-relaxed text-steel">
            HEMENDRATRIPATHI880@GMAIL.COM · +91 63787 45958 · UDAIPUR, IN
            <br />
            <button
              onClick={() => location.reload()}
              className="underline underline-offset-2 hover:bg-acid"
            >
              ↺ REPLAY CALL
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
