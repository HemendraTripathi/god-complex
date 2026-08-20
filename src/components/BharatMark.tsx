/** Hindi “Bharat” plus the Indian flag, shown after “IN”. */
export default function BharatMark() {
  return (
    <span className="inline-flex items-center gap-[0.3em] leading-none">
      <span
        lang="hi"
        className="font-sans text-[1em] font-semibold leading-none normal-case tracking-normal"
      >
        "भारत"
      </span>
      <img
        src="/flag-india.svg"
        alt=""
        width={18}
        height={12}
        className="block h-[0.9em] w-[1.35em] shrink-0 border border-ink object-cover"
        aria-hidden="true"
      />
    </span>
  );
}
