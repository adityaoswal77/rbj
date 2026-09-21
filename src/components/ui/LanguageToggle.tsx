"use client";

import { useLayoutEffect, useSyncExternalStore } from "react";
import {
  getServerSnapshot,
  getSnapshot,
  reapplyStored,
  setLang,
  subscribe,
} from "@/lib/lang-store";
import type { Lang } from "@/lib/content";

type LanguageToggleProps = {
  tone?: "dark" | "light";
  className?: string;
};

const OPTIONS: { code: Lang; label: string; aria: string }[] = [
  { code: "en", label: "EN", aria: "Switch to English" },
  { code: "mr", label: "मराठी", aria: "मराठीत पहा" },
];

/** EN | मराठी — flips `html[data-lang]`, and CSS does the rest. */
export function LanguageToggle({ tone = "dark", className = "" }: LanguageToggleProps) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  useLayoutEffect(reapplyStored, []);

  const active = tone === "light" ? "text-ivory" : "text-maroon";
  const idle =
    tone === "light" ? "text-ivory/70 hover:text-ivory" : "text-charcoal hover:text-maroon";
  const divider = tone === "light" ? "text-ivory/35" : "text-charcoal-soft/50";

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
            // So a screen reader reads मराठी with a Marathi voice, not an English one.
            lang={option.code}
            onClick={() => setLang(option.code)}
            aria-label={option.aria}
            aria-pressed={lang === option.code}
            className={`inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center tracking-[0.06em] transition-colors duration-200 ${
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
