import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { T, en, mr } from "@/components/T";

// Next adds `noindex` to 404 responses on its own.
export const metadata: Metadata = { title: en.notFound.eyebrow };

/**
 * Served for every unknown URL (out/404.html, via `not_found_handling`).
 * Replaces Next's bare default so an old or mistyped link still lands somewhere
 * with the shop's name on it and a way back to the page that matters.
 */
export default function NotFound() {
  return (
    <main id="main" className="flex flex-1 items-center">
      <Section className="w-full">
        <Link href="/" className="inline-block">
          <Logo />
        </Link>
        <SectionHeading
          as="h1"
          eyebrow={<T en={en.notFound.eyebrow} mr={mr.notFound.eyebrow} />}
          title={<T en={en.notFound.title} mr={mr.notFound.title} />}
          intro={<T en={en.notFound.body} mr={mr.notFound.body} />}
          className="mt-16"
        />
        <Button href="/" className="mt-10">
          <T en={en.notFound.home} mr={mr.notFound.home} />
        </Button>
      </Section>
    </main>
  );
}
