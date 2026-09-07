import Image from "next/image";

export default function WritingCover({
  src,
  index,
  sizes,
  preload = false,
  className = "",
}: {
  src: string | null;
  index: string;
  sizes: string;
  preload?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-video overflow-hidden border-2 border-ink bg-paper ${className}`}
      aria-hidden="true"
    >
      {src ? (
        <Image
          src={src}
          alt=""
          fill
          sizes={sizes}
          preload={preload}
          className="object-contain motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:group-hover:scale-[1.04]"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <span className="display text-[clamp(48px,8vw,88px)] text-ink/15">
            {index}
          </span>
        </div>
      )}
    </div>
  );
}
