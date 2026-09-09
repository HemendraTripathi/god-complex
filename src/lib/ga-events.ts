"use client";

import { GA_MEASUREMENT_ID } from "@/lib/ga";

type GaParams = Record<string, string | number | boolean>;

let pending: Array<{ name: string; params?: GaParams }> = [];
let flushTimer: number | undefined;

function flush() {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return false;
  }
  const items = pending;
  pending = [];
  for (const item of items) {
    window.gtag("event", item.name, item.params);
  }
  return true;
}

export function trackGaEvent(name: string, params?: GaParams) {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined") return;

  pending.push({ name, params });
  if (flush()) return;
  if (flushTimer !== undefined) return;

  const started = Date.now();
  flushTimer = window.setInterval(() => {
    if (flush() || Date.now() - started > 4000) {
      window.clearInterval(flushTimer);
      flushTimer = undefined;
      pending = [];
    }
  }, 50);
}
