# Editing the site

Everything you are likely to want to change lives in two files. Neither needs
design or layout work — change the text, save, and the page follows.

## 1. Store details — `src/lib/site.ts`

Phone, WhatsApp, address, Instagram, map links, the year the shop opened. Change
it here once and it updates everywhere it appears: the header button, the hero
buttons, the Visit Us panel, the footer, and the data Google reads for search
results.

```ts
phone: "7083091096",          // digits only, no +91
whatsapp: "917083091096",     // with country code, no +
establishedYear: 1968,
```

`establishedYear` is the only place the age of the shop is written down. "Serving
Saswad for 58 years" is calculated from it, so it will still be right next year
without anyone touching it.

## 2. All the words — `src/lib/content.ts`

Two blocks: `const en` (English) and `const mr` (Marathi). They mirror each other
exactly. To change a line of text, find it in `en` and change the matching line in
`mr`.

```ts
tagline: "Trusted jewellers of Saswad",     // in the en block
tagline: "सासवडचे विश्वासू सराफ",              // the same line in the mr block
```

Opening hours are here rather than in `site.ts`, because they need writing out in
both languages:

```ts
hours: ["Monday – Saturday: 10:30 am – 8:30 pm", "Sunday: 10:30 am – 2:00 pm"],
hours: ["सोमवार – शनिवार: सकाळी १०:३० – रात्री ८:३०", "रविवार: सकाळी १०:३० – दुपारी २:००"],
```

`{years}` inside the About text is replaced automatically with the number of years
the shop has been open. Leave it as `{years}` — don't type a number.

### Adding or removing a collection

The four collection cards come from the `items` list in the `collections` block.
Add or remove an entry in **both** `en` and `mr`, keeping the `id` the same in
each. The grid re-flows on its own.

## 3. Photographs

Right now every photograph is a grey placeholder block that holds the correct
shape. To put a real photograph in, drop the file into `public/` and swap the
`<Placeholder />` for a `next/image`:

```tsx
import Image from "next/image";

<Image src="/gold-jewellery.jpg" alt="" width={1200} height={900} />
```

Keep to these shapes so nothing shifts:

| Where | File | Shape |
| --- | --- | --- |
| Hero (top of page) | `components/sections/Hero.tsx` | fills the screen |
| Collection cards (×4) | `components/ui/CollectionCard.tsx` | 4:3, landscape |
| Made to order | `components/sections/MadeToOrder.tsx` | 4:5, portrait |
| Instagram tiles (×6) | `components/sections/Instagram.tsx` | square |
| Store photograph | `components/sections/VisitUs.tsx` | 4:3, landscape |

Because the site is exported as plain files, there is no image optimiser running
on the server — **resize and compress photographs before adding them**. Aim for
under 300 KB each. Anything straight off a phone camera will be several megabytes
and will make the page slow on mobile data.

Always write something in `alt=""` describing the photograph, unless it is purely
decorative.

## 4. Seeing your changes

```bash
npm run dev
```

Then open http://localhost:3000. The page reloads as you save.

When it looks right, see `DEPLOY.md` to put it live.
