import { InstagramIcon } from "@/components/ui/Icons";
import { Placeholder } from "@/components/ui/Placeholder";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { T, en, mr } from "@/components/T";
import { site } from "@/lib/site";
import { toDevanagariDigits } from "@/lib/content";

const TILES = [1, 2, 3, 4, 5, 6];

export function Instagram() {
  return (
    <Section divided>
      <SectionHeading
        eyebrow={<T en={en.instagram.eyebrow} mr={mr.instagram.eyebrow} />}
        title={<T en={en.instagram.title} mr={mr.instagram.title} />}
        intro={<T en={en.instagram.intro} mr={mr.instagram.intro} />}
        align="center"
      />

      <div className="mt-16 grid grid-cols-2 gap-2 md:mt-20 md:grid-cols-3 md:gap-4">
        {TILES.map((n) => (
          <a
            key={n}
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block overflow-hidden"
          >
            {/* The images are decorative, so the link is named by this instead. */}
            <span className="sr-only">
              <T
                en={`${en.instagram.imageLabel} ${n} — @${site.instagramHandle}`}
                mr={`${mr.instagram.imageLabel} ${toDevanagariDigits(n)} — @${site.instagramHandle}`}
              />
            </span>
            <Placeholder label={`${en.instagram.imageLabel} ${n}`} aspect="aspect-square" compact />
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
          className="eyebrow inline-flex min-h-11 items-center gap-2 text-gold-text transition-colors duration-200 hover:text-maroon"
        >
          <InstagramIcon className="h-4 w-4" />
          <T en={en.cta.followUs} mr={mr.cta.followUs} />
        </a>
      </div>
    </Section>
  );
}
