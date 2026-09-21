"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { content, type Content, type Lang } from "@/lib/content";

export const LANG_STORAGE_KEY = "rbj-lang";
const LANG_EVENT = "rbj-lang-change";

/**
 * The `<html data-lang>` attribute is the source of truth. It is set before
 * paint by the inline script in the root layout, which keeps a returning
 * Marathi visitor from seeing a flash of English, and lets the CSS swap the
 * whole type system in one place.
 */
function applyToDom(lang: Lang) {
  const html = document.documentElement;
  html.lang = lang;
  html.dataset.lang = lang;
}

function getSnapshot(): Lang {
  return document.documentElement.dataset.lang === "mr" ? "mr" : "en";
}

/** The exported HTML is always English; React re-renders after hydration. */
function getServerSnapshot(): Lang {
  return "en";
}

function subscribe(onStoreChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key !== LANG_STORAGE_KEY) return;
    applyToDom(event.newValue === "mr" ? "mr" : "en");
    onStoreChange();
  };
  window.addEventListener(LANG_EVENT, onStoreChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(LANG_EVENT, onStoreChange);
    window.removeEventListener("storage", onStorage);
  };
}

type LanguageValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Content;
};

const LanguageContext = createContext<LanguageValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setLang = useCallback((next: Lang) => {
    applyToDom(next);
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, next);
    } catch {
      /* private mode — the choice simply is not remembered */
    }
    window.dispatchEvent(new Event(LANG_EVENT));
  }, []);

  const value = useMemo<LanguageValue>(
    () => ({ lang, setLang, t: content[lang] }),
    [lang, setLang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang(): LanguageValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside <LanguageProvider>");
  return ctx;
}
