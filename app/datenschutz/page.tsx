import type { Metadata } from "next";
import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";
import Footer from "@/components/Footer";
import { NAP } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Datenschutz",
  description:
    "Datenschutzerklärung von safe-untermain.de gemäß DSGVO: welche Daten beim Besuch der Website und beim Kontaktformular verarbeitet werden und warum.",
  alternates: { canonical: "/datenschutz" },
  robots: { index: false, follow: false },
};

/** Stand der Erklärung — bei jeder inhaltlichen Änderung mitziehen. */
const STAND = "August 2026";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-ink/8 pt-10 mt-10 first:border-0 first:pt-0 first:mt-0">
      <h2 className="font-display text-2xl tracking-widest text-ink uppercase mb-4">{title}</h2>
      <div className="text-ink/65 text-[15px] font-sans leading-relaxed space-y-3">{children}</div>
    </div>
  );
}

function Sub({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-display text-base tracking-[0.14em] text-ink uppercase pt-3">
      {children}
    </h3>
  );
}

function Liste({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5">
          <span className="mt-[0.5em] w-1 h-1 rotate-45 bg-rot shrink-0 inline-block" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Mail({ adresse }: { adresse: string }) {
  return (
    <a
      href={`mailto:${adresse}`}
      className="text-rot hover:text-ink transition-colors duration-150"
    >
      {adresse}
    </a>
  );
}

export default function DatenschutzPage() {
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
              Datenschutz
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 mx-3 md:mx-5 lg:mx-9">
          <div className="overflow-hidden">
            <section className="section-card">
              <div className="max-w-3xl mx-auto px-6 lg:px-8 py-20 lg:py-28">

                <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-rot mb-10">
                  Datenschutzerklärung gemäß DSGVO · Stand: {STAND}
                </p>

                {/* ───────────────────────────────────────────── */}
                <Section title="1. Verantwortlicher">
                  <p>
                    Verantwortlicher im Sinne der Datenschutzgesetze, insbesondere der
                    EU-Datenschutzgrundverordnung (DSGVO), ist:
                  </p>
                  <p className="text-ink">
                    {NAP.legalName}
                    <br />
                    SAFE Aggressionsmanagement
                    <br />
                    {NAP.street}
                    <br />
                    {NAP.postalCode} {NAP.city}
                  </p>
                  <p>
                    Telefon: {NAP.phoneDisplay}
                    <br />
                    E-Mail: <Mail adresse={NAP.email} />
                  </p>
                  <p>
                    Ein Datenschutzbeauftragter ist nicht bestellt, da die gesetzlichen
                    Voraussetzungen hierfür nicht vorliegen. Für alle Fragen zum
                    Datenschutz erreichen Sie mich unter den oben genannten Kontaktdaten.
                  </p>
                </Section>

                {/* ───────────────────────────────────────────── */}
                <Section title="2. Überblick">
                  <p>
                    Personenbezogene Daten sind alle Daten, mit denen Sie persönlich
                    identifiziert werden können. Diese Erklärung beschreibt, welche Daten
                    beim Besuch dieser Website erhoben werden, wozu sie verwendet werden
                    und welche Rechte Sie haben.
                  </p>
                  <p>
                    Diese Website verwendet <strong className="text-ink/80 font-medium">
                    keine Cookies zu Analyse-, Marketing- oder Tracking-Zwecken</strong>.
                    Es sind keine Webanalyse-Dienste, keine Werbe-Netzwerke, keine
                    Social-Media-Plugins und keine externen Kartendienste eingebunden.
                    Ein Cookie-Banner ist deshalb nicht erforderlich.
                  </p>
                </Section>

                {/* ───────────────────────────────────────────── */}
                <Section title="3. Hosting (Vercel)">
                  <p>
                    Diese Website wird bei der Vercel Inc., 340 S Lemon Ave #4133,
                    Walnut, CA 91789, USA, gehostet (nachfolgend „Vercel“). Beim Aufruf
                    der Website werden die technisch notwendigen Verbindungsdaten
                    automatisch an die Server von Vercel übermittelt und dort in
                    Server-Logfiles verarbeitet.
                  </p>

                  <Sub>Erfasste Daten</Sub>
                  <Liste
                    items={[
                      "IP-Adresse des anfragenden Geräts",
                      "Datum und Uhrzeit des Zugriffs",
                      "Aufgerufene Seite bzw. Datei und übertragene Datenmenge",
                      "Verwendeter Browser und dessen Version",
                      "Betriebssystem des Endgeräts",
                      "Referrer-URL (die zuvor besuchte Seite)",
                    ]}
                  />

                  <Sub>Zweck und Rechtsgrundlage</Sub>
                  <p>
                    Die Verarbeitung erfolgt, um die Website technisch bereitstellen,
                    ausliefern und absichern zu können sowie um Störungen und
                    Missbrauchsversuche zu erkennen. Rechtsgrundlage ist Art. 6 Abs. 1
                    lit. f DSGVO (berechtigtes Interesse an einer sicheren und
                    zuverlässigen Bereitstellung dieser Website). Eine Zusammenführung
                    dieser Daten mit anderen Datenquellen oder eine Auswertung zu
                    Marketingzwecken findet nicht statt.
                  </p>

                  <Sub>Datenübermittlung in die USA</Sub>
                  <p>
                    Vercel ist ein Anbieter mit Sitz in den USA; eine Verarbeitung von
                    Daten außerhalb der EU kann daher nicht ausgeschlossen werden. Die
                    Übermittlung wird auf die Standardvertragsklauseln der EU-Kommission
                    (Art. 46 Abs. 2 lit. c DSGVO) gestützt. Mit Vercel besteht ein
                    Vertrag über die Auftragsverarbeitung nach Art. 28 DSGVO.
                  </p>
                  <p>
                    Weitere Informationen finden Sie in der Datenschutzerklärung von
                    Vercel:{" "}
                    <a
                      href="https://vercel.com/legal/privacy-policy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-rot hover:text-ink transition-colors duration-150 break-all"
                    >
                      vercel.com/legal/privacy-policy
                    </a>
                  </p>
                </Section>

                {/* ───────────────────────────────────────────── */}
                <Section title="4. Kontaktformular">
                  <p>
                    Wenn Sie mir über das Kontaktformular eine Anfrage senden, werden die
                    von Ihnen eingegebenen Daten zum Zweck der Bearbeitung Ihrer Anfrage
                    und für den Fall von Anschlussfragen verarbeitet.
                  </p>

                  <Sub>Verarbeitete Daten</Sub>
                  <Liste
                    items={[
                      <>Name <span className="text-ink/40">(Pflichtfeld)</span></>,
                      <>E-Mail-Adresse <span className="text-ink/40">(Pflichtfeld)</span></>,
                      <>Telefonnummer <span className="text-ink/40">(freiwillig)</span></>,
                      <>Gewähltes Interesse bzw. Anliegen <span className="text-ink/40">(Pflichtfeld)</span></>,
                      <>Ihre Nachricht <span className="text-ink/40">(Pflichtfeld)</span></>,
                    ]}
                  />
                  <p>
                    Bitte übermitteln Sie über das Formular keine besonderen Kategorien
                    personenbezogener Daten im Sinne des Art. 9 DSGVO — etwa Angaben zu
                    Gesundheit, Strafverfahren oder behördlichen Auflagen. Solche Themen
                    besprechen wir vertraulich im persönlichen Erstgespräch.
                  </p>

                  <Sub>Zweck und Rechtsgrundlage</Sub>
                  <p>
                    Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage
                    auf den Abschluss oder die Durchführung eines Vertrages gerichtet ist
                    (z.B. Anfrage zu einem Training). In allen übrigen Fällen beruht die
                    Verarbeitung auf Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse
                    an der Beantwortung von Anfragen).
                  </p>

                  <Sub>Automatische Bestätigungs-E-Mail</Sub>
                  <p>
                    Nach dem Absenden erhalten Sie an die angegebene E-Mail-Adresse eine
                    automatische Eingangsbestätigung, die Ihr Anliegen und Ihre Nachricht
                    wiedergibt. Gleichzeitig geht eine Benachrichtigung mit Ihren Angaben
                    an meinen Posteingang.
                  </p>

                  <Sub>Schutz vor Missbrauch</Sub>
                  <p>
                    Um automatisierte Massenanfragen und Spam zu verhindern, wird die
                    IP-Adresse des absendenden Geräts beim Versand für maximal 30 Minuten
                    im Arbeitsspeicher des Servers vorgehalten und danach automatisch
                    verworfen. Eine dauerhafte Speicherung oder Auswertung findet nicht
                    statt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
                    Interesse an der Abwehr von Missbrauch).
                  </p>

                  <Sub>Speicherdauer</Sub>
                  <p>
                    Ihre Angaben verbleiben bei mir, bis Sie mich zur Löschung auffordern,
                    Ihre Einwilligung widerrufen oder der Zweck der Speicherung entfällt
                    — etwa nach abgeschlossener Bearbeitung Ihrer Anfrage. Zwingende
                    gesetzliche Aufbewahrungsfristen, insbesondere handels- und
                    steuerrechtliche Fristen, bleiben unberührt.
                  </p>
                </Section>

                {/* ───────────────────────────────────────────── */}
                <Section title="5. E-Mail-Versand (Resend)">
                  <p>
                    Für den Versand der Bestätigungs- und Benachrichtigungs-E-Mails aus
                    dem Kontaktformular nutze ich den Dienst Resend der Resend, Inc., 2261
                    Market Street #5039, San Francisco, CA 94114, USA (nachfolgend
                    „Resend“).
                  </p>
                  <p>
                    Dabei werden die von Ihnen im Formular angegebenen Daten — Name,
                    E-Mail-Adresse, gegebenenfalls Telefonnummer, Anliegen und Nachricht
                    — an Resend übermittelt, um die E-Mails zu erzeugen und zuzustellen.
                    Resend verarbeitet diese Daten ausschließlich weisungsgebunden als
                    Auftragsverarbeiter; ein Vertrag über die Auftragsverarbeitung nach
                    Art. 28 DSGVO besteht.
                  </p>
                  <p>
                    Zur Nachvollziehbarkeit der Zustellung speichert Resend technische
                    Versanddaten (unter anderem Empfängeradresse, Zeitpunkt und
                    Zustellstatus) für einen begrenzten Zeitraum.
                  </p>
                  <p>
                    Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO bzw. Art. 6 Abs. 1
                    lit. f DSGVO (siehe Abschnitt 4). Da Resend seinen Sitz in den USA
                    hat, wird die Übermittlung auf die Standardvertragsklauseln der
                    EU-Kommission (Art. 46 Abs. 2 lit. c DSGVO) gestützt.
                  </p>
                  <p>
                    Weitere Informationen:{" "}
                    <a
                      href="https://resend.com/legal/privacy-policy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-rot hover:text-ink transition-colors duration-150 break-all"
                    >
                      resend.com/legal/privacy-policy
                    </a>
                  </p>
                </Section>

                {/* ───────────────────────────────────────────── */}
                <Section title="6. Kontaktaufnahme per E-Mail oder Telefon">
                  <p>
                    Wenn Sie mich direkt per E-Mail oder telefonisch kontaktieren, werden
                    Ihre Angaben zur Bearbeitung des Anliegens und für den Fall von
                    Anschlussfragen gespeichert. Rechtsgrundlage und Speicherdauer
                    entsprechen den Angaben in Abschnitt 4.
                  </p>
                </Section>

                {/* ───────────────────────────────────────────── */}
                <Section title="7. Schriftarten und externe Inhalte">
                  <p>
                    Die verwendeten Schriftarten (Bebas Neue und IBM Plex Sans) werden
                    lokal von diesem Server ausgeliefert und beim Seitenaufruf{" "}
                    <strong className="text-ink/80 font-medium">nicht von Google
                    Fonts oder einem anderen externen Server nachgeladen</strong>. Es
                    wird daher keine Verbindung zu Google aufgebaut und keine IP-Adresse
                    an Google übertragen.
                  </p>
                  <p>
                    Ebenso werden keine externen Kartendienste, Videoplayer,
                    Schriftbibliotheken oder Social-Media-Elemente eingebunden. Auf der
                    Partnerseite befinden sich lediglich einfache Textlinks zu den
                    Websites der jeweiligen Partner — diese werden erst durch Ihren Klick
                    aufgerufen. Für die Datenverarbeitung auf den verlinkten Seiten sind
                    deren jeweilige Betreiber verantwortlich.
                  </p>
                </Section>

                {/* ───────────────────────────────────────────── */}
                <Section title="8. Lokale Speicherung im Browser">
                  <p>
                    Diese Website speichert zwei technisch notwendige Werte lokal in
                    Ihrem Browser (Local Storage bzw. Session Storage). Diese Werte
                    verbleiben auf Ihrem Gerät und werden nicht an den Server oder an
                    Dritte übertragen:
                  </p>
                  <Liste
                    items={[
                      "Zeitpunkt Ihrer letzten Formularanfrage — damit die Wartezeit bis zur nächsten Anfrage korrekt angezeigt wird (Schutz vor Mehrfachversand).",
                      "Die zuletzt gewählte Leistung — damit nach einem Seitenwechsel die passende Detailansicht geöffnet wird.",
                    ]}
                  />
                  <p>
                    Da es sich um unbedingt erforderliche Speicherung im Sinne des § 25
                    Abs. 2 Nr. 2 TDDDG handelt, ist hierfür keine Einwilligung
                    erforderlich. Sie können diese Daten jederzeit über die Einstellungen
                    Ihres Browsers löschen.
                  </p>
                </Section>

                {/* ───────────────────────────────────────────── */}
                <Section title="9. SSL-/TLS-Verschlüsselung">
                  <p>
                    Diese Website nutzt aus Sicherheitsgründen und zum Schutz der
                    Übertragung vertraulicher Inhalte eine SSL-/TLS-Verschlüsselung. Eine
                    verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile
                    des Browsers mit „https://“ beginnt. Bei aktiver Verschlüsselung
                    können die Daten, die Sie an mich übermitteln, nicht von Dritten
                    mitgelesen werden.
                  </p>
                </Section>

                {/* ───────────────────────────────────────────── */}
                <Section title="10. Ihre Rechte">
                  <p>Ihnen stehen gegenüber dem Verantwortlichen folgende Rechte zu:</p>
                  <Liste
                    items={[
                      <><strong className="text-ink/80 font-medium">Auskunft</strong> (Art. 15 DSGVO) — über die zu Ihnen gespeicherten Daten, deren Herkunft, Empfänger und den Zweck der Verarbeitung.</>,
                      <><strong className="text-ink/80 font-medium">Berichtigung</strong> (Art. 16 DSGVO) — unrichtige Daten zu korrigieren oder zu vervollständigen.</>,
                      <><strong className="text-ink/80 font-medium">Löschung</strong> (Art. 17 DSGVO) — sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.</>,
                      <><strong className="text-ink/80 font-medium">Einschränkung der Verarbeitung</strong> (Art. 18 DSGVO).</>,
                      <><strong className="text-ink/80 font-medium">Datenübertragbarkeit</strong> (Art. 20 DSGVO) — Herausgabe in einem gängigen, maschinenlesbaren Format.</>,
                      <><strong className="text-ink/80 font-medium">Widerspruch</strong> (Art. 21 DSGVO) — gegen Verarbeitungen, die auf einem berechtigten Interesse beruhen.</>,
                      <><strong className="text-ink/80 font-medium">Widerruf einer Einwilligung</strong> (Art. 7 Abs. 3 DSGVO) — mit Wirkung für die Zukunft.</>,
                    ]}
                  />
                  <p>
                    Zur Ausübung dieser Rechte genügt eine formlose Nachricht an{" "}
                    <Mail adresse={NAP.email} />.
                  </p>

                  <Sub>Beschwerderecht bei der Aufsichtsbehörde</Sub>
                  <p>
                    Unbeschadet anderer Rechtsbehelfe steht Ihnen nach Art. 77 DSGVO ein
                    Beschwerderecht bei einer Datenschutz-Aufsichtsbehörde zu. Zuständig
                    ist das Bayerische Landesamt für Datenschutzaufsicht (BayLDA),
                    Promenade 18, 91522 Ansbach.
                  </p>
                </Section>

                {/* ───────────────────────────────────────────── */}
                <Section title="11. Keine automatisierte Entscheidungsfindung">
                  <p>
                    Es findet keine automatisierte Entscheidungsfindung einschließlich
                    Profiling im Sinne des Art. 22 DSGVO statt.
                  </p>
                </Section>

                {/* ───────────────────────────────────────────── */}
                <Section title="12. Änderungen dieser Erklärung">
                  <p>
                    Diese Datenschutzerklärung wird angepasst, sobald sich die
                    Rechtslage, die eingesetzten Dienste oder die Verarbeitung Ihrer
                    Daten ändern. Es gilt jeweils die hier veröffentlichte Fassung.
                    Stand: {STAND}.
                  </p>
                </Section>

              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
