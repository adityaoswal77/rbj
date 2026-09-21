import type { ElementType, ReactNode } from "react";
import { content, type Lang } from "@/lib/content";

/** Both dictionaries, for server components that render each string twice. */
export const { en, mr } = content;

/**
 * Renders a string in both languages. Exactly one is visible — globals.css
 * hides the other based on `html[data-lang]`, which the pre-paint script sets
 * before anything is drawn.
 *
 * This is what keeps the page a Server Component: no React state is involved in
 * switching language, so none of the section code ships to the browser.
 */
export function T({ en: enText, mr: mrText }: { en: string; mr: string }) {
  return (
    <>
      <span data-lang-for="en">{enText}</span>
      <span data-lang-for="mr">{mrText}</span>
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
    <Tag data-lang-for={lang} className={className}>
      {children}
    </Tag>
  );
}
