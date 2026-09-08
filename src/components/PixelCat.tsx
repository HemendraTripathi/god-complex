"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type CatState =
  | "walk"
  | "run"
  | "sit"
  | "sleep"
  | "stretch"
  | "wash"
  | "yawn"
  | "idle"
  | "jump"
  | "hover"
  | "click";

const COLS = 8;
const ROWS = 6;
const CELL = 144;
const DISPLAY = 90;
const EDGE = 16;
const SHEET_SRC = "/pixel-cat/sheet.png?v=9";
const MEOW_SRC = "/pixel-cat/meow.opus";
const MEOW_VOLUME = 0.7;

/** Frame indices into the 8×6 sheet (row-major). */
const FRAMES = {
  walk: [0, 1, 2, 3, 4, 5, 6, 7],
  run: [8, 9, 10, 11, 12, 13, 14, 15],
  sitBlink: [17],
  sit: [18],
  idle: [21, 22, 23],
  sleep: [16, 24, 25],
  stretch: [26, 27],
  wash: [28, 29],
  yawn: [30, 31],
  hover: [32, 33, 34],
  pounce: [37, 38, 39],
  jump: [40, 41, 42, 43, 44, 45],
} as const;

const IDLE_POOL: CatState[] = [
  "walk",
  "walk",
  "walk",
  "run",
  "sit",
  "sleep",
  "stretch",
  "wash",
  "yawn",
  "idle",
  "jump",
];

const LOOPING: ReadonlySet<CatState> = new Set([
  "walk",
  "run",
  "sleep",
  "hover",
  "wash",
  "idle",
]);

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

function framesFor(state: CatState): readonly number[] {
  switch (state) {
    case "walk":
      return FRAMES.walk;
    case "run":
      return FRAMES.run;
    case "sit":
      return FRAMES.sit;
    case "sleep":
      return FRAMES.sleep;
    case "stretch":
      return FRAMES.stretch;
    case "wash":
      return FRAMES.wash;
    case "yawn":
      return FRAMES.yawn;
    case "idle":
      return FRAMES.idle;
    case "jump":
      return FRAMES.jump;
    case "hover":
      return FRAMES.hover;
    case "click":
      return FRAMES.pounce;
  }
}

function frameMs(state: CatState) {
  switch (state) {
    case "run":
      return 68;
    case "walk":
      return 88;
    case "sleep":
      return 420;
    case "wash":
    case "idle":
      return 160;
    case "hover":
      return 140;
    case "yawn":
    case "stretch":
      return 150;
    case "jump":
    case "click":
      return 90;
    default:
      return 120;
  }
}

