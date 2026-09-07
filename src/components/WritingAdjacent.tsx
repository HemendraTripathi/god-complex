import Link from "next/link";
import type { AdjacentPost } from "@/lib/writing";

export default function WritingAdjacent({
  newer,
  older,
}: {
  newer: AdjacentPost | null;
  older: AdjacentPost | null;
}) {
  if (!newer && !older) return null;

  return (
    <nav aria-label="More essays" className="space-y-6">
      {newer ? (
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-org">
            Next
          </p>
          <Link
            href={`/writing/${newer.slug}`}
            className="group mt-2 flex items-start gap-2 text-[13px] font-medium leading-snug tracking-tight transition-colors hover:text-org"
          >
            <span className="min-w-0 line-clamp-3">{newer.title}</span>
            <span
              className="shrink-0 font-mono text-org motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5"
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        </div>
      ) : null}
      {older ? (
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-org">
            Earlier
          </p>
          <Link
            href={`/writing/${older.slug}`}
            className="group mt-2 flex items-start gap-2 text-[13px] font-medium leading-snug tracking-tight transition-colors hover:text-org"
          >
            <span
              className="shrink-0 font-mono text-org motion-safe:transition-transform motion-safe:group-hover:-translate-x-0.5"
              aria-hidden="true"
            >
              ←
            </span>
            <span className="min-w-0 line-clamp-3">{older.title}</span>
          </Link>
        </div>
      ) : null}
    </nav>
  );
}
