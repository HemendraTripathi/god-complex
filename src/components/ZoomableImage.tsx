"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";

const FOCUSABLE =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

type Props = {
  src: string;
  fullSrc?: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export default function ZoomableImage({
  src,
  fullSrc,
  alt,
  width,
  height,
  className = "h-auto w-full",
  sizes,
  priority,
}: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);
  const labelId = useId();
  const captionId = useId();
  const viewerSrc = fullSrc ?? src;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (wasOpen.current && !open) {
      triggerRef.current?.focus();
    }
    wasOpen.current = open;
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current
      ?.querySelector<HTMLElement>("[data-close]")
      ?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const nodes = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((node) => !node.hasAttribute("disabled"));
      if (nodes.length === 0) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const viewer = (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/88 p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={alt ? captionId : labelId}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            className="relative flex max-h-full w-full max-w-[min(96vw,1120px)] flex-col overflow-hidden border-2 border-ink bg-paper shadow-brutal"
          >
            <div className="flex shrink-0 items-center justify-between border-b-2 border-ink bg-ink px-4 py-2.5">
              <p
                id={labelId}
                className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-paper"
              >
                Image
              </p>
              <button
                type="button"
                data-close
                onClick={() => setOpen(false)}
                className="ml-4 inline-flex h-11 shrink-0 items-center font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-paper/70 transition-colors hover:text-org"
              >
                Close ✕
              </button>
            </div>

            <figure className="flex min-h-0 flex-1 flex-col bg-ink">
              <div className="min-h-0 flex-1 overflow-auto">
                <Image
                  src={viewerSrc}
                  alt={alt}
                  width={width}
                  height={height}
                  className="mx-auto h-auto max-h-[min(68vh,720px)] w-auto max-w-full object-contain"
                  sizes="96vw"
                />
              </div>
              {alt ? (
                <figcaption
                  id={captionId}
                  className="shrink-0 border-t-2 border-ink bg-paper px-4 py-3 text-[13px] leading-relaxed text-steel"
                >
                  {alt}
                </figcaption>
              ) : null}
            </figure>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={alt ? `View larger image: ${alt}` : "View larger image"}
        className="group relative block w-full cursor-zoom-in text-left"
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={className}
          sizes={sizes}
          priority={priority}
        />
        <span
          className="pointer-events-none absolute bottom-3 right-3 border-2 border-ink bg-paper px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-ink opacity-0 shadow-brutal-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
          aria-hidden="true"
        >
          View
        </span>
      </button>
      {mounted ? createPortal(viewer, document.body) : null}
    </>
  );
}
