"use client";

import { useEffect } from "react";
import { trackGaEvent } from "@/lib/ga-events";
import { LINKS } from "@/lib/content";

function closestHref(target: EventTarget | null): string | null {
  if (!(target instanceof Element)) return null;
  return target.closest("a")?.getAttribute("href") ?? null;
}

export default function GaClickTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const href = closestHref(event.target);
      if (!href) return;

      if (href === LINKS.calendar || href.startsWith(`${LINKS.calendar}?`)) {
        trackGaEvent("generate_lead", { method: "calendar", link_url: href });
        return;
      }

      if (href.startsWith("mailto:")) {
        trackGaEvent("generate_lead", { method: "email" });
        return;
      }

      if (
        href === LINKS.resume ||
        href.endsWith("/Hemendra_Tripathi_Resume.pdf")
      ) {
        trackGaEvent("file_download", {
          file_name: "Hemendra_Tripathi_Resume.pdf",
          link_url: href,
        });
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
