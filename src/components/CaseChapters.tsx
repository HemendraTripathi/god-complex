"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import ArchitectureFlow from "@/components/ArchitectureFlow";
import { CALLIN_CASE, CASE_STUDY_STACK } from "@/lib/callin-case";
import { CASE, LINKS, formatMetricValue } from "@/lib/content";

const PLATES = [
  {
    idx: "01",
    label: "Problem",
    lines: CASE.problem,
  },
  {
    idx: "02",
    label: "Approach",
    lines: CASE.approach.map((item) => item.title),
  },
  {
    idx: "03",
    label: "Voice stack",
    lines: CASE.architecture.map((hop) => `${hop.label} · ${hop.detail}`),
  },
  {
    idx: "04",
    label: "Outcome",
    lines: CASE.metrics.map((m) => `${formatMetricValue(m)} ${m.label}`),
  },
] as const;

function Prose({ children }: { children: ReactNode }) {
  return (
    <p className="mt-5 max-w-3xl text-[16px] leading-[1.7] text-ink/85 first:mt-0">
      {children}
    </p>
  );
}

export default function CaseChapters() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const onScroll = () => {
      const line = 140;
      let next = 0;
      refs.current.forEach((node, i) => {
        if (!node) return;
        if (node.getBoundingClientRect().top <= line) next = i;
      });
      setActive((prev) => (prev === next ? prev : next));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const plate = PLATES[active] ?? PLATES[0];

  return (
    <section className="mx-auto max-w-7xl px-5 pt-20 sm:px-8">
      <Prose>{CALLIN_CASE.lede}</Prose>

      <div className="mt-14 lg:grid lg:grid-cols-[minmax(16rem,22rem)_minmax(0,1fr)] lg:items-start lg:gap-12 xl:gap-16">
        <aside className="mb-10 hidden lg:sticky lg:top-24 lg:mb-0 lg:block lg:self-start">
          <div className="border-2 border-ink bg-paper shadow-brutal">
            <ol>
              {PLATES.map((item, i) => {
                const on = i === active;
                return (
                  <li
                    key={item.idx}
                    className={`flex items-baseline gap-3 border-b border-hair px-4 py-3 last:border-b-0 ${on ? "bg-ink text-paper" : ""}`}
                  >
                    <span className="font-mono text-[11px] font-bold text-org">
                      {item.idx}
                    </span>
                    <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em]">
                      {item.label}
                    </span>
                  </li>
                );
              })}
            </ol>
            <ul className="space-y-3 border-t-2 border-ink px-4 py-5">
              {plate.lines.map((line) => (
                <li
                  key={line}
                  className="flex gap-3 text-[13px] leading-snug text-ink/80"
                >
                  <span className="mt-[8px] h-px w-3 shrink-0 bg-org" aria-hidden="true" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div>
          <section
            data-chapter="0"
            ref={(node) => {
              refs.current[0] = node;
            }}
            className="scroll-mt-24 lg:min-h-[70vh]"
          >
            <h2 className="flex items-baseline gap-4 border-b-2 border-ink pb-3">
              <span className="font-mono text-[11px] font-bold text-org">(01)</span>
              <span className="display text-[clamp(26px,4vw,44px)]">Problem</span>
            </h2>
            <div className="pt-8">
              <Prose>{CALLIN_CASE.context}</Prose>
              <ul className="mt-6 max-w-3xl space-y-3">
                {CASE.problem.map((line) => (
                  <li key={line} className="flex gap-3 text-[15px] leading-relaxed text-ink/80">
                    <span className="mt-[9px] h-px w-4 shrink-0 bg-org" aria-hidden="true" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section
            data-chapter="1"
            ref={(node) => {
              refs.current[1] = node;
            }}
            className="scroll-mt-24 pt-16 lg:min-h-[70vh]"
          >
            <h2 className="flex items-baseline gap-4 border-b-2 border-ink pb-3">
              <span className="font-mono text-[11px] font-bold text-org">(02)</span>
              <span className="display text-[clamp(26px,4vw,44px)]">Approach</span>
            </h2>
            <div className="pt-8">
              <Prose>{CALLIN_CASE.product[0]}</Prose>
              <Prose>
                The builder, the campaign tools, and the numbers are the product
                they click. Under that, every call still hits the same owned
                path: telephony in, orchestrator, one of three runtimes, voice
                out, minutes on the clock. I am not dropping a fake screenshot of
                the builder. You can see the product at{" "}
                <a
                  href={LINKS.callin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-ink underline-offset-2 hover:underline"
                >
                  callin.io
                </a>
                . This page is the system under it.
              </Prose>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {CASE.approach.map((item) => (
                  <div key={item.title} className="border-2 border-ink bg-paper p-5 shadow-brutal-sm">
                    <h3 className="text-[15px] font-bold tracking-tight">{item.title}</h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-ink/75">{item.body}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-2">
                {CASE_STUDY_STACK.map((s) => (
                  <span
                    key={s}
                    className="border border-ink px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section
            data-chapter="2"
            ref={(node) => {
              refs.current[2] = node;
            }}
            className="scroll-mt-24 pt-16 lg:min-h-[70vh]"
          >
            <h2 className="flex items-baseline gap-4 border-b-2 border-ink pb-3">
              <span className="font-mono text-[11px] font-bold text-org">(03)</span>
              <span className="display text-[clamp(26px,4vw,44px)]">Voice stack</span>
            </h2>
            <div className="pt-8">
              {CALLIN_CASE.architecture.map((p) => (
                <Prose key={p}>{p}</Prose>
              ))}
              <div className="mt-8">
                <ArchitectureFlow />
              </div>
            </div>
          </section>

          <section
            data-chapter="3"
            ref={(node) => {
              refs.current[3] = node;
            }}
            className="scroll-mt-24 pt-16"
          >
            <h2 className="flex items-baseline gap-4 border-b-2 border-ink pb-3">
              <span className="font-mono text-[11px] font-bold text-org">(04)</span>
              <span className="display text-[clamp(26px,4vw,44px)]">Outcome</span>
            </h2>
            <div className="pt-8">
              <Prose>{CALLIN_CASE.storiesIntro}</Prose>
              {CALLIN_CASE.stories.map((story) => (
                <section key={story.idx} className="mt-12 border-t-2 border-ink pt-10">
                  <h3 className="flex flex-wrap items-baseline gap-x-4 gap-y-2 text-[clamp(20px,2.6vw,28px)] font-bold tracking-tight">
                    <span className="font-mono text-[12px] font-bold text-org">{story.idx}.</span>
                    {story.title}
                  </h3>
                  {story.body.map((p) => (
                    <Prose key={p}>{p}</Prose>
                  ))}
                </section>
              ))}
              <div className="mt-12 border-t-2 border-ink pt-10">
                <Prose>{CALLIN_CASE.results[0]}</Prose>
                {CALLIN_CASE.results.slice(1).map((p) => (
                  <Prose key={p}>{p}</Prose>
                ))}
                <Prose>{CALLIN_CASE.next}</Prose>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
