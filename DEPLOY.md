# Deploying

The site builds to a folder of plain files (`out/`) and is served by Cloudflare
Workers Static Assets. There is no server and no database — Cloudflare hands the
files straight to the visitor from whichever data centre is nearest them.

## Why there is no Worker script

`wrangler.jsonc` has an `assets` block but no `main`. That is deliberate.

`main` points at a JavaScript file that runs on Cloudflare's edge for incoming
requests. This site has nothing for it to do: every route is a file that already
exists on disk, there is no API, no authentication, no form submission, and no
content that changes per visitor. Cloudflare serves static assets directly and
only invokes a Worker script when no asset matches the request — so adding an
empty `main` would insert a compute step into every request that returns exactly
what the asset server would have returned anyway.

You would add a `main` if the site ever needed to: handle a contact form, gate
something behind a login, do server-side redirects that `_redirects` cannot
express, or rewrite HTML per request. None of that is on the horizon.

## Deploying from your machine

```bash
npm install
npx wrangler login     # first time only, opens a browser
npm run deploy         # builds, then uploads
```

`wrangler login` needs a browser, so this has to be run from your own machine —
it cannot be done from a headless environment.

`npm run deploy` runs `next build && wrangler deploy`. The build writes `out/`,
and wrangler uploads whatever is in it.

To check the config without uploading anything:

```bash
npm run build
npx wrangler deploy --dry-run
```

To preview through Cloudflare's own runtime rather than Next's dev server — worth
doing before a real deploy, because it exercises the same routing and 404
handling as production:

```bash
npm run preview
```

## Deploying automatically from GitHub

Alternative to the CLI, if you would rather not deploy from a laptop. In the
Cloudflare dashboard: **Workers & Pages → Create → Connect to Git**, pick this
repository, then set:

- Build command: `npm run build`
- Output directory: `out`

Every push to the branch then deploys on its own.

## The configuration

```jsonc
{
  "name": "rbj",                          // the Worker in your Cloudflare account
  "compatibility_date": "2026-09-01",
  "assets": {
    "directory": "./out",                 // what Next's build produces
    "html_handling": "auto-trailing-slash",
    "not_found_handling": "404-page"      // serve out/404.html for unknown URLs
  },
  "routes": [
    { "pattern": "rajbhijewellers.com", "custom_domain": true }
  ],
  "observability": { "enabled": true, "logs": { "invocation_logs": true } }
}
```

**`name` must stay `rbj`.** That is the Worker that already exists in the account
and the one the domain points at. Changing it creates a second, separate Worker
and leaves the live one stale.

`not_found_handling: "404-page"` is right for a static site: an unknown URL gets
the real 404 page with a 404 status, rather than the homepage with a 200. The
alternative, `single-page-application`, would return 200 for every unknown URL,
which is bad for search.

`html_handling: "auto-trailing-slash"` matches Next's `trailingSlash: true`. It is
also the default — it is written out so the pairing is obvious. Do **not** set
`drop-trailing-slash`: every internal link Next emits ends in `/`, so that would
cost a redirect on every page view.

## Security and cache headers

`public/_headers` is copied into `out/` by the build, and Cloudflare reads it as
configuration — it is never served to visitors (verified: `/_headers` returns
404). It sets a Content-Security-Policy, the usual hardening headers, and a
one-year immutable cache on `/_next/static/*`, whose filenames are content-hashed
by Next and so can never go stale.

Verified locally against Cloudflare's own runtime (`npm run preview`): headers
apply to the homepage *and* to 404 responses, the immutable cache header lands
only on hashed assets, and the page loads with zero CSP violations in both
languages.

Two things to know before editing it:

- **Never add `Cache-Control` under `/*`.** Repeating a header name across
  matching blocks comma-joins the values, so `/_next/static/*` would end up with
  two conflicting `Cache-Control` values. HTML is deliberately left on
  Cloudflare's default (`max-age=0, must-revalidate`) so deploys go live at once.
- **The CSP has to allow the Google Maps iframe.** `frame-src` lists both
  `maps.google.com` and `www.google.com`, because the keyless embed can redirect
  between them. If you ever tighten the CSP, check the map still loads. Also do
  not add `Cross-Origin-Embedder-Policy: require-corp` or
  `Permissions-Policy: geolocation=()` — both break the embed.

`script-src` needs `'unsafe-inline'`. The page has two inline scripts (the
pre-paint language script and the JSON-LD block) plus Next's own hydration
scripts, and a static export cannot generate per-request nonces.

