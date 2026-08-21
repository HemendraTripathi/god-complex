"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
} from "react";

const SPOT_RADIUS_PX = 130;

/**
 * Portrait A with a pointer-following spotlight that reveals portrait B.
 * Works with mouse and touch; reduced-motion keeps A only.
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
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEnabled(!motion.matches);
    sync();
    motion.addEventListener("change", sync);
    return () => motion.removeEventListener("change", sync);
  }, []);

  const updateFromPoint = useCallback(
    (clientX: number, clientY: number) => {
      if (!enabled) return;
      const el = frameRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 100;
      const y = ((clientY - rect.top) / rect.height) * 100;
      setPos({
        x: Math.min(100, Math.max(0, x)),
        y: Math.min(100, Math.max(0, y)),
      });
      setActive(true);
    },
    [enabled],
  );

  const onPointerDown = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (!enabled) return;
      frameRef.current?.setPointerCapture(e.pointerId);
      updateFromPoint(e.clientX, e.clientY);
    },
    [enabled, updateFromPoint],
  );

  const onPointerMove = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (!enabled) return;
      // Mouse: follow while over. Touch: follow while captured / pressed.
      if (e.pointerType === "mouse" || e.pressure > 0 || e.buttons > 0) {
        updateFromPoint(e.clientX, e.clientY);
      }
    },
    [enabled, updateFromPoint],
  );

  const onPointerUp = useCallback(() => setActive(false), []);
  const onPointerLeave = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (e.pointerType === "mouse") setActive(false);
    },
    [],
  );

  const mask = `radial-gradient(circle ${SPOT_RADIUS_PX}px at ${pos.x}% ${pos.y}%, #000 0%, #000 55%, transparent 72%)`;

  return (
    <div
      ref={frameRef}
      className={`relative aspect-square w-full overflow-hidden border-2 border-ink touch-none ${
        enabled ? "cursor-crosshair" : ""
      } ${className}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onPointerLeave={onPointerLeave}
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
