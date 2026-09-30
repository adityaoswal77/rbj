import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import {
  Cormorant_Garamond,
  Inter,
  Noto_Sans_Devanagari,
  Tiro_Devanagari_Marathi,
} from "next/font/google";
import { brand } from "@/lib/brand";
import { site } from "@/lib/site";
import "./globals.css";

// None of the four is preloaded by Next: scripts/preload-fonts.mjs adds the
// preloads after the build, choosing the pair for the visitor's saved language.

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  preload: false,
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const tiro = Tiro_Devanagari_Marathi({
  variable: "--font-tiro",
  subsets: ["devanagari", "latin"],
  weight: "400",
  display: "swap",
  preload: false,
});

const noto = Noto_Sans_Devanagari({
  variable: "--font-noto",
  subsets: ["devanagari", "latin"],
  display: "swap",
  preload: false,
});

const description =
  "Rajbhi Jewellers — a family-run jeweller in Saswad, Dist. Pune, since 1968. BIS hallmarked gold, silver, bridal sets and gemstone rings made to order.";

// 58 characters: inside the 50–60 Google shows in full, and it leads with the
// two things people search for — what the shop sells, and where it is.
const title = `${site.name} — Gold & Silver Jewellers in Saswad, Pune`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: `%s — ${site.name}`,
  },
  description,
  keywords: [
    "jewellers Saswad",
    "gold jewellery Saswad",
    "bridal jewellery Pune",
    "BIS hallmarked gold",
    "gemstone rings Saswad",
    "सराफ सासवड",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    alternateLocale: "mr_IN",
    url: site.url,
    siteName: site.name,
    title,
    description,
  },
  // The image itself comes from app/opengraph-image.tsx; this makes X and
  // other Twitter-card readers show it large rather than as a thumbnail.
  twitter: { card: "summary_large_image" },
  alternates: { canonical: site.url },
  // No `robots` here: index/follow is the default, and setting it explicitly
  // put a second, contradictory robots tag on the 404 page beside Next's noindex.
};

export const viewport: Viewport = {
  themeColor: "#5a1a1f",
};

/** Local business structured data, so the store surfaces in local search. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "JewelryStore",
  "@id": `${site.url}/#store`,
  name: site.name,
  alternateName: `${brand.mark.mr} ${brand.sub.mr}`,
  description,
  url: `${site.url}/`,
  // The export writes app/opengraph-image.tsx to `/opengraph-image`, no extension.
  image: `${site.url}/opengraph-image`,
  telephone: `+91${site.phone}`,
  foundingDate: String(site.establishedYear),
  address: {
    "@type": "PostalAddress",
    streetAddress: [site.address.line1.en, site.address.line2.en].filter(Boolean).join(", "),
    addressLocality: site.address.city.en,
    addressRegion: site.address.state.en,
    postalCode: site.address.pin,
    addressCountry: site.address.country,
  },
  geo: { "@type": "GeoCoordinates", ...site.geo },
  sameAs: [site.instagramUrl],
  hasMap: site.mapLink,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      data-lang="en"
      // The inline script below rewrites lang/data-lang before React hydrates.
      suppressHydrationWarning
      className={`${cormorant.variable} ${inter.variable} ${tiro.variable} ${noto.variable} h-full`}
    >
      <head>
        <script
          // Applies the stored language to <html> before first paint. Both
          // languages are already in the HTML, so this switches the copy, the
          // fonts and the `lang` attribute together, before anything is drawn.
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var l=localStorage.getItem('rbj-lang');if(l==='mr'||l==='en'){var d=document.documentElement;d.lang=l;d.dataset.lang=l;}}catch(e){}})();",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        {children}
      </body>
    </html>
  );
}

