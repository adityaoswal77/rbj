"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/components/LanguageProvider";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { CloseIcon, MenuIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { Logo } from "@/components/ui/Logo";
import { whatsappHref } from "@/lib/site";

export function Header() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page behind the mobile menu.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    { href: "#collections", label: t.nav.collections },
    { href: "#about", label: t.nav.about },
    { href: "#visit", label: t.nav.visit },
  ];

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
          <a href="#top" aria-label={t.brand.name} className="shrink-0">
            <Logo tone={tone} />
          </a>

          <nav className="hidden items-center gap-10 lg:flex" aria-label={t.brand.name}>
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative text-[0.9375rem] transition-colors duration-200 after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-full ${
                  solid ? "text-charcoal hover:text-maroon" : "text-ivory/85 hover:text-ivory"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-8 lg:flex">
            <LanguageToggle tone={tone} />
            <Button
              href={whatsappHref(t.cta.whatsappGeneral)}
              target="_blank"
              rel="noopener noreferrer"
              variant={solid ? "primary" : "quiet"}
              size="sm"
            >
              <WhatsAppIcon />
              {t.cta.whatsappUs}
            </Button>
          </div>

          <div className="flex items-center gap-4 lg:hidden">
            <LanguageToggle tone={tone} />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? t.nav.close : t.nav.menu}
              aria-expanded={open}
              className={`flex h-10 w-10 cursor-pointer items-center justify-center transition-colors duration-200 ${
                solid ? "text-maroon" : "text-ivory"
              }`}
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </Container>

      {open && (
        <div className="border-t border-line bg-ivory lg:hidden">
          <Container>
            <nav className="flex flex-col py-6" aria-label={t.nav.menu}>
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-line py-4 font-display text-2xl text-maroon"
                >
                  {link.label}
                </a>
              ))}
              <Button
                href={whatsappHref(t.cta.whatsappGeneral)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 w-full"
              >
                <WhatsAppIcon />
                {t.cta.whatsappUs}
              </Button>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
