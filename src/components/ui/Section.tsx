import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Adds a hairline rule at the top of the section. */
  divided?: boolean;
};

/** Consistent vertical rhythm: 80px on mobile, 128px from md up. */
export function Section({ id, children, className = "", divided = false }: SectionProps) {
  return (
    <section
      id={id}
      className={`py-20 md:py-32 ${divided ? "border-t border-line" : ""} ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}

/** 1280px content width inside the 1440px frame; 24px gutters on mobile. */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1280px] px-6 md:px-10 ${className}`}>
      {children}
    </div>
  );
}
