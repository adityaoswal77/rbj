"use client";

import { useLang } from "@/components/LanguageProvider";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { Placeholder } from "@/components/ui/Placeholder";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { whatsappHref } from "@/lib/site";

export function MadeToOrder() {
  const { t } = useLang();

  return (
    <Section className="bg-ivory-deep">
      <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
        <Placeholder label={t.madeToOrder.imageLabel} aspect="aspect-[4/5]" />

        <div>
          <SectionHeading eyebrow={t.madeToOrder.eyebrow} title={t.madeToOrder.title} />
          <p className="mt-8 max-w-[52ch] text-base leading-relaxed text-charcoal-soft">
            {t.madeToOrder.body}
          </p>

          <ul className="mt-10 flex flex-col gap-4 border-t border-line pt-8">
            {t.madeToOrder.points.map((point) => (
              <li key={point} className="flex items-start gap-4 text-[0.9375rem] text-charcoal">
                <span
                  aria-hidden="true"
                  className="mt-2.5 block h-px w-5 shrink-0 bg-gold"
                />
                {point}
              </li>
            ))}
          </ul>

          <Button
            href={whatsappHref(t.cta.whatsappCustom)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10"
          >
            <WhatsAppIcon />
            {t.cta.whatsappEnquiry}
          </Button>
        </div>
      </div>
    </Section>
  );
}
