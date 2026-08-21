"use client";

import { useState } from "react";

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.851L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"
      />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    </svg>
  );
}

function LinkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <path
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
        d="M10 14a5 5 0 0 0 7.07 0l2.83-2.83a5 5 0 0 0-7.07-7.07L11 5.76"
      />
      <path
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
        d="M14 10a5 5 0 0 0-7.07 0L4.1 12.83a5 5 0 0 0 7.07 7.07L13 18.24"
      />
    </svg>
  );
}

type Props = {
  url: string;
  title: string;
  /** Compact icon row for side rails; default is labeled buttons. */
  variant?: "buttons" | "icons";
};

export default function PostShare({ url, title, variant = "buttons" }: Props) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const xHref = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
  const linkedInHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Fallback for older browsers / denied permission
      window.prompt("Copy link", url);
    }
  }

  if (variant === "icons") {
    return (
      <div className="space-y-3">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-steel">
          Share
        </p>
        <div className="flex flex-col gap-2">
          <a
            href={xHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on X"
            className="inline-flex h-9 w-9 items-center justify-center border-2 border-ink text-ink transition-colors hover:border-org hover:bg-org hover:text-paper"
          >
            <XIcon className="h-3.5 w-3.5" />
          </a>
          <a
            href={linkedInHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on LinkedIn"
            className="inline-flex h-9 w-9 items-center justify-center border-2 border-ink text-ink transition-colors hover:border-org hover:bg-org hover:text-paper"
          >
            <LinkedInIcon className="h-3.5 w-3.5" />
          </a>
          <button
            type="button"
            onClick={copyLink}
            aria-label={copied ? "Link copied" : "Copy link"}
            className="inline-flex h-9 w-9 items-center justify-center border-2 border-ink text-ink transition-colors hover:border-org hover:bg-org hover:text-paper"
          >
            <LinkIcon className="h-3.5 w-3.5" />
          </button>
          <span className="sr-only" aria-live="polite">
            {copied ? "Link copied to clipboard" : ""}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-org">
        Share
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <a
          href={xHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-9 items-center gap-2 border-2 border-ink px-3 font-mono text-[10px] font-bold uppercase tracking-[0.16em] transition-colors hover:border-org hover:bg-org hover:text-paper"
        >
          <XIcon className="h-3 w-3" />
          X
        </a>
        <a
          href={linkedInHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-9 items-center gap-2 border-2 border-ink px-3 font-mono text-[10px] font-bold uppercase tracking-[0.16em] transition-colors hover:border-org hover:bg-org hover:text-paper"
        >
          <LinkedInIcon className="h-3 w-3" />
          LinkedIn
        </a>
        <button
          type="button"
          onClick={copyLink}
          className="inline-flex h-9 items-center gap-2 border-2 border-ink px-3 font-mono text-[10px] font-bold uppercase tracking-[0.16em] transition-colors hover:border-org hover:bg-org hover:text-paper"
        >
          <LinkIcon className="h-3 w-3" />
          {copied ? "Copied" : "Copy link"}
        </button>
      </div>
    </div>
  );
}
