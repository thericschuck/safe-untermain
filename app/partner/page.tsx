import type { Metadata } from "next";
import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Partner — Sven Zöller | safe-untermain.de",
  description:
    "Kooperationen und Partner von SAFE Aggressionsmanagement.",
};

const PLATZHALTER = Array.from({ length: 6 });

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
            <h1 className="font-display text-[5.5rem] lg:text-[9rem] xl:text-[11rem] tracking-wide text-paper uppercase leading-none">
              Partner
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 mx-3 md:mx-5 lg:mx-9">
          <div className="overflow-hidden">

            <section className="section-card">
              <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20 lg:py-28">

                <div className="mb-14">
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
                </div>

                {/* Partner-Logo-Platzhalter */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-ink/8 mb-16">
                  {PLATZHALTER.map((_, i) => (
                    <div
                      key={i}
                      className="bg-paper aspect-[3/2] flex items-center justify-center"
                    >
                      <span className="font-mono text-[10px] tracking-wider text-ink/20 uppercase">
                        Partner
                      </span>
                    </div>
                  ))}
                </div>

                {/* Kooperations-CTA */}
                <div className="border-t border-ink/8 pt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div>
                    <p className="font-display text-2xl lg:text-3xl tracking-wide text-ink uppercase leading-none mb-2">
                      Kooperation anfragen
                    </p>
                    <p className="text-ink/50 text-sm">
                      Sie möchten mit SAFE Aggressionsmanagement zusammenarbeiten?
                    </p>
                  </div>
                  <a
                    href="/kontakt"
                    className="shrink-0 px-8 py-4 bg-ink text-paper font-medium text-sm hover:bg-rot transition-colors duration-200 tracking-wide"
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
