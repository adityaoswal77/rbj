import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import {
  Cormorant_Garamond,
  Inter,
  Noto_Sans_Devanagari,
  Tiro_Devanagari_Marathi,
} from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const tiro = Tiro_Devanagari_Marathi({
  variable: "--font-tiro",
  subsets: ["devanagari", "latin"],
  weight: "400",
  display: "swap",
  // Only used once Marathi is selected — keep it off the critical path.
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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Trusted jewellers of Saswad`,
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
    title: `${site.name} — Trusted jewellers of Saswad`,
    description,
  },
  alternates: { canonical: site.url },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#5a1a1f",
};

/** Local business structured data, so the store surfaces in local search. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "JewelryStore",
  name: site.name,
  description,
  url: site.url,
  telephone: `+91${site.phone}`,
  foundingDate: String(site.establishedYear),
  address: {
    "@type": "PostalAddress",
    streetAddress: [site.address.line1, site.address.line2].filter(Boolean).join(", "),
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.pin,
    addressCountry: site.address.country,
  },
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

