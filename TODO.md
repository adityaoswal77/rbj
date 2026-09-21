# Outstanding

Things the site still needs. Grouped by who can do them.

## Needed from the shop — blocking a public launch

- [ ] **Street address.** Currently a placeholder: "Main Road". Needs the real
      shop number and street, as you would write it on a card.
      → `src/lib/site.ts`, `address.line1`
- [ ] **Landmark line** (optional but worth it in Saswad, e.g. "Opposite
      Sangameshwar Temple"). Leave as `""` to skip.
      → `src/lib/site.ts`, `address.line2`
- [ ] **Confirm the PIN code.** Set to 412301 on the assumption it is Saswad town.
      → `src/lib/site.ts`, `address.pin`
- [ ] **Confirm opening hours.** Currently Mon–Sat 10:30–20:30, Sun 10:30–14:00 —
      a guess, not your actual hours. Include any weekly off or festival closures.
      → `src/lib/content.ts`, `visit.hours` in both `en` and `mr`
- [ ] **Photographs.** Every image is a grey placeholder. Needed: one hero shot,
      four collection shots (gold, silver, bridal, gemstone rings), one of a
      karigar working, one of the shopfront, and six recent Instagram posts.
      See `CONTENT.md` for the shapes and file sizes.

## Should do before launch

- [ ] **Pin the Google Map to the real listing.** The map is currently a keyless
      search embed for "Rajbhi Jewellers, Saswad", which may not land on your
      exact pin. Fix: Google Maps → your listing → Share → Embed a map → copy the
      iframe `src` → paste into `site.mapEmbedUrl`.
- [ ] **Attach the domain.** rajbhijewellers.com is registered but not yet pointed
      at the Worker. See `DEPLOY.md`.
- [ ] **Check the WhatsApp number receives messages.** Open the site on a phone
      and tap WhatsApp Us — it should open a chat with a message already typed.
- [ ] **Claim / update the Google Business Profile** and make sure the address,
      hours and phone match this site exactly. For a local shop this drives more
      visits than the website itself does.

## Worth doing

- [ ] **Marathi proofread.** The Marathi copy was written to read naturally rather
      than as a literal translation of the English. Someone who speaks it daily
      should read it once — particularly the About story and the collection
      descriptions.
- [ ] **A real logo.** The wordmark is currently set in type (Cormorant Garamond).
      If the shop has a logo, it replaces `src/components/ui/Logo.tsx` and the
      browser tab icon at `src/app/icon.svg`.
- [ ] **Retire the workers.dev address** once the custom domain is live, so it
      stops competing with the real domain in search. See `DEPLOY.md`.

## From the review pass — not yet done

Ranked by what actually moves the needle for the shop.

- [ ] **Open Graph image.** Every WhatsApp share of this link currently renders
      as a bare text stub with no picture. Since WhatsApp is the main channel,
      this is the highest-value item on the page. Needs one photograph, then an
      `app/opengraph-image.png` at 1200×630 and `twitter.card:
      "summary_large_image"`.
- [ ] **robots.txt and sitemap.xml** (`app/robots.ts`, `app/sitemap.ts` — both
      work under static export). Worth disallowing the RSC payload duplicates
      the export publishes (`/index.txt`, `/__next.*`), which are crawlable
      copies of the page. Do not disallow `/_next/static/` — Google needs the
      CSS and JS to render the page.
- [ ] **Fill out the structured data** once the real address is in: `image`,
      `geo` coordinates (important, because "Main Road, Saswad" is not
      geocodable on its own), `openingHoursSpecification` — the hours are already
      on the page, just not marked up — `priceRange`, and
      `alternateName: "राजभी ज्वेलर्स"` for Marathi local search.
- [ ] **Marathi gaps.** The address stays in English when Marathi is selected
      (`addressLines` is built in `site.ts`, outside the dictionary).
- [ ] **Preload fonts per language.** English visits still download Cormorant
      and Inter unconditionally; a Marathi visitor downloads those 84 KB and
      never renders them. The inline pre-paint script already reads the saved
      language — it could inject the right two preload tags instead.
- [ ] **Two Devanagari families cost 183 KB** (Noto Sans Devanagari 121 KB, Tiro
      62 KB) for Marathi visitors. Using Noto for both headings and body would
      save 62 KB. A design call, not an obvious win.
- [ ] **Consider replacing the Google Maps embed with a facade** — the existing
      placeholder image with the "See on map" button over it, opening Maps in a
      new tab. Removes the page's only third-party request, its cookies, and a
      tab stop. On a phone, the deep link into the Maps app is better UX than an
      embedded pan-and-zoom anyway.

## Known limitations, decided deliberately

- **One URL serves both languages.** Both are in the HTML and a CSS rule shows
  one. This keeps the toggle instant and means there is no second page to keep
  in sync, but it is weaker for search than separate `/` and `/mr/` routes,
  because a page mixing two languages muddies Google's language detection.
  If Devanagari search traffic ever matters commercially, the fix is
  `app/[lang]/page.tsx` with `generateStaticParams(["en","mr"])` and proper
  `hreflang`. Note that static export rules out server-side `Accept-Language`
  redirects, so the toggle would become a plain link between two URLs.
  Most customers arrive via Google Business Profile rather than web search,
  which is why this is not ranked higher.
- **No image optimisation.** A static export has no server to resize images, so
  photographs have to be compressed by hand before they are added.
- **No analytics.** Nothing tracks visitors. Cloudflare Web Analytics is free,
  needs no cookie banner, and can be switched on from the dashboard if you ever
  want visitor counts.
