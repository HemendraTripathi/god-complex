import { LINKS } from "@/lib/content";

export default function SiteFooter() {
  return (
    <footer className="border-t-2 border-ink">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 px-5 py-6 font-mono text-[9.5px] uppercase tracking-[0.18em] text-steel sm:flex-row sm:items-center sm:px-8">
        <span>© 2026 Hemendra Tripathi · Udaipur, IN</span>
        <div className="flex flex-wrap gap-6">
          <a
            rel="me"
            href={LINKS.github}
            target="_blank"
            className="transition-colors hover:text-org"
          >
            GitHub
          </a>
          <a
            rel="me"
            href={LINKS.linkedin}
            target="_blank"
            className="transition-colors hover:text-org"
          >
            LinkedIn
          </a>
          <span>Designed & built by him</span>
        </div>
      </div>
    </footer>
  );
}
