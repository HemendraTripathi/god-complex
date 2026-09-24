"use client";

import CountUp from "@/components/CountUp";
import FadeContent from "@/components/FadeContent";
import FlipWords from "@/components/FlipWords";
import Magnet from "@/components/Magnet";
import SplitText from "@/components/SplitText";
import TrueFocus from "@/components/TrueFocus";
import { CASE, LINKS } from "@/lib/content";
import { CASE_PATH } from "@/lib/seo";

const ROLE_WORDS = [
  "AI Voice Engineer",
  "Realtime agents",
  "Low-latency audio",
] as const;

export function HeroEyebrow() {
  return (
    <div className="eyebrow mb-4 flex items-center justify-between gap-4">
      <p>
        <span className="sr-only">Technical Lead, AI Voice Engineer</span>
        <span aria-hidden="true" className="inline-flex flex-wrap items-baseline gap-x-2">
          Technical Lead · <FlipWords words={ROLE_WORDS} />
        </span>
      </p>
      <span className="flex shrink-0 items-center gap-2">
        <span className="blink h-1.5 w-1.5 bg-org" aria-hidden="true" />
        <span className="sm:hidden">Open · UTC+05:30</span>
        <span className="hidden sm:inline">Open to select roles · UTC+05:30</span>
      </span>
    </div>
  );
}

export function HeroName() {
  return (
    <h1 className="display text-[clamp(48px,min(10.5vw,15vh),148px)]">
      <SplitText
        text="Hemendra"
        tag="span"
        splitType="words"
        textAlign="left"
        duration={0.75}
        delay={40}
        ease="power3.out"
        threshold={0}
        rootMargin="0px"
        mask={false}
        from={{ opacity: 0, y: 28 }}
        to={{ opacity: 1, y: 0 }}
        className="block"
      />
      <span className="flex flex-wrap items-start gap-x-3">
        <SplitText
          text="Tripathi"
          tag="span"
          splitType="words"
          textAlign="left"
          duration={0.75}
          delay={40}
          startDelay={0.14}
          ease="power3.out"
          threshold={0}
          rootMargin="0px"
          mask={false}
          from={{ opacity: 0, y: 28 }}
          to={{ opacity: 1, y: 0 }}
          className="text-org"
        />
        <span
          aria-hidden="true"
          className="mt-3 align-top font-mono text-[clamp(14px,2vw,26px)] font-normal tracking-normal text-steel normal-case"
        >
          ©2026
        </span>
      </span>
    </h1>
  );
}

export function HeroFocus() {
  return (
    <div className="mt-5 max-w-3xl">
      <TrueFocus
        sentence="ARCHITECTURE  BILLING  TEAMS  REVENUE"
        separator="  "
        blurAmount={4}
        borderColor="#ff4d00"
        glowColor="transparent"
        animationDuration={0.45}
        pauseBetweenAnimations={0.85}
        className="justify-start gap-3 sm:gap-5"
        wordClassName="relative font-mono text-[clamp(14px,2.2vw,22px)] font-bold uppercase tracking-[0.12em]"
      />
    </div>
  );
}

export function HeroCtas() {
  return (
    <div className="mt-auto flex flex-wrap items-center gap-x-8 gap-y-4 pt-8">
      <a
        href={CASE_PATH}
        className="inline-block border-2 border-ink bg-ink px-7 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-paper shadow-brutal transition-colors hover:border-org hover:bg-org"
      >
        Read the case study →
      </a>
      <FadeContent
        duration={0.6}
        threshold={0}
        className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em]"
      >
        <a href="#agent" className="text-ink underline-offset-4 hover:text-org hover:underline">
          Talk to my AI agent
        </a>
        <a
          href={LINKS.calendar}
          target="_blank"
          rel="noopener noreferrer"
          className="text-steel underline-offset-4 hover:text-org hover:underline"
        >
          Book 20 min
        </a>
      </FadeContent>
    </div>
  );
}

export function HeroMetrics() {
  return (
    <dl
      aria-label="Verified impact"
      className="grid grid-cols-2 border-2 border-ink"
    >
      {CASE.metrics.map((m, i) => (
        <div
          key={m.label}
          className={`border-hair p-3 sm:p-5 ${i % 2 === 1 ? "border-l" : ""} ${i < 2 ? "border-b" : ""}`}
        >
          <dt className="font-mono text-[9.5px] uppercase tracking-wider text-steel">
            {m.label}
          </dt>
          <dd className="mt-1.5 font-mono text-[clamp(22px,3.2vw,30px)] font-bold tracking-tight">
            {m.prefix}
            <CountUp
              to={m.to}
              duration={1.15}
              delay={0.08 * i}
              separator={m.separator ?? ""}
            />
            {m.suffix}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function FadeIn({
  children,
  className = "",
  delay = 0,
  blur = false,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  blur?: boolean;
}) {
  return (
    <FadeContent
      className={className}
      blur={blur}
      duration={0.85}
      delay={delay}
      threshold={0.12}
      ease="power2.out"
    >
      {children}
    </FadeContent>
  );
}

export function ContactTitle() {
  return (
    <SplitText
      text="HIRE ME."
      tag="h2"
      className="display !m-0 text-[clamp(44px,9vw,128px)]"
      textAlign="left"
      delay={35}
      duration={0.8}
      splitType="chars"
      from={{ opacity: 0, y: 50 }}
      to={{ opacity: 1, y: 0 }}
      threshold={0.2}
    />
  );
}

export function ContactMagnet({ children }: { children: React.ReactNode }) {
  return (
    <Magnet padding={70} magnetStrength={2.2} wrapperClassName="inline-block">
      {children}
    </Magnet>
  );
}
