import type { ElementType, ReactNode } from "react";
import { content, type Lang } from "@/lib/content";

/** Both dictionaries, for server components that render each string twice. */
export const { en, mr } = content;

/**
 * Renders a string in both languages. Exactly one is visible — globals.css
 * hides the other based on `html[data-lang]`, which the pre-paint script sets
 * before anything is drawn. Each half carries its own `lang`, because the
 * served HTML says `<html lang="en">` and a crawler reads both halves.
 *
 * This is what keeps the page a Server Component: no React state is involved in
 * switching language, so none of the section code ships to the browser.
 */
export function T({ en: enText, mr: mrText }: { en: string; mr: string }) {
  return (
    <>
      <span data-lang-for="en" lang="en">{enText}</span>
      <span data-lang-for="mr" lang="mr">{mrText}</span>
    </>
  );
}

/**
 * Shows its children in one language only. For blocks that cannot be expressed
 * as a single string pair — lists of differing length, or a link whose href
 * carries a translated message.
 */
export function Only({
  lang,
  as: Tag = "div",
  className,
  children,
}: {
  lang: Lang;
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag data-lang-for={lang} lang={lang} className={className}>
      {children}
    </Tag>
  );
}
