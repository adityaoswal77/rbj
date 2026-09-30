/**
 * Store details — the single place to edit real-world information.
 *
 * Values marked TODO are still placeholders. Replace them here and the
 * whole site (header, hero CTAs, Visit Us, footer, schema.org metadata)
 * updates at once.
 */

import type { Lang } from "./content";

export const site = {
  name: "Rajbhi Jewellers",
  url: "https://rajbhijewellers.com",

  establishedYear: 1968,

  /** Mobile number, digits only, no country code. */
  phone: "7083091096",
  /** WhatsApp in E.164 without the leading +. Same number as the phone. */
  whatsapp: "917083091096",

  instagramHandle: "rajbhijewellers",
  instagramUrl: "https://www.instagram.com/rajbhijewellers/",

  /** Each line in both languages. The English is what the structured data uses. */
  address: {
    /** TODO: replace with the real street / shop-number line. */
    line1: { en: "Main Road", mr: "मेन रोड" },
    /** TODO: optional landmark line, e.g. "Opposite Sangameshwar Temple". Leave "" to skip. */
    line2: { en: "", mr: "" },
    city: { en: "Saswad", mr: "सासवड" },
    district: { en: "Pune", mr: "पुणे" },
    state: { en: "Maharashtra", mr: "महाराष्ट्र" },
    /** Kept in Latin digits in both languages, like the phone number: people copy it into forms. */
    pin: "412301",
    /** ISO country code, used in the structured data. */
    country: "IN",
  },

  /** Share link from Google Maps — used by every "See on map" button. */
  mapLink: "https://maps.app.goo.gl/rNuMUU1FNmTPFB4i6",

  /**
   * The pin of the Google listing that `mapLink` opens (its `!3d…!4d…` values).
   * Used for the structured data, because "Main Road, Saswad" alone is not
   * geocodable. If the listing is ever moved, copy the new pin from its URL.
   */
  geo: { latitude: 18.3458115, longitude: 74.0292625 },
} as const;

/**
 * The year this build was made, inlined by next.config.ts. Using it instead of
 * `new Date()` keeps the server HTML and the client bundle in agreement — a
 * runtime date would differ across New Year and break hydration.
 */
export const buildYear = Number(process.env.NEXT_PUBLIC_BUILD_YEAR);

/** Years in business, recalculated on every build so it never goes stale. */
export const yearsInBusiness = buildYear - site.establishedYear;

/** `tel:` href with the Indian country code. */
export const telHref = `tel:+91${site.phone}`;

/** Phone formatted for display, e.g. +91 70830 91096. */
export const phoneDisplay = `+91 ${site.phone.replace(/^(\d{5})(\d{5})$/, "$1 $2")}`;

/** Builds a wa.me link with a pre-filled enquiry message. */
export function whatsappHref(message: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Empty lines are dropped, so an unused landmark line leaves no gap. */
export const addressLines: Record<Lang, string[]> = {
  en: [
    site.address.line1.en,
    site.address.line2.en,
    `${site.address.city.en}, Dist. ${site.address.district.en}`,
    `${site.address.state.en} ${site.address.pin}`,
  ].filter(Boolean),
  mr: [
    site.address.line1.mr,
    site.address.line2.mr,
    `${site.address.city.mr}, जि. ${site.address.district.mr}`,
    `${site.address.state.mr} ${site.address.pin}`,
  ].filter(Boolean),
};
