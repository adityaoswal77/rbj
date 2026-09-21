"use client";

import { useLang } from "@/components/LanguageProvider";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { Container } from "@/components/ui/Section";
import { Logo } from "@/components/ui/Logo";
import {
  addressLines,
  phoneDisplay,
  site,
  telHref,
  whatsappHref,
} from "@/lib/site";
import { toDevanagariDigits } from "@/lib/content";

export function Footer() {
  const { lang, t } = useLang();
  const established =
    lang === "mr"
      ? toDevanagariDigits(site.establishedYear)
      : String(site.establishedYear);

  return (
    <footer className="bg-maroon text-ivory">
      <Container>
        <div className="grid gap-12 py-20 md:grid-cols-12 md:gap-10 md:py-24">
          <div className="md:col-span-5">
            <Logo tone="light" />
            <p className="mt-6 max-w-[30ch] font-display text-lg leading-relaxed font-light text-ivory/75">
              {t.footer.tagline}
            </p>
            <p className="eyebrow mt-6 text-gold-soft">Est. {established}</p>
          </div>

          <div className="md:col-span-4">
            <address className="text-[0.9375rem] leading-relaxed text-ivory/75 not-italic">
              {addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </div>

          <div className="flex flex-col gap-4 md:col-span-3">
            <a
              href={telHref}
              className="text-[0.9375rem] text-ivory/75 transition-colors duration-200 hover:text-ivory"
            >
              {phoneDisplay}
            </a>
            <a
              href={whatsappHref(t.cta.whatsappGeneral)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[0.9375rem] text-ivory/75 transition-colors duration-200 hover:text-ivory"
            >
              <WhatsAppIcon />
              {t.visit.labels.whatsapp}
            </a>
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t.footer.instagram} — @${site.instagramHandle}`}
              className="inline-flex items-center gap-2 text-[0.9375rem] text-ivory/75 transition-colors duration-200 hover:text-ivory"
            >
              <InstagramIcon className="h-4 w-4" />
              {t.footer.instagram}
            </a>
          </div>
        </div>

        <div className="border-t border-ivory/15 py-8">
          <p className="text-[0.8125rem] text-ivory/55">{t.footer.copyright}</p>
        </div>
      </Container>
    </footer>
  );
}
