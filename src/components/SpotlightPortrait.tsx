"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";

const SPOT_RADIUS_PX = 130;

/**
 * Portrait A with a cursor-following spotlight that reveals portrait B.
 * Desktop/pointer only — touch and reduced-motion keep A only.
 */
export default function SpotlightPortrait({
  srcA,
  srcB,
  alt,
  width = 960,
  height = 960,
  className = "",
}: {
  srcA: string;
  srcB: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEnabled(fine.matches && !motion.matches);
    sync();
    fine.addEventListener("change", sync);
    motion.addEventListener("change", sync);
    return () => {
      fine.removeEventListener("change", sync);
      motion.removeEventListener("change", sync);
    };
  }, []);

  const onMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!enabled) return;
      const el = frameRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setPos({ x, y });
      setActive(true);
    },
    [enabled],
  );

  const onLeave = useCallback(() => setActive(false), []);

  const mask = `radial-gradient(circle ${SPOT_RADIUS_PX}px at ${pos.x}% ${pos.y}%, #000 0%, #000 55%, transparent 72%)`;

  return (
    <div
      ref={frameRef}
      className={`relative aspect-square w-full overflow-hidden border-2 border-ink ${
        enabled ? "cursor-crosshair" : ""
      } ${className}`}
      onMouseMove={onMove}
      onMouseEnter={onMove}
      onMouseLeave={onLeave}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={srcA}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={srcB}
        alt=""
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        aria-hidden="true"
        draggable={false}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-200"
        style={{
          opacity: enabled && active ? 1 : 0,
          WebkitMaskImage: mask,
          maskImage: mask,
        }}
      />
    </div>
  );
}
