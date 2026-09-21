/**
 * Store details — the single place to edit real-world information.
 *
 * Values marked TODO are still placeholders. Replace them here and the
 * whole site (header, hero CTAs, Visit Us, footer, schema.org metadata)
 * updates at once.
 */

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

  address: {
    /** TODO: replace with the real street / shop-number line. */
    line1: "Main Road",
    /** TODO: optional landmark line, e.g. "Opposite Sangameshwar Temple". Leave "" to skip. */
    line2: "",
    city: "Saswad",
    district: "Pune",
    state: "Maharashtra",
    /** TODO: confirm PIN code. */
    pin: "412301",
    /** ISO country code, used in the structured data. */
    country: "IN",
  },

  /**
   * Keyless Google Maps embed, driven by a search query — works with no API key.
   * To pin the exact listing instead: Google Maps -> Share -> Embed a map -> copy
   * the iframe `src` and paste it here. Set to "" to fall back to a grey placeholder.
   */
  mapEmbedUrl:
    "https://maps.google.com/maps?q=Rajbhi%20Jewellers%2C%20Saswad%2C%20Pune&z=16&output=embed",
  /** Share link from Google Maps — used by the "See on map" button. */
  mapLink: "https://maps.app.goo.gl/rNuMUU1FNmTPFB4i6",
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
export const addressLines: string[] = [
  site.address.line1,
  site.address.line2,
  `${site.address.city}, Dist. ${site.address.district}`,
  `${site.address.state} ${site.address.pin}`,
].filter(Boolean);
