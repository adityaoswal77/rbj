# Outstanding

Things the site still needs. Grouped by who can do them.

## Needed from the shop

- [ ] **Street address.** The site still says only "Main Road". The shop's Google
      listing reads "Main Rd, below Dalvi Hospital, Kumbharwada, Saswad,
      Maharashtra 412301" — if that is right, use it here so the site and the
      listing match word for word (Google cross-checks them).
      → `src/lib/site.ts`, `address.line1` / `address.line2`
- [x] **PIN code.** 412301 matches the Google listing.
- [ ] **Confirm opening hours.** Currently Mon–Sat 10:30–20:30, Sun 10:30–14:00 —
      a guess, not your actual hours. Include any weekly off or festival closures.
      → `src/lib/content.ts`, `visit.hours` in both `en` and `mr`
      Once confirmed, also add them to the structured data (see below).
- [ ] **Photographs.** Every image is a grey placeholder. Needed: one hero shot,
      four collection shots (gold, silver, bridal, gemstone rings), one of a
      karigar working, one of the shopfront, and six recent Instagram posts.
      See `CONTENT.md` for the shapes and file sizes. Give each real photograph
      descriptive `alt` text if it shows something the copy does not.

## Needs someone with the accounts — cannot be done from this repo

- [ ] **Google Search Console.** Add a *Domain* property for
      rajbhijewellers.com (verify by DNS TXT record in Cloudflare), then submit
      `https://rajbhijewellers.com/sitemap.xml`. Afterwards, check the Pages
      report for anything "Crawled – currently not indexed".
- [ ] **Bing Webmaster Tools.** Import the site straight from Search Console,
      which also submits the sitemap.
- [ ] **Google Business Profile.** Claim it if it is not already, and make the
      name, address, phone and hours match this site exactly. Add the website
      link, photographs, and categories (Jewellery store; Gold dealer). For a
      local shop this drives more visits than the website itself does.
- [ ] **Always Use HTTPS.** `http://rajbhijewellers.com/` currently serves the
      page with a 200 instead of redirecting — a duplicate of the whole site.
      Cloudflare → SSL/TLS → Edge Certificates → Always Use HTTPS: on. (The HSTS
      header in `_headers` covers repeat visitors; this covers the first visit.)
- [ ] **www.** `www.rajbhijewellers.com` has no DNS record, so it does not
      resolve at all. See `DEPLOY.md` → "www → apex" (two dashboard steps).
- [ ] **Retire the workers.dev address.** See `DEPLOY.md` → "After the domain is
      live". The custom domain is serving, so this can be done now.
- [ ] **Check the WhatsApp number receives messages.** Open the site on a phone
      and tap WhatsApp Us — it should open a chat with a message already typed.
- [ ] **Look at Web Analytics in a week.** It was switched on in the dashboard but
      the site's CSP was blocking its script, so it recorded nothing until the
      fix in this release. Numbers start from the next deploy.

## Worth doing

- [ ] **Marathi proofread.** The Marathi copy was written to read naturally rather
      than as a literal translation of the English. Someone who speaks it daily
      should read it once — particularly the About story, the collection
      descriptions and the 404 page.
- [ ] **A real logo.** The wordmark is currently set in type (Cormorant Garamond).
      If the shop has a logo, it replaces `src/components/ui/Logo.tsx` and the
      browser tab icon at `src/app/icon.svg`.
- [ ] **A photographic share image.** `app/opengraph-image.tsx` renders a
      typographic card (maroon, gold, the wordmark) because there are no
      photographs yet. Once there is a hero shot, replace that file with an
      `app/opengraph-image.jpg` at 1200×630.
- [ ] **Finish the structured data** once the details are confirmed:
      `openingHoursSpecification` (only once the hours are real — marking up a
      guess puts wrong hours into Google) and `priceRange`. `geo`,
      `alternateName` and `image` are done.
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
- [ ] **Text contrast over the hero.** Lighthouse flags the eyebrow, the
      language toggle and "JEWELLERS" in the header at ~3.7:1 against the
      maroon scrim (4.5:1 needed). Recheck once the hero photograph is in — the
      photo changes the background — and nudge the scrim or the text if needed.

## Content and links — a strategy, not a code change

The SEO checklist's content and link items. None can be done by editing this
site without inventing things, so they are listed for whoever takes them on.

- **Keywords.** The page targets "jewellers Saswad", "gold jewellery Saswad",
  "bridal jewellery Pune" and "सराफ सासवड". Check real volumes (Search Console
  after a month of data is the free source) before writing anything new.
- **A page per collection / service** — gold, silver, bridal, gemstone rings,
  made-to-order, old-gold exchange if offered — is the only way this site can
  rank for more than its own name. Each needs real photographs and real detail.
  One page today means no cannibalisation, no thin pages, no orphans, and no
  need for breadcrumbs; that changes the moment a second page is added (add
  `BreadcrumbList` schema then).
- **FAQ.** Questions people actually ask a Saswad jeweller (hallmark and HUID,
  making charges, old-gold exchange, custom-order timelines) answered from the
  shop's real policies. Search Console's queries report will show which ones.
- **Links.** Local directories (Justdial, Sulekha, IndiaMART), the Saswad
  / Purandar pages that list shops, and the Instagram bio should all link to
  rajbhijewellers.com with the same name, address and phone.
- **Keep it fresh.** When something on the page changes, the sitemap's
  `lastmod` updates on the next deploy by itself.

## Known limitations, decided deliberately

- **One URL serves both languages.** Both are in the HTML and a CSS rule shows
  one. This keeps the toggle instant and means there is no second page to keep
  in sync, but it is weaker for search than separate `/` and `/mr/` routes,
  because a page mixing two languages muddies Google's language detection.
  Each Marathi fragment is marked `lang="mr"`, which helps, but is not a
  substitute for its own URL. If Devanagari search traffic ever matters
  commercially, the fix is `app/[lang]/page.tsx` with
  `generateStaticParams(["en","mr"])` and proper `hreflang`. Note that static
  export rules out server-side `Accept-Language` redirects, so the toggle would
  become a plain link between two URLs. Most customers arrive via Google
  Business Profile rather than web search, which is why this is not ranked
  higher.
- **No image optimisation.** A static export has no server to resize images, so
  photographs have to be compressed by hand before they are added.
