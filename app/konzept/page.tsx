import type { Metadata } from "next";
import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Unser Konzept — Sven Zöller | safe-untermain.de",
  description:
    "Das SAFE Aggressionsmanagement — ein ganzheitliches Konzept aus Prävention, Deeskalation und mentaler Stärke.",
};

const PRINZIPIEN = [
  {
    nr: "01",
    title: "Prävention zuerst",
    text: "Sicherheit beginnt, bevor eine Situation gefährlich wird. Wir trainieren Wahrnehmung, Risikobewusstsein und frühzeitige Reaktion — damit es erst gar nicht zur Eskalation kommt.",
  },
  {
    nr: "02",
    title: "Deeskalation vor Technik",
    text: "Körperliche Verteidigung ist das letzte Mittel. Verbal, nonverbal, situativ — wir geben Ihnen Werkzeuge, die in 90 % aller Konflikte wirksamer sind als jede Kampftechnik.",
  },
  {
    nr: "03",
    title: "Mentale Stärke als Basis",
    text: "Wer sich selbst kennt, bleibt in Hochdrucksituationen handlungsfähig. Das SAFE-Konzept integriert psychologische Grundlagen direkt ins Training.",
  },
  {
    nr: "04",
    title: "Individuell & praxisnah",
    text: "Kein Einheitsprogramm. Jedes Training wird auf die Teilnehmer, ihre Umgebung und ihre spezifischen Risikosituationen zugeschnitten.",
  },
];

export default function KonzeptPage() {
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
              Konzept
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 mx-3 md:mx-5 lg:mx-9">
          <div className="overflow-hidden">

            {/* Intro */}
            <section className="section-card">
              <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
                <div className="max-w-3xl">
                  <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-rot mb-4">
                    SAFE Aggressionsmanagement
                  </p>
                  <h2 className="font-display text-5xl lg:text-6xl tracking-wide text-ink uppercase leading-none mb-10">
                    Was steckt<br />hinter SAFE?
                  </h2>
                  <div className="space-y-5 text-ink/65 text-base leading-relaxed">
                    <p>
                      SAFE steht für ein ganzheitliches Konzept aus Prävention, Deeskalation,
                      mentaler Stärke und — wo notwendig — physischer Selbstverteidigung.
                      Die vier Ebenen greifen ineinander und bilden ein System, das in
                      realen Situationen funktioniert.
                    </p>
                    <p>
                      Das Konzept basiert auf jahrzehntelanger Praxiserfahrung: beim THW,
                      im Krav Maga RSC und in der direkten Arbeit mit Menschen, die täglich
                      mit Konfliktsituationen konfrontiert sind — von sozialen Berufen über
                      den öffentlichen Dienst bis hin zu Privatpersonen.
                    </p>
                    <p>
                      Kein Seminar-Wissen. Kein Lehrbuch. Nur das, was nachweislich funktioniert.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Prinzipien */}
            <section className="section-dark">
              <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
                <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-rot mb-4">
                  Die vier Ebenen
                </p>
                <h2 className="font-display text-5xl lg:text-6xl tracking-wide text-paper uppercase leading-none mb-14">
                  Grundprinzipien
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-paper/8">
                  {PRINZIPIEN.map((p) => (
                    <div key={p.nr} className="bg-ink p-8 lg:p-10">
                      <p className="font-display text-5xl tracking-wide text-rot/25 leading-none mb-5">
                        {p.nr}
                      </p>
                      <h3 className="font-display text-2xl tracking-[0.1em] text-paper uppercase mb-3">
                        {p.title}
                      </h3>
                      <p className="text-[14px] text-paper/50 font-sans leading-relaxed">
                        {p.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Quote */}
            <section className="section-card">
              <div className="max-w-6xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
                <div className="max-w-3xl mx-auto text-center">
                  <blockquote className="font-display text-3xl lg:text-5xl tracking-wide italic text-ink/85 leading-snug">
                    &ldquo;Sicherheit ist kein Zufall.<br />
                    Sie ist das Ergebnis von Vorbereitung.&rdquo;
                  </blockquote>
                  <p className="mt-8 font-mono text-sm text-ink/30 tracking-wider">
                    — Sven Zöller
                  </p>
                  <div className="mt-12">
                    <a
                      href="/kontakt"
                      className="inline-block px-8 py-4 bg-ink text-paper font-medium text-sm hover:bg-rot transition-colors duration-200 tracking-wide"
                    >
                      Kostenloses Erstgespräch anfragen
                    </a>
                  </div>
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
