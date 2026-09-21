import { Header, type HeaderCopy } from "@/components/Header";
import { About } from "@/components/sections/About";
import { Collections } from "@/components/sections/Collections";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Instagram } from "@/components/sections/Instagram";
import { MadeToOrder } from "@/components/sections/MadeToOrder";
import { VisitUs } from "@/components/sections/VisitUs";
import { en, mr } from "@/components/T";
import { site, whatsappHref } from "@/lib/site";

/** Only what the client-side header needs — not the whole dictionary. */
const headerCopy: HeaderCopy = {
  nav: [
    { href: "#collections", label: { en: en.nav.collections, mr: mr.nav.collections } },
    { href: "#about", label: { en: en.nav.about, mr: mr.nav.about } },
    { href: "#visit", label: { en: en.nav.visit, mr: mr.nav.visit } },
  ],
  menu: { en: en.nav.menu, mr: mr.nav.menu },
  close: { en: en.nav.close, mr: mr.nav.close },
  whatsappLabel: { en: en.cta.whatsappUs, mr: mr.cta.whatsappUs },
  whatsappHref: {
    en: whatsappHref(en.cta.whatsappGeneral),
    mr: whatsappHref(mr.cta.whatsappGeneral),
  },
  brandName: site.name,
};

export default function Page() {
  return (
    <>
      <Header copy={headerCopy} />
      <main id="main" className="flex-1">
        <Hero />
        <Collections />
        <MadeToOrder />
        <About />
        <Instagram />
        <VisitUs />
      </main>
      <Footer />
    </>
  );
}
