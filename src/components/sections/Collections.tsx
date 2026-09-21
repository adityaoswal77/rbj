import { CollectionCard } from "@/components/ui/CollectionCard";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { T, en, mr } from "@/components/T";

export function Collections() {
  return (
    <Section id="collections">
      <div className="grid gap-8 md:grid-cols-12 md:items-end">
        <SectionHeading
          eyebrow={<T en={en.collections.eyebrow} mr={mr.collections.eyebrow} />}
          title={<T en={en.collections.title} mr={mr.collections.title} />}
          className="md:col-span-6"
        />
        <p className="max-w-[46ch] text-base leading-relaxed text-charcoal-soft md:col-span-5 md:col-start-8">
          <T en={en.collections.intro} mr={mr.collections.intro} />
        </p>
      </div>

      <div className="mt-16 grid gap-x-10 gap-y-16 md:mt-24 md:grid-cols-2">
        {en.collections.items.map((item, i) => (
          <CollectionCard
            key={item.id}
            title={<T en={item.title} mr={mr.collections.items[i].title} />}
            description={
              <T en={item.description} mr={mr.collections.items[i].description} />
            }
            imageLabel={item.imageLabel}
          />
        ))}
      </div>
    </Section>
  );
}
