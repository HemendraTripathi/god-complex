"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import SocialLink from "@/components/SocialLink";
import { LINKS, NAV } from "@/lib/content";

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 top-0 z-40 border-b-2 border-ink bg-paper/95 backdrop-blur-sm"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-3.5 sm:px-8">
        <Link
          href="/"
          prefetch={false}
          className="min-w-0 truncate font-mono text-[12px] font-bold uppercase tracking-[0.18em]"
          onClick={() => setOpen(false)}
        >
          Hemendra Tripathi
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {NAV.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="font-mono text-[10.5px] font-bold uppercase tracking-[0.18em] text-steel transition-colors hover:text-org"
            >
              {label}
            </a>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <span className="hidden items-center gap-3.5 sm:inline-flex">
            <SocialLink
              network="github"
              className="text-[14px] text-steel transition-colors hover:text-org"
            />
            <SocialLink
              network="linkedin"
              className="text-[14px] text-steel transition-colors hover:text-org"
            />
            <SocialLink
              network="twitter"
              className="text-[14px] text-steel transition-colors hover:text-org"
            />
          </span>
          <a
            href={LINKS.resume}
            download
            className="hidden h-8 items-center border-2 border-ink px-3 font-mono text-[10px] font-bold uppercase tracking-[0.18em] transition-colors hover:bg-ink hover:text-paper sm:inline-flex sm:px-4"
          >
            Résumé ↓
          </a>
          <a
            href={LINKS.calendar}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-8 items-center border-2 border-ink bg-ink px-3 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-paper transition-colors hover:border-org hover:bg-org sm:px-4"
          >
            Book 20 min
          </a>
          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center border-2 border-ink lg:hidden"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3 w-3.5" aria-hidden="true">
              <span
                className={`absolute left-0 block h-0.5 w-3.5 bg-ink transition-transform ${
                  open ? "top-[5px] rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-[5px] block h-0.5 w-3.5 bg-ink transition-opacity ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-3.5 bg-ink transition-transform ${
                  open ? "top-[5px] -rotate-45" : "top-[10px]"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div
          id={panelId}
          className="border-t-2 border-ink bg-paper lg:hidden"
        >
          <ul className="mx-auto max-w-7xl">
            {NAV.map(([label, href], i) => (
              <li key={href} className={i > 0 ? "border-t border-hair" : ""}>
                <a
                  href={href}
                  className="flex min-h-12 items-center justify-between px-5 py-3.5 font-mono text-[12px] font-bold uppercase tracking-[0.18em] transition-colors hover:bg-ink hover:text-paper sm:px-8"
                  onClick={() => setOpen(false)}
                >
                  <span>{label}</span>
                  <span className="text-org" aria-hidden="true">
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
