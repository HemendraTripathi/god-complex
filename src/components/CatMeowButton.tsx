"use client";

import { useRef } from "react";

const MEOW_SRC = "/pixel-cat/meow.opus";

/** Tiny meow trigger for the cat story page. */
export default function CatMeowButton({
  label = "Pet for a meow",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const meow = () => {
    let audio = audioRef.current;
    if (!audio) {
      audio = new Audio(MEOW_SRC);
      audio.volume = 0.75;
      audioRef.current = audio;
    }
    audio.currentTime = 0;
    void audio.play().catch(() => {});
  };

  return (
    <button
      type="button"
      onClick={meow}
      className={`cat-meow-btn ${className}`}
    >
      {label}
    </button>
  );
}
