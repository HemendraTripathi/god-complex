/* eslint-disable @next/next/no-img-element */

/**
 * Drop-in image slot. Until a real image exists at `src`, it renders a
 * labeled placeholder telling you exactly which file to add under /public.
 * Once the file exists, pass `ready` to render the real image.
 */
export default function ImagePlaceholder({
  src,
  alt,
  label,
  aspect = "aspect-[16/10]",
  ready = false,
}: {
  src: string;
  alt: string;
  label?: string;
  aspect?: string;
  ready?: boolean;
}) {
  if (ready) {
    return (
      <img
        src={src}
        alt={alt}
        className={`${aspect} w-full border border-ink object-cover`}
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={alt}
      className={`ph-stripes ${aspect} flex w-full flex-col items-center justify-center gap-2 border border-dashed border-ink/30 bg-ink/[0.02]`}
    >
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        className="text-ink/30"
      >
        <rect x="3" y="4" width="18" height="16" />
        <circle cx="9" cy="10" r="2" />
        <path d="m3 17 5-4 4 3 4-4 5 5" />
      </svg>
      <span className="px-4 text-center font-mono text-[9.5px] uppercase tracking-wider text-ink/40">
        {label ?? `add image → public${src}`}
      </span>
    </div>
  );
}
