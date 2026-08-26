import Link from "next/link";
import { FadeImage } from "@/components/ui/FadeImage";
import { SternenFeld } from "@/components/ui/SternenFeld";
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
    foto: "/safe-aggressionsmanagement.webp",
    // Der Griff ums Handgelenk sitzt im oberen Drittel — ohne Bias schneidet der
    // 2:1-Crop die Faust oben ab und behaelt stattdessen den leeren Boden.
    objectPosition: "center 35%",
  },
  {
    name: "Gewaltprävention Hannover",
    kategorie: "Gewaltprävention",
    organisation: "Tobias Dreger",
    beschreibung:
      "Gewaltprävention und Selbstbehauptung. Tobias Dreger setzt sich aktiv für mehr Sicherheit und Prävention in der Region Hannover ein.",
    href: "https://xn--gewaltprvention-hannover-xbc.de/",
    foto: "/gewaltpraevention-hannover-plakat.webp",
    // Quadratisches Motiv in einem breiten Ausschnitt: der Schriftzug "STOP GEWALT"
    // liegt bei 25-66 % Hoehe, ein mittiger Crop wuerde ihn oben anschneiden.
    objectPosition: "center 40%",
    // Plakat statt Foto — der Schriftzug ist ins Bild eingebrannt. Bei den ueblichen
    // 60 % Bildbreite verdeckt die ueberlappende Karte das linke Viertel, und aus
    // "STOP GEWALT" wird "TOP EWALT". Deshalb hier ohne Ueberlappung.
    randlos: true,
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
    foto: "/schuck-webdesign-mark.webp",
    // Kein Foto, sondern eine Wortmarke — statt sie klein in einen leeren schwarzen
    // Kasten zu setzen, baut <MarkenPanel> das Panel selbst (Sternenfeld in den Schuck-
    // Unternehmensfarben) und die freigestellte Marke sitzt gross darin.
    marke: {
      zeile: "Web · Design · Entwicklung",
      domain: "schuck-webdesign.de",
    },
  },
];

/**
 * Panel fuer Partner ohne Foto — aktuell nur Schuck Webdesign.
 *
 * Die uebrigen fuenf Karten zeigen grossformatige Trainingsfotos; ein flacher Kasten mit
 * kleinem Logo waere in der Reihe ein Loch. Statt eines Fotos gestaltet dieses Panel
 * seine Flaeche deshalb selbst — und zwar in der CI des Partners, nicht in der von SAFE:
 * das Sternenfeld aus dem Hero von schuck-webdesign.de, Violett (#7F77DD) auf #080808.
 * Die freigestellte Wortmarke sitzt so gross darin wie ein Foto.
 *
 * `freiraum` haelt den Inhalt aus der Ueberlappung: die Karte deckt 15 % der Zeilen-
 * breite ab, das sind 25 % der Panel-Breite. Ohne dieses Padding stuende die Marke
 * nicht in der sichtbaren Flaeche zentriert, sondern halb unter der Karte.
 */
