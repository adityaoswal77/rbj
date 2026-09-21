/**
 * The wordmark, in both languages. Kept out of content.ts deliberately: the
 * header is a client component, and importing the full bilingual dictionary
 * there would pull every word on the site back into the JavaScript bundle.
 */
export const brand = {
  mark: { en: "Rajbhi", mr: "राजभी" },
  sub: { en: "Jewellers", mr: "ज्वेलर्स" },
} as const;
