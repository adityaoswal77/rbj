import { FrameIcon } from "./Icons";

type PlaceholderProps = {
  /** Describes the photograph that belongs here. */
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
 * Stand-in for real photography. Swap each usage for <Image /> once the
 * store's own photographs are available — the surrounding layout already
 * reserves the correct aspect ratio.
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
      role="img"
      aria-label={label}
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
