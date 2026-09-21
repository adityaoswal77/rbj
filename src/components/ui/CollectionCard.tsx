import type { ReactNode } from "react";
import { Placeholder } from "./Placeholder";

type CollectionCardProps = {
  title: ReactNode;
  description: ReactNode;
  imageLabel: string;
};

/** One collection tile: photograph, title, single line of description. */
export function CollectionCard({ title, description, imageLabel }: CollectionCardProps) {
  return (
    <article className="group flex flex-col">
      <div className="overflow-hidden">
        <Placeholder
          label={imageLabel}
          aspect="aspect-[4/3]"
          className="transition-transform duration-500 ease-out group-hover:scale-[1.02]"
        />
      </div>
      <h3 className="mt-6 font-display text-2xl leading-snug font-normal text-maroon md:text-[1.75rem]">
        {title}
      </h3>
      <p className="mt-3 max-w-[44ch] text-[0.9375rem] leading-relaxed text-charcoal-soft">
        {description}
      </p>
    </article>
  );
}
