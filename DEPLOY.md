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
  "name": "rbj",                     // the Worker in your Cloudflare account
  "compatibility_date": "2026-09-01",
  "assets": {
    "directory": "./out",            // what Next's build produces
    "not_found_handling": "404-page" // serve out/404.html for unknown URLs
  },
  "observability": { ... }
}
```

**`name` must stay `rbj`.** That is the Worker that already exists in the account
and the one the domain will point at. Changing it creates a second, separate
Worker and leaves the live one stale.

`not_found_handling: "404-page"` is the right setting for a static site: an
unknown URL gets the real 404 page with a 404 status, rather than the homepage.

## The custom domain

rajbhijewellers.com is registered on Cloudflare but is not yet pointed at the
Worker. Attach it in the dashboard: **Workers & Pages → rbj → Settings → Domains
& Routes → Add → Custom domain**. Because the domain's DNS is already on
Cloudflare, the record and the certificate are created for you; it usually goes
live within a few minutes.

Add both `rajbhijewellers.com` and `www.rajbhijewellers.com` so either spelling
works.

## After a deploy

- Open the site on a phone, not just a laptop — most visitors will be on one.
- Tap **WhatsApp Us** and confirm a chat opens to the right number with the
  message pre-filled.
- Tap **Visit Store** and confirm the map opens on the shop, not the town centre.
- Switch to मराठी, reload, and confirm it stays in Marathi.

## Rolling back

Every deploy is kept. In the dashboard: **Workers & Pages → rbj → Deployments**,
find the last good one and roll back to it. Nothing needs rebuilding.
