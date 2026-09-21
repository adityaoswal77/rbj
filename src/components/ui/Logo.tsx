"use client";

import { useLang } from "@/components/LanguageProvider";

type LogoProps = {
  tone?: "dark" | "light";
  className?: string;
};

/** Wordmark: display-face name over a letterspaced descriptor, split by a gold rule. */
export function Logo({ tone = "dark", className = "" }: LogoProps) {
  const { t } = useLang();
  const primary = tone === "light" ? "text-ivory" : "text-maroon";
  const secondary = tone === "light" ? "text-ivory/70" : "text-charcoal-soft";
  const rule = tone === "light" ? "bg-gold-soft/60" : "bg-gold/60";

  return (
    <span className={`flex flex-col leading-none ${className}`}>
      <span
        className={`font-display text-[1.625rem] font-medium tracking-[0.02em] transition-colors duration-300 md:text-[1.75rem] ${primary}`}
      >
        {t.brand.mark}
      </span>
      <span className="mt-1.5 flex items-center gap-2">
        <span aria-hidden="true" className={`h-px w-4 transition-colors duration-300 ${rule}`} />
        <span
          className={`eyebrow text-[0.625rem] transition-colors duration-300 ${secondary}`}
        >
          {t.brand.sub}
        </span>
      </span>
    </span>
  );
}
