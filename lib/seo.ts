import type { Metadata } from "next";

/* ═══════════════════════════════════════════════════════════════════
   Zentrale Stammdaten — NAP (Name/Address/Phone) muss über Website,
   Google Business Profile und alle Verzeichnisse zeichengleich sein.
   Abweichende Schreibweisen zerlegen das lokale Ranking-Signal.
   ═══════════════════════════════════════════════════════════════════ */

export const SITE_URL = "https://safe-untermain.de";
export const SITE_NAME = "SAFE Aggressionsmanagement — Sven Zöller";
export const SITE_SHORT = "SAFE Aggressionsmanagement";

export const NAP = {
  legalName: "Sven Zöller",
  street: "Buchenweg 9",
  postalCode: "63785",
  city: "Obernburg am Main",
  region: "Bayern",
  country: "DE",
  phone: "+4915119608040",
  phoneDisplay: "0151 196 080 40",
  email: "info@safe-untermain.de",
  lat: 49.8326,
  lng: 9.1448,
} as const;

/** Einzugsgebiet — steuert areaServed und die lokalen Longtail-Keywords. */
export const AREA_SERVED = [
  "Obernburg am Main",
  "Aschaffenburg",
  "Miltenberg",
  "Erlenbach am Main",
  "Klingenberg am Main",
  "Elsenfeld",
  "Großwallstadt",
  "Bayerischer Untermain",
  "Rhein-Main-Gebiet",
  "Odenwald",
] as const;

export const DEFAULT_OG_IMAGE = {
  url: "/sven-og.png",
  alt: "Sven Zöller — Sicherheitstrainer für Anti-Aggression und Deeskalation",
  width: 1200,
  height: 630,
};

/* ═══════════════════════════════════════════════════════════════════
   Open Graph
   ═══════════════════════════════════════════════════════════════════ */

/**
 * Next.js does NOT deep-merge `openGraph`/`twitter` objects across nested layouts —
 * a page that declares its own `openGraph` silently drops any field (locale,
 * siteName, images, …) the parent layout set but this page didn't repeat. Every
 * page's metadata must go through this helper so those fields stay consistent
 * instead of quietly disappearing per page.
 */
export function pageOpenGraph(opts: {
  path: string;
  title: string;
  description: string;
  image?: { url: string; alt: string; width?: number; height?: number };
}): NonNullable<Metadata["openGraph"]> {
  return {
    type: "website",
    locale: "de_DE",
    siteName: SITE_NAME,
    url: `${SITE_URL}${opts.path}`,
    title: opts.title,
    description: opts.description,
    images: [opts.image ?? DEFAULT_OG_IMAGE],
  };
}

/** Twitter-Card teilt sich Titel/Text mit OG — muss aber separat gesetzt werden. */
export function pageTwitter(opts: {
  title: string;
  description: string;
}): NonNullable<Metadata["twitter"]> {
  return {
    card: "summary_large_image",
    title: opts.title,
    description: opts.description,
    images: [DEFAULT_OG_IMAGE.url],
  };
}

/**
 * Baut den kompletten Metadata-Block einer Unterseite. Bündelt canonical,
 * OG und Twitter, damit keine Seite eines der drei vergisst.
 */
export function pageMetadata(opts: {
  path: string;
  /**
   * String → das `%s`-Template des Root-Layouts wird angewendet.
   * `{ absolute }` → Template wird umgangen (Startseite: der Titel enthält den
   * Suffix bereits, sonst stünde "Sven Zöller" zweimal im `<title>`).
   */
  title: NonNullable<Metadata["title"]>;
  /** Voller Titel für OG/Twitter — ohne das `%s`-Template des Root-Layouts. */
  ogTitle: string;
  description: string;
  keywords: string[];
  image?: { url: string; alt: string; width?: number; height?: number };
}): Metadata {
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: opts.path },
    keywords: opts.keywords,
    openGraph: pageOpenGraph({
      path: opts.path,
      title: opts.ogTitle,
      description: opts.description,
      image: opts.image,
    }),
    twitter: pageTwitter({ title: opts.ogTitle, description: opts.description }),
  };
}

/* ═══════════════════════════════════════════════════════════════════
   Structured Data
   ═══════════════════════════════════════════════════════════════════ */

export const PERSON_ID = `${SITE_URL}/#person`;
export const BUSINESS_ID = `${SITE_URL}/#business`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

