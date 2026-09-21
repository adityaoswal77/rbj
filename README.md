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

The header switches between English and मराठी. It works by setting `data-lang` on
`<html>`, which does two things at once:

- **Swaps the copy** — `LanguageProvider` reads the attribute and serves the
  matching block from `content.ts`
- **Swaps the type system** — `globals.css` redefines `--font-display` and
  `--font-body` under `html[data-lang="mr"]`, so headings move from Cormorant
  Garamond to Tiro Devanagari Marathi and body text from Inter to Noto Sans
  Devanagari. Devanagari also drops the uppercase and wide letter-spacing used on
  English labels, which that script should not have.

The choice is saved in `localStorage`. A small inline script in `<head>` applies
it to `<html>` before the first paint, so the right fonts and `lang` attribute are
in place immediately — but **the copy itself only switches once React hydrates**.
A returning Marathi visitor briefly sees English words in the Marathi typeface.

The exported HTML is English, which is what search engines index; the Marathi copy
exists only in the JavaScript bundle. Both of those are fixable together — see
"Render both languages into the HTML" in `TODO.md`.

## Documentation

| File | For |
| --- | --- |
| `CONTENT.md` | Changing text, details, hours and photographs |
| `DEPLOY.md` | Putting it live on Cloudflare, and the custom domain |
| `TODO.md` | What is still outstanding, and known limitations |
