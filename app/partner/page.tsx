import Link from "next/link";
import { FadeImage } from "@/components/ui/FadeImage";
import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";
import Footer from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";

const PATH = "/partner";
const TITEL = "Partner & Kooperationen — Gewaltprävention und Kampfsport";
const BESCHREIBUNG =
  "Das Netzwerk hinter SAFE Aggressionsmanagement: Gewaltprävention Hannover, Passion MMA, The Base X und weitere Partner aus Sicherheit und Kampfsport.";

export const metadata = pageMetadata({
  path: PATH,
  title: "Partner",
  ogTitle: `${TITEL} | Sven Zöller`,
  description: BESCHREIBUNG,
  keywords: [
    "Sicherheitspartner Kooperation",
    "Kampfsport Partner",
    "Gewaltprävention Netzwerk",
    "Passion MMA",
    "Krav Maga Partner",
    "Selbstverteidigung Netzwerk",
  ],
});

const breadcrumbJsonLdData = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Partner", path: "/partner" },
]);

const PARTNER = [
  {
    name: "SAFE Aggressionsmanagement",
    kategorie: "Aggressionsmanagement",
    organisation: "Training & Beratung",
    beschreibung:
      "Training und Beratung für Aggressionsmanagement — praxisnah, nachhaltig und individuell zugeschnitten.",
    href: "https://safe-aggressionsmanagement.de/",
    foto: "/anti_agression.webp",
  },
  {
    name: "Gewaltprävention Hannover",
    kategorie: "Gewaltprävention",
    organisation: "Tobias Dreger",
    beschreibung:
      "Gewaltprävention und Selbstbehauptung. Tobias Dreger setzt sich aktiv für mehr Sicherheit und Prävention in der Region Hannover ein.",
    href: "https://xn--gewaltprvention-hannover-xbc.de/",
    foto: "/gewaltpraevention-hannover.webp",
  },
  {
    name: "Passion MMA",
    kategorie: "Kampfsport",
    organisation: "Selbstverteidigung & Kampfsport",
    beschreibung:
      "Kampfsport und Selbstverteidigungstraining auf höchstem Niveau — für alle Altersgruppen und Leistungsstufen.",
    href: "https://passionmma.de/",
    foto: "/passion-stockstadt.webp",
    // Photo is a wide room shot — bias down so the crop keeps the training action
    // instead of the empty ceiling above it.
    objectPosition: "center 68%",
  },
  {
    name: "Passion MMA Rodgau",
    kategorie: "Kampfsport",
    organisation: "MMA-Training Rodgau",
    beschreibung:
      "Professionelles MMA-Training in Rodgau. Technik, Kondition und Selbstdisziplin als Grundlage für echte Stärke.",
    href: "https://passionmma-rodgau.de/",
    foto: "/passion-rodgau.webp",
    objectPosition: "center 70%",
  },
  {
    name: "The Base X",
    kategorie: "Fitness & Gesundheit",
    organisation: "Trainingszentrum",
    beschreibung:
      "Innovatives Trainingszentrum für Fitness und Gesundheit — ganzheitlich, modern und konsequent auf den Menschen ausgerichtet.",
    href: "https://www.the-base-x.at/",
    foto: "/basex.webp",
  },
  {
    name: "Schuck Webdesign",
    kategorie: "IT & Digitalisierung",
    organisation: "IT-Partner",
    beschreibung:
      "IT-Partner für Website, Digitalisierung und technische Umsetzung — von der Webpräsenz bis zur laufenden Betreuung.",
    href: "https://schuck-webdesign.de/",
    foto: "/schuck-webdesign.webp",
    // It's a logo, not a photo — object-cover would crop the brackets off. Show it
    // whole, centered on its own dark background instead.
    logo: true,
  },
];

