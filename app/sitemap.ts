import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://safe-untermain.de";
  const now = new Date("2026-06-11");

  return [
    { url: `${base}/`,            lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/kontakt`,     lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/ueber`,       lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/konzept`,     lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/partner`,     lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/impressum`,   lastModified: now, changeFrequency: "yearly",  priority: 0.1 },
    { url: `${base}/datenschutz`, lastModified: now, changeFrequency: "yearly",  priority: 0.1 },
  ];
}
