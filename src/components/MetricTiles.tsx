"use client";

import CountUp from "@/components/CountUp";
import { CASE } from "@/lib/content";

/** Brutal metric plate. The number ticks once; the label stays still. */
export default function MetricTiles() {
  return (
    <dl className="grid grid-cols-2 border-2 border-ink sm:grid-cols-4">
      {CASE.metrics.map((m, i) => (
        <div
          key={m.label}
          className={`border-hair p-4 sm:p-5 ${i > 0 ? "border-l" : ""} ${i >= 2 ? "max-sm:border-t" : ""}`}
        >
          <dt className="font-mono text-[9.5px] uppercase tracking-wider text-steel">
            {m.label}
          </dt>
          <dd className="mt-1.5 font-mono text-[clamp(22px,3.2vw,30px)] font-bold tracking-tight">
            {m.prefix}
            <CountUp
              to={m.to}
              duration={1.15}
              delay={0.08 * i}
              separator={m.separator ?? ""}
            />
            {m.suffix}
          </dd>
        </div>
      ))}
    </dl>
  );
}
