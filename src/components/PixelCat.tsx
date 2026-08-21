"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type CatState =
  | "walk"
  | "sit"
  | "sleep"
  | "stretch"
  | "wash"
  | "idle"
  | "jump"
  | "hover"
  | "click";

const COLS = 8;
const CELL = 64;
const DISPLAY = 74;
const EDGE = 16;
const FRAME_MS = 110;
const SHEET_SRC = "/pixel-cat/sheet.png?v=4";
const MEOW_SRC = "/pixel-cat/meow.opus";
const MEOW_VOLUME = 0.7;

const FRAMES = {
  walk: [0, 1, 2, 3, 4, 5, 6, 7],
  sit: [8],
  sitBlink: [9],
  sleep: [10, 11],
  stretch: [12],
  wash: [13],
  idle: [15],
  hover: [16, 17],
  click: [18, 19],
  jump: [20, 21, 22, 23],
} as const;

const IDLE_POOL: CatState[] = [
  "walk",
  "walk",
  "walk",
  "sit",
  "sleep",
  "stretch",
  "wash",
  "idle",
  "jump",
];

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
    case "sit":
      return FRAMES.sit;
    case "sleep":
      return FRAMES.sleep;
    case "stretch":
      return FRAMES.stretch;
    case "wash":
      return FRAMES.wash;
    case "idle":
      return FRAMES.idle;
    case "jump":
      return FRAMES.jump;
    case "hover":
      return FRAMES.hover;
    case "click":
      return FRAMES.click;
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

    // Defer sheet fetch slightly so we don't contend with LCP resources.
    const img = new Image();
    sheetRef.current = img;
    const sheetTimer = window.setTimeout(() => {
      img.src = SHEET_SRC;
    }, 400);

    /** Per-frame source crop flush to the paws (ignores soft fringe). */
    const crops: { sx: number; sy: number; sw: number; sh: number }[] = [];

    let raf = 0;
    let last = performance.now();
    let animAcc = 0;
    let idleUntil = performance.now() + rand(2800, 5200);
    let blinkUntil = 0;
    let cancelled = false;

    const maxX = () => Math.max(EDGE, window.innerWidth - DISPLAY - EDGE);

    const measureCrops = (sheet: HTMLImageElement) => {
      const probe = document.createElement("canvas");
      probe.width = CELL;
      probe.height = CELL;
      const pctx = probe.getContext("2d", { willReadFrequently: true });
      if (!pctx) return;
      for (let i = 0; i < COLS * 3; i++) {
        const col = i % COLS;
        const row = Math.floor(i / COLS);
        pctx.clearRect(0, 0, CELL, CELL);
        pctx.drawImage(
          sheet,
          col * CELL,
          row * CELL,
          CELL,
          CELL,
          0,
          0,
          CELL,
          CELL,
        );
        const data = pctx.getImageData(0, 0, CELL, CELL).data;
        let minX = CELL;
        let minY = CELL;
        let maxX = -1;
        let maxY = -1;
        for (let y = 0; y < CELL; y++) {
          for (let x = 0; x < CELL; x++) {
            const o = (y * CELL + x) * 4;
            const r = data[o]!;
            const g = data[o + 1]!;
            const b = data[o + 2]!;
            const a = data[o + 3]!;
            if (a < 180) continue;
            // ignore leftover magenta / purple fringe
            if (r > 35 && b > 35 && g < 45 && Math.abs(r - b) < 55) continue;
            const lum = (r + g + b) / 3;
            const isOrange = r > 160 && g > 50 && b < 90;
            const isDark = lum < 100;
            if (!isOrange && !isDark) continue;
            if (x < minX) minX = x;
            if (y < minY) minY = y;
            if (x > maxX) maxX = x;
            if (y > maxY) maxY = y;
          }
        }
        if (maxX < 0) {
          crops[i] = { sx: col * CELL, sy: row * CELL, sw: CELL, sh: CELL };
        } else {
          crops[i] = {
            sx: col * CELL + minX,
            sy: row * CELL + minY,
            sw: maxX - minX + 1,
            sh: maxY - minY + 1,
          };
        }
      }
    };

    const drawFrame = (index: number, flip: boolean) => {
      const canvas = canvasRef.current;
      const sheet = sheetRef.current;
      if (!canvas || !sheet?.complete) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const crop = crops[index] ?? {
        sx: (index % COLS) * CELL,
        sy: Math.floor(index / COLS) * CELL,
        sw: CELL,
        sh: CELL,
      };

      const scale = DISPLAY / CELL;
      const dw = crop.sw * scale;
      const dh = crop.sh * scale;
      // Pin paws to the bottom edge of the canvas
      const dx = (DISPLAY - dw) / 2;
      const dy = DISPLAY - dh;

      ctx.clearRect(0, 0, DISPLAY, DISPLAY);
      ctx.imageSmoothingEnabled = false;
      ctx.save();
      if (flip) {
        ctx.translate(DISPLAY, 0);
        ctx.scale(-1, 1);
      }
      ctx.drawImage(
        sheet,
        crop.sx,
        crop.sy,
        crop.sw,
        crop.sh,
        dx,
        dy,
        dw,
        dh,
      );
      ctx.restore();
    };

    const setState = (next: CatState) => {
      stateRef.current = next;
      animIndexRef.current = 0;
      blinkRef.current = false;
      if (next === "walk") {
        targetXRef.current = rand(EDGE, maxX());
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
      measureCrops(img);
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

        if (animAcc >= FRAME_MS) {
          animAcc = 0;
          if (state === "walk" || state === "sleep" || state === "hover") {
            animIndexRef.current = (animIndexRef.current + 1) % seq.length;
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
            scheduleIdle(now, rand(2800, 5000));
          } else if (next === "stretch" || next === "wash") {
            scheduleIdle(now, rand(1600, 2600));
          } else if (next === "jump") {
            scheduleIdle(now, 900);
          } else {
            scheduleIdle(now);
          }
        }

        if (state === "walk") {
          const speed = 0.09 * dt;
          const dx = targetXRef.current - xRef.current;
          if (Math.abs(dx) < 2) {
            targetXRef.current = rand(EDGE, maxX());
            dirRef.current = targetXRef.current >= xRef.current ? 1 : -1;
          } else {
            dirRef.current = dx > 0 ? 1 : -1;
            xRef.current += dirRef.current * speed;
          }
          yRef.current = 0;
        } else if (state === "jump") {
          jumpTRef.current += dt / 780;
          const t = Math.min(1, jumpTRef.current);
          yRef.current = -Math.sin(t * Math.PI) * 56;
          xRef.current += dirRef.current * 0.05 * dt;
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
          jumpTRef.current += dt / 700;
          const t = Math.min(1, jumpTRef.current);
          yRef.current = -Math.sin(t * Math.PI) * 28;
          animIndexRef.current = t < 0.45 ? 0 : 1;
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
