# Rajbhi Jewellers

Single-page brand site for Rajbhi Jewellers, Saswad, Dist. Pune. Online presence
only — no cart, no prices, no checkout. The job of the page is to build trust and
push people to the store or to WhatsApp.

Next.js (App Router) + Tailwind CSS v4, exported as a static site and deployed to
Cloudflare.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export into ./out
```

## Editing the store details

Everything real-world lives in **`src/lib/site.ts`** — phone, WhatsApp, address,
opening year, Instagram, map links. Change it there and the header, hero, Visit Us
section, footer and structured data all follow.

Lines marked `TODO` are still placeholders:

- `address.line1` — street / shop number
- `address.line2` — optional landmark line (leave `""` to skip it)
- `address.pin` — confirm the PIN code
- opening hours live in `src/lib/content.ts` under `visit.hours`, in both languages

## Copy and languages

All text is in **`src/lib/content.ts`**, as one object per language (`en`, `mr`).
Nothing is hard-coded in components, so a copy change is a one-line edit.

The toggle sets `data-lang` on `<html>`, which swaps both the palette-level font
variables (Cormorant Garamond / Inter → Tiro Devanagari Marathi / Noto Sans
Devanagari) and the copy. The choice is remembered in `localStorage` and applied
before first paint, so a returning Marathi visitor never sees a flash of English.
The exported HTML is English, which is what search engines index.

`{years}` inside the About copy is replaced at render time from
`site.establishedYear`, so "Serving Saswad for 58 years" never goes stale.

## Photographs

Every image is currently a grey `<Placeholder />` block that reserves the right
aspect ratio. To drop in real photographs, replace each `<Placeholder …/>` with
`next/image` and keep the same ratio:

| Where | Component | Ratio |
| --- | --- | --- |
| Hero | `sections/Hero.tsx` | fills the section |
| Collections (×4) | `ui/CollectionCard.tsx` | 4:3 |
| Made to order | `sections/MadeToOrder.tsx` | 4:5 |
| Instagram (×6) | `sections/Instagram.tsx` | 1:1 |
| Store photo | `sections/VisitUs.tsx` | 4:3 |

Note that `next.config.ts` sets `images.unoptimized` because a static export has no
image optimiser — size and compress the photographs before committing them.

## Design system

- **Palette and type tokens**: `src/app/globals.css` (`@theme`)
- **Buttons**: `src/components/ui/Button.tsx` — `primary`, `outline`, `quiet`
- **Section headings**: `src/components/ui/SectionHeading.tsx`
- **Collection cards**: `src/components/ui/CollectionCard.tsx`
- **Section shell and container**: `src/components/ui/Section.tsx` — 80px vertical
  rhythm on mobile, 128px from `md` up, all spacing on an 8px grid

## Deploying to Cloudflare

The build produces a plain static `out/` directory. Two ways to ship it:

**Dashboard (no local tooling).** Cloudflare dashboard → Workers & Pages → Create →
connect this repository, then:

- Build command: `npm run build`
- Output directory: `out`

Add `rajbhijewellers.com` under Custom domains once the first deploy is green.

**CLI.** `wrangler.jsonc` is already configured:

```bash
npm run build
npx wrangler deploy
```