function PartnerKarte({
  partner,
  reversed,
}: {
  partner: (typeof PARTNER)[0];
  reversed: boolean;
}) {
  const isLogo = "logo" in partner && partner.logo;
  const objectPosition =
    ("objectPosition" in partner && partner.objectPosition) || "center";

  return (
    // lg:min-h only for isLogo, matching the Foto's own min-height below: the Foto is
    // `absolute`, so it doesn't otherwise contribute to this wrapper's height — without
    // it, a Karte shorter than 22rem (e.g. Schuck Webdesign's single short paragraph) left
    // the wrapper shorter than the Foto, and the flat bg-ink logo box spilled out past its
    // bottom edge into the light section below. Scoped to isLogo only: for photo cards the
    // Foto is a real photo (not a flat color), so it overflowing the Karte's height is the
    // intended overlap look, not a bug — forcing it here for every card just padded all six
    // wrappers with ~60px of dead space none of them needed.
    <div className={`relative ${isLogo ? "lg:min-h-88" : ""}`}>
      {/* Foto — absolut positioniert, 60 % Breite. Die Karte überlappt bewusst 15 % davon
          (60 % + 55 % > 100 %) — bei einem Trainingsfoto unsichtbar, bei einem mittig
          zentrierten Logo verdeckt die opake Karte sonst dessen linke Hälfte. Deshalb wird
          das Logo zur freien (nicht überlappten) Seite hin ausgerichtet statt zentriert.

          Nur EIN display-Utility pro Breakpoint: ein nacktes `flex` neben `lg:block` verliert
          gegen `lg:block` (Tailwind ordnet Varianten nach den Basis-Utilities ein), das
          `display` blieb dadurch "block" und items-center/justify-* liefen ins Leere — das
          Logo hing einfach linksbündig im Padding, unabhängig davon, was hier stand. */}
      <div
        className={`hidden ${isLogo ? "lg:flex items-center" : "lg:block"} absolute inset-y-0 ${reversed ? "right-0" : "left-0"} w-[60%] overflow-hidden ${isLogo ? `bg-ink p-12 ${reversed ? "justify-end" : "justify-start"}` : ""}`}
        style={{ minHeight: "22rem" }}
      >
        <FadeImage
          src={partner.foto}
          alt={partner.name}
          fill={!isLogo}
          width={isLogo ? 440 : undefined}
          height={isLogo ? 200 : undefined}
          className={isLogo ? "object-contain w-full h-auto max-w-xs" : "object-cover"}
          style={isLogo ? undefined : { objectPosition }}
          sizes="60vw"
          loading="lazy"
        />
      </div>

      {/* Mobile Foto */}
      <div className={`lg:hidden aspect-4/3 relative overflow-hidden ${isLogo ? "bg-ink flex items-center justify-center p-10" : ""}`}>
        <FadeImage
          src={partner.foto}
          alt={partner.name}
          fill={!isLogo}
          width={isLogo ? 320 : undefined}
          height={isLogo ? 145 : undefined}
          className={isLogo ? "object-contain w-full h-auto max-w-56" : "object-cover"}
          style={isLogo ? undefined : { objectPosition }}
          sizes="100vw"
          loading="lazy"
        />
      </div>

      {/* Karte — 55 % Breite, überlappt das Foto */}
      <div
        className={`relative z-10 lg:w-[55%] bg-ink p-8 lg:p-12 ${reversed ? "lg:mr-auto" : "lg:ml-auto"} lg:my-10`}
      >
        <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-rot mb-3">
          {partner.kategorie}
        </p>
        <h3 className="font-display text-xl md:text-2xl lg:text-3xl xl:text-4xl tracking-[0.08em] text-paper uppercase leading-none mb-1 wrap-break-word">
          {partner.name}
        </h3>
        <p className="font-mono text-[11px] tracking-wider text-paper/35 mb-6">
          {partner.organisation}
        </p>
        <p className="text-[14px] text-paper/60 font-sans leading-relaxed">
          {partner.beschreibung}
        </p>
        {partner.href && (
          <a
            href={partner.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 font-mono text-[11px] tracking-[0.18em] uppercase text-rot hover:text-paper transition-colors duration-150"
          >
            Website besuchen
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1.5 8.5l7-7M4 1.5h4.5v4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}

export default function PartnerPage() {
  return (
    <>
      <JsonLd
        data={webPageJsonLd({ path: PATH, name: TITEL, description: BESCHREIBUNG })}
      />
      <JsonLd data={breadcrumbJsonLdData} />
      <ScrollProgress />
      <Nav />

      <main className="relative">
        {/* Overlay */}
        <div
          className="absolute inset-x-0 top-0 pointer-events-none"
          style={{
            height: "95vh",
            zIndex: 1,
            background:
              "linear-gradient(to bottom, rgba(21,20,18,0.62) 0%, rgba(21,20,18,0.42) 28%, rgba(21,20,18,0.18) 62%, transparent 100%)",
          }}
        />

        {/* Hero */}
        <div className="relative z-10 flex items-end min-h-[40vh] pb-10">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 w-full pt-32">
            <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-rot mb-3">
              safe-untermain.de
            </p>
            <h1 className="font-display text-[clamp(2.2rem,10vw,5.5rem)] lg:text-[9rem] xl:text-[11rem] tracking-wide text-paper uppercase leading-none">
              Partner
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 mx-3 md:mx-5 lg:mx-9">
          <div className="overflow-hidden">

            {/* Intro + Karten */}
            <section className="section-card">
              <div className="max-w-6xl mx-auto px-6 lg:px-8 pt-20 lg:pt-28 pb-20 lg:pb-28">
                <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-rot mb-4">
                  Kooperationen
                </p>
                <h2 className="font-display text-5xl lg:text-6xl tracking-wide text-ink uppercase leading-none mb-6">
                  Unsere Partner
                </h2>
                <p className="text-ink/55 text-base leading-relaxed max-w-xl">
                  SAFE Aggressionsmanagement kooperiert mit Organisationen, Behörden
                  und Einrichtungen, die sich für mehr Sicherheit und Prävention einsetzen.
                </p>

                <div className="mt-20 lg:mt-28 space-y-10">
                  {PARTNER.map((p, i) => (
                    <PartnerKarte key={p.name} partner={p} reversed={i % 2 !== 0} />
                  ))}
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className="section-dark">
              <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div>
                    <p className="font-display text-3xl lg:text-4xl tracking-wide text-paper uppercase leading-none mb-1">
                      Kooperation anfragen
                    </p>
                    <p className="text-paper/40 text-sm font-sans">
                      Sie möchten mit SAFE Aggressionsmanagement zusammenarbeiten?
                    </p>
                  </div>
                  <Link
                    href="/kontakt"
                    className="shrink-0 px-8 py-4 bg-rot text-paper font-medium text-sm hover:bg-paper hover:text-ink transition-colors duration-200 tracking-wide"
                  >
                    Kontakt aufnehmen
                  </Link>
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
