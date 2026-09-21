"use client";

import { useLang } from "@/components/LanguageProvider";
import { InstagramIcon } from "@/components/ui/Icons";
import { Placeholder } from "@/components/ui/Placeholder";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";

const TILES = [1, 2, 3, 4, 5, 6];

export function Instagram() {
  const { t } = useLang();

  return (
    <Section divided>
      <SectionHeading
        eyebrow={t.instagram.eyebrow}
        title={t.instagram.title}
        intro={t.instagram.intro}
        align="center"
      />

      <div className="mt-16 grid grid-cols-2 gap-2 md:mt-20 md:grid-cols-3 md:gap-4">
        {TILES.map((n) => (
          <a
            key={n}
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${t.instagram.imageLabel} ${n} — @${site.instagramHandle}`}
            className="group relative block overflow-hidden"
          >
            <Placeholder
              label={`${t.instagram.imageLabel} ${n}`}
              aspect="aspect-square"
              compact
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 flex items-center justify-center bg-maroon/0 text-ivory opacity-0 transition-all duration-300 group-hover:bg-maroon/55 group-hover:opacity-100"
            >
              <InstagramIcon className="h-7 w-7" />
            </span>
          </a>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <a
          href={site.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="eyebrow inline-flex items-center gap-2 text-maroon transition-colors duration-200 hover:text-gold"
        >
          <InstagramIcon className="h-4 w-4" />
          {t.cta.followUs}
        </a>
      </div>
    </Section>
  );
}
