import type { Metadata } from "next";
import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Über mich — Sven Zöller | safe-untermain.de",
  description:
    "Sven Zöller — Sicherheitstrainer, THW-Erfahrung, Krav Maga RSC, Peer und SbE. Über zwei Jahrzehnte aktive Erfahrung in Stresssituationen.",
};

const CREDENTIALS = [
  { label: "THW",  desc: "Über 20 Jahre aktiver Dienst beim Technischen Hilfswerk" },
  { label: "Krav Maga RSC", desc: "Zertifizierter Trainer — Real Selfdefence Concept" },
  { label: "AAT",  desc: "Anti-Aggressionstraining, gelistet beim AJSD Niedersachsen" },
  { label: "Peer", desc: "Ausgebildeter Peer für psychosoziale Unterstützung" },
  { label: "SbE",  desc: "Stressbearbeitung nach belastenden Ereignissen" },
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
            <h1 className="font-display text-[5.5rem] lg:text-[9rem] xl:text-[11rem] tracking-wide text-paper uppercase leading-none">
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                  {/* Foto */}
                  <div className="aspect-[4/5] bg-ink/8 flex items-center justify-center border border-ink/10">
                    <span className="font-mono text-xs text-muted/60 tracking-wider">
                      Foto Sven Zöller
                    </span>
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
                        Sven Zöller bringt über zwei Jahrzehnte aktive Erfahrung beim
                        Technischen Hilfswerk (THW) mit — Einsätze, Führungsverantwortung
                        und die Realität von Stresssituationen, die kein Seminar simulieren kann.
                      </p>
                      <p>
                        Als zertifizierter Krav Maga-Trainer verbindet er militärisch erprobte
                        Schutztechniken mit psychologisch fundierter Deeskalation.
                        Effektiv, direkt, für den echten Alltag.
                      </p>
                      <p>
                        Als ausgebildeter Peer und Stressbearbeitung nach belastenden Ereignissen (SbE)
                        weiß er, was Menschen in Extremsituationen brauchen — und was ihnen danach hilft.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {["THW", "Krav Maga", "Peer", "SbE", "AAT"].map((tag) => (
                        <span key={tag} className="px-3 py-1 border border-rot/50 text-rot font-mono text-xs tracking-wider">
                          {tag}
                        </span>
                      ))}
                    </div>
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
              </div>
            </section>

            {/* CTA */}
            <section className="section-card">
              <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  <p className="font-display text-3xl lg:text-4xl tracking-wide text-ink uppercase leading-none">
                    Lernen Sie mich kennen.
                  </p>
                  <a
                    href="/kontakt"
                    className="shrink-0 px-8 py-4 bg-ink text-paper font-medium text-sm hover:bg-rot transition-colors duration-200 tracking-wide"
                  >
                    Kostenloses Erstgespräch
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
