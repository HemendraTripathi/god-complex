"use client";

import { useEffect, useState } from "react";

/** Mono role line. One phrase at a time. Static when motion is reduced. */
export default function FlipWords({ words }: { words: readonly string[] }) {
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduced || words.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((n) => (n + 1) % words.length);
    }, 2600);
    return () => window.clearInterval(id);
  }, [reduced, words.length]);

  const word = words[reduced ? 0 : index] ?? words[0];

  return (
    <span className="inline-block min-w-[16em] text-ink">
      <span key={word} className="flip-word inline-block">
        {word}
      </span>
    </span>
  );
}
