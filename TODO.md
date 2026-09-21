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
- [ ] **Open Graph image.** Nothing shows as a preview when the link is shared on
      WhatsApp right now. One good photograph fixes it, once photography exists.
- [ ] **robots.txt and sitemap.xml.** Not present yet.

## Known limitations, decided deliberately

- **The exported page is English.** Marathi is applied in the browser from the
  visitor's saved choice. That means search engines index the English version.
  For a single-page site this is the right trade — a separate `/mr/` page would
  double the URLs to maintain for little gain. Revisit only if Marathi search
  traffic turns out to matter.
- **No image optimisation.** A static export has no server to resize images, so
  photographs have to be compressed by hand before they are added.
- **No analytics.** Nothing tracks visitors. Cloudflare Web Analytics is free,
  needs no cookie banner, and can be switched on from the dashboard if you ever
  want visitor counts.
