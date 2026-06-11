import Link from "next/link";

export default function KontaktCTA() {
  return (
    <section id="kontakt" className="section-card">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <p className="font-mono text-xs tracking-[0.18em] uppercase text-rot">
            Kontakt
          </p>
          <h2 className="font-display text-3xl lg:text-4xl font-medium text-ink">
            Bereit, den ersten Schritt zu machen?
          </h2>
          <p className="text-ink/60 leading-relaxed text-base">
            Ein unverbindliches Erstgespräch — kostenlos, direkt und ohne
            Umwege. Schildern Sie Ihre Situation, ich zeige Ihnen, was möglich ist.
          </p>

          <div className="pt-4">
            <Link
              href="/kontakt"
              className="inline-block px-8 py-4 bg-ink text-paper font-medium text-sm hover:bg-rot transition-colors duration-200 tracking-wide"
            >
              Kostenloses Erstgespräch anfragen
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 pt-4">
            <a
              href="tel:+4915119608040"
              className="font-mono text-sm text-muted hover:text-rot transition-colors duration-200 tracking-wider"
            >
              0151 196 080 40
            </a>
            <span className="hidden sm:inline w-px h-4 bg-ink/15" />
            <a
              href="mailto:safe@sven-zoeller.de"
              className="font-mono text-sm text-muted hover:text-rot transition-colors duration-200"
            >
              safe@sven-zoeller.de
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
