import Link from "next/link";
import ArchitectureFlow from "@/components/ArchitectureFlow";
import MockVisual from "@/components/MockVisual";
import { CASE, LINKS } from "@/lib/content";
import { CASE_PATH } from "@/lib/seo";

export function SectionHead({
  idx,
  title,
  right,
}: {
  idx: string;
  title: string;
  right?: string;
}) {
  return (
    <div className="flex items-baseline justify-between border-b-2 border-ink pb-3">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-[11px] font-bold text-org">({idx})</span>
        <h2 className="display text-[clamp(26px,4vw,44px)]">{title}</h2>
      </div>
      {right && <span className="eyebrow hidden sm:block">{right}</span>}
    </div>
  );
}

export default function CaseStudy({
  heading = true,
  permalink = false,
}: {
  heading?: boolean;
  permalink?: boolean;
}) {
  return (
    <section
      id="case"
      className={`mx-auto max-w-7xl scroll-mt-20 px-5 sm:px-8 ${heading ? "pt-24" : "pt-10"}`}
    >
      {heading ? (
        <SectionHead
          idx="01"
          title="Voice AI Case Study"
          right={`${CASE.product} · production`}
        />
      ) : null}

      <div className="grid gap-10 border-b-2 border-ink py-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="eyebrow mb-3">{CASE.eyebrow}</div>
          {heading ? (
            <h3 className="max-w-xl text-[clamp(22px,3vw,34px)] font-bold leading-[1.15] tracking-tight">
              {CASE.title}
            </h3>
          ) : (
            <h2 className="max-w-xl text-[clamp(22px,3vw,34px)] font-bold leading-[1.15] tracking-tight">
              {CASE.title}
            </h2>
          )}
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink/80">
            {CASE.summary}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
            <a
              href={LINKS.callin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-org underline-offset-4 hover:underline"
            >
              callin.io ↗
            </a>
            {permalink ? (
              <Link
                href={CASE_PATH}
                className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-ink underline-offset-4 hover:text-org hover:underline"
              >
                Full case study →
              </Link>
            ) : null}
          </div>
        </div>
        <MockVisual
          kind="callin"
          src="/images/work-callin.png"
          alt="Callin.io voice AI agent, live medical intake call with multi-LLM routing"
        />
      </div>

      <div className="border-b-2 border-ink p-6 sm:p-8">
        <div className="eyebrow mb-4">The problem</div>
        <ul className="grid gap-3 sm:grid-cols-3 sm:gap-6">
          {CASE.problem.map((p) => (
            <li
              key={p}
              className="flex gap-3 text-[13.5px] leading-relaxed text-ink/80"
            >
              <span className="mt-[9px] h-px w-4 shrink-0 bg-org" aria-hidden="true" />
              {p}
            </li>
          ))}
        </ul>
      </div>

      <div className="border-b-2 border-ink py-10">
        <div className="eyebrow mb-6">Architecture</div>
        <ArchitectureFlow />
      </div>

      <div className="py-10">
        <div className="eyebrow mb-6">What I built</div>
        <div className="grid gap-4 sm:grid-cols-2">
          {CASE.approach.map((a) => (
            <div
              key={a.title}
              className="border-2 border-ink bg-paper p-5 shadow-brutal-sm"
            >
              <h4 className="text-[15px] font-bold tracking-tight">{a.title}</h4>
              <p className="mt-2 text-[13px] leading-relaxed text-ink/75">
                {a.body}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {CASE.stack.map((s) => (
            <span
              key={s}
              className="border border-ink px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      <blockquote className="mb-4 border-2 border-ink bg-ink px-6 py-8 text-paper sm:px-10">
        <p className="max-w-3xl text-[clamp(16px,2vw,22px)] font-medium leading-snug tracking-tight">
          “{CASE.quote}”
        </p>
        {(CASE.quoteName || CASE.quoteOrg) && (
          <footer className="mt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-paper/55">
            {CASE.quoteName && <>– {CASE.quoteName}</>}
            {CASE.quoteOrg && (
              <span className="text-paper/35">
                {CASE.quoteName ? " · " : "– "}
                {CASE.quoteOrg}
              </span>
            )}
          </footer>
        )}
      </blockquote>
    </section>
  );
}
