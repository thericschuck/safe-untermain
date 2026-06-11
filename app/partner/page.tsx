import type { Metadata } from "next";
import Image from "next/image";
import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Partner",
  description:
    "Kooperationen und Partner von SAFE Aggressionsmanagement — CyberSecBW, Gewaltprävention Hannover, Passion MMA und weitere Sicherheitsexperten.",
  alternates: { canonical: "/partner" },
  openGraph: {
    url: "https://safe-untermain.de/partner",
    title: "Partner — Sven Zöller | safe-untermain.de",
    description:
      "Kooperationen und Partner von SAFE Aggressionsmanagement.",
  },
};

const PARTNER = [
  {
    name: "SAFE Aggressionsmanagement",
    kategorie: "Aggressionsmanagement",
    organisation: "Training & Beratung",
    beschreibung:
      "Training und Beratung für Aggressionsmanagement — praxisnah, nachhaltig und individuell zugeschnitten.",
    href: "https://safe-aggressionsmanagement.de/",
    foto: "/anti_agression.jpg",
  },
  {
    name: "Gewaltprävention Hannover",
    kategorie: "Gewaltprävention",
    organisation: "Tobias Dreger",
    beschreibung:
      "Gewaltprävention und Selbstbehauptung. Tobias Dreger setzt sich aktiv für mehr Sicherheit und Prävention in der Region Hannover ein.",
    href: "https://xn--gewaltprvention-hannover-xbc.de/",
    foto: "/gewaltpräventionHanover.jpg",
  },
  {
    name: "Passion MMA",
    kategorie: "Kampfsport",
    organisation: "Selbstverteidigung & Kampfsport",
    beschreibung:
      "Kampfsport und Selbstverteidigungstraining auf höchstem Niveau — für alle Altersgruppen und Leistungsstufen.",
    href: "https://passionmma.de/",
    foto: "/passion-stockstadt.webp",
  },
  {
    name: "Passion MMA Rodgau",
    kategorie: "Kampfsport",
    organisation: "MMA-Training Rodgau",
    beschreibung:
      "Professionelles MMA-Training in Rodgau. Technik, Kondition und Selbstdisziplin als Grundlage für echte Stärke.",
    href: "https://passionmma-rodgau.de/",
    foto: "/passion-rodgau.webp",
  },
  {
    name: "The Base X",
    kategorie: "Fitness & Gesundheit",
    organisation: "Trainingszentrum",
    beschreibung:
      "Innovatives Trainingszentrum für Fitness und Gesundheit — ganzheitlich, modern und konsequent auf den Menschen ausgerichtet.",
    href: "https://www.the-base-x.at/",
    foto: "/basex.jpg",
  },
  {
    name: "CyberSecBw.de",
    kategorie: "IT-Sicherheit",
    organisation: "Cybersecurity & Datenschutz",
    beschreibung:
      "IT-Sicherheit, Datenschutz und Cybersecurity-Beratung. Gemeinsam schaffen wir sichere digitale und physische Umgebungen.",
    href: "https://www.cybersecbw.de/",
    foto: "/cybersecbw.jpg",
  },
];

function PartnerKarte({
  partner,
  reversed,
}: {
  partner: (typeof PARTNER)[0];
  reversed: boolean;
}) {
  return (
    <div className="relative">
      {/* Foto — absolut positioniert, 60 % Breite */}
      <div
        className={`hidden lg:block absolute inset-y-0 ${reversed ? "right-0" : "left-0"} w-[60%] overflow-hidden`}
        style={{ minHeight: "22rem" }}
      >
        <Image
          src={partner.foto}
          alt={partner.name}
          fill
          className="object-cover"
          sizes="60vw"
        />
      </div>

      {/* Mobile Foto */}
      <div className="lg:hidden aspect-4/3 relative overflow-hidden">
        <Image
          src={partner.foto}
          alt={partner.name}
          fill
          className="object-cover"
          sizes="100vw"
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
                    <PartnerKarte key={i} partner={p} reversed={i % 2 !== 0} />
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
                  <a
                    href="/kontakt"
                    className="shrink-0 px-8 py-4 bg-rot text-paper font-medium text-sm hover:bg-paper hover:text-ink transition-colors duration-200 tracking-wide"
                  >
                    Kontakt aufnehmen
                  </a>
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
