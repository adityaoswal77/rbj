import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// `output: "export"` refuses to build this route without it.
export const dynamic = "force-static";

/**
 * One page, one URL — the same trailing-slash form as the canonical tag.
 * `lastModified` is the build time: a deploy is how the page changes, so it
 * stays truthful without anyone maintaining a date by hand.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${site.url}/`, lastModified: new Date() }];
}
