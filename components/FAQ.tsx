/**
 * FAQ-Sektion. Bewusst `<details>` statt eines JS-Accordions: der Antworttext
 * steht dadurch auch zugeklappt vollständig im HTML und ist für Crawler und
 * AI-Overviews lesbar — genau das, was das begleitende FAQPage-Schema behauptet.
 * Ein Accordion, das seine Antworten erst per JS einhängt, wäre Schema ohne Deckung.
 */
export default function FAQ({
  items,
  titel = "Häufige Fragen",
  kicker = "FAQ",
}: {
  items: { frage: string; antwort: string }[];
  titel?: string;
  kicker?: string;
}) {
  return (
    <section id="faq" className="section-card">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
        <div className="mb-12">
          <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-rot mb-3">
            {kicker}
          </p>
          <h2 className="font-display text-5xl lg:text-6xl tracking-wide text-ink uppercase leading-none">
            {titel}
          </h2>
        </div>

        <div className="max-w-3xl">
          {items.map((item) => (
            <details
              key={item.frage}
              className="group border-t border-ink/10 last:border-b"
            >
              <summary className="flex items-start gap-4 cursor-pointer list-none py-6 select-none">
                <span className="mt-[0.55em] w-1.5 h-1.5 rotate-45 bg-rot shrink-0 transition-transform duration-200 group-open:rotate-[135deg]" />
                <h3 className="font-display text-lg lg:text-xl tracking-[0.06em] text-ink uppercase leading-snug">
                  {item.frage}
                </h3>
              </summary>
              <p className="pb-6 pl-[1.625rem] text-[15px] font-sans text-ink/60 leading-relaxed max-w-2xl">
                {item.antwort}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
