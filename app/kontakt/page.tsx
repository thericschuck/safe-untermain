import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";
import KontaktFormular from "@/components/KontaktFormular";
import Footer from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import {
  AREA_SERVED,
  BUSINESS_ID,
  NAP,
  SITE_URL,
  breadcrumbJsonLd,
  pageMetadata,
} from "@/lib/seo";

const PATH = "/kontakt";
const TITEL = "Kontakt — Kostenloses Erstgespräch mit Sven Zöller";
const BESCHREIBUNG =
  "Kostenloses Erstgespräch für Anti-Aggressionstraining, Deeskalation und Gewaltprävention. Sven Zöller, Obernburg am Main — Telefon 0151 196 080 40.";

export const metadata = pageMetadata({
  path: PATH,
  title: "Kontakt",
  ogTitle: `${TITEL} | safe-untermain.de`,
  description: BESCHREIBUNG,
  keywords: [
    "Erstgespräch Sicherheitstraining",
    "Anti-Aggressionstraining anfragen",
    "Deeskalationstraining buchen",
    "Kontakt Sven Zöller",
    "Sicherheitstrainer Obernburg Kontakt",
    "Sicherheitstrainer Aschaffenburg",
    "Training anfragen Untermain",
  ],
});

const breadcrumbJsonLdData = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Kontakt", path: PATH },
]);

const contactPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${SITE_URL}${PATH}#webpage`,
  url: `${SITE_URL}${PATH}`,
  name: TITEL,
  description: BESCHREIBUNG,
  inLanguage: "de-DE",
  about: { "@id": BUSINESS_ID },
  mainEntity: { "@id": BUSINESS_ID },
};

/** Kicker + Wert — die NAP-Angaben, die Google mit dem Business-Profil abgleicht. */
function Angabe({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-rot mb-2">
        {label}
      </p>
      <div className="text-[15px] font-sans text-ink/65 leading-relaxed">
        {children}
      </div>
    </div>
  );
}

export default function KontaktPage() {
  return (
    <>
      <JsonLd data={contactPageJsonLd} />
      <JsonLd data={breadcrumbJsonLdData} />

      <ScrollProgress />
      <Nav />

      <main className="relative">

        {/* ── Overlay: dark at top, long smooth fade into the form section ── */}
        <div
          className="absolute inset-x-0 top-0 pointer-events-none"
          style={{
            height: "95vh",
            zIndex: 1,
            background:
              "linear-gradient(to bottom, rgba(21,20,18,0.62) 0%, rgba(21,20,18,0.42) 28%, rgba(21,20,18,0.18) 62%, transparent 100%)",
          }}
        />

        {/* ── Hero ── */}
        <div className="relative z-10 flex items-end min-h-[40vh] pb-10">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 w-full pt-32">
            <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-rot mb-3">
              safe-untermain.de
            </p>
            <h1 className="font-display text-[clamp(2.2rem,10vw,5.5rem)] lg:text-[9rem] xl:text-[11rem] tracking-wide text-paper uppercase leading-none">
              Kontakt
            </h1>
          </div>
        </div>

        {/* ── Form section ── */}
        <div className="relative z-10 mx-3 md:mx-5 lg:mx-9">
          <div className="overflow-hidden">
            <KontaktFormular />

            {/* ── NAP-Block ──
                Adresse, Telefon und Öffnungszeiten müssen als Text im HTML
                stehen, nicht nur im JSON-LD: Google gleicht die sichtbaren
                Angaben mit dem Google-Business-Profil ab. Schreibweise exakt
                wie in `lib/seo.ts` und im Business-Profil — abweichende
                Varianten zersplittern das lokale Ranking-Signal. */}
            <section className="section-card">
              <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
                <div className="mb-12">
                  <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-rot mb-3">
                    Direkt erreichbar
                  </p>
                  <h2 className="font-display text-5xl lg:text-6xl tracking-wide text-ink uppercase leading-none">
                    So erreichen Sie mich
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                  <Angabe label="Anschrift">
                    <address className="not-italic">
                      {NAP.legalName}
                      <br />
                      SAFE Aggressionsmanagement
                      <br />
                      {NAP.street}
                      <br />
                      {NAP.postalCode} {NAP.city}
                    </address>
                  </Angabe>

                  <Angabe label="Telefon & E-Mail">
                    <a
                      href={`tel:${NAP.phone}`}
                      className="block hover:text-rot transition-colors duration-150"
                    >
                      {NAP.phoneDisplay}
                    </a>
                    <a
                      href={`mailto:${NAP.email}`}
                      className="block hover:text-rot transition-colors duration-150 mt-1"
                    >
                      {NAP.email}
                    </a>
                  </Angabe>

                  <Angabe label="Erreichbarkeit">
                    Mo – Fr: 08:00 – 20:00 Uhr
                    <br />
                    Sa: 09:00 – 16:00 Uhr
                    <br />
                    <span className="text-ink/45">
                      Außerhalb der Trainingszeiten
                    </span>
                  </Angabe>

                  <Angabe label="Einzugsgebiet">
                    {AREA_SERVED.slice(0, 7).join(", ")} — Inhouse-Trainings in
                    Bayern, Hessen und Baden-Württemberg nach Absprache.
                  </Angabe>
                </div>

                <p className="mt-12 pt-8 border-t border-ink/10 text-[15px] font-sans text-ink/55 leading-relaxed max-w-2xl">
                  Das Erstgespräch ist kostenlos und unverbindlich — telefonisch,
                  per Video oder vor Ort. Schildern Sie kurz, worum es geht; alles
                  Weitere klären wir gemeinsam.
                </p>
              </div>
            </section>
          </div>
        </div>

      </main>

      <Footer />
    </>
  );
}