const personNode = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Sven Zöller",
  url: SITE_URL,
  image: `${SITE_URL}/sven.webp`,
  jobTitle: "Sicherheitstrainer & Personalcoach",
  description:
    "Zertifizierter Deeskalations-, Antigewalt- und Anti-Aggressions-Trainer, Kommunikationscoach und Mediator mit über zwanzig Jahren Erfahrung.",
  email: `mailto:${NAP.email}`,
  telephone: NAP.phone,
  worksFor: { "@id": BUSINESS_ID },
  address: {
    "@type": "PostalAddress",
    streetAddress: NAP.street,
    addressLocality: NAP.city,
    postalCode: NAP.postalCode,
    addressRegion: NAP.region,
    addressCountry: NAP.country,
  },
  knowsAbout: [
    "Aggressionsmanagement",
    "Deeskalation",
    "Gewaltprävention",
    "Anti-Aggressionstraining",
    "Konfliktmanagement",
    "Krav Maga",
    "Selbstbehauptung",
    "Kommunikationscoaching",
    "Mediation",
  ],
  knowsLanguage: ["de", "en"],
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "certificate",
      name: "Krav Maga RSC Trainer",
      description: "Zertifizierter Trainer — Real Selfdefence Concept",
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "certificate",
      name: "Anti-Aggressionstraining (AAT)",
      description: "Gelistet als AAT-Anbieter beim AJSD Niedersachsen",
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "certificate",
      name: "Zertifizierter Mediator",
      description: "Mediation und Kommunikationscoaching",
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "certificate",
      name: "Peer / SbE",
      description:
        "Ausgebildeter Peer für psychosoziale Unterstützung, Stressbearbeitung nach belastenden Ereignissen",
    },
  ],
};

const businessNode = {
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": BUSINESS_ID,
  name: SITE_NAME,
  alternateName: SITE_SHORT,
  url: SITE_URL,
  image: `${SITE_URL}/sven-og.png`,
  logo: `${SITE_URL}/sven-og.png`,
  slogan: "Sicherheit beginnt im Kopf.",
  description:
    "Anti-Aggressionstraining, Deeskalationstraining, Gewaltprävention und Selbstbehauptung für Unternehmen, Behörden, Schulen und Privatpersonen am bayerischen Untermain.",
  founder: { "@id": PERSON_ID },
  employee: { "@id": PERSON_ID },
  telephone: NAP.phone,
  email: NAP.email,
  currenciesAccepted: "EUR",
  paymentAccepted: "Überweisung, Bar",
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    streetAddress: NAP.street,
    addressLocality: NAP.city,
    postalCode: NAP.postalCode,
    addressRegion: NAP.region,
    addressCountry: NAP.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: NAP.lat,
    longitude: NAP.lng,
  },
  // 80 km Radius deckt Untermain, Aschaffenburg, Odenwald und Rhein-Main ab —
  // Trainings finden vor Ort beim Kunden statt, nicht am Firmensitz.
  serviceArea: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: NAP.lat,
      longitude: NAP.lng,
    },
    geoRadius: "80000",
  },
  areaServed: [
    ...AREA_SERVED.map((name) => ({ "@type": "City", name })),
    { "@type": "State", name: "Bayern" },
    { "@type": "State", name: "Hessen" },
    { "@type": "State", name: "Baden-Württemberg" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "16:00",
    },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Kundenservice",
    telephone: NAP.phone,
    email: NAP.email,
    availableLanguage: ["German", "English"],
    areaServed: "DE",
  },
};

const websiteNode = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: SITE_NAME,
  inLanguage: "de-DE",
  publisher: { "@id": BUSINESS_ID },
};

/**
 * Der Site-weite Entitäten-Graph. Liegt im Root-Layout und wird genau einmal
 * ausgeliefert; Seiten referenzieren die Knoten nur noch per `@id`, statt
 * Person/LocalBusiness auf jeder Route zu duplizieren. Doppelte Definitionen
 * derselben Entität lassen Google raten, welche gilt.
 */
export const siteGraphJsonLd = {
  "@context": "https://schema.org",
  "@graph": [personNode, businessNode, websiteNode],
};

/** BreadcrumbList JSON-LD — helps subpages surface breadcrumb rich results in SERPs. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

/** FAQPage JSON-LD — Voraussetzung für FAQ-Rich-Results und AI-Overview-Zitate. */
export function faqJsonLd(items: { frage: string; antwort: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.frage,
      acceptedAnswer: { "@type": "Answer", text: item.antwort },
    })),
  };
}

/** WebPage-Knoten — hängt eine Route sauber an Website und Anbieter. */
export function webPageJsonLd(opts: {
  path: string;
  name: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}${opts.path}#webpage`,
    url: `${SITE_URL}${opts.path}`,
    name: opts.name,
    description: opts.description,
    inLanguage: "de-DE",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": BUSINESS_ID },
    primaryImageOfPage: `${SITE_URL}/sven-og.png`,
  };
}
