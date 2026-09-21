import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { Placeholder } from "@/components/ui/Placeholder";
import { T, en, mr } from "@/components/T";
import { site, whatsappHref } from "@/lib/site";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[92svh] items-end overflow-hidden md:min-h-[88vh]"
    >
      <Placeholder label={en.hero.imageLabel} fill />
      {/* Flat scrim, not a heavy gradient — just enough for the type to read. */}
      <div aria-hidden="true" className="absolute inset-0 bg-maroon/70" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-maroon-deep/40 to-transparent"
      />

      <Container className="relative pb-24 pt-36 md:pb-32 md:pt-44">
        <div className="max-w-[46rem]">
          <span className="eyebrow text-gold-soft">
            <T en={en.hero.eyebrow} mr={mr.hero.eyebrow} />
          </span>
          <h1 className="mt-6 font-display text-[3rem] leading-[1.05] font-light tracking-[-0.015em] text-ivory sm:text-[4rem] md:text-[5rem]">
            <T en={en.hero.title} mr={mr.hero.title} />
          </h1>
          <span aria-hidden="true" className="mt-8 block h-px w-16 bg-gold-soft/60" />
          <p className="mt-8 max-w-[34ch] font-display text-xl leading-relaxed font-light text-ivory/85 md:text-2xl">
            <T en={en.hero.tagline} mr={mr.hero.tagline} />
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button href={site.mapLink} target="_blank" rel="noopener noreferrer">
              <T en={en.cta.visitStore} mr={mr.cta.visitStore} />
            </Button>
            {/* Two links, because the pre-filled message differs by language. */}
            <Button
              data-lang-for="en"
              href={whatsappHref(en.cta.whatsappGeneral)}
              target="_blank"
              rel="noopener noreferrer"
              variant="quiet"
            >
              <WhatsAppIcon />
              {en.cta.whatsappUs}
            </Button>
            <Button
              data-lang-for="mr"
              href={whatsappHref(mr.cta.whatsappGeneral)}
              target="_blank"
              rel="noopener noreferrer"
              variant="quiet"
            >
              <WhatsAppIcon />
              {mr.cta.whatsappUs}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
