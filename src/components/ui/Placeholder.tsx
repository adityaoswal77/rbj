import { FrameIcon } from "./Icons";

type PlaceholderProps = {
  /** Note to whoever adds the photograph. Not read out — see below. */
  label: string;
  /** Tailwind aspect ratio utility, e.g. "aspect-[4/5]". Ignored when `fill`. */
  aspect?: string;
  /** Stretches to cover the nearest positioned ancestor instead of holding a ratio. */
  fill?: boolean;
  className?: string;
  /** Hides the caption on small blocks such as the Instagram tiles. */
  compact?: boolean;
};

/**
 * Stand-in for real photography.
 *
 * Marked `aria-hidden`: every photograph on this page sits beside text that
 * already says what it is, so the images are decorative and a screen reader
 * gains nothing from the placeholder caption. Real photographs should likewise
 * get `alt=""` unless one of them carries information the copy does not.
 *
 * NOTE: this element *is* the aspect-ratio box — callers do not wrap it in one.
 * So when real photographs arrive, keep this outer div and render
 * `<Image fill sizes="..." />` inside it, rather than replacing it at each call
 * site. Dropping an <Image> in directly would collapse the layout to zero height.
 */
export function Placeholder({
  label,
  aspect = "aspect-[4/5]",
  fill = false,
  className = "",
  compact = false,
}: PlaceholderProps) {
  const box = fill ? "absolute inset-0 h-full w-full" : `relative ${aspect} w-full`;

  return (
    <div
      aria-hidden="true"
      className={`${box} overflow-hidden bg-placeholder ${className}`}
    >
      <div className="absolute inset-2 border border-gold/20" aria-hidden="true" />
      <div
        className={`absolute inset-0 flex flex-col gap-3 ${
          fill
            ? "items-end justify-end p-10 text-right"
            : "items-center justify-center px-6 text-center"
        }`}
      >
        <FrameIcon className={compact ? "h-5 w-5 text-charcoal/25" : "h-7 w-7 text-charcoal/25"} />
        {!compact && (
          <span className="eyebrow max-w-[22ch] leading-relaxed text-charcoal/40">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
