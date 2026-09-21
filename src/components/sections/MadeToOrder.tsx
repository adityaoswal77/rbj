import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { Placeholder } from "@/components/ui/Placeholder";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Only, T, en, mr } from "@/components/T";
import { whatsappHref } from "@/lib/site";

export function MadeToOrder() {
  return (
    <Section className="bg-ivory-deep">
      <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
        <Placeholder label={en.madeToOrder.imageLabel} aspect="aspect-[4/5]" />

        <div>
          <SectionHeading
            eyebrow={<T en={en.madeToOrder.eyebrow} mr={mr.madeToOrder.eyebrow} />}
            title={<T en={en.madeToOrder.title} mr={mr.madeToOrder.title} />}
          />
          <p className="mt-8 max-w-[52ch] text-base leading-relaxed text-charcoal-soft">
            <T en={en.madeToOrder.body} mr={mr.madeToOrder.body} />
          </p>

          <div className="mt-10 border-t border-line pt-8">
            {(["en", "mr"] as const).map((lang) => (
              <Only key={lang} lang={lang} as="ul" className="flex flex-col gap-4">
                {(lang === "en" ? en : mr).madeToOrder.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-4 text-[0.9375rem] text-charcoal"
                  >
                    <span aria-hidden="true" className="mt-2.5 block h-px w-5 shrink-0 bg-gold" />
                    {point}
                  </li>
                ))}
              </Only>
            ))}
          </div>

          <Button
            data-lang-for="en"
            href={whatsappHref(en.cta.whatsappCustom)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10"
          >
            <WhatsAppIcon />
            {en.cta.whatsappEnquiry}
          </Button>
          <Button
            data-lang-for="mr"
            href={whatsappHref(mr.cta.whatsappCustom)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10"
          >
            <WhatsAppIcon />
            {mr.cta.whatsappEnquiry}
          </Button>
        </div>
      </div>
    </Section>
  );
}
