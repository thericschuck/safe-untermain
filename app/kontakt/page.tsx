import type { Metadata } from "next";
import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";
import KontaktFormular from "@/components/KontaktFormular";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Kontakt — Sven Zöller | safe-untermain.de",
  description:
    "Vereinbaren Sie ein kostenloses Erstgespräch. Anti-Aggressionstraining, Deeskalation, Gewaltprävention und Selbstbehauptung.",
};

export default function KontaktPage() {
  return (
    <>
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
          </div>
        </div>

      </main>

      <Footer />
    </>
  );
}
