"use client";

import { useEffect, useRef, useState } from "react";
import { CASE } from "@/lib/content";

const HOP_MS = 720;
const HOLD_MS = 1400;

/** Horizontal (desktop) / stacked (mobile) voice pipeline for the case study. */
export default function ArchitectureFlow() {
  const hops = CASE.architecture;
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [active, setActive] = useState(-1);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-12% 0px", threshold: 0 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setActive(hops.length - 1);
      return;
    }

    let hop = 0;
    setActive(0);
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      hop += 1;
      if (hop < hops.length) {
        setActive(hop);
        timer = setTimeout(tick, HOP_MS);
      } else {
        timer = setTimeout(() => {
          hop = 0;
          setActive(0);
          timer = setTimeout(tick, HOP_MS);
        }, HOLD_MS);
      }
    };

    timer = setTimeout(tick, HOP_MS);
    return () => clearTimeout(timer);
  }, [inView, reduceMotion, hops.length]);

  const litThrough = reduceMotion ? hops.length - 1 : active;

  return (
    <figure ref={ref} className="border-2 border-ink bg-paper">
      <figcaption className="flex items-center justify-between border-b-2 border-ink bg-ink px-4 py-2.5 text-paper sm:px-5">
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em]">
          Production voice path
        </span>
        <span className="font-mono text-[9.5px] uppercase tracking-wider text-paper/55">
          Callin.io · live turn
        </span>
      </figcaption>

      <ol className="grid sm:grid-cols-[repeat(5,minmax(0,1fr))]">
        {hops.map((hop, i) => {
          const isActive = i === active && !reduceMotion;
          const isPast = i < litThrough || (reduceMotion && i <= litThrough);
          const isLit = isActive || isPast;

          return (
            <li
              key={hop.id}
              className={`relative flex flex-col justify-between gap-3 border-hair p-4 transition-[background-color,color] duration-300 sm:p-5 ${
                i > 0 ? "border-t sm:border-t-0 sm:border-l" : ""
              } ${isActive ? "bg-ink text-paper" : isPast ? "bg-ink/[0.04]" : "bg-paper"}`}
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`font-mono text-[9px] font-bold uppercase tracking-[0.2em] ${
                    isLit ? "text-org" : "text-steel"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {i < hops.length - 1 && (
                  <span
                    aria-hidden="true"
                    className={`font-mono text-[11px] sm:hidden ${
                      isActive ? "hop-arrow text-org" : isLit ? "text-org" : "text-steel"
                    }`}
                  >
                    ↓
                  </span>
                )}
                {i < hops.length - 1 && (
                  <span
                    aria-hidden="true"
                    className={`absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 bg-paper px-0.5 font-mono text-[12px] sm:block ${
                      isActive ? "hop-arrow text-org" : isLit ? "text-org" : "text-steel"
                    }`}
                  >
                    →
                  </span>
                )}
              </div>
              <div>
                <div
                  className={`text-[14px] font-bold tracking-tight ${
                    isActive ? "text-paper" : "text-ink"
                  }`}
                >
                  {hop.label}
                </div>
                <div
                  className={`mt-1 font-mono text-[10px] uppercase tracking-wider ${
                    isActive ? "text-paper/55" : "text-steel"
                  }`}
                >
                  {hop.detail}
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <p className="border-t-2 border-ink px-4 py-3 font-mono text-[10px] leading-relaxed uppercase tracking-wider text-steel sm:px-5">
        Own the path end-to-end: carrier failover, spend routing, and billing
        ledgers sit on the same turn clock as latency.
      </p>
    </figure>
  );
}
