import type { MetadataRoute } from "next";
import { LEISTUNGEN } from "@/lib/leistungen";
import { SITE_URL } from "@/lib/seo";

/**
 * Impressum und Datenschutz stehen bewusst NICHT drin: beide Seiten tragen
 * `robots: { index: false }`. Eine noindex-Seite in der Sitemap ist ein
 * Widerspruch — die Sitemap fordert Indexierung an, die Seite verbietet sie,
 * und die Search Console meldet das als Fehler.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2026-08-25");

  return [
    { url: `${SITE_URL}/`,            lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${SITE_URL}/leistungen`,  lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...LEISTUNGEN.map((l) => ({
      url: `${SITE_URL}/leistungen/${l.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    { url: `${SITE_URL}/kontakt`,     lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/ueber`,       lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/konzept`,     lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/partner`,     lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];
}
