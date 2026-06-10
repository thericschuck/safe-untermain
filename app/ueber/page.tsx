import type { Metadata } from "next";
import Image from "next/image";
import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Über mich — Sven Zöller | safe-untermain.de",
  description:
    "Sven Zöller — Zertifizierter Deeskalations-, Antigewalt- und Anti-Aggressions-Trainer, Kommunikationscoach und Mediator mit über zwanzig Jahren Erfahrung.",
};

const KOMPETENZEN = [
  "Konfliktmanagement",
  "Stressbewältigung",
  "Selbstbewusstseinsaufbau",
  "Gewaltprävention",
  "Kommunikation",
];

const CREDENTIALS = [
  { label: "THW",           desc: "Über 20 Jahre aktiver Dienst beim Technischen Hilfswerk" },
  { label: "Krav Maga RSC", desc: "Zertifizierter Trainer — Real Selfdefence Concept" },
  { label: "AAT",           desc: "Anti-Aggressionstraining, gelistet beim AJSD Niedersachsen" },
  { label: "Peer",          desc: "Ausgebildeter Peer für psychosoziale Unterstützung" },
  { label: "SbE",           desc: "Stressbearbeitung nach belastenden Ereignissen" },
  { label: "Mediator",      desc: "Kommunikationscoach und zertifizierter Mediator" },
];

export default function UeberMichPage() {
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
              Über mich
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 mx-3 md:mx-5 lg:mx-9">
          <div className="overflow-hidden">

            {/* Bio */}
            <section className="section-card">
              <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

                  {/* Foto */}
                  <div className="aspect-4/5 relative overflow-hidden">
                    <Image
                      src="/sven.png"
                      alt="Sven Zöller"
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                  </div>

                  {/* Text */}
                  <div className="space-y-6">
                    <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-rot">
                      Wer steckt dahinter?
                    </p>
                    <h2 className="font-display text-5xl lg:text-6xl tracking-wide text-ink uppercase leading-none">
                      20 Jahre<br />Erfahrung.<br />Kein Lehrbuch.
                    </h2>
                    <div className="space-y-4 text-ink/65 text-base leading-relaxed">
                      <p>
                        Herzlich willkommen — mein Name ist Sven Zöller. Ich bin zertifizierter
                        Deeskalations-, Antigewalt- und Anti-Aggressions-Trainer,
                        Kommunikationscoach und Mediator.
                      </p>
                      <p>
                        Unser Team beschäftigt sich seit über zwanzig Jahren mit den Themen
                        Aggressionen und Gewalt am Arbeitsplatz, in Schulen und anderen Bereichen.
                      </p>
                      <p>
                        Durch vielfältige berufliche Erfahrungen, ständigen Austausch im Netzwerk
                        und kontinuierliche Weiterbildungen habe ich mein Wissen stetig erweitert.
                        Durch die Zusammenarbeit mit Opfern und Tätern konnten wir unsere
                        Lösungskonzepte in realistischen Situationen testen, anpassen und optimieren.
                      </p>
                      <p>
                        Mit Hilfe des SAFE Aggressionsmanagements habe ich es mir zur Aufgabe gemacht,
                        diese Erfahrungen weiterzugeben, ein Bewusstsein für Wahrnehmung, Kommunikation
                        und Gewaltprävention zu schaffen und Lösungsansätze sowie Perspektiven aufzuzeigen.
                      </p>
                      <p className="text-ink/50 italic">
                        Ich freue mich auf unsere Zusammenarbeit.
                      </p>
                    </div>

                    {/* Kompetenzen */}
                    <ul className="space-y-2 pt-2">
                      {KOMPETENZEN.map((k) => (
                        <li key={k} className="flex items-center gap-3">
                          <span className="w-1.5 h-1.5 rotate-45 bg-rot shrink-0" />
                          <span className="font-mono text-[12px] tracking-wide text-ink/70 uppercase">
                            {k}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <p className="font-mono text-[13px] tracking-[0.18em] uppercase text-ink pt-2">
                      — Sven Zöller, Personalcoach
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Qualifikationen */}
            <section className="section-dark">
              <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
                <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-rot mb-4">
                  Ausbildung & Qualifikationen
                </p>
                <h2 className="font-display text-5xl lg:text-6xl tracking-wide text-paper uppercase leading-none mb-14">
                  Was mich<br />qualifiziert
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-paper/8">
                  {CREDENTIALS.map((c) => (
                    <div key={c.label} className="bg-ink p-8">
                      <p className="font-display text-2xl tracking-[0.12em] text-rot uppercase mb-3">
                        {c.label}
                      </p>
                      <p className="text-[14px] text-paper/50 font-sans leading-relaxed">
                        {c.desc}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-16 flex justify-center">
                  <a
                    href="/kontakt"
                    className="px-12 py-5 bg-rot text-paper font-sans text-base tracking-wide hover:bg-paper hover:text-ink transition-colors duration-200"
                  >
                    Kostenloses Erstgespräch anfragen
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