function MarkenPanel({
  partner,
  reversed,
  mobil = false,
}: {
  partner: (typeof PARTNER)[0];
  reversed: boolean;
  mobil?: boolean;
}) {
  const marke = "marke" in partner ? partner.marke : undefined;
  if (!marke) return null;

  const freiraum = mobil ? "" : reversed ? "pl-[26%]" : "pr-[26%]";
  // Mittelpunkt der sichtbaren Flaeche — Schimmer und Vignette folgen ihm, sonst
  // leuchtet es unter der Karte statt hinter der Marke.
  const mitte = mobil ? "50%" : reversed ? "63%" : "37%";

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: "#080808" }}>
      <SternenFeld />

      {/* Violetter Schimmer hinter der Marke — gibt der Flaeche Tiefe, damit sie neben
          den Fotos nicht wie ein leerer Block wirkt. */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 62% 78% at ${mitte} 46%, rgba(127,119,221,0.20) 0%, rgba(127,119,221,0.06) 48%, transparent 76%)`,
        }}
      />

      {/* Vignette — zieht die Raender wieder ins Schwarz zurueck */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 92% 92% at 50% 50%, transparent 34%, rgba(8,8,8,0.78) 100%)",
        }}
      />

      {/* Marke — teilt sich den Freiraum mit dem Schimmer */}
      <div className={`absolute inset-0 ${freiraum}`}>
        <div className="h-full w-full flex flex-col items-center justify-center text-center px-10 py-12 lg:px-14">
          <FadeImage
            src={partner.foto}
            alt={partner.name}
            width={608}
            height={251}
            className="object-contain w-full h-auto max-w-56 lg:max-w-sm"
            sizes={mobil ? "60vw" : "35vw"}
            loading="lazy"
          />

          <span
            aria-hidden
            className="mt-7 lg:mt-9 block w-8 h-px"
            style={{ background: "#7F77DD" }}
          />

          <p
            className="mt-4 font-mono text-[9px] lg:text-[10px] tracking-[0.3em] uppercase"
            style={{ color: "rgba(245,245,240,0.42)" }}
          >
            {marke.zeile}
          </p>
          <p
            className="mt-1.5 font-mono text-[9px] lg:text-[10px] tracking-[0.16em]"
            style={{ color: "rgba(245,245,240,0.24)" }}
          >
            {marke.domain}
          </p>
        </div>
      </div>
    </div>
  );
}

function PartnerKarte({
  partner,
  reversed,
}: {
  partner: (typeof PARTNER)[0];
  reversed: boolean;
}) {
  const hatMarke = "marke" in partner && Boolean(partner.marke);
  // Ohne Ueberlappung stossen Bild und Karte auf 45 % / 55 % kantenbuendig aneinander.
  const randlos = "randlos" in partner && Boolean(partner.randlos);
  const objectPosition =
    ("objectPosition" in partner && partner.objectPosition) || "center";

  return (
    // lg:min-h nur fuer das Marken-Panel, passend zur min-height des Fotos unten: das
    // Foto ist `absolute` und traegt sonst nichts zur Hoehe dieses Wrappers bei — ohne
    // die Angabe blieb ein Wrapper, der kuerzer als 22rem ist (z. B. Schuck Webdesign mit
    // nur einem kurzen Absatz), niedriger als das Panel, und dessen Flaeche lief unten in
    // den hellen Abschnitt darunter aus. Nur fuer das Panel: bei Fotokarten ist das
    // Ueberstehen der gewollte Ueberlappungs-Look, kein Fehler — es hier fuer alle sechs
    // Karten zu erzwingen hat nur ~60 px Leerraum ergaenzt, den keine davon braucht.
    <div className={`relative ${hatMarke ? "lg:min-h-88" : ""}`}>
      {/* Foto — absolut positioniert, 60 % Breite. Die Karte ueberlappt bewusst 15 % davon
          (60 % + 55 % > 100 %) — bei einem Trainingsfoto unsichtbar, bei einer mittig
          zentrierten Marke verdeckt die opake Karte sonst deren Haelfte. Deshalb schiebt
          <MarkenPanel> seinen Inhalt per Padding aus der Ueberlappung heraus. */}
      <div
        className={`hidden lg:block absolute inset-y-0 ${reversed ? "right-0" : "left-0"} ${randlos ? "w-[45%]" : "w-[60%]"} overflow-hidden`}
        style={{ minHeight: "22rem" }}
      >
        {hatMarke ? (
          <MarkenPanel partner={partner} reversed={reversed} />
        ) : (
          <FadeImage
            src={partner.foto}
            alt={partner.name}
            fill
            className="object-cover"
            style={{ objectPosition }}
            sizes="60vw"
            loading="lazy"
          />
        )}
      </div>

      {/* Mobile Foto */}
      <div className="lg:hidden aspect-4/3 relative overflow-hidden">
        {hatMarke ? (
          <MarkenPanel partner={partner} reversed={reversed} mobil />
        ) : (
          <FadeImage
            src={partner.foto}
            alt={partner.name}
            fill
            className="object-cover"
            style={{ objectPosition }}
            sizes="100vw"
            loading="lazy"
          />
        )}
      </div>

      {/* Karte — 55 % Breite, ueberlappt das Foto */}
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
