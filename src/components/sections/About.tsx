import { CraftIcon, HallmarkIcon, YearsIcon } from "@/components/ui/Icons";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { T, en, mr } from "@/components/T";

const ICONS = {
  hallmark: HallmarkIcon,
  craft: CraftIcon,
  years: YearsIcon,
} as const;

export function About() {
  return (
    <Section id="about">
      <div className="grid gap-12 md:grid-cols-12 md:gap-20">
        <SectionHeading
          eyebrow={<T en={en.about.eyebrow} mr={mr.about.eyebrow} />}
          title={<T en={en.about.title} mr={mr.about.title} />}
          className="md:col-span-5"
        />
        <p className="max-w-[62ch] text-base leading-[1.9] text-charcoal-soft md:col-span-7">
          <T en={en.about.body} mr={mr.about.body} />
        </p>
      </div>

      <ul className="mt-16 grid gap-10 border-t border-line pt-12 md:mt-24 md:grid-cols-3 md:gap-12 md:pt-16">
        {en.about.trust.map((point, i) => {
          const Icon = ICONS[point.icon];
          return (
            <li key={point.icon} className="flex flex-col">
              <Icon className="h-7 w-7 text-gold" />
              <h3 className="mt-6 font-display text-xl font-normal text-maroon md:text-2xl">
                <T en={point.title} mr={mr.about.trust[i].title} />
              </h3>
              <p className="mt-3 max-w-[36ch] text-[0.9375rem] leading-relaxed text-charcoal-soft">
                <T en={point.description} mr={mr.about.trust[i].description} />
              </p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
