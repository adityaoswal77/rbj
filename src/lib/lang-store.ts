import type { Lang } from "./content";

export const LANG_STORAGE_KEY = "rbj-lang";
const LANG_EVENT = "rbj-lang-change";

/**
 * `<html data-lang>` is the single source of truth. The inline script in the
 * root layout sets it before first paint; CSS in globals.css shows the matching
 * half of the page. No React state is involved in switching language, which is
 * why every section can stay a Server Component.
 */
export function applyToDom(lang: Lang) {
  const html = document.documentElement;
  html.lang = lang;
  html.dataset.lang = lang;
}

export function getSnapshot(): Lang {
  return document.documentElement.dataset.lang === "mr" ? "mr" : "en";
}

/** The exported HTML always starts English; React re-reads after hydration. */
export function getServerSnapshot(): Lang {
  return "en";
}

export function subscribe(onStoreChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key !== LANG_STORAGE_KEY) return;
    // A cleared key means "no preference", not "English" — leave this tab be.
    if (event.newValue === null) return;
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

export function setLang(next: Lang) {
  applyToDom(next);
  try {
    window.localStorage.setItem(LANG_STORAGE_KEY, next);
  } catch {
    /* private mode — the choice simply is not remembered */
  }
  window.dispatchEvent(new Event(LANG_EVENT));
}

/** Restores the stored choice after a dev-only Strict Mode remount. */
export function reapplyStored() {
  try {
    const stored = window.localStorage.getItem(LANG_STORAGE_KEY);
    if ((stored === "mr" || stored === "en") && getSnapshot() !== stored) {
      applyToDom(stored);
      window.dispatchEvent(new Event(LANG_EVENT));
    }
  } catch {
    /* storage unavailable — English stands */
  }
}
