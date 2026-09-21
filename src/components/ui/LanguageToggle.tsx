"use client";

import { useLang } from "@/components/LanguageProvider";
import type { Lang } from "@/lib/content";

type LanguageToggleProps = {
  tone?: "dark" | "light";
  className?: string;
};

const OPTIONS: { code: Lang; label: string; aria: string }[] = [
  { code: "en", label: "EN", aria: "Switch to English" },
  { code: "mr", label: "मराठी", aria: "मराठीत पहा" },
];

/** EN | मराठी — the whole page re-typesets and re-reads on change. */
export function LanguageToggle({ tone = "dark", className = "" }: LanguageToggleProps) {
  const { lang, setLang } = useLang();
  const active = tone === "light" ? "text-ivory" : "text-maroon";
  const idle = tone === "light" ? "text-ivory/55 hover:text-ivory" : "text-charcoal-soft hover:text-maroon";
  const divider = tone === "light" ? "text-ivory/35" : "text-line";

  return (
    <div className={`flex items-center gap-2 text-[0.8125rem] ${className}`}>
      {OPTIONS.map((option, i) => (
        <span key={option.code} className="flex items-center gap-2">
          {i > 0 && (
            <span aria-hidden="true" className={divider}>
              |
            </span>
          )}
          <button
            type="button"
            onClick={() => setLang(option.code)}
            aria-label={option.aria}
            aria-pressed={lang === option.code}
            className={`cursor-pointer tracking-[0.06em] transition-colors duration-200 ${
              lang === option.code ? `${active} font-medium` : idle
            }`}
          >
            {option.label}
          </button>
        </span>
      ))}
    </div>
  );
}
