import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "outline" | "quiet";
type Size = "md" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-body " +
  "text-[0.8125rem] tracking-[0.08em] uppercase transition-colors duration-200 " +
  "border";

const variants: Record<Variant, string> = {
  primary:
    "bg-maroon text-ivory border-maroon hover:bg-maroon-deep hover:border-maroon-deep",
  outline:
    "bg-transparent text-maroon border-maroon/40 hover:border-maroon hover:bg-maroon hover:text-ivory",
  quiet:
    "bg-transparent text-ivory border-ivory/45 hover:bg-ivory hover:text-maroon hover:border-ivory",
};

const sizes: Record<Size, string> = {
  md: "h-12 px-8",
  sm: "h-10 px-6 text-[0.75rem]",
};

/** Marathi is not an uppercase script — drop the caps and tight tracking. */
const devanagari = "mr:normal-case mr:tracking-[0.02em] mr:text-[0.875rem]";

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
  /** Required: an <a> without an href is not focusable or keyboard-operable. */
  href: string;
} & Omit<ComponentPropsWithoutRef<"a">, "className" | "href">;

/** Every call to action on the site renders through this one component. */
export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  return (
    <a
      className={`${base} ${variants[variant]} ${sizes[size]} ${devanagari} ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
}
