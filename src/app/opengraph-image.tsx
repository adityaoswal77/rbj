import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { content } from "@/lib/content";
import { site } from "@/lib/site";

/**
 * The picture WhatsApp, Facebook and X show when someone shares the link.
 * Rendered to a PNG at build time — nothing runs on a server.
 *
 * A typographic card for now, because every photograph on the site is still a
 * placeholder. Once there is a real hero shot, replace this file with an
 * `opengraph-image.jpg` (1200×630) and the photograph is used instead. The URL
 * then gains its extension, so also update `image` in layout.tsx's `jsonLd`
 * and drop the `/opengraph-image` Content-Type rule in public/_headers.
 */

const { hero } = content.en;

// `output: "export"` refuses to build this route without it.
export const dynamic = "force-static";

export const alt = `${site.name} — ${hero.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// OFL-licensed Cormorant, from @fontsource because the image renderer reads
// .woff but not the .woff2 that next/font downloads.
const fontDir = join(process.cwd(), "node_modules/@fontsource/cormorant-garamond/files");
const light = readFile(join(fontDir, "cormorant-garamond-latin-300-normal.woff"));
const medium = readFile(join(fontDir, "cormorant-garamond-latin-500-normal.woff"));

const ivory = "#faf7f2";
const maroon = "#5a1a1f";
const gold = "#b08d57";
const goldSoft = "#d8c4a4";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: maroon,
          padding: 28,
          fontFamily: "Cormorant",
        }}
      >
        {/* The same inset hairline the placeholders on the page use. */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 88px",
            border: `1px solid ${gold}66`,
          }}
        >
          <div
            style={{
              fontSize: 26,
              fontWeight: 500,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: goldSoft,
            }}
          >
            {hero.eyebrow}
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 132,
              fontWeight: 300,
              lineHeight: 1,
              letterSpacing: "-0.015em",
              color: ivory,
            }}
          >
            {site.name}
          </div>
          <div style={{ marginTop: 44, width: 96, height: 2, background: `${goldSoft}99` }} />
          <div style={{ marginTop: 40, fontSize: 46, fontWeight: 300, color: `${ivory}d9` }}>
            {hero.tagline}
          </div>
          <div
            style={{
              marginTop: 56,
              fontSize: 24,
              fontWeight: 500,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: gold,
            }}
          >
            {`Est. ${site.establishedYear}`}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Cormorant", data: await light, weight: 300, style: "normal" },
        { name: "Cormorant", data: await medium, weight: 500, style: "normal" },
      ],
    },
  );
}
