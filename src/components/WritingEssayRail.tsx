import PostShare from "@/components/PostShare";
import WritingAdjacent from "@/components/WritingAdjacent";
import type { AdjacentPost } from "@/lib/writing";

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}

export default function WritingEssayRail({
  publishedAt,
  minutes,
  url,
  title,
  newer,
  older,
}: {
  publishedAt: string;
  minutes: number;
  url: string;
  title: string;
  newer: AdjacentPost | null;
  older: AdjacentPost | null;
}) {
  return (
    <div className="sticky top-28 space-y-8">
      <div className="space-y-4">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-steel">
          Essay
        </p>
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink">
          {minutes} min read
        </p>
        <time
          dateTime={publishedAt}
          className="block font-mono text-[10px] uppercase tracking-[0.16em] text-steel"
        >
          {formatDate(publishedAt)}
        </time>
        <div className="h-10 w-0.5 bg-org" aria-hidden="true" />
      </div>
      <PostShare url={url} title={title} variant="icons" />
      <WritingAdjacent newer={newer} older={older} />
    </div>
  );
}
