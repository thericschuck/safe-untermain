import type { Metadata } from "next";
import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Unser Konzept — Sven Zöller | safe-untermain.de",
  description:
    "Das SAFE Aggressionsmanagement — ein ganzheitliches Konzept aus Prävention, Deeskalation und mentaler Stärke.",
};

const VORTEILE = [
  {
    title: "Sicherheit und Souveränität",
    text: "Erlernen Sie bewährte Methoden für den professionellen Umgang mit aggressiven und gewaltbereiten Kunden, Patienten oder Klienten.",
  },
  {
    title: "Individuell abgestimmt",
    text: "Unsere Workshops und Trainings sind maßgeschneidert – für Unternehmen, Behörden, soziale Einrichtungen, Schulen oder Einzelpersonen.",
  },
  {
    title: "Prävention & Deeskalation",
    text: "Wir vermitteln effektive Techniken zur Konflikt-Kommunikation, Gewaltprävention und professionellen Intervention.",
  },
  {
    title: "Praxisnah & nachhaltig",
    text: "In direktem Coaching erarbeiten wir gemeinsam Strategien, die Sie sofort in Ihrem Alltag anwenden können.",
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
            <h1 className="font-display text-[clamp(2.2rem,10vw,5.5rem)] lg:text-[9rem] xl:text-[11rem] tracking-wide text-paper uppercase leading-none">
              Konzept
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 mx-3 md:mx-5 lg:mx-9">
          <div className="overflow-hidden">

            {/* Hauptinhalt */}
            <section className="section-card">
              <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20 lg:py-28">

                <div className="max-w-3xl mb-16">
                  <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-rot mb-4">
                    SAFE Aggressionsmanagement
                  </p>
                  <h2 className="font-display text-5xl lg:text-6xl tracking-wide text-ink uppercase leading-none mb-8">
                    Warum SAFE?
                  </h2>
                  <div className="space-y-4 text-ink/65 text-base leading-relaxed">
                    <p>
                      Konflikte gehören zum Alltag – sei es im beruflichen oder privaten Umfeld.
                      Entscheidend ist, wie man mit ihnen umgeht. Mit SAFE Aggressionsmanagement
                      bieten wir Ihnen praxisnahe und nachhaltige Lösungsstrategien, um
                      Konfliktsituationen souverän, klar und produktiv zu bewältigen.
                    </p>
                    <p>
                      Unser Ziel: Bewusstsein schaffen und neue Perspektiven eröffnen.
                    </p>
                  </div>
                </div>

                {/* Vorteile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-ink/8">
                  {VORTEILE.map((v) => (
                    <div key={v.title} className="bg-paper p-8 lg:p-10">
                      <div className="flex items-start gap-4">
                        <span className="mt-1.5 w-1.5 h-1.5 rotate-45 bg-rot shrink-0" />
                        <div>
                          <h3 className="font-display text-xl tracking-[0.08em] text-ink uppercase mb-2">
                            {v.title}
                          </h3>
                          <p className="text-[14px] text-ink/55 font-sans leading-relaxed">
                            {v.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mt-10 text-ink/50 text-[15px] font-sans leading-relaxed max-w-2xl">
                  SAFE Aggressionsmanagement steht für fundierte Expertise, praxisorientierte
                  Trainings und maßgeschneiderte Lösungen – für eine sichere und erfolgreiche
                  Konfliktbewältigung in jeder Situation.
                </p>

              </div>
            </section>

            {/* CTA */}
            <section className="section-dark">
              <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  <p className="font-display text-3xl lg:text-4xl tracking-wide text-paper uppercase leading-none">
                    Nehmen Sie Kontakt auf.
                  </p>
                  <a
                    href="/kontakt"
                    className="shrink-0 px-8 py-4 bg-rot text-paper font-medium text-sm hover:bg-paper hover:text-ink transition-colors duration-200 tracking-wide"
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
