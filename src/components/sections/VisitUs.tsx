"use client";

import type { ReactNode } from "react";
import { useLang } from "@/components/LanguageProvider";
import { Button } from "@/components/ui/Button";
import { ClockIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { Placeholder } from "@/components/ui/Placeholder";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { addressLines, phoneDisplay, site, telHref, whatsappHref } from "@/lib/site";

function DetailRow({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex gap-5 border-t border-line py-6">
      <span className="mt-0.5 shrink-0 text-gold">{icon}</span>
      <div>
        <h3 className="eyebrow text-charcoal-soft">{label}</h3>
        <div className="mt-2 text-[0.9375rem] leading-relaxed text-charcoal">{children}</div>
      </div>
    </div>
  );
}

export function VisitUs() {
  const { t } = useLang();

  return (
    <Section id="visit" className="bg-ivory-deep">
      <SectionHeading
        eyebrow={t.visit.eyebrow}
        title={t.visit.title}
        intro={t.visit.intro}
      />

      <div className="mt-16 grid gap-12 md:mt-20 md:grid-cols-2 md:gap-20">
        <Placeholder label={t.visit.imageLabel} aspect="aspect-[4/3]" />

        <div className="flex flex-col">
          <DetailRow icon={<PinIcon />} label={t.visit.labels.address}>
            <address className="not-italic">
              {addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </DetailRow>

          <DetailRow icon={<ClockIcon />} label={t.visit.labels.hours}>
            {t.visit.hours.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </DetailRow>

          <DetailRow icon={<PhoneIcon />} label={t.visit.labels.phone}>
            <a href={telHref} className="transition-colors duration-200 hover:text-maroon">
              {phoneDisplay}
            </a>
          </DetailRow>

          <DetailRow icon={<WhatsAppIcon />} label={t.visit.labels.whatsapp}>
            <a
              href={whatsappHref(t.cta.whatsappGeneral)}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200 hover:text-maroon"
            >
              {phoneDisplay}
            </a>
          </DetailRow>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href={site.mapLink} target="_blank" rel="noopener noreferrer">
              {t.cta.seeOnMap}
            </Button>
            <Button
              href={whatsappHref(t.cta.whatsappGeneral)}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
            >
              <WhatsAppIcon />
              {t.cta.whatsappUs}
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-16 md:mt-20">
        {/* The placeholder sits underneath, so a blocked or slow map never
            leaves a blank rectangle. */}
        <div className="relative aspect-[4/3] w-full md:aspect-[21/9]">
          <Placeholder label={t.visit.mapLabel} fill />
          {site.mapEmbedUrl && (
            <iframe
              src={site.mapEmbedUrl}
              title={t.visit.mapLabel}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0"
            />
          )}
        </div>
      </div>
    </Section>
  );
}
