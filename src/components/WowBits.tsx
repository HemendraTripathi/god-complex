"use client";

import DecryptedText from "@/components/DecryptedText";
import FadeContent from "@/components/FadeContent";
import Magnet from "@/components/Magnet";
import SplitText from "@/components/SplitText";
import TrueFocus from "@/components/TrueFocus";
import { LINKS } from "@/lib/content";

export function HeroEyebrow() {
  return (
    <div className="eyebrow mb-6 flex items-center justify-between">
      <DecryptedText
        text="Technical Lead — AI Systems / Full-Stack"
        animateOn="view"
        sequential
        speed={28}
        className="eyebrow !normal-case"
        parentClassName="eyebrow"
        encryptedClassName="text-org/70"
      />
      <span className="hidden items-center gap-2 sm:flex">
        <span className="blink h-1.5 w-1.5 bg-org" />
        Open to select roles · UTC+05:30
      </span>
    </div>
  );
}

export function HeroName() {
  return (
    <h1 className="display text-[clamp(52px,11.5vw,168px)]">
      <SplitText
        text="HEMENDRA"
        tag="span"
        className="display !m-0 block text-[clamp(52px,11.5vw,168px)]"
        textAlign="left"
        delay={30}
        duration={0.7}
        splitType="chars"
        from={{ opacity: 0, y: 60 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.01}
        rootMargin="0px"
      />
      <span className="flex flex-wrap items-start gap-x-3">
        <SplitText
          text="TRIPATHI"
          tag="span"
          className="display !m-0 text-[clamp(52px,11.5vw,168px)] text-org"
          textAlign="left"
          delay={40}
          duration={0.75}
          splitType="chars"
          from={{ opacity: 0, y: 60 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.01}
          rootMargin="0px"
        />
        <span
          aria-hidden="true"
          className="mt-3 align-top font-mono text-[clamp(14px,2vw,26px)] font-normal tracking-normal text-steel"
        >
          ©2026
        </span>
      </span>
    </h1>
  );
}

export function HeroFocus() {
  return (
    <div className="mt-8 max-w-3xl">
      <TrueFocus
        sentence="ARCHITECTURE  BILLING  TEAMS  REVENUE"
        separator="  "
        blurAmount={4}
        borderColor="#ff4d00"
        glowColor="rgba(255, 77, 0, 0.35)"
        animationDuration={0.45}
        pauseBetweenAnimations={0.85}
        className="justify-start gap-3 sm:gap-5"
        wordClassName="relative cursor-pointer font-mono text-[clamp(14px,2.2vw,22px)] font-bold uppercase tracking-[0.12em]"
      />
    </div>
  );
}

export function HeroCtas() {
  return (
    <div className="mt-10 flex flex-wrap items-center gap-4 pb-16">
      <Magnet padding={60} magnetStrength={2.4} wrapperClassName="inline-block">
        <a
          href="#case"
          className="inline-block border-2 border-ink bg-ink px-7 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-paper shadow-brutal transition-colors hover:border-org hover:bg-org"
        >
          Read the case study →
        </a>
      </Magnet>
      <Magnet padding={50} magnetStrength={2.8} wrapperClassName="inline-block">
        <a
          href="#agent"
          className="inline-block border-2 border-ink px-7 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] transition-colors hover:bg-ink hover:text-paper"
        >
          Talk to my AI agent
        </a>
      </Magnet>
      <Magnet padding={50} magnetStrength={3} wrapperClassName="inline-block">
        <a
          href={`mailto:${LINKS.email}?subject=Hiring%20conversation`}
          className="inline-block border-2 border-ink px-7 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] transition-colors hover:border-org hover:text-org"
        >
          Email me
        </a>
      </Magnet>
    </div>
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
