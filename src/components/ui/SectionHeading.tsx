import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  intro?: string;
  align?: "left" | "center";
  /** Renders in ivory for use on the maroon footer / dark panels. */
  tone?: "dark" | "light";
  className?: string;
  as?: "h2" | "h3";
};

/** The one heading block used by every section, for a consistent voice. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "dark",
  className = "",
  as: Tag = "h2",
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div
      className={`flex flex-col ${centered ? "items-center text-center" : "items-start"} ${className}`}
    >
      {eyebrow && (
        <span className={`eyebrow ${tone === "light" ? "text-gold-soft" : "text-gold"}`}>
          {eyebrow}
        </span>
      )}
      <span
        aria-hidden="true"
        className={`mt-4 block h-px w-10 ${tone === "light" ? "bg-gold-soft/50" : "bg-gold/50"}`}
      />
      <Tag
        className={`mt-6 font-display text-[2rem] leading-[1.15] font-light tracking-[-0.01em] md:text-[2.75rem] ${
          tone === "light" ? "text-ivory" : "text-maroon"
        }`}
      >
        {title}
      </Tag>
      {intro && (
        <p
          className={`mt-6 max-w-[54ch] text-base leading-relaxed ${
            tone === "light" ? "text-ivory/70" : "text-charcoal-soft"
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
