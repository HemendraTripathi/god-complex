import { CASE } from "@/lib/content";

/** Horizontal (desktop) / stacked (mobile) voice pipeline for the case study. */
export default function ArchitectureFlow() {
  const hops = CASE.architecture;

  return (
    <figure className="border-2 border-ink bg-paper">
      <figcaption className="flex items-center justify-between border-b-2 border-ink bg-ink px-4 py-2.5 text-paper sm:px-5">
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em]">
          Production voice path
        </span>
        <span className="font-mono text-[9.5px] uppercase tracking-wider text-paper/55">
          Callin.io · live turn
        </span>
      </figcaption>

      <ol className="grid sm:grid-cols-[repeat(5,minmax(0,1fr))]">
        {hops.map((hop, i) => (
          <li
            key={hop.id}
            className={`relative flex flex-col justify-between gap-3 border-hair p-4 sm:p-5 ${
              i > 0 ? "border-t sm:border-t-0 sm:border-l" : ""
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-org">
                {String(i + 1).padStart(2, "0")}
              </span>
              {i < hops.length - 1 && (
                <span
                  aria-hidden="true"
                  className="font-mono text-[11px] text-steel sm:hidden"
                >
                  ↓
                </span>
              )}
              {i < hops.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 bg-paper px-0.5 font-mono text-[12px] text-org sm:block"
                >
                  →
                </span>
              )}
            </div>
            <div>
              <div className="text-[14px] font-bold tracking-tight">{hop.label}</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-steel">
                {hop.detail}
              </div>
            </div>
          </li>
        ))}
      </ol>

      <p className="border-t-2 border-ink px-4 py-3 font-mono text-[10px] leading-relaxed uppercase tracking-wider text-steel sm:px-5">
        Own the path end-to-end — carrier failover, spend routing, and billing
        ledgers sit on the same turn clock as latency.
      </p>
    </figure>
  );
}
