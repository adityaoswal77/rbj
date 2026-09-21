# Rajbhi Jewellers

Single-page brand site for Rajbhi Jewellers — a family-run jewellery shop in
Saswad, Dist. Pune, trading since 1968.

Online presence only: no cart, no prices, no checkout. The page exists to build
trust and send people to the shop or to WhatsApp.

**Live:** rajbhijewellers.com · **Hosting:** Cloudflare Workers (static assets)

## Stack

| | |
| --- | --- |
| Framework | Next.js 16, App Router, `output: "export"` |
| Styling | Tailwind CSS v4 (`@theme` tokens in `globals.css`) |
| Type | Cormorant Garamond + Inter · Tiro Devanagari Marathi + Noto Sans Devanagari |
| Hosting | Cloudflare Workers Static Assets |
| Runtime dependencies | none beyond React and Next |

The whole site builds to plain HTML, CSS and JS. Nothing runs on a server.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export into ./out
npm run preview    # build, then serve through Cloudflare's local runtime
npm run deploy     # build, then push live
```

## Where things are

```
src/
  app/
    layout.tsx        fonts, metadata, JSON-LD, pre-paint language script
    page.tsx          section order, nothing else
    globals.css       palette, type and spacing tokens
  components/
    Header.tsx        sticky nav, language toggle, mobile menu
    LanguageProvider.tsx
    sections/         one file per section of the page
    ui/               Button, SectionHeading, CollectionCard, Placeholder, Section
  lib/
    site.ts           every real-world detail — phone, address, links
    content.ts        every word on the page, English and Marathi
```

Two rules keep it easy to maintain:

1. **No text is hard-coded in a component.** It all comes from `content.ts`.
2. **No contact detail appears twice.** It all comes from `site.ts`.

## Design system

Defined once in `src/app/globals.css` under `@theme`:

- **Ivory** `#FAF7F2` background · **Maroon** `#5A1A1F` primary ·
  **Antique gold** `#B08D57` accent · **Charcoal** `#2B2B2B` text
- Spacing on an 8px grid throughout; sections are 80px tall on mobile, 128px from
  `md` up, via the `<Section>` component
- Reusable pieces: `Button` (primary / outline / quiet), `SectionHeading`,
  `CollectionCard`, `Placeholder`, `Section` + `Container`

## The language toggle

The header switches between English and मराठी. **Both languages are rendered into
the static HTML**; a CSS rule shows one and hides the other, keyed off a
`data-lang` attribute on `<html>`:

```css
html[data-lang="en"] [data-lang-for="mr"],
html[data-lang="mr"] [data-lang-for="en"] { display: none; }
```

Three things follow from that, and they are the reason it is built this way:

- **The switch is instant and happens before first paint.** A small inline script
  in `<head>` reads the saved choice and sets `data-lang` before anything is
  drawn, so a returning Marathi visitor sees Marathi immediately — verified with
  JavaScript entirely disabled.
- **The page needs no JavaScript to be correct.** Because switching is pure CSS,
  every section is a Server Component. `Header` and `LanguageToggle` are the only
  client components, and they exist for the sticky-scroll state and the toggle
  click — not for the copy.
- **The Marathi copy is in the HTML**, so it can be read by search engines and by
  anyone whose JavaScript fails.

Setting `data-lang` also swaps the type system: `globals.css` redefines
`--font-display` and `--font-body` under `html[data-lang="mr"]`, moving headings
from Cormorant Garamond to Tiro Devanagari Marathi and body text from Inter to
Noto Sans Devanagari, and dropping the uppercase and wide letter-spacing that
Devanagari should not have.

**Keeping it that way:** the dictionary in `content.ts` must never be imported by
a client component — that would pull every word on the site back into the
JavaScript bundle. `Header` receives the handful of strings it needs as props
from `page.tsx`, and the wordmark lives separately in `lib/brand.ts`.

### What it costs

| | before | after |
| --- | --- | --- |
| HTML (gzipped) | ~12 KB | 18.3 KB |
| JavaScript | 616 KB raw / 177 KB gzip | 576 KB raw / 169 KB gzip |
| Marathi in crawlable HTML | no | yes |
| Fonts preloaded, English visit | 6 | 2 |

The JavaScript barely moved, and that is worth understanding: the remaining
bundle is React plus the App Router runtime, which ships as long as *any* client
component exists. Removing it entirely would mean rewriting the sticky header and
the toggle in plain JavaScript and dropping React from the page — a different
project. What the refactor actually bought was the Marathi HTML and the
flash-free switch, not the bundle.

### The trade-off

One URL now serves two languages. That keeps the toggle instant and avoids a
second page to maintain, but it is weaker for search than separate `/` and `/mr/`
routes would be, because a page mixing two languages muddies Google's language
detection. If Marathi search traffic ever matters commercially, see `TODO.md`.

## Documentation

| File | For |
| --- | --- |
| `CONTENT.md` | Changing text, details, hours and photographs |
| `DEPLOY.md` | Putting it live on Cloudflare, and the custom domain |
| `TODO.md` | What is still outstanding, and known limitations |
