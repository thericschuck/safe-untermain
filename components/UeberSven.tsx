const tags = ["THW", "Krav Maga", "Peer", "SbE"];

export default function UeberSven() {
  return (
    <section id="ueber" className="section-card">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Foto Placeholder */}
          <div className="aspect-[4/5] bg-ink/8 flex items-center justify-center rounded-sm border border-ink/10">
            <span className="font-mono text-xs text-muted/60 tracking-wider">
              Foto Sven Zöller
            </span>
          </div>

          {/* Text */}
          <div className="space-y-6">
            <p className="font-mono text-xs tracking-[0.18em] uppercase text-amber">
              Wer steckt dahinter?
            </p>
            <h2 className="font-display text-3xl lg:text-4xl font-medium text-ink leading-snug">
              20 Jahre Erfahrung.<br />
              Kein Lehrbuch.
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

            {/* Credential Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 border border-amber/50 text-amber font-mono text-xs tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
