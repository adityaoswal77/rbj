"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { CloseIcon, MenuIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { Logo } from "@/components/ui/Logo";
import type { Lang } from "@/lib/content";

type Pair = Record<Lang, string>;

/**
 * Only the handful of strings the header needs, passed down from the server.
 * Importing the dictionary directly would drag every word on the site into the
 * client bundle, which is exactly what the rest of the page avoids.
 */
export type HeaderCopy = {
  nav: { href: string; label: Pair }[];
  menu: Pair;
  close: Pair;
  whatsappLabel: Pair;
  whatsappHref: Pair;
  brandName: string;
};

const LANGS: Lang[] = ["en", "mr"];

export function Header({ copy }: { copy: HeaderCopy }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The menu and its toggle are hidden from `lg` up. Without this, resizing
  // while it is open strands `body { overflow: hidden }` with no way to undo it.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 64rem)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Escape closes it, the way any dismissible overlay should.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Lock the page behind the mobile menu.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Over the hero the header is transparent with ivory type; once scrolled it
  // settles onto an ivory bar with a hairline.
  const solid = scrolled || open;
  const tone = solid ? "dark" : "light";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "border-b border-line bg-ivory/95 backdrop-blur-sm" : "border-b border-transparent"
      }`}
    >
      <Container>
        <div className="flex h-20 items-center justify-between gap-6 md:h-24">
          <a href="#top" aria-label={copy.brandName} className="shrink-0">
            <Logo tone={tone} />
          </a>

          <nav className="hidden items-center gap-10 lg:flex" aria-label="Main">
            {copy.nav.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative text-[0.9375rem] transition-colors duration-200 after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-full ${
                  solid ? "text-charcoal hover:text-maroon" : "text-ivory/85 hover:text-ivory"
                }`}
              >
                {LANGS.map((l) => (
                  <span key={l} data-lang-for={l}>
                    {link.label[l]}
                  </span>
                ))}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-8 lg:flex">
            <LanguageToggle tone={tone} />
            {LANGS.map((l) => (
              <Button
                key={l}
                data-lang-for={l}
                href={copy.whatsappHref[l]}
                target="_blank"
                rel="noopener noreferrer"
                variant={solid ? "primary" : "quiet"}
                size="sm"
              >
                <WhatsAppIcon />
                {copy.whatsappLabel[l]}
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-4 lg:hidden">
            <LanguageToggle tone={tone} />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? copy.close.en : copy.menu.en}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className={`flex h-11 w-11 cursor-pointer items-center justify-center transition-colors duration-200 ${
                solid ? "text-maroon" : "text-ivory"
              }`}
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </Container>

      {open && (
        <>
          <div id="mobile-menu" className="border-t border-line bg-ivory lg:hidden">
            <Container>
              <nav className="flex flex-col py-6" aria-label="Main">
                {copy.nav.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="border-b border-line py-4 font-display text-2xl text-maroon"
                  >
                    {LANGS.map((l) => (
                      <span key={l} data-lang-for={l}>
                        {link.label[l]}
                      </span>
                    ))}
                  </a>
                ))}
                {LANGS.map((l) => (
                  <Button
                    key={l}
                    data-lang-for={l}
                    href={copy.whatsappHref[l]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 w-full"
                  >
                    <WhatsAppIcon />
                    {copy.whatsappLabel[l]}
                  </Button>
                ))}
              </nav>
            </Container>
          </div>
          {/* Tapping away is the natural dismissal gesture on a phone. */}
          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            onClick={() => setOpen(false)}
            className="fixed inset-0 -z-10 cursor-default lg:hidden"
          />
        </>
      )}
    </header>
  );
}
