import type { Metadata } from "next";
import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Datenschutzerklärung gemäß DSGVO.",
  alternates: { canonical: "/datenschutz" },
  robots: { index: false, follow: false },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-ink/8 pt-10 mt-10 first:border-0 first:pt-0 first:mt-0">
      <h2 className="font-display text-2xl tracking-widest text-ink uppercase mb-4">{title}</h2>
      <div className="text-ink/65 text-[15px] font-sans leading-relaxed space-y-3">{children}</div>
    </div>
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
                  Datenschutzerklärung gemäß DSGVO
                </p>

                <Section title="Verantwortlicher">
                  <p>
                    Verantwortlicher im Sinne der Datenschutzgesetze, insbesondere der
                    EU-Datenschutzgrundverordnung (DSGVO), ist:
                  </p>
                  <p className="text-ink/80">
                    Sven Zöller<br />
                    Buchenweg 9<br />
                    63785 Obernburg
                  </p>
                  <p>
                    E-Mail:{" "}
                    <a href="mailto:safe@sven-zoeller.de" className="hover:text-rot transition-colors">
                      safe@sven-zoeller.de
                    </a>
                  </p>
                </Section>

                <Section title="Allgemeine Hinweise">
                  <p>
                    Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
                    personenbezogenen Daten passiert, wenn Sie unsere Website besuchen.
                    Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert
                    werden können.
                  </p>
                </Section>

                <Section title="Datenerfassung auf unserer Website">
                  <p>
                    Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen.
                    Hierbei kann es sich z.B. um Daten handeln, die Sie in ein Kontaktformular
                    eingeben.
                  </p>
                  <p>
                    Andere Daten werden automatisch beim Besuch der Website durch unsere
                    IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser,
                    Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten
                    erfolgt automatisch, sobald Sie unsere Website betreten.
                  </p>
                </Section>

                <Section title="Ihre Rechte">
                  <p>
                    Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger
                    und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben
                    außerdem ein Recht, die Berichtigung, Sperrung oder Löschung dieser Daten zu
                    verlangen. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich
                    jederzeit unter der im Impressum angegebenen Adresse an uns wenden.
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
