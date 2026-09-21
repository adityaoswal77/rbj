type IconProps = { className?: string };

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function WhatsAppIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.33 4.95L2 22l5.3-1.38a9.86 9.86 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.64-1.03-5.13-2.9-7A9.82 9.82 0 0 0 12.04 2Zm0 1.82c2.16 0 4.19.84 5.72 2.37a8.03 8.03 0 0 1 2.37 5.72c0 4.46-3.63 8.08-8.09 8.08a8.06 8.06 0 0 1-4.11-1.13l-.3-.17-3.05.8.81-2.98-.19-.31a8.02 8.02 0 0 1-1.23-4.29c0-4.46 3.63-8.09 8.07-8.09Zm-2.5 4.02c-.19 0-.5.07-.76.35-.26.29-1 .98-1 2.38s1.02 2.76 1.17 2.95c.14.19 1.99 3.04 4.83 4.15 2.36.93 2.84.75 3.35.7.51-.05 1.65-.67 1.88-1.33.23-.65.23-1.21.16-1.33-.07-.12-.26-.19-.54-.33-.29-.14-1.69-.84-1.95-.93-.26-.1-.45-.14-.64.14-.19.29-.74.93-.9 1.12-.17.19-.33.21-.62.07-.28-.14-1.2-.44-2.29-1.41a8.6 8.6 0 0 1-1.58-1.97c-.17-.28-.02-.44.12-.58.13-.13.29-.33.43-.5.15-.17.19-.29.29-.48.09-.19.05-.36-.03-.5-.07-.14-.63-1.55-.88-2.12-.21-.5-.43-.5-.63-.51h-.53Z" />
    </svg>
  );
}

export function InstagramIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Trust point: BIS hallmark — a shield with a check. */
export function HallmarkIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" {...stroke}>
      <path d="M16 3.5 27 7v9.2c0 6-4.4 10.8-11 12.3-6.6-1.5-11-6.3-11-12.3V7l11-3.5Z" />
      <path d="m11.2 15.8 3.4 3.4 6.4-6.6" />
    </svg>
  );
}

/** Trust point: custom craftsmanship — a jeweller's hammer over a ring. */
export function CraftIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" {...stroke}>
      <circle cx="13" cy="21" r="7" />
      <path d="M19.6 4.6 27.4 12.4" />
      <path d="M24.7 2.3 29.7 7.3 26.6 10.4 21.6 5.4Z" />
      <path d="m22.4 9.6-5.8 5.8" />
    </svg>
  );
}

/** Trust point: years of service — a storefront. */
export function YearsIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" {...stroke}>
      <path d="M4 12.5h24V27a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V12.5Z" />
      <path d="M6 5h20l2 7.5H4L6 5Z" />
      <path d="M12.5 28v-8h7v8" />
    </svg>
  );
}

export function PhoneIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <path d="M6.2 3.5h3l1.5 4-2 1.4a12.5 12.5 0 0 0 6.4 6.4l1.4-2 4 1.5v3a2 2 0 0 1-2.2 2A17.2 17.2 0 0 1 4.2 5.7a2 2 0 0 1 2-2.2Z" />
    </svg>
  );
}

export function PinIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <path d="M12 21.5s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10.5" r="2.6" />
    </svg>
  );
}

export function ClockIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 6.8V12l3.4 2.2" />
    </svg>
  );
}

/** Neutral frame glyph shown inside image placeholders. */
export function FrameIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <rect x="3" y="4.5" width="18" height="15" rx="1.5" />
      <path d="m3 15.5 4.8-4.2 4 3.4 3.6-3.1L21 15.8" />
      <circle cx="9" cy="9" r="1.4" />
    </svg>
  );
}

export function MenuIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}
