import type { Metadata } from "next";
import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum und Anbieterkennzeichnung gemäß § 5 TMG.",
  alternates: { canonical: "/impressum" },
  robots: { index: false, follow: false },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-ink/8 pt-10 mt-10 first:border-0 first:pt-0 first:mt-0">
      <h2 className="font-display text-2xl tracking-widest text-ink uppercase mb-4">{title}</h2>
      <div className="text-ink/65 text-[15px] font-sans leading-relaxed space-y-2">{children}</div>
    </div>
  );
}

export default function ImpressumPage() {
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
              Impressum
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 mx-3 md:mx-5 lg:mx-9">
          <div className="overflow-hidden">
            <section className="section-card">
              <div className="max-w-3xl mx-auto px-6 lg:px-8 py-20 lg:py-28">

                <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-rot mb-10">
                  Angaben gemäß § 5 TMG
                </p>

                <Section title="Betreiber">
                  <p>Sven Zöller</p>
                  <p>Buchenweg 9</p>
                  <p>63785 Obernburg</p>
                </Section>

                <Section title="Kontakt">
                  <p>
                    Telefon:{" "}
                    <a href="tel:+4915119608040" className="hover:text-rot transition-colors">
                      0151 196 080 40
                    </a>
                  </p>
                  <p>
                    E-Mail:{" "}
                    <a href="mailto:safe@sven-zoeller.de" className="hover:text-rot transition-colors">
                      safe@sven-zoeller.de
                    </a>
                  </p>
                </Section>

                <Section title="Steuerdaten">
                  <p>Umsatzsteuer-ID: DE299531106</p>
                  <p>Steuernummer: 202/293/20891</p>
                </Section>

                <Section title="Berufsbezeichnung">
                  <p>Personal Trainer</p>
                </Section>

                <Section title="Streitschlichtung">
                  <p>
                    Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung
                    (OS) bereit:{" "}
                    <a
                      href="https://ec.europa.eu/consumers/odr/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-rot transition-colors underline underline-offset-2"
                    >
                      https://ec.europa.eu/consumers/odr/
                    </a>
                  </p>
                  <p>
                    Ich bin nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor
                    einer Verbraucherschlichtungsstelle teilzunehmen.
                  </p>
                </Section>

                <Section title="Haftung für Inhalte">
                  <p>
                    Die Inhalte meiner Seite wurden mit größter Sorgfalt erstellt. Für die
                    Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann ich jedoch
                    keine Gewähr übernehmen.
                  </p>
                </Section>

                <Section title="Haftung für Links">
                  <p>
                    Mein Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte
                    ich keinen Einfluss habe. Für die Inhalte der verlinkten Seiten ist stets der
                    jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
                  </p>
                </Section>

                <Section title="Urheberrecht">
                  <p>
                    Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
                    unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung,
                    Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes
                    bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
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