`script-src` also lists `https://static.cloudflareinsights.com`. Web Analytics
is switched on in the dashboard, and Cloudflare injects its beacon into the
HTML at the edge; without that entry the CSP blocks it and nothing is counted
(this was the case until it was added). Its reports go to the site's own
`/cdn-cgi/rum`, which `connect-src 'self'` already covers. If you ever turn Web
Analytics off, the entry can go.

The rest of the file is for search engines:

- **`X-Robots-Tag: noindex`** on `/index.txt`, `/__next.*`, `/_not-found/*` and
  `/404/*`. The static export publishes these alongside the page — RSC payloads
  and two copies of the 404 page — and all of them answer 200, so without the
  header they are indexable duplicates (the 404 copies are soft 404s). It is a
  header rather than a `Disallow` in robots.txt on purpose: a disallowed URL can
  still be indexed, because the crawler never gets to read the noindex.
- **`Content-Type: image/png` on `/opengraph-image`.** Next writes the share
  image without a file extension, so Cloudflare cannot infer the type.
- **`Strict-Transport-Security: max-age=31536000`**, without
  `includeSubDomains` or `preload`, so it binds only this hostname and can be
  walked back by lowering `max-age`.

## The custom domain

rajbhijewellers.com is attached and serving the site (checked 30 Sep 2026).

The Worker config declares the domain, so `npm run deploy` keeps it attached and
the certificate renewed — no DNS editing needed. If it ever has to be re-attached,
note that Cloudflare will refuse while the apex has a CNAME record.

If you would rather do it by hand, it is **Workers & Pages → rbj → Settings →
Domains & Routes → Add → Custom domain**.

### www → apex

A custom domain matches one exact hostname, so the apex will not catch
`www.rajbhijewellers.com`. That part cannot be done from this config file — it is
two steps in the dashboard:

1. **DNS** → add a **proxied** `AAAA` record: `www` → `100::`. That address is a
   documented placeholder; because the record is proxied, no traffic ever reaches
   it.
2. **Rules → Redirect Rules** → use the "Redirect from www to root" template, 301,
   preserving path and query.

### After the domain is live

Once you have loaded https://rajbhijewellers.com and confirmed it serves, add
these two lines to `wrangler.jsonc` and deploy again:

```jsonc
"workers_dev": false,
"preview_urls": false
```

That retires the `rbj.<your-subdomain>.workers.dev` address, which otherwise
stays publicly crawlable and competes with your real domain in search results.

**Do it in that order.** Turning them off before the domain is confirmed working
leaves the site with no reachable address at all while the certificate is still
being issued.

Also switch on **Always Use HTTPS** at the zone level, under SSL/TLS → Edge
Certificates. Until it is on, `http://rajbhijewellers.com/` serves the page with
a 200 rather than redirecting. HSTS is already sent by `_headers`, so leave the
dashboard HSTS setting off — having both would send the header twice.

## After a deploy

```bash
curl -sI https://rajbhijewellers.com/ | grep -iE 'content-security|x-frame|cache-control'
curl -sI https://rajbhijewellers.com/nope | head -1        # expect 404, not 200
curl -sI https://www.rajbhijewellers.com/ | head -3        # expect 301 to apex
curl -sI http://rajbhijewellers.com/ | head -3             # expect 301 to https
curl -s https://rajbhijewellers.com/robots.txt | tail -4   # expect the Sitemap line
curl -sI https://rajbhijewellers.com/index.txt | grep -i x-robots   # expect noindex
curl -sI https://rajbhijewellers.com/opengraph-image | grep -i content-type  # image/png
```

To see what a WhatsApp or Facebook share will look like, paste the URL into
Facebook's Sharing Debugger (developers.facebook.com/tools/debug) — it also
forces a refresh of their cached copy after the share image changes.

Then, by hand:

- Open the site on a phone, not just a laptop — most visitors will be on one.
- Tap **WhatsApp Us** and confirm a chat opens to the right number with the
  message pre-filled.
- Tap **Visit Store** and confirm the map opens on the shop, not the town centre.
- Scroll to the map and confirm it renders, with the browser console open for
  CSP errors. (Checked 30 Sep 2026: the embed lands on the shop's own listing,
  "RAJBHI JEWELLERS, Main Rd, below Dalvi Hospital".)
- Switch to मराठी, reload, and confirm it stays in Marathi.

## Rolling back

Every deploy is kept. In the dashboard: **Workers & Pages → rbj → Deployments**,
find the last good one and roll back to it. Nothing needs rebuilding.
