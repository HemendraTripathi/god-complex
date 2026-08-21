"use client";

import { useEffect, useState } from "react";
import type { WritingTocItem } from "@/lib/writing";

function readingMarker() {
  // Activate a section once its heading reaches the upper reading band
  // (below sticky nav, roughly top third of the viewport).
  return Math.max(180, Math.min(360, window.innerHeight * 0.32));
}

export default function WritingToc({ items }: { items: WritingTocItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    if (items.length < 2) return;

    const updateActive = () => {
      const lastId = items[items.length - 1]?.id ?? "";
      const doc = document.documentElement;
      const atBottom =
        window.scrollY + window.innerHeight >= doc.scrollHeight - 24;

      if (atBottom && lastId) {
        setActiveId((prev) => (prev === lastId ? prev : lastId));
        return;
      }

      const marker = readingMarker();
      let current = items[0]?.id ?? "";

      for (const item of items) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= marker) {
          current = item.id;
        }
      }

      setActiveId((prev) => (prev === current ? prev : current));
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, [items]);

  if (items.length < 2) return null;

  return (
    <nav aria-label="On this page" className="writing-toc">
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-org">
        On this page
      </p>
      <ol className="mt-4 space-y-0 border-l-2 border-ink">
        {items.map((item) => {
          const active = item.id === activeId;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active ? "location" : undefined}
                className={`group relative flex gap-3 border-b border-hair py-3 pl-4 pr-1 transition-colors ${
                  active
                    ? "bg-ink/[0.05] text-org"
                    : "text-ink hover:bg-ink/[0.03] hover:text-org"
                }`}
              >
                <span
                  className={`absolute -left-0.5 top-0 h-full w-0.5 transition-colors ${
                    active ? "bg-org" : "bg-transparent"
                  }`}
                  aria-hidden="true"
                />
                <span
                  className={`shrink-0 font-mono text-[10px] font-bold ${
                    active ? "text-org" : "text-org/70 group-hover:text-org"
                  }`}
                >
                  ({String(item.index).padStart(2, "0")})
                </span>
                <span
                  className={`text-[13px] font-medium leading-snug tracking-tight ${
                    active ? "text-org" : "text-ink group-hover:text-org"
                  }`}
                >
                  {item.title}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
