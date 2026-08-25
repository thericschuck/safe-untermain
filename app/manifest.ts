import type { MetadataRoute } from "next";
import { SITE_NAME, SITE_SHORT } from "@/lib/seo";

/**
 * Web-App-Manifest. Für SEO indirekt relevant: Name, Beschreibung und
 * Theme-Farbe werden von Browsern und Crawlern als zusätzliches
 * Marken-Signal gelesen, und ein vorhandenes Manifest ist Teil der
 * Lighthouse-Best-Practices.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_SHORT,
    description:
      "Anti-Aggressionstraining, Deeskalation und Gewaltprävention am bayerischen Untermain — Sven Zöller, zertifizierter Sicherheitstrainer.",
    lang: "de",
    start_url: "/",
    display: "standalone",
    background_color: "#151412",
    theme_color: "#151412",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
