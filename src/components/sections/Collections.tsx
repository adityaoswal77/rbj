"use client";

import { useLang } from "@/components/LanguageProvider";
import { CollectionCard } from "@/components/ui/CollectionCard";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Collections() {
  const { t } = useLang();

  return (
    <Section id="collections">
      <div className="grid gap-8 md:grid-cols-12 md:items-end">
        <SectionHeading
          eyebrow={t.collections.eyebrow}
          title={t.collections.title}
          className="md:col-span-6"
        />
        <p className="max-w-[46ch] text-base leading-relaxed text-charcoal-soft md:col-span-5 md:col-start-8">
          {t.collections.intro}
        </p>
      </div>

      <div className="mt-16 grid gap-x-10 gap-y-16 md:mt-24 md:grid-cols-2">
        {t.collections.items.map((item) => (
          <CollectionCard
            key={item.id}
            title={item.title}
            description={item.description}
            imageLabel={item.imageLabel}
          />
        ))}
      </div>
    </Section>
  );
}