export default function PixelCat() {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLImageElement | null>(null);
  const stateRef = useRef<CatState>("walk");
  const animIndexRef = useRef(0);
  const blinkRef = useRef(false);
  const xRef = useRef(80);
  const yRef = useRef(0);
  const dirRef = useRef<1 | -1>(1);
  const interactingRef = useRef(false);
  const targetXRef = useRef(200);
  const jumpTRef = useRef(0);
  const reducedRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [bubble, setBubble] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedRef.current = mq.matches;
    const onMq = () => {
      reducedRef.current = mq.matches;
    };
    mq.addEventListener("change", onMq);

    const img = new Image();
    sheetRef.current = img;
    const sheetTimer = window.setTimeout(() => {
      img.src = SHEET_SRC;
    }, 400);

    let raf = 0;
    let last = performance.now();
    let animAcc = 0;
    let idleUntil = performance.now() + rand(2800, 5200);
    let blinkUntil = 0;
    let cancelled = false;

    const maxX = () => Math.max(EDGE, window.innerWidth - DISPLAY - EDGE);

    const drawFrame = (index: number, flip: boolean) => {
      const canvas = canvasRef.current;
      const sheet = sheetRef.current;
      if (!canvas || !sheet?.complete) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const buf = Math.round(DISPLAY * dpr);
      if (canvas.width !== buf || canvas.height !== buf) {
        canvas.width = buf;
        canvas.height = buf;
      }

      const col = index % COLS;
      const row = Math.floor(index / COLS);

      ctx.clearRect(0, 0, buf, buf);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.save();
      if (flip) {
        ctx.translate(buf, 0);
        ctx.scale(-1, 1);
      }
      ctx.drawImage(
        sheet,
        col * CELL,
        row * CELL,
        CELL,
        CELL,
        0,
        0,
        buf,
        buf,
      );
      ctx.restore();
    };

    const setState = (next: CatState) => {
      stateRef.current = next;
      animIndexRef.current = 0;
      blinkRef.current = false;
      if (next === "walk" || next === "run") {
        const span = maxX();
        if (next === "run") {
          targetXRef.current = dirRef.current === 1 ? span * rand(0.72, 0.96) : span * rand(0.04, 0.28);
          if (Math.abs(targetXRef.current - xRef.current) < span * 0.35) {
            targetXRef.current = xRef.current > span * 0.5 ? EDGE : span;
          }
        } else {
          targetXRef.current = rand(EDGE, span);
        }
        dirRef.current = targetXRef.current >= xRef.current ? 1 : -1;
      }
      if (next === "jump" || next === "click") {
        jumpTRef.current = 0;
      }
    };

    const scheduleIdle = (now: number, hold = rand(2500, 5500)) => {
      idleUntil = now + hold;
    };

    img.onload = () => {
      if (cancelled) return;
      xRef.current = rand(EDGE, maxX() * 0.45);
      targetXRef.current = rand(EDGE, maxX());
      setReady(true);

      if (mq.matches) {
        drawFrame(FRAMES.sit[0], false);
        const btn = buttonRef.current;
        if (btn) {
          btn.style.transform = `translate3d(${Math.min(120, maxX())}px, 0, 0)`;
        }
        return;
      }

      const tick = (now: number) => {
        if (cancelled) return;
        const dt = Math.min(48, now - last);
        last = now;
        animAcc += dt;

        const btn = buttonRef.current;
        if (!btn) {
          raf = requestAnimationFrame(tick);
          return;
        }

        const state = stateRef.current;
        const seq = framesFor(state);

        if (animAcc >= frameMs(state)) {
          animAcc = 0;
          if (LOOPING.has(state)) {
            animIndexRef.current = (animIndexRef.current + 1) % seq.length;
          } else if (state !== "sit") {
            animIndexRef.current = Math.min(
              seq.length - 1,
              animIndexRef.current + 1,
            );
          }
          if (state === "sit" && now > blinkUntil) {
            if (!blinkRef.current && Math.random() < 0.12) {
              blinkRef.current = true;
              blinkUntil = now + 180;
            } else if (blinkRef.current) {
              blinkRef.current = false;
              blinkUntil = now + rand(1800, 4000);
            }
          }
        }

        if (!interactingRef.current && now >= idleUntil) {
          const next = pick(IDLE_POOL);
          setState(next);
          if (next === "sit" || next === "sleep" || next === "idle") {
            scheduleIdle(now, rand(2800, 5200));
          } else if (next === "stretch" || next === "wash" || next === "yawn") {
            scheduleIdle(now, rand(1800, 2800));
          } else if (next === "jump") {
            scheduleIdle(now, 1100);
          } else if (next === "run") {
            scheduleIdle(now, 8000);
          } else {
            scheduleIdle(now);
          }
        }

        if (state === "walk" || state === "run") {
          const speed = (state === "run" ? 0.22 : 0.085) * dt;
          const dx = targetXRef.current - xRef.current;
          if (Math.abs(dx) < 3) {
            if (state === "run" && !interactingRef.current) {
              setState("sit");
              scheduleIdle(now, rand(1800, 3200));
            } else {
              targetXRef.current = rand(EDGE, maxX());
              dirRef.current = targetXRef.current >= xRef.current ? 1 : -1;
            }
          } else {
            dirRef.current = dx > 0 ? 1 : -1;
            xRef.current += dirRef.current * speed;
          }
          yRef.current = 0;
        } else if (state === "jump") {
          jumpTRef.current += dt / 920;
          const t = Math.min(1, jumpTRef.current);
          yRef.current = -Math.sin(t * Math.PI) * 64;
          xRef.current += dirRef.current * 0.06 * dt;
          xRef.current = Math.min(maxX(), Math.max(EDGE, xRef.current));
          animIndexRef.current = Math.min(
            seq.length - 1,
            Math.floor(t * seq.length),
          );
          if (t >= 1 && !interactingRef.current) {
            setState("walk");
            scheduleIdle(now);
          }
        } else if (state === "click") {
          jumpTRef.current += dt / 780;
          const t = Math.min(1, jumpTRef.current);
          yRef.current = -Math.sin(t * Math.PI) * 42;
          xRef.current += dirRef.current * 0.08 * dt;
          xRef.current = Math.min(maxX(), Math.max(EDGE, xRef.current));
          animIndexRef.current = Math.min(
            seq.length - 1,
            Math.floor(t * seq.length),
          );
          if (t >= 1) {
            interactingRef.current = false;
            setBubble(null);
            setState("walk");
            scheduleIdle(now);
          }
        } else {
          yRef.current = 0;
        }

        const flip = dirRef.current === -1;
        let spriteIndex = seq[Math.min(animIndexRef.current, seq.length - 1)]!;
        if (state === "sit" && blinkRef.current) {
          spriteIndex = FRAMES.sitBlink[0];
        }

        drawFrame(spriteIndex, flip);
        btn.style.transform = `translate3d(${xRef.current}px, ${yRef.current}px, 0)`;
        raf = requestAnimationFrame(tick);
      };

      raf = requestAnimationFrame(tick);
    };

    const onResize = () => {
      xRef.current = Math.min(xRef.current, maxX());
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(sheetTimer);
      window.removeEventListener("resize", onResize);
      mq.removeEventListener("change", onMq);
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        audio.src = "";
        audioRef.current = null;
      }
    };
  }, []);

  const playMeow = () => {
    if (reducedRef.current) return;
    let audio = audioRef.current;
    if (!audio) {
      audio = new Audio(MEOW_SRC);
      audio.preload = "auto";
      audio.volume = MEOW_VOLUME;
      audioRef.current = audio;
    }
    audio.currentTime = 0;
    void audio.play().catch(() => {
      /* gesture required on some browsers */
    });
  };

  const onEnter = () => {
    if (reducedRef.current || interactingRef.current) return;
    if (stateRef.current === "click") return;
    interactingRef.current = true;
    stateRef.current = "hover";
    animIndexRef.current = 0;
    setBubble("…");
    playMeow();
  };

  const onLeave = () => {
    if (reducedRef.current) return;
    if (stateRef.current === "click") return;
    interactingRef.current = false;
    setBubble(null);
    stateRef.current = "walk";
    animIndexRef.current = 0;
  };

  const onClick = () => {
    if (reducedRef.current) return;
    interactingRef.current = true;
    stateRef.current = "click";
    animIndexRef.current = 0;
    jumpTRef.current = 0;
    setBubble(pick(["mrrp", "nya", "!!", "purr"]));
    playMeow();
  };

  const onDoubleClick = () => {
    router.push("/cat");
  };

  if (!mounted) return null;

  return (
    <button
      ref={buttonRef}
      type="button"
      className="pixel-cat"
      style={{
        width: DISPLAY,
        height: DISPLAY,
        opacity: ready ? 1 : 0,
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      aria-label="Pixel cat. Hover or click to meow. Double-click for its story."
    >
      {bubble ? <span className="pixel-cat-bubble">{bubble}</span> : null}
      <canvas
        ref={canvasRef}
        className="pixel-cat-canvas"
        width={DISPLAY}
        height={DISPLAY}
      />
    </button>
  );
}
