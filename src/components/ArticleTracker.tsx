"use client";

import { useEffect, useRef } from "react";
import { trackGaEvent } from "@/lib/ga-events";

type Props = {
  slug: string;
  title: string;
  minutes: number;
};

export default function ArticleTracker({ slug, title, minutes }: Props) {
  const halfway = useRef(false);

  useEffect(() => {
    halfway.current = false;
    trackGaEvent("article_view", {
      content_group: "writing",
      item_id: slug,
      article_title: title,
      reading_minutes: minutes,
    });

    const onScroll = () => {
      if (halfway.current) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max <= 0 ? 1 : window.scrollY / max;
      if (ratio < 0.5) return;
      halfway.current = true;
      trackGaEvent("article_progress", {
        content_group: "writing",
        item_id: slug,
        percent: 50,
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [slug, title, minutes]);

  return null;
}
