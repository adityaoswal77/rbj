import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// `output: "export"` refuses to build this route without it.
export const dynamic = "force-static";

/**
 * Everything is crawlable. The duplicate files the static export publishes
 * (`/index.txt`, `/__next.*`, `/_not-found/`) are kept out of the index with an
 * `X-Robots-Tag: noindex` header in public/_headers instead of a Disallow here —
 * a disallowed URL can still be indexed, because the crawler never gets to see
 * the noindex. `/_next/static/` must stay open: Google needs the CSS and JS to
 * render the page.
 *
 * Cloudflare prepends its managed Content Signals block to this file when that
 * setting is on in the dashboard; the two combine into one response.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
