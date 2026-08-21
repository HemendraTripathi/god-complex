import BharatMark from "@/components/BharatMark";
import Link from "next/link";
import SocialLink from "@/components/SocialLink";

export default function SiteFooter() {
  return (
    <footer className="border-t-2 border-ink">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 px-5 py-6 font-mono text-[9.5px] uppercase tracking-[0.18em] text-steel sm:flex-row sm:items-center sm:px-8">
        <span className="inline-flex items-center gap-[0.4em]">
          © 2026 Hemendra Tripathi · Udaipur, IN <BharatMark />
        </span>
        <div className="flex flex-wrap items-center gap-6">
          <SocialLink network="github" className="text-[12px] transition-colors hover:text-org" />
          <SocialLink network="linkedin" className="text-[12px] transition-colors hover:text-org" />
          <SocialLink network="twitter" className="text-[12px] transition-colors hover:text-org" />
          <Link
            href="/cat"
            className="transition-colors hover:text-org"
            title="Meet the arcade cat"
          >
            Arcade cat
          </Link>
          <span>Designed & built by him</span>
        </div>
      </div>
    </footer>
  );
}
