import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { ClockIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { Placeholder } from "@/components/ui/Placeholder";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Only, T, en, mr } from "@/components/T";
import { addressLines, phoneDisplay, site, telHref, whatsappHref } from "@/lib/site";

function DetailRow({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex gap-5 border-t border-line py-6">
      <span className="mt-0.5 shrink-0 text-gold-text">{icon}</span>
      <div>
        <h3 className="eyebrow text-charcoal-soft">{label}</h3>
        <div className="mt-2 text-[0.9375rem] leading-relaxed text-charcoal">{children}</div>
      </div>
    </div>
  );
}

export function VisitUs() {
  return (
    <Section id="visit" className="bg-ivory-deep">
      <SectionHeading
        eyebrow={<T en={en.visit.eyebrow} mr={mr.visit.eyebrow} />}
        title={<T en={en.visit.title} mr={mr.visit.title} />}
        intro={<T en={en.visit.intro} mr={mr.visit.intro} />}
      />

      <div className="mt-16 grid gap-12 md:mt-20 md:grid-cols-2 md:gap-20">
        <Placeholder label={en.visit.imageLabel} aspect="aspect-[4/3]" />

        <div className="flex flex-col">
          <DetailRow
            icon={<PinIcon />}
            label={<T en={en.visit.labels.address} mr={mr.visit.labels.address} />}
          >
            <address className="not-italic">
              {(["en", "mr"] as const).map((lang) => (
                <Only key={lang} lang={lang}>
                  {addressLines[lang].map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </Only>
              ))}
            </address>
          </DetailRow>

          <DetailRow
            icon={<ClockIcon />}
            label={<T en={en.visit.labels.hours} mr={mr.visit.labels.hours} />}
          >
            {(["en", "mr"] as const).map((lang) => (
              <Only key={lang} lang={lang}>
                {(lang === "en" ? en : mr).visit.hours.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </Only>
            ))}
          </DetailRow>

          <DetailRow
            icon={<PhoneIcon />}
            label={<T en={en.visit.labels.phone} mr={mr.visit.labels.phone} />}
          >
            <a
              href={telHref}
              className="inline-flex min-h-11 items-center transition-colors duration-200 hover:text-maroon"
            >
              {phoneDisplay}
            </a>
          </DetailRow>

          <DetailRow
            icon={<WhatsAppIcon />}
            label={<T en={en.visit.labels.whatsapp} mr={mr.visit.labels.whatsapp} />}
          >
            {(["en", "mr"] as const).map((lang) => (
              <Only key={lang} lang={lang}>
                <a
                  href={whatsappHref((lang === "en" ? en : mr).cta.whatsappGeneral)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center transition-colors duration-200 hover:text-maroon"
                >
                  {phoneDisplay}
                </a>
              </Only>
            ))}
          </DetailRow>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href={site.mapLink} target="_blank" rel="noopener noreferrer">
              <T en={en.cta.seeOnMap} mr={mr.cta.seeOnMap} />
            </Button>
            <Button
              data-lang-for="en"
              href={whatsappHref(en.cta.whatsappGeneral)}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
            >
              <WhatsAppIcon />
              {en.cta.whatsappUs}
            </Button>
            <Button
              data-lang-for="mr"
              href={whatsappHref(mr.cta.whatsappGeneral)}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
            >
              <WhatsAppIcon />
              {mr.cta.whatsappUs}
            </Button>
          </div>
        </div>
      </div>

      {/* A facade, not an embedded map: no third-party request, no cookies, and
          on a phone the link opens the Maps app, which beats pan-and-zoom in a
          frame. The placeholder is where a screenshot of the map would go. */}
      <div className="relative mt-16 aspect-[4/3] w-full md:mt-20 md:aspect-[21/9]">
        <Placeholder label={en.visit.mapLabel} fill />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 text-center">
          <PinIcon className="h-8 w-8 text-maroon" />
          <Button href={site.mapLink} target="_blank" rel="noopener noreferrer">
            <T en={en.cta.seeOnMap} mr={mr.cta.seeOnMap} />
          </Button>
        </div>
      </div>
    </Section>
  );
}
