"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Cat = dynamic(() => import("@/components/PixelCat"), { ssr: false });

/**
 * Mount the arcade cat only after the page is idle so it doesn't compete
 * with LCP on Slow 4G (sheet + optional audio).
 */
export default function PixelCatLazy() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let idleId = 0;
    let timer = 0;
    const start = () => setShow(true);

    const afterLoad = () => {
      const ric = window.requestIdleCallback;
      if (typeof ric === "function") {
        idleId = ric(start, { timeout: 2500 });
      } else {
        timer = window.setTimeout(start, 1200);
      }
    };

    if (document.readyState === "complete") {
      afterLoad();
    } else {
      window.addEventListener("load", afterLoad, { once: true });
    }

    return () => {
      window.removeEventListener("load", afterLoad);
      if (idleId && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  if (!show) return null;
  return <Cat />;
}
